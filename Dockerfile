# ── Stage 1: Build (Next.js standalone) ───────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /build

# Two lockfiles are committed. package-lock.json is the authoritative one: the
# pnpm lockfile is stale (pins next 16.2.6 while package.json asks for ^16.2.12)
# and package.json's `pnpm.overrides` block is vestigial — it overrides `hono`,
# which is not a dependency of this project. See infra/README.md.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: Runtime ──────────────────────────────────────────────────────────
FROM node:22-alpine AS runtime
WORKDIR /app

RUN addgroup -S -g 10001 nextjs && adduser -S -u 10001 -G nextjs nextjs

COPY --from=builder --chown=10001:10001 /build/.next/standalone ./
COPY --from=builder --chown=10001:10001 /build/.next/static ./.next/static
COPY --from=builder --chown=10001:10001 /build/public ./public

USER 10001:10001
ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]
