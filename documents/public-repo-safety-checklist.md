# EduCore Public Repo Safety Checklist

Use this checklist before pushing to the public EduCore repository.

## Never commit these

- `.env` files
- API keys
- access tokens
- passwords
- PINs used by real people
- private certificates or keys
- local IP addresses tied to home infrastructure
- internal domains or hostnames
- homelab-specific sensitive configuration
- real child data
- real usernames tied to actual child accounts
- private family details not meant for public view
- agent-internal operating notes

## Safe defaults

- use mock/sample children only
- use fake usernames only
- use fake PIN/status examples only
- keep all planning data fictionalized
- keep infrastructure examples generic
- treat all child-facing data as public-demo-safe unless proven otherwise

## Pre-push review steps

### 1. Review changed files
Check what changed before pushing.

Suggested commands:
```bash
git status
git diff --staged
git diff
```

### 2. Review for secrets and infra leakage
Look for:
- tokens
- `.env` references
- URLs to private hosts
- IPs
- machine names
- internal reverse proxy or local model endpoints

### 3. Review docs for private details
Make sure docs do not expose:
- home network details
- deployment secrets
- family-sensitive notes
- internal-only planning that should remain private

### 4. Review mock data
Confirm that:
- child names are safe mock or nickname-style examples
- usernames are fake
- PIN info is generic status text, not real credentials
- no real-life schedule or sensitive family routine is exposed accidentally

### 5. Review new config files carefully
Pay special attention to:
- `.env*`
- Docker or compose files
- deployment files
- CI config
- nginx / proxy configs
- AI model config
- local path references

## Recommended public-safe patterns

### Good
- `example.com`
- `localhost`
- fake usernames like `junie-sky`
- mock values and placeholders
- sanitized architecture notes

### Avoid
- real WAN/IP endpoints
- real internal DNS names
- actual cloud credentials
- local machine identifiers
- family-specific secrets or routines that should stay private

## Final decision gate

Before pushing, ask:

- Is this safe if anyone on the internet reads it?
- Does this expose secrets, private infrastructure, or real child data?
- Is this product-facing and public-safe, or should it live somewhere private instead?

If unsure, do not push until reviewed.

## Working rule

When in doubt:
- sanitize
- move private material out of the public repo
- replace real values with mock values
- review again before push
