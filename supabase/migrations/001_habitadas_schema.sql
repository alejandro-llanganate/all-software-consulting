-- HABITADAS · schema aislado (misma base, sin pisar public)
-- Todo vive en schema "habitadas": tablas, funciones, triggers, RLS.
-- Otras apps en public.* no se tocan.
--
-- Tras ejecutar: Dashboard → Settings → API → Exposed schemas
--   agrega "habitadas" (además de public).

create extension if not exists "pgcrypto";

create schema if not exists habitadas;

grant usage on schema habitadas to anon, authenticated, service_role;

-- ── Profesionales ──────────────────────────────────────────
create table if not exists habitadas.professionals (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  title text not null,
  short_bio text not null default '',
  bio text not null default '',
  approach text not null default '',
  image_url text not null default '',
  gallery jsonb not null default '[]'::jsonb,
  areas text[] not null default '{}',
  specializations text[] not null default '{}',
  education jsonb not null default '[]'::jsonb,
  certifications jsonb not null default '[]'::jsonb,
  session_price numeric(10,2) not null default 7,
  featured boolean not null default false,
  active boolean not null default true,
  email text unique,
  auth_user_id uuid unique references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Disponibilidad ─────────────────────────────────────────
create table if not exists habitadas.availability_days (
  id uuid primary key default gen_random_uuid(),
  professional_id uuid not null references habitadas.professionals(id) on delete cascade,
  date date not null,
  slots text[] not null default '{}',
  created_at timestamptz not null default now(),
  unique (professional_id, date)
);

-- ── Citas ──────────────────────────────────────────────────
create table if not exists habitadas.appointments (
  id uuid primary key default gen_random_uuid(),
  professional_id uuid not null references habitadas.professionals(id) on delete restrict,
  date date not null,
  time text not null,
  reason text not null default '',
  client_name text not null,
  client_email text not null default '',
  client_phone text not null default '',
  client_id text not null default '',
  payment_method text not null default 'transferencia',
  payment_reference text not null default '',
  status text not null default 'pendiente'
    check (status in ('pendiente', 'completada', 'cancelada')),
  intake jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists habitadas_appointments_professional_idx
  on habitadas.appointments(professional_id);
create index if not exists habitadas_appointments_date_idx
  on habitadas.appointments(date);
create index if not exists habitadas_availability_professional_idx
  on habitadas.availability_days(professional_id);

-- ── Contenido del sitio ────────────────────────────────────
create table if not exists habitadas.site_content (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Permisos tablas (RLS sigue filtrando filas)
grant select, insert, update, delete on all tables in schema habitadas
  to anon, authenticated, service_role;
grant usage, select on all sequences in schema habitadas
  to anon, authenticated, service_role;

alter default privileges in schema habitadas
  grant select, insert, update, delete on tables to anon, authenticated, service_role;
alter default privileges in schema habitadas
  grant usage, select on sequences to anon, authenticated, service_role;

-- ── updated_at (solo en habitadas, no toca public) ─────────
create or replace function habitadas.set_updated_at()
returns trigger
language plpgsql
set search_path = habitadas
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists professionals_updated_at on habitadas.professionals;
create trigger professionals_updated_at
  before update on habitadas.professionals
  for each row execute function habitadas.set_updated_at();

drop trigger if exists site_content_updated_at on habitadas.site_content;
create trigger site_content_updated_at
  before update on habitadas.site_content
  for each row execute function habitadas.set_updated_at();

-- ── Helpers / RPCs ─────────────────────────────────────────
create or replace function habitadas.current_professional_id()
returns uuid
language sql
stable
security definer
set search_path = habitadas
as $$
  select id from habitadas.professionals where auth_user_id = auth.uid() limit 1;
$$;

create or replace function habitadas.get_booked_slots(p_professional_id uuid)
returns table (slot_date date, slot_time text)
language sql
stable
security definer
set search_path = habitadas
as $$
  select a.date as slot_date, a.time as slot_time
  from habitadas.appointments a
  where a.professional_id = p_professional_id
    and a.status <> 'cancelada';
$$;

create or replace function habitadas.create_appointment(
  p_professional_id uuid,
  p_date date,
  p_time text,
  p_reason text,
  p_client_name text,
  p_client_email text,
  p_client_phone text,
  p_client_id text,
  p_payment_method text,
  p_payment_reference text,
  p_intake jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = habitadas
as $$
declare
  new_id uuid;
  taken boolean;
begin
  select exists (
    select 1 from habitadas.appointments
    where professional_id = p_professional_id
      and date = p_date
      and time = p_time
      and status <> 'cancelada'
  ) into taken;

  if taken then
    raise exception 'SLOT_TAKEN';
  end if;

  insert into habitadas.appointments (
    professional_id, date, time, reason,
    client_name, client_email, client_phone, client_id,
    payment_method, payment_reference, intake, status
  ) values (
    p_professional_id, p_date, p_time, coalesce(p_reason, ''),
    p_client_name, coalesce(p_client_email, ''), coalesce(p_client_phone, ''),
    coalesce(p_client_id, ''), coalesce(p_payment_method, 'transferencia'),
    coalesce(p_payment_reference, ''), coalesce(p_intake, '{}'::jsonb), 'pendiente'
  )
  returning id into new_id;

  return new_id;
end;
$$;

grant execute on function habitadas.current_professional_id() to anon, authenticated, service_role;
grant execute on function habitadas.get_booked_slots(uuid) to anon, authenticated, service_role;
grant execute on function habitadas.create_appointment(
  uuid, date, text, text, text, text, text, text, text, text, jsonb
) to anon, authenticated, service_role;

-- ── RLS ────────────────────────────────────────────────────
alter table habitadas.professionals enable row level security;
alter table habitadas.availability_days enable row level security;
alter table habitadas.appointments enable row level security;
alter table habitadas.site_content enable row level security;

drop policy if exists "professionals_public_read" on habitadas.professionals;
create policy "professionals_public_read"
  on habitadas.professionals for select
  using (active = true);

drop policy if exists "professionals_self_update" on habitadas.professionals;
create policy "professionals_self_update"
  on habitadas.professionals for update
  using (auth_user_id = auth.uid())
  with check (auth_user_id = auth.uid());

drop policy if exists "availability_public_read" on habitadas.availability_days;
create policy "availability_public_read"
  on habitadas.availability_days for select
  using (true);

drop policy if exists "availability_owner_write" on habitadas.availability_days;
create policy "availability_owner_write"
  on habitadas.availability_days for all
  using (professional_id = habitadas.current_professional_id())
  with check (professional_id = habitadas.current_professional_id());

drop policy if exists "appointments_public_insert" on habitadas.appointments;
create policy "appointments_public_insert"
  on habitadas.appointments for insert
  with check (true);

drop policy if exists "appointments_owner_read" on habitadas.appointments;
create policy "appointments_owner_read"
  on habitadas.appointments for select
  using (professional_id = habitadas.current_professional_id());

drop policy if exists "appointments_owner_update" on habitadas.appointments;
create policy "appointments_owner_update"
  on habitadas.appointments for update
  using (professional_id = habitadas.current_professional_id())
  with check (professional_id = habitadas.current_professional_id());

drop policy if exists "site_content_public_read" on habitadas.site_content;
create policy "site_content_public_read"
  on habitadas.site_content for select
  using (true);

drop policy if exists "site_content_auth_write" on habitadas.site_content;
create policy "site_content_auth_write"
  on habitadas.site_content for all
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ── Seed ───────────────────────────────────────────────────
insert into habitadas.professionals (
  id, slug, name, title, short_bio, bio, approach, image_url, gallery,
  areas, specializations, education, certifications, session_price, featured, email
) values
(
  '11111111-1111-1111-1111-111111111111',
  'stepfanie-villacis',
  'Stepfanie Villacís',
  'Psicóloga | Neuropsicología Clínica',
  'Psicóloga general en formación de Maestría en Neuropsicología Clínica.',
  'Psicóloga General con experiencia en intervención psicológica y bienestar organizacional; actualmente cursando Maestría en Neuropsicología Clínica. Apasionada por aplicar conocimientos neurocognitivos al apoyo de pacientes con daño neurológico y a la rehabilitación multidisciplinar.',
  'Acompañamiento humanizado con base en evidencia, empatía y observación clínica.',
  '/team/stepfanie-villacis.png',
  '["/team/stepfanie-villacis.png","/hero/consultorio.jpg"]'::jsonb,
  array['neuropsicologia','ansiedad-estres','bienestar-laboral'],
  array['Intervención psicológica','Bienestar organizacional','Neuropsicología clínica','Rehabilitación multidisciplinar'],
  '[{"degree":"Maestría en Neuropsicología Clínica (en curso)","institution":"VIU — Universidad Internacional de Valencia","year":"Actualidad"},{"degree":"Psicología","institution":"Universidad Politécnica Salesiana","year":"2020 – 2024"}]'::jsonb,
  '[{"name":"Práctica en Neuropsicología Clínica","issuer":"NeuroLogic International","year":"2026"},{"name":"Intervención psicológica en consultorio","issuer":"Megasalud Santa Ana","year":"2024 – actualidad"}]'::jsonb,
  7,
  true,
  'stepfanie@habitadas.site'
),
(
  '22222222-2222-2222-2222-222222222222',
  'valery-cevallos',
  'Lic. Valery Cevallos',
  'Mgtr. Psicología Clínica',
  'Magíster en Psicología Clínica. Acompañamiento terapéutico cercano y profesional.',
  'Licenciada y Magíster en Psicología Clínica. Brinda acompañamiento terapéutico individual y de vínculos con un enfoque basado en evidencia, cálido y orientado al bienestar emocional de cada persona.',
  'Psicología clínica basada en evidencia, con escucha activa y herramientas prácticas.',
  '/team/valery-cevallos.png',
  '["/team/valery-cevallos.png","/hero/taller.jpg"]'::jsonb,
  array['ansiedad-estres','pareja-familia','trauma-duelo'],
  array['Psicología clínica','Terapia individual','Acompañamiento emocional','Salud mental comunitaria'],
  '[{"degree":"Maestría en Psicología Clínica","institution":"Formación de posgrado","year":"—"},{"degree":"Licenciatura en Psicología","institution":"—","year":"—"}]'::jsonb,
  '[{"name":"Ejercicio profesional en psicología clínica","issuer":"HABITADAS","year":"Actualidad"}]'::jsonb,
  7,
  true,
  'valery@habitadas.site'
)
on conflict (id) do update set
  name = excluded.name,
  title = excluded.title,
  short_bio = excluded.short_bio,
  bio = excluded.bio,
  approach = excluded.approach,
  image_url = excluded.image_url,
  gallery = excluded.gallery,
  areas = excluded.areas,
  specializations = excluded.specializations,
  education = excluded.education,
  certifications = excluded.certifications,
  session_price = excluded.session_price,
  featured = excluded.featured,
  email = excluded.email,
  active = true;

insert into habitadas.availability_days (professional_id, date, slots)
select
  p.id,
  d::date,
  array['09:00','10:00','11:00','14:00','15:00','16:00','17:00']
from habitadas.professionals p
cross join generate_series(current_date + 1, current_date + 21, '1 day'::interval) as d
where extract(dow from d) between 1 and 5
on conflict (professional_id, date) do nothing;

insert into habitadas.site_content (key, value) values
(
  'hero',
  '{"subtitle":"Empresa psicosocial · Promoción y prevención en salud mental","title":"Un espacio habitado para tu bienestar emocional","description":"Acompañamiento psicológico con enfoques basados en evidencia: terapias conductuales contextuales y terapia cognitivo-conductual."}'::jsonb
),
(
  'contact',
  '{"phone":"+593 98 437 0041","whatsapp":"593984370041","email":"contacto@habitadas.site","address":"Quito, Pichincha, Ecuador","instagram":"https://www.instagram.com/habitadas.ec/","facebook":"https://www.facebook.com/habitadas.ec/"}'::jsonb
),
(
  'prices',
  '[{"title":"Terapia Individual","price":7,"currency":"USD","duration":"45 a 50 minutos"},{"title":"Terapia de Pareja","price":20,"currency":"USD","duration":"45 a 50 minutos"},{"title":"Terapia Familiar","price":25,"currency":"USD","duration":"45 a 50 minutos"}]'::jsonb
)
on conflict (key) do nothing;
