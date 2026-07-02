import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "sky",
      values: [
        { name: "sky", value: "#eaf6ff" },
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#0b3a57" },
      ],
    },
    controls: { expanded: true },
  },
};

export default preview;
