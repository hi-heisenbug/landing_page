/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "*.{js,ts,jsx,tsx,mdx}"
],
  theme: {
    extend: {
      screens: {
        short: { raw: "(max-height: 748px)" },
      },
      spacing: {
        inset: "var(--inset)",
        sides: "var(--sides)",
        "footer-safe-area": "var(--footer-safe-area)",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(90deg,rgba(255,255,255, 0.1) 0%,rgba(255,255,255, 0.4) 100%),rgba(85,85,85,0.1)",
        "gradient-radial":
          "radial-gradient(ellipse at 50% 0%, rgba(147, 203, 82, 0.08) 0%, rgba(28, 151, 112, 0.04) 40%, transparent 70%)",
        "gradient-mesh":
          "radial-gradient(at 20% 20%, rgba(147, 203, 82, 0.06) 0%, transparent 50%), radial-gradient(at 80% 40%, rgba(28, 151, 112, 0.06) 0%, transparent 50%), radial-gradient(at 50% 80%, rgba(147, 203, 82, 0.03) 0%, transparent 50%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionProperty: {
        "colors-and-shadows":
          "color, background-color, border-color, text-decoration-color, fill, stroke, box-shadow",
      },
      animation: {
        shine: "shine 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        shimmer: "shimmer 2.5s linear infinite",
        "border-rotate": "borderRotate 6s linear infinite",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        button: "0 1px 2px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04)",
        "button-hover": "0 2px 4px rgba(0, 0, 0, 0.08), 0 6px 20px rgba(0, 0, 0, 0.06)",
        "glow-green":
          "0 0 30px rgba(147, 203, 82, 0.12), 0 0 60px rgba(147, 203, 82, 0.04)",
        "glow-turquoise":
          "0 0 30px rgba(28, 151, 112, 0.12), 0 0 60px rgba(28, 151, 112, 0.04)",
        card: "0 2px 8px rgba(0, 0, 0, 0.06), 0 0 1px rgba(0, 0, 0, 0.05)",
        "card-hover":
          "0 4px 24px rgba(0, 0, 0, 0.08), 0 0 40px rgba(147, 203, 82, 0.06), 0 0 1px rgba(0, 0, 0, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [import("tailwindcss-animate")],
};
