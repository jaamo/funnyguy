# funnyguy

A reusable React component (`src/FunnyGuy.tsx`) that renders an animated blue SVG
character with parametrized poses. `index.html` is the original single-file mockup
that the component was distilled from.

## Structure

- `src/FunnyGuy.tsx` — the React component. Inlines the SVG **and** all animation
  CSS (in the `STYLES` string) so it is self-contained: no stylesheet import, no
  runtime deps. Props: `pose | color | size | animated | title`.
- `src/index.ts` — package entry (uses explicit `.js` specifiers so the ESM build
  runs under Node too).
- `package.json` / `tsconfig.json` — build to `dist/` via `tsc`; `react` is a peer dep.
- `scripts/ssr-preview.mjs` — renders the compiled component for all poses to one
  HTML page (used for screenshot validation, see Testing).
- `index.html` — the original vanilla mockup (kept as a demo).
- `funnyguy.svg` — the original source artwork exported from Inkscape.

### Component design notes
- Poses are driven by a `data-pose` attribute on the root `<svg>`; global CSS rules
  (`.fg-root[data-pose="wave"] .fg-arm-left { … }`) select which parts animate, so
  many instances share one set of keyframes. `animated={false}` sets `data-anim="false"`,
  which pauses every animation at a representative mid-cycle frame.
- `color` sets the `--fg-body` CSS var; the leg shadow is derived with `color-mix`,
  so recoloring stays coherent.
- **think** uses a "…" thought bubble (not a hand-to-chin) on purpose: the arms are
  the same fill as the body, so any arm posed *over* the body silhouette (like reaching
  the face) is invisible. Poses only read when the limb sits *outside* the silhouette
  (wave/cheer go up and away). Keep that constraint in mind when adding poses.

### Key animation details
- Whole character (`.fg-guy` / `#guy`) — bob/sway/hop, pivots at the feet
  (`transform-origin: 430px 1120px` in viewBox units).
- Waving arm (`.fg-arm-left`) — a `<g>` wrapping the arm rect so the rect keeps its own
  `rotate(-12)` while the group rotates for the wave. Pivots at the **shoulder** in
  viewBox units (`transform-box: view-box; transform-origin: 553px 435px`). The shoulder
  is NOT the rect's `x/y` — the rect's own `rotate(-12)` about `(0,0)` relocates it, so
  the pivot was found empirically. The other arm pivots at `300px 470px`. If you move an
  arm, re-verify the pivot with a screenshot.
- Mouth is two shapes cross-faded: `.fg-mouth` (neutral oval) fades out as `.fg-grin`
  (smile curve) fades in, kept in sync with the bob.
- Respects `prefers-reduced-motion: reduce` (disables all animations).

## Testing — ALWAYS validate visually with a headless browser

CSS animation changes cannot be trusted from reading the code. After any change to a
pose, render it with headless Chrome and read the screenshots back.

Chrome is available at `google-chrome` (also `chromium-browser`). There is no puppeteer.

**For the React component**, render the *compiled* output (build first) so you test what
ships, not a hand-written copy:

```bash
npm run build
node scripts/ssr-preview.mjs > /tmp/fg.html
# then freeze + screenshot as below
```

**Capture multiple frames across the animation cycle** — a single screenshot only
catches one moment and will miss timing/pose bugs. Freeze each frame by injecting a
negative `animation-delay` and pausing, then screenshot:

```bash
SP=/tmp/funnyguy-shots; mkdir -p "$SP"
for t in 0.0 0.35 0.65 1.4 1.9; do
  sed "s#</style>#*{animation-delay:-${t}s!important;animation-play-state:paused!important;}</style>#" \
    index.html > "$SP/f_$t.html"
  google-chrome --headless --disable-gpu --no-sandbox --hide-scrollbars \
    --window-size=700,900 --screenshot="$SP/s_$t.png" "$SP/f_$t.html" 2>/dev/null
done
```

Then open the `s_*.png` files (Read tool) and check across frames:
- the wave arm is raised beside the head and rocks between two angles,
- the mouth transitions neutral → grin → neutral (grin shows ~1.3–2.4s in),
- the body/eyes move (bob + squint),
- nothing clips off-canvas or overlaps the heading.

Pick delay values spanning the longest loop (the bob/smile cycle is 3.2s; the wave is
1.3s) so you sample distinct poses of every animation.
