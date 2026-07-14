# todo.md — things that need Craig, not the agent

This file mirrors the **Visionary**-labelled issues in Linear (project
"Portfolio — Craig du Toit", team Astravale). Anything here is blocked on a
human decision or an account/asset only Craig has — check it off in Linear
too when done.

## Open

- [ ] **Real project/case-study assets** ([AST-115](https://linear.app/astravale/issue/AST-115))
      The "Selected Work" section ships with three honest placeholder cards
      (Betway Promotions motion system, 3D product visualizations, and "This
      Site" itself). The first two need real screenshots/clips/links before
      they stop reading as placeholders. Send screenshots, a Loom, or a
      deployed URL for each and I'll wire them in.
- [ ] **Domain + Vercel deploy** ([AST-116](https://linear.app/astravale/issue/AST-116))
      Pick/buy a domain (e.g. craigdutoit.com) and connect this repo to a
      Vercel project. `src/app/layout.tsx` has `siteUrl` hardcoded to
      `https://craigdutoit.com` for metadata/OG tags — update that constant
      once the real domain is picked.
- [ ] **Approve copy + contact info** ([AST-117](https://linear.app/astravale/issue/AST-117))
      All bio/experience copy was pulled from your live cvitae CV
      (craig-du-toit-fcpm). Confirm you're happy publishing
      craigtoit@gmail.com and the LinkedIn handle as-is on a public page.

## Nice-to-haves (not blocking, no rush)

- Custom OG image font: `opengraph-image.tsx` currently renders with the
  system default sans font (satori doesn't pick up next/font automatically).
  Looks fine, but could be upgraded to Bricolage Grotesque by fetching the
  font file and passing it to `ImageResponse`'s `fonts` option.
- Playing with animating the logo mark further (you mentioned wanting to
  explore this) — right now it's a mask-based shimmer sweep + entrance
  scale-in. Happy to try a morph/draw-on version off the `cdt.ai` source if
  you want to push it further.
