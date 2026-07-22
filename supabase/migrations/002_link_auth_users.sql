-- Vincular usuarios Auth ya creados con profesionales (schema habitadas)
-- 1) Authentication → Users:
--    stepfanie@habitadas.site  /  Habitadas2026!
--    valery@habitadas.site     /  Habitadas2026!
-- 2) Ejecuta este SQL

update habitadas.professionals p
set auth_user_id = u.id
from auth.users u
where lower(u.email) = lower(p.email)
  and p.email in ('stepfanie@habitadas.site', 'valery@habitadas.site');
