import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#080810",
        surface: "#0f0f1a",
        border: "#1e1e2e",
        orange: "#ff6b35",
        gold: "#ffd700",
        "orange-glow": "rgba(255,107,53,0.15)",
        "gold-glow": "rgba(255,215,0,0.12)",
        "text-primary": "#f5f0e8",
        "text-secondary": "#8a8399",
        "text-muted": "#4a4560",
      },
      fontFamily: {
        clash: ["'Clash Display'", "sans-serif"],
        cabinet: ["'Cabinet Grotesk'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      fontSize: {
        hero: "clamp(64px, 10vw, 140px)",
        section: "clamp(42px, 6vw, 88px)",
        subhead: "clamp(18px, 2vw, 24px)",
        label: "11px",
      },
      lineHeight: {
        hero: "0.9",
        section: "0.95",
      },
      letterSpacing: {
        hero: "-0.03em",
        label: "0.15em",
      },
      boxShadow: {
        "orange-glow": "0 0 60px rgba(255,107,53,0.2)",
        "gold-glow": "0 0 40px rgba(255,215,0,0.15)",
      },
      backdropBlur: {
        glass: "20px",
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "pulse-line": "pulse-line 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(-8px)" },
          "50%": { transform: "translateY(8px)" },
        },
        "pulse-line": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
