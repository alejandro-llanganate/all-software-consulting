# Supabase HABITADAS (sin .env · schema aislado)

Credenciales en `src/lib/supabase/config.ts`.

Todo el SQL vive en el schema **`habitadas`**, no en `public`, así no pisa tablas de otras apps en la misma base.

## Setup

1. Pega **Project URL** y **anon key** en `config.ts`.
2. SQL Editor → `migrations/001_habitadas_schema.sql`.
3. **Settings → API → Exposed schemas** → agrega `habitadas` (deja `public`).
4. Crea usuarios Auth o `npm run supabase:seed-auth`.
5. `migrations/002_link_auth_users.sql` si no usaste el seed.

## Logins `/admin`

| Email | Contraseña |
|---|---|
| `stepfanie@habitadas.ec` | `Habitadas2026!` |
| `valery@habitadas.ec` | `Habitadas2026!` |

Auth es compartido en el proyecto: usa emails distintos a los de otras apps.
