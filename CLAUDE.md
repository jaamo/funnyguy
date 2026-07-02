# funnyguy

A single-file animated mockup: `index.html` inlines the character SVG and drives it
with CSS animations (waving arm, smiling mouth, bobbing body).

## Structure

- `index.html` — the mockup. The SVG is inlined (not `<img>`) so individual parts
  (`#wave-arm`, `#mouth`, `#grin`, eyes, `#guy`) can be animated with CSS.
- `funnyguy.svg` — the original source artwork exported from Inkscape.

### Key animation details
- `#guy` — whole-character bob/sway, pivots at the feet (`transform-origin: 50% 100%`).
- `#wave-arm` — a `<g>` wrapping the arm rect so the rect keeps its own `rotate(-12)`
  while the group rotates for the wave. Pivots at the **shoulder** in viewBox units
  (`transform-box: view-box; transform-origin: 553px 435px`). The shoulder is NOT the
  rect's `x/y` — the rect's own `rotate(-12)` about `(0,0)` relocates it, so the pivot
  was found empirically. If you move the arm, re-verify the pivot with a screenshot.
- Mouth is two shapes cross-faded: `#mouth` (neutral oval) fades out as `#grin`
  (smile curve) fades in, kept in sync with the bob.
- Respects `prefers-reduced-motion: reduce` (disables all animations).

## Testing — ALWAYS validate visually with a headless browser

CSS animation changes cannot be trusted from reading the code. After any change to
`index.html`, render it with headless Chrome and read the screenshots back.

Chrome is available at `google-chrome` (also `chromium-browser`). There is no puppeteer.

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
