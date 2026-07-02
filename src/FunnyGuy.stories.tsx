import type { Meta, StoryObj } from "@storybook/react-vite";
import { FunnyGuy } from "./FunnyGuy";

const meta = {
  title: "FunnyGuy",
  component: FunnyGuy,
  tags: ["autodocs"],
  argTypes: {
    pose: {
      control: "inline-radio",
      options: ["idle", "wave", "cheer", "think"],
      description: "Which animated pose to play.",
    },
    color: {
      control: "color",
      description: "Body color (any CSS color); the shadow is derived.",
    },
    size: {
      control: { type: "range", min: 80, max: 480, step: 10 },
      description: "Rendered width in px; height scales to keep aspect ratio.",
    },
    animated: {
      control: "boolean",
      description: "When false, the pose is frozen (no motion).",
    },
    title: { control: "text", description: "Accessible label." },
  },
  args: {
    pose: "wave",
    color: "#35b5f8",
    size: 240,
    animated: true,
  },
} satisfies Meta<typeof FunnyGuy>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Tweak every prop live from the Controls panel. */
export const Playground: Story = {};

export const Wave: Story = { args: { pose: "wave" } };
export const Idle: Story = { args: { pose: "idle" } };
export const Cheer: Story = { args: { pose: "cheer" } };
export const Think: Story = { args: { pose: "think" } };

/** All four poses side by side. */
export const AllPoses: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-end" }}>
      {(["idle", "wave", "cheer", "think"] as const).map((pose) => (
        <figure key={pose} style={{ margin: 0, textAlign: "center" }}>
          <FunnyGuy {...args} pose={pose} />
          <figcaption style={{ fontFamily: "system-ui", color: "#0b3a57", marginTop: 8 }}>
            {pose}
          </figcaption>
        </figure>
      ))}
    </div>
  ),
  args: { size: 160 },
};

/** A recolored, frozen instance — proves `color` and `animated={false}`. */
export const Recolored: Story = {
  args: { pose: "cheer", color: "#f59e0b", animated: false },
};
