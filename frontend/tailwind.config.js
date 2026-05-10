/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Cyberpunk neon palette
        neon: {
          yellow: "#ffe600",
          cyan: "#00e5ff",
          pink: "#ff2d78",
          purple: "#b700ff",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "var(--radius)",
        sm: "var(--radius)",
      },
      fontFamily: {
        cyber: ["Rajdhani", "Share Tech Mono", "ui-monospace", "monospace"],
        mono: ["Share Tech Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "neon-yellow": "0 0 8px #ffe600, 0 0 20px rgba(255,230,0,0.4)",
        "neon-cyan": "0 0 8px #00e5ff, 0 0 20px rgba(0,229,255,0.4)",
        "neon-pink": "0 0 8px #ff2d78, 0 0 20px rgba(255,45,120,0.4)",
        "neon-sm-yellow": "0 0 4px #ffe600, 0 0 10px rgba(255,230,0,0.3)",
        "neon-sm-cyan": "0 0 4px #00e5ff, 0 0 10px rgba(0,229,255,0.3)",
        "neon-sm-pink": "0 0 4px #ff2d78, 0 0 10px rgba(255,45,120,0.3)",
      },
      animation: {
        glitch: "glitch 3s infinite",
        flicker: "flicker 4s infinite",
        scanline: "scanline 8s linear infinite",
      },
      keyframes: {
        glitch: {
          "0%, 95%, 100%": { transform: "translateX(0)" },
          "96%": { transform: "translateX(-2px)", filter: "hue-rotate(90deg)" },
          "97%": { transform: "translateX(2px)", filter: "hue-rotate(-90deg)" },
          "98%": { transform: "translateX(-1px)" },
          "99%": { transform: "translateX(1px)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.7" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.8" },
          "97%": { opacity: "1" },
        },
        scanline: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 100%" },
        },
      },
    },
  },
  plugins: [],
};
