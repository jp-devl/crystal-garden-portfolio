<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Fit the portfolio camera to panel extents and the available canvas aspect ratio, and derive orbit limits from that distance so controls cannot undo the fit on narrow screens.
- CursorCamera owns native capture-phase wheel handling and interpolates raycast-anchored camera/target goals; keep OrbitControls for drag and touch so wheel zoom is never applied twice.
- Use the dev-only window.__portfolioCamera.read() hook to verify live camera position, orbit target, distance and interpolation without accessing duplicate module state.
- `/` is the editorial portfolio (content in src/data/profile.ts, JP emblem lazy-loaded behind ClientOnly); the GitHub repo panel scene lives at `/universo` so the home page stays SSR-friendly and fast.
- Scroll reveals use the Reveal component (IntersectionObserver toggling data-shown both ways) plus CSS; no animation library, and prefers-reduced-motion disables them in styles.css.
