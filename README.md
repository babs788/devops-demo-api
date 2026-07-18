# DevOps demo API — CI/CD pipeline showcase

A small Express API used to demonstrate a production-style CI/CD setup:
automated testing and Docker image builds via GitHub Actions, with
continuous deployment to a live environment on every push to `main`.

**Live demo:** https://devops-api-xhkk.onrender.com/health

## Architecture

This project uses two independent, complementary systems — a common
real-world pattern:

1. **Continuous Integration — GitHub Actions**
   Runs automatically on every push and pull request against `main`:
   - Installs dependencies and runs the Jest test suite
   - Builds a Docker image and pushes it to Docker Hub, tagged with
     both `latest` and the commit SHA

2. **Continuous Deployment — Render**
   Connected directly to this repository via a GitHub webhook. Every
   push to `main` triggers Render to pull the latest code, build the
   Docker image from the same `Dockerfile`, and deploy it live.

See [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) for
the full CI pipeline definition — both jobs run green on every push.

## Stack

- Node.js / Express
- Jest + Supertest for testing
- Docker for containerization
- GitHub Actions for CI (test, build, push to Docker Hub)
- Render for CD (auto-deploy on push)
- Caddy config included for self-hosted reverse-proxy deployments
  (e.g. a VPS), as an alternative to Render

## Running locally

\`\`\`bash
npm install
npm test
npm start
\`\`\`

## Running with Docker

\`\`\`bash
docker compose up --build
\`\`\`

This uses `docker-compose.yml` with a Caddy reverse proxy — useful if
deploying to your own server (EC2, Oracle Cloud, a VPS, etc.) instead
of a platform like Render.

## Notes

- The live Render deployment redeploys automatically on every push to
  `main` — no manual steps required.
- Docker Hub credentials are supplied via GitHub Actions secrets and
  are not present in this repository.
- The `Caddyfile` domain is a placeholder for self-hosted deployments —
  replace with your own domain if using that path instead of Render.
