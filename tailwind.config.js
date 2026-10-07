import animate from "tailwindcss-animate";

const token = name => `hsl(var(--${name}) / <alpha-value>)`;

/** @type {import("tailwindcss").Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette — named after the dye house
        bone: token("bone"),
        paper: token("paper"),
        oat: token("oat"),
        ink: token("ink"),
        madder: { DEFAULT: token("madder"), light: token("madder-light") },
        moor: token("moor"),

        // Semantic roles
        border: token("border"),
        input: token("input"),
        ring: token("ring"),
        background: token("background"),
        foreground: token("foreground"),
        primary: { DEFAULT: token("primary"), foreground: token("primary-foreground") },
        secondary: { DEFAULT: token("secondary"), foreground: token("secondary-foreground") },
        destructive: { DEFAULT: token("destructive"), foreground: token("destructive-foreground") },
        muted: { DEFAULT: token("muted"), foreground: token("muted-foreground") },
        accent: { DEFAULT: token("accent"), foreground: token("accent-foreground") },
        popover: { DEFAULT: token("popover"), foreground: token("popover-foreground") },
        card: { DEFAULT: token("card"), foreground: token("card-foreground") },
        "warm-bg": token("warm-bg"),
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "var(--radius)",
        sm: "var(--radius)",
      },
      fontFamily: {
        sans: ["Inter Tight", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Instrument Serif", "Iowan Old Style", "Times New Roman", "serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        meta: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.06em" }],
        "fluid-mega": ["clamp(4rem, 13vw, 14rem)", { lineHeight: "0.84", letterSpacing: "-0.035em" }],
        "fluid-display": ["clamp(3rem, 8vw, 7.5rem)", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
        "fluid-statement": ["clamp(1.9rem, 4.2vw, 4.25rem)", { lineHeight: "1.06", letterSpacing: "-0.02em" }],
        "fluid-headline": ["clamp(2.25rem, 4.5vw, 4rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "fluid-title": ["clamp(1.5rem, 2.4vw, 2.25rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
      },
      spacing: {
        header: "var(--header-h)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": { from: { opacity: "0", transform: "translateY(18px)" }, to: { opacity: "1", transform: "none" } },
        "hero-zoom": { from: { transform: "scale(1.08)" }, to: { transform: "scale(1)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: {
        "fade-up": "fade-up 1s cubic-bezier(0.22, 1, 0.36, 1) both",
        "hero-zoom": "hero-zoom 2.4s cubic-bezier(0.22, 1, 0.36, 1) both",
        marquee: "marquee 45s linear infinite",
      },
    },
  },
  plugins: [animate],
};
