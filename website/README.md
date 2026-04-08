This is the EduCore website app, built with Next.js, TypeScript, Tailwind, Prisma, and PostgreSQL.

## Local quick start

1. Copy `.env.example` to `.env`.
2. Make sure your local PostgreSQL database is running.
3. Apply migrations and generate the Prisma client.
4. Bootstrap a safe fake parent account, child account, reward, and starter weekly plan.
5. Start the development server.

```bash
cp .env.example .env
npm install
npm run db:setup
npm run db:bootstrap
npm run dev
```

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

This wraps the normal local Prisma flow:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name local_setup
```

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
- Creating or resetting a parent with `npm run parent:create` or `npm run db:bootstrap` bumps `sessionVersion`, which cleanly invalidates older parent sessions.

## Development server

Run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
