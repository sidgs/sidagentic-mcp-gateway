/** @type {import('tailwindcss').Config} */
export default {
  important: "#root",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dashboard: {
          bg: "#f6f8fa",
          panel: "#ffffff",
          border: "rgba(27, 31, 36, 0.12)",
          text: "#1f2328",
          muted: "#57606a",
          accent: "#1f883d",
          bad: "#cf222e",
        },
      },
      fontFamily: {
        sans: ['"Avenir Next"', '"Segoe UI"', '"Helvetica Neue"', "sans-serif"],
        mono: ['"JetBrains Mono"', '"SFMono-Regular"', '"SF Mono"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
  corePlugins: {
    /* MUI CssBaseline aligns box model; Tailwind preflight can fight Emotion resets */
    preflight: false,
  },
};
