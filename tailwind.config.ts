import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--bg-canvas)",
        surface: "var(--bg-surface)",
        sunken: "var(--bg-sunken)",
        inverse: "var(--bg-inverse)",
        primary: "var(--text-primary)",
        ink: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        muted: "var(--text-muted)",
        "inverse-text": "var(--text-inverse)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-press": "var(--accent-press)",
        "accent-tint": "var(--accent-tint)",
        warm: "var(--kraft)",
        sand: "var(--manilla)",
        border: "var(--border-subtle)",
        "border-subtle": "var(--border-subtle)",
        "border-strong": "var(--border-strong)",
      },
      fontFamily: {
        display: ["Fraunces Variable", "Georgia", "serif"],
        serif: ["Fraunces Variable", "Georgia", "serif"],
        body: ["Inter Variable", "Arial", "sans-serif"],
        mono: ["JetBrains Mono Variable", "monospace"],
      },
      fontSize: {
        display: ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h1: ["clamp(2.125rem, 5vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.6875rem, 4vw, 2.125rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        h3: ["clamp(1.25rem, 3vw, 1.4375rem)", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        lead: ["clamp(1.125rem, 2vw, 1.25rem)", { lineHeight: "1.6" }],
        body: ["clamp(1rem, 1.5vw, 1.0625rem)", { lineHeight: "1.7" }],
        small: ["clamp(0.875rem, 1.3vw, 0.9375rem)", { lineHeight: "1.6" }],
        micro: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.12em" }],
      },
      maxWidth: {
        shell: "70rem",
        prose: "68ch",
      },
      borderRadius: {
        card: "8px",
        button: "6px",
      },
      boxShadow: {
        "card-hover": "0 1px 2px rgba(20,20,19,0.04), 0 8px 24px rgba(20,20,19,0.06)",
      },
      transitionTimingFunction: {
        studio: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
