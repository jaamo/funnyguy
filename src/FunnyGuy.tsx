import React from "react";

export type FunnyGuyPose = "idle" | "wave" | "cheer" | "think";

export interface FunnyGuyProps
  extends Omit<React.SVGProps<SVGSVGElement>, "color"> {
  /** Which animated pose to play. @default "wave" */
  pose?: FunnyGuyPose;
  /** Body color (any CSS color). The shadow is derived from it. @default "#35b5f8" */
  color?: string;
  /** Rendered width; height scales to keep aspect ratio. @default 240 */
  size?: number | string;
  /** When false, the pose is frozen (no motion). @default true */
  animated?: boolean;
  /** Accessible label. @default "Funny guy, <pose>" */
  title?: string;
}

/**
 * Self-contained styles. Keyframes + rules are global (keyed off `data-pose`),
 * so many <FunnyGuy>s share one animation definition. Emitting the <style> more
 * than once (multiple instances) is harmless — the rules are identical.
 */
const STYLES = `
.fg-root{overflow:visible;--fg-shadow:color-mix(in srgb, var(--fg-body,#35b5f8), #000 26%)}
.fg-guy{transform-box:view-box;transform-origin:430px 1120px}
.fg-body,.fg-leg,.fg-arm-rect{fill:var(--fg-body,#35b5f8)}
.fg-shadow{fill:var(--fg-shadow)}
.fg-white{fill:#fff}.fg-ink{fill:#1a1a1a}
.fg-brow{fill:none;stroke:#1a1a1a;stroke-width:8}
.fg-mouth{fill:none;stroke:#1a1a1a;stroke-width:12;stroke-linecap:round;transform-box:view-box;transform-origin:397px 415px}
.fg-grin{fill:none;stroke:#1a1a1a;stroke-width:12;stroke-linecap:round;opacity:0}
.fg-arm-left{transform-box:view-box;transform-origin:553px 435px}
.fg-arm-right{transform-box:view-box;transform-origin:300px 470px}
.fg-eye-r{transform-box:view-box;transform-origin:338px 325px}
.fg-eye-l{transform-box:view-box;transform-origin:442px 329px}
.fg-dot{opacity:0;fill:#1a1a1a}

@keyframes fg-bob{0%,100%{transform:translateY(0) rotate(0)}25%{transform:translateY(-10px) rotate(-1.2deg)}50%{transform:translateY(-4px)}75%{transform:translateY(-12px) rotate(1.2deg)}}
@keyframes fg-breathe{0%,100%{transform:translateY(0) scaleY(1)}50%{transform:translateY(-5px) scaleY(1.015)}}
@keyframes fg-wave{0%{transform:rotate(-125deg)}20%{transform:rotate(-140deg)}40%{transform:rotate(-125deg)}60%{transform:rotate(-140deg)}80%{transform:rotate(-127deg)}100%{transform:rotate(-125deg)}}
@keyframes fg-squint{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.8) translateY(-2px)}}
@keyframes fg-hop{0%,100%{transform:translateY(0) scaleY(1)}15%{transform:translateY(2px) scaleY(.94)}45%{transform:translateY(-34px) scaleY(1.04)}70%{transform:translateY(0) scaleY(1)}}
@keyframes fg-cheerL{0%,100%{transform:rotate(-150deg)}50%{transform:rotate(-158deg)}}
@keyframes fg-cheerR{0%,100%{transform:rotate(150deg)}50%{transform:rotate(158deg)}}
@keyframes fg-thinktilt{0%,100%{transform:rotate(-3.5deg)}50%{transform:rotate(-1.5deg)}}
@keyframes fg-lookup{0%,100%{transform:translateY(-4px)}50%{transform:translateY(-6px)}}
@keyframes fg-dot{0%,100%{opacity:0}35%,75%{opacity:1}}

.fg-root[data-pose="idle"] .fg-guy{animation:fg-breathe 3.6s ease-in-out infinite}

.fg-root[data-pose="wave"] .fg-guy{animation:fg-bob 3.2s ease-in-out infinite}
.fg-root[data-pose="wave"] .fg-arm-left{animation:fg-wave 1.3s ease-in-out infinite}
.fg-root[data-pose="wave"] .fg-eye-r,.fg-root[data-pose="wave"] .fg-eye-l{animation:fg-squint 3.2s ease-in-out infinite}

.fg-root[data-pose="cheer"] .fg-guy{animation:fg-hop .9s ease-in-out infinite}
.fg-root[data-pose="cheer"] .fg-arm-left{animation:fg-cheerL .9s ease-in-out infinite}
.fg-root[data-pose="cheer"] .fg-arm-right{animation:fg-cheerR .9s ease-in-out infinite}
.fg-root[data-pose="cheer"] .fg-mouth{opacity:0}
.fg-root[data-pose="cheer"] .fg-grin{opacity:1}

.fg-root[data-pose="think"] .fg-guy{animation:fg-thinktilt 4s ease-in-out infinite}
.fg-root[data-pose="think"] .fg-eye-r,.fg-root[data-pose="think"] .fg-eye-l{animation:fg-lookup 4s ease-in-out infinite}
.fg-root[data-pose="think"] .fg-dot1{animation:fg-dot 1.8s ease-in-out infinite}
.fg-root[data-pose="think"] .fg-dot2{animation:fg-dot 1.8s ease-in-out .3s infinite}
.fg-root[data-pose="think"] .fg-dot3{animation:fg-dot 1.8s ease-in-out .6s infinite}

@media (prefers-reduced-motion: reduce){.fg-root *{animation:none!important}}
/* Frozen pose: pause mid-cycle so the shape reads as the pose, not the start frame. */
.fg-root[data-anim="false"] *{animation-play-state:paused!important;animation-delay:-.6s!important}
`;

/**
 * A cheerful blue character with parametrized, animated poses.
 *
 * @example
 * <FunnyGuy pose="cheer" color="#f59e0b" size={180} />
 */
export function FunnyGuy({
  pose = "wave",
  color,
  size = 240,
  animated = true,
  title,
  style,
  ...rest
}: FunnyGuyProps) {
  const label = title ?? `Funny guy, ${pose}`;
  return (
    <svg
      className="fg-root"
      data-pose={pose}
      data-anim={animated ? "true" : "false"}
      viewBox="0 0 864 1223"
      width={size}
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...(color ? { ["--fg-body" as string]: color } : null), ...style }}
      {...rest}
    >
      <style>{STYLES}</style>
      <title>{label}</title>
      <g className="fg-guy">
        <path
          className="fg-body"
          d="m 285.66439,848.3888 c 0,0 -65.39305,-378.59135 -41.30088,-487.00614 24.09218,-108.4148 89.48523,-168.64524 187.57481,-166.92437 98.08958,1.72087 184.13307,89.48523 182.4122,173.80784 -1.72087,84.32262 -8.60435,457.75137 -25.81305,495.6105 C 526.58616,860.4349 285.66439,848.3888 285.66439,848.3888 Z"
        />
        <rect className="fg-leg" width="44.925697" height="303.63574" x="343.91394" y="817.95752" />
        <rect className="fg-leg" width="44.925697" height="303.63574" x="488.56369" y="819.51562" />
        <g className="fg-arm-right">
          <rect className="fg-arm-rect" width="44.925697" height="494.18268" x="274.10638" y="446.77661" transform="rotate(4.2996009)" />
        </g>
        <g className="fg-arm-left">
          <rect className="fg-arm-rect" width="44.925697" height="494.18268" x="451.63632" y="538.35541" transform="rotate(-12.047026)" />
        </g>
        <path className="fg-shadow" d="m 343.91394,850.80017 44.9257,50.14378 V 854.4993 Z" />
        <path className="fg-shadow" d="m 489.36696,858.68398 44.12243,49.36647 V 861.6058 Z" />
        <g className="fg-eye-r">
          <ellipse className="fg-white" cx="338.15091" cy="324.38394" rx="43.882179" ry="45.603046" />
          <ellipse className="fg-ink" cx="337.32816" cy="326.21268" rx="32.423744" ry="33.695263" />
        </g>
        <g className="fg-eye-l">
          <ellipse className="fg-white" cx="442.25381" cy="328.11157" rx="43.882179" ry="45.603046" />
          <ellipse className="fg-ink" cx="441.62891" cy="329.78705" rx="32.423744" ry="33.695263" />
        </g>
        <path className="fg-brow" d="m 414.79958,265.44341 c 43.17879,-27.60611 69.3692,5.6628 69.3692,5.6628" />
        <path className="fg-brow" d="m 305.18257,264.63756 c 43.17879,-27.60611 69.3692,5.6628 69.3692,5.6628" />
        <path className="fg-mouth" d="M 362,413 Q 397,431 432,413" />
        <path className="fg-grin" d="m 350,405 c 18,42 76,42 94,0" />
      </g>
      <circle className="fg-dot fg-dot1" cx="600" cy="215" r="9" />
      <circle className="fg-dot fg-dot2" cx="652" cy="180" r="12" />
      <circle className="fg-dot fg-dot3" cx="712" cy="140" r="16" />
    </svg>
  );
}

export default FunnyGuy;
