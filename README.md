# funnyguy

A cheerful blue SVG character as a reusable **React component** with parametrized,
animated poses.

![poses: idle, wave, cheer, think](https://img.shields.io/badge/poses-idle%20%7C%20wave%20%7C%20cheer%20%7C%20think-35b5f8)

## Install

```bash
npm install funnyguy
# react >= 17 is a peer dependency
```

## Usage

```tsx
import { FunnyGuy } from "funnyguy";

export function App() {
  return <FunnyGuy pose="wave" size={240} />;
}
```

The component is fully self-contained — the SVG and all animation CSS are inlined,
so there is **no stylesheet to import** and no runtime dependencies.

## Props

| Prop       | Type                                      | Default     | Description                                             |
| ---------- | ----------------------------------------- | ----------- | ------------------------------------------------------ |
| `pose`     | `"idle" \| "wave" \| "cheer" \| "think"` | `"wave"`    | Which animation to play.                               |
| `color`    | `string`                                  | `"#35b5f8"` | Body color (any CSS color); the shadow is derived.     |
| `size`     | `number \| string`                        | `240`       | Rendered width; height scales to keep aspect ratio.    |
| `animated` | `boolean`                                 | `true`      | When `false`, the pose is frozen (no motion).          |
| `title`    | `string`                                  | auto        | Accessible label (`role="img"` / `<title>`).           |

Any other `svg` props (`className`, `style`, `onClick`, …) are forwarded to the root
`<svg>`.

### Poses

- **idle** — gentle breathing bob, neutral face.
- **wave** — one hand raised beside the head, waving; smiles and bobs.
- **cheer** — both arms up, big grin, a little hop.
- **think** — head tilt, upward glance, rising "…" thought bubble.

### Examples

```tsx
<FunnyGuy pose="cheer" color="#f59e0b" size={180} />
<FunnyGuy pose="think" />
<FunnyGuy pose="idle" animated={false} />   {/* frozen */}
```

Motion is automatically disabled for users with `prefers-reduced-motion: reduce`.

## Development

```bash
npm install
npm run typecheck   # tsc --noEmit
npm run build       # emit dist/ (js + d.ts)
```

See [`CLAUDE.md`](./CLAUDE.md) for how poses are built and the headless-browser
screenshot workflow used to validate every animation change.

The original single-file demo lives in [`index.html`](./index.html); the source
artwork is [`funnyguy.svg`](./funnyguy.svg).
