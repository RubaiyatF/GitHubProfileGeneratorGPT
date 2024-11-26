import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        "color-1": "hsl(var(--color-1))",
        "color-2": "hsl(var(--color-2))",
        "color-3": "hsl(var(--color-3))",
        "color-4": "hsl(var(--color-4))",
        "color-5": "hsl(var(--color-5))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        rainbow: "rainbow var(--speed, 2s) infinite linear",
      },
      keyframes: {
        rainbow: {
          "0%": {
            "background-position": "0%",
          },
          "100%": {
            "background-position": "200%",
          },
        },
      },
      // Added GitHub markdown styling
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "var(--color-fg-default)",
            '[class~="lead"]': {
              color: "var(--color-fg-muted)",
            },
            a: {
              color: "var(--color-accent-fg)",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            strong: {
              color: "var(--color-fg-default)",
              fontWeight: "600",
            },
            'ol[type="A"]': {
              listStyleType: "upper-alpha",
            },
            'ol[type="a"]': {
              listStyleType: "lower-alpha",
            },
            'ol[type="A" s]': {
              listStyleType: "upper-alpha",
            },
            'ol[type="a" s]': {
              listStyleType: "lower-alpha",
            },
            'ol[type="I"]': {
              listStyleType: "upper-roman",
            },
            'ol[type="i"]': {
              listStyleType: "lower-roman",
            },
            'ol[type="I" s]': {
              listStyleType: "upper-roman",
            },
            'ol[type="i" s]': {
              listStyleType: "lower-roman",
            },
            'ol[type="1"]': {
              listStyleType: "decimal",
            },
            h1: {
              color: "var(--color-fg-default)",
              fontWeight: "600",
              borderBottomWidth: "1px",
              borderColor: "var(--color-border-muted)",
              paddingBottom: "0.3em",
            },
            h2: {
              color: "var(--color-fg-default)",
              fontWeight: "600",
              borderBottomWidth: "1px",
              borderColor: "var(--color-border-muted)",
              paddingBottom: "0.3em",
            },
            h3: {
              color: "var(--color-fg-default)",
              fontWeight: "600",
            },
            h4: {
              color: "var(--color-fg-default)",
              fontWeight: "600",
            },
            code: {
              color: "var(--color-fg-default)",
              backgroundColor: "var(--color-neutral-muted)",
              padding: "0.2em 0.4em",
              borderRadius: "6px",
              fontWeight: "400",
              "&::before": {
                content: '""',
              },
              "&::after": {
                content: '""',
              },
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              color: "var(--color-fg-default)",
              backgroundColor: "var(--color-canvas-subtle)",
              borderRadius: "6px",
              padding: "16px",
              fontSize: "85%",
              lineHeight: "1.45",
            },
            "pre code": {
              backgroundColor: "transparent",
              borderRadius: "0",
              padding: "0",
              color: "inherit",
              fontSize: "100%",
              lineHeight: "inherit",
              whiteSpace: "pre",
              wordBreak: "normal",
              wordWrap: "normal",
            },
            table: {
              display: "block",
              width: "100%",
              maxWidth: "100%",
              overflow: "auto",
              borderSpacing: "0",
              borderCollapse: "collapse",
              "tbody tr:nth-child(2n)": {
                backgroundColor: "var(--color-canvas-subtle)",
              },
            },
            "thead th": {
              fontWeight: "600",
              padding: "6px 13px",
              border: "1px solid var(--color-border-default)",
            },
            "tbody td": {
              padding: "6px 13px",
              border: "1px solid var(--color-border-default)",
            },
            blockquote: {
              color: "var(--color-fg-muted)",
              borderLeftWidth: "0.25em",
              borderLeftColor: "var(--color-border-default)",
              paddingLeft: "1em",
              margin: "0",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"), // Added typography plugin
  ],
};

export default config;
