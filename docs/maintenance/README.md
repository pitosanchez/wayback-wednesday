# Maintenance/Preview Gate – How to unlock

This site uses a production-only gate so the public sees an Under Construction page, while the team can preview the real app.

## Unlock (team preview)

1) Set an environment variable in production:
   - VITE_PREVIEW_TOKEN=your-strong-preview-token
2) Visit your site once with the token:
   - https://your-domain.com/?preview=your-strong-preview-token
3) After first visit, access is remembered in localStorage under key:
   - preview_access

To relock this device, clear localStorage for preview_access.

## Rotate/Expire access

- Change VITE_PREVIEW_TOKEN to a new value and redeploy. All previous preview sessions will lose access (unless they re-unlock with the new token).

## Scope

- The gate wraps the entire app in production.
- In development (vite dev), there is no gate.

## Badge

- When unlocked, a small “Team Preview” badge appears at the bottom-left.

## Disable the gate (temporary)

- In src/App.tsx, the gate is enabled via enabled={import.meta.env.PROD}. Toggle to false to disable during a specific build.

## Troubleshooting

- Ensure the env var is defined in your hosting provider’s production environment, then redeploy the app so Vite can inline it.
- If preview doesn’t unlock, confirm your URL uses the exact token and that ad/script blockers aren’t preventing localStorage writes.

## Security tips

- Use a long, random token. Rotate it periodically.
- Treat the token like a shared password; distribute securely.
