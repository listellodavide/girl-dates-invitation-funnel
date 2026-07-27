# Deployment

Next.js app served at **https://me.adiwave.group**, running on the Hetzner node
(`vera1` / `node1`, 88.99.149.31) in namespace `me-funnel`.

Pipeline, mirroring the adiwave/vera setup on the same cluster:

```
push to develop
      ↓
GitHub Actions: docker build → push registry.adiwave.com/me/invitation-funnel:develop-<sha7>
      ↓
same workflow commits the newTag pin into infra/k8s/kustomization.yaml [skip ci]
      ↓
ArgoCD (app "me-funnel") sees the commit and syncs the cluster
```

No SSH from CI, no kubeconfig on the runner — the kube-apiserver stays private.

## Layout

| Piece | Where |
|-------|-------|
| Namespace, Deployment, Service | `infra/k8s/app.yaml` |
| Gateway + HTTPRoute (`me.adiwave.group`) | `infra/k8s/gateway.yaml` |
| Image pin (rewritten by CI) | `infra/k8s/kustomization.yaml` |
| ArgoCD Application (hand-applied once) | `infra/argocd/application.yaml` |
| Build/push/pin workflow | `.github/workflows/docker-build-push.yml` |

## One-time bootstrap

1. **DNS** — in Cloudflare, A record `me.adiwave.group` → `88.99.149.31`,
   **DNS-only (grey cloud)**. Proxying breaks the ACME HTTP-01 challenge, so the
   certificate would never issue.

2. **GitHub repository secrets** (Settings → Secrets and variables → Actions):
   - `REGISTRY_HOST` = `registry.adiwave.com`
   - `REGISTRY_USERNAME` / `REGISTRY_PASSWORD` = the `github-ci` registry
     credential already used by the adiwave pipeline.

3. **Registry pull secret on the node** (the registry is private, so the
   kubelet needs credentials; this is deliberately not in git):

   ```sh
   kubectl create namespace me-funnel --dry-run=client -o yaml | kubectl apply -f -
   kubectl -n me-funnel create secret docker-registry registry-credentials \
     --docker-server=registry.adiwave.com \
     --docker-username=<github-ci user> \
     --docker-password=<password> \
     --dry-run=client -o yaml | kubectl apply -f -
   ```

4. **ArgoCD application** (the repo is public, so no deploy key is needed):

   ```sh
   kubectl apply -f infra/argocd/application.yaml
   ```

5. cert-manager issues `me-adiwave-group-tls` automatically once the Gateway
   syncs and DNS resolves.

## Notes

- The image runs as UID 10001, non-root, read-only-ish (no writable app dirs
  needed by the standalone server).
- **Two lockfiles are committed and they disagree.** The build uses
  `package-lock.json` (npm) — the current one. `pnpm-lock.yaml` is stale: it
  pins `next 16.2.6` while `package.json` asks for `^16.2.12`, so
  `pnpm install --frozen-lockfile` fails outright (this was hit and confirmed
  while setting the pipeline up). The `pnpm.overrides` block in `package.json`
  is vestigial too — it overrides `hono`, which is not a dependency of this
  project. Worth deleting `pnpm-lock.yaml` and that block so nobody trips over
  it again.
- ArgoCD sync is automated with prune and selfHeal; a manual `kubectl edit` in
  this namespace will be reverted.
