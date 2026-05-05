/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#071E63",
        primaryDark: "#041342",
        primaryLight: "#123A9C",
        secondary: "#8B5CF6",
        secondaryDark: "#6D28D9",
        secondaryLight: "#A78BFA",
        background: "#F8FAFC",
        surface: "#FFFFFF",
        surfaceMuted: "#F1F5F9",
        text: "#0F172A",
        textMuted: "#64748B",
        textLight: "#94A3B8",
        border: "#E2E8F0",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        info: "#3B82F6",
      },
    },
  },
  plugins: [],
};
