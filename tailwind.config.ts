import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#003B7A",
          blue: "#0072CE",
          sky: "#49A6F2",
          orange: "#FF7A00",
          amber: "#FFB15A",
          ink: "#071B3A",
          canvas: "#F6F8FB",
          white: "#FFFFFF",
          line: "#E5ECF4",
          tint: "#EAF4FF",
          text: "#102033",
          muted: "#5F6F86",
          success: "#1F9D55",
          warning: "#FFB020",
          danger: "#D92D20",
          neutral: "#6B7280",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 18px 45px rgb(7 27 58 / 0.08)",
        lifted: "0 24px 70px rgb(7 27 58 / 0.14)",
      },
      ringColor: {
        brand: "#49A6F2",
      },
    },
  },
  plugins: [],
};

export default config;
