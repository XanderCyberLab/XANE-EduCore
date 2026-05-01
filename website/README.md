This is the EduCore website app, built with Next.js, TypeScript, Tailwind, Prisma, and PostgreSQL.

## Local quick start

1. Copy `.env.example` to `.env`.
2. Make sure your local PostgreSQL database is running.
3. Apply migrations and generate the Prisma client.
4. Bootstrap a safe fake parent account, child account, reward, and starter weekly plan, or create a parent account inside the app after startup.
5. Start the development server.

Note:
- `db:setup` and `db:bootstrap` now normalize the database host automatically for common local vs Docker dev cases. If your `.env` uses `db`, host-run scripts will fall back to `localhost`. If your `.env` uses `localhost`, Docker-run scripts will use `db`.

```bash
cp .env.example .env
npm install
npm run db:setup
npm run db:bootstrap
npm run dev
```

## Docker compose, development only

This repository now includes a dev-only Docker setup for the website and PostgreSQL.

1. Copy `.env.example` to `.env`.
2. Start the containers.
3. Run Prisma setup manually inside the web container.
4. Bootstrap local sample data manually inside the web container.

You can keep either of these `.env` database values and the scripts will normalize the host automatically:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/educore?schema=public"
```

or

```bash
DATABASE_URL="postgresql://postgres:postgres@db:5432/educore?schema=public"
```

Start the app and database:

```bash
docker compose up --build
```

In a second terminal, apply migrations and generate Prisma client:

```bash
docker compose exec web npm run db:setup
```

Bootstrap the local test data:

```bash
docker compose exec web npm run db:bootstrap
```

Then open:

```text
http://localhost:3000
```

Notes:

- This is for local development only.
- Prisma setup and bootstrap are intentionally manual, not automatic at container start.
- The Docker image now installs OpenSSL so Prisma environment detection stays quieter during normal setup.
- The app source is mounted into the container so local code changes are reflected while developing.
- The web service runs as your host UID/GID by default so generated Prisma files are less likely to become root-owned on Linux bind mounts.
- If you already have root-owned files under `src/generated/prisma` from an older container run, fix them once on the host with `sudo chown -R "$(id -u)":"$(id -g)" src/generated/prisma`.

After bootstrap, use these default local-only credentials unless you override them with flags:

- Parent email: `parent@example.com`
- Parent password: `change-me-now`
- Child username: `sunny-star`
- Child PIN: `1234`

Recommended first checks:

- Parent login: `http://localhost:3000/parent/login`
- Child login: `http://localhost:3000/child/login`
- Parent planner: `http://localhost:3000/parent/planner`
- Child daily flow: `http://localhost:3000/child/home` and `http://localhost:3000/child/today`

## Local database workflow

### Apply migrations and generate Prisma client

```bash
npm run db:setup
```

Optional flag:
- `--skip-generate` skips the explicit Prisma client generation step and only applies migrations.

This wraps the normal local Prisma flow:

```bash
npm run prisma:generate
npx prisma migrate deploy
```

`db:setup` now passes a normalized `DATABASE_URL` into Prisma commands and applies checked-in migrations with `prisma migrate deploy`, which is more reliable for local reruns and Docker setup.

You can still use raw Prisma commands directly when needed.

### Bootstrap a usable local test state

```bash
npm run db:bootstrap
```

What it creates or updates:

- one parent account
- one child account
- one active reward plan
- one starter active weekly plan for the current week
- three tasks for today, plus additional tasks across the week

Useful flags:

```bash
npm run db:bootstrap -- \
  --parent-email demo.parent@example.com \
  --parent-password 'strong-local-password' \
  --child-nickname Sunny \
  --child-username sunny-star \
  --child-pin 2468 \
  --reward-title 'Story basket picnic' \
  --token-goal 12 \
  --reset-plan \
  --mark-first-task-complete
```

Notes:

- `--reset-plan` clears and recreates the current week's starter plan for that child.
- Without `--reset-plan`, an existing plan is reused so local progress is not wiped by accident.
- `--mark-first-task-complete` is handy if you want immediate reward/progress state to review.

## Focused account helpers

If you only want to create or update one piece at a time:

### Create or reset a parent account

```bash
npm run parent:create -- --email parent@example.com --password 'change-me-now'
```

Optional flag:

- `--timezone America/Chicago`

### Create or reset a child account and reward plan

```bash
npm run child:create -- \
  --parent-email parent@example.com \
  --nickname Sunny \
  --username sunny-star \
  --pin 1234 \
  --reward-title 'Story basket picnic' \
  --token-goal 12
```

## Parent auth notes

- Parent auth uses an HTTP-only signed session cookie.
- Protected `/parent/*` routes redirect to `/parent/login` when no valid parent session is present.
- `/parent/login` now supports both sign-in and a minimal in-product parent account creation flow, including a visibly distinct create-account mode for adding additional parent accounts later.
- After first-child setup, the parent dashboard, onboarding return state, and children space now point more clearly toward the next practical steps: planning the first week, checking rewards, and reviewing child basics.
- Child profiles now support a short parent-authored planning note so pacing, supports, interests, or sensitivities can stay attached to the child without turning setup into a heavy settings system.
- Planner starter draft generation now flows through a dedicated provider boundary in `src/lib/planner-generation.ts`, so future local or hosted AI adapters can plug in without coupling planner save/apply logic to one runtime.
- Creating or resetting a parent with `npm run parent:create` or `npm run db:bootstrap` bumps `sessionVersion`, which cleanly invalidates older parent sessions.

## Development server

Run:

```bash
npm run dev
```

Or with Docker compose:

```bash
docker compose up --build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker dev note

For Docker Compose runs, the app expects runtime values from `.env`.

Minimum working Docker dev values:

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/educore?schema=public"
AUTH_SECRET="dev-secret-change-me"
```

Notes:
- `.env.example` is a template only.
- `.env` is the file actually loaded by the running app.
- When running in Docker Compose, use `db` as the PostgreSQL host, not `localhost`.
