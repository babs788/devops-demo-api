# DevOps demo API — CI/CD pipeline showcase

A small Express API used to demonstrate a full production-style CI/CD
pipeline: automated testing, Docker image build, and deployment to a
remote server via GitHub Actions.

This mirrors the deployment pattern I use in production environments —
Dockerized services behind a Caddy reverse proxy, deployed via GitHub
Actions on every push to `main`.

## Pipeline stages

1. **Test** — installs dependencies and runs the Jest test suite
2. **Build and push** — builds a Docker image and pushes it to a
   container registry, tagged with both `latest` and the commit SHA
3. **Deploy** — connects to the target server over SSH and redeploys
   the updated container with `docker compose`

See [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) for
the full pipeline definition.

## Stack

- Node.js / Express
- Jest + Supertest for testing
- Docker + Docker Compose
- Caddy as reverse proxy (automatic HTTPS)
- GitHub Actions for CI/CD

## Running locally

```bash
npm install
npm test
npm start
```

## Running with Docker

```bash
docker compose up --build
```

## Notes

Deployment target details (host, SSH key, registry credentials) are
supplied via GitHub Actions secrets and are not present in this
repository. The `Caddyfile` domain is a placeholder — replace with
your own domain before deploying.
