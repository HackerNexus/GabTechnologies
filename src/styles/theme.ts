// src/styles/theme.ts

export const theme = {
  colors: {
    primary: "#06B6D4", // Cyan
    primaryDark: "#0891B2",
    secondary: "#3B82F6", // Blue
    background: "#050816",
    surface: "#0B1120",
    white: "#FFFFFF",

    text: {
      primary: "#FFFFFF",
      secondary: "#9CA3AF",
      muted: "#6B7280",
    },

    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444",
  },

  borderRadius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
  },

  shadows: {
    card: "0 10px 30px rgba(0,0,0,0.2)",
    cyanGlow: "0 0 20px rgba(6,182,212,0.35)",
    blueGlow: "0 0 20px rgba(59,130,246,0.35)",
    greenGlow: "0 0 20px rgba(34,197,94,0.35)",
  },

  spacing: {
    section: "py-24",
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  },
};

export const buttonStyles = {
  primary:
    "px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl transition-all duration-300",

  secondary:
    "px-6 py-3 border border-cyan-500/30 bg-cyan-500/10 text-white font-semibold rounded-xl transition-all duration-300",

  danger:
    "px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-300",
};

export const cardStyles = {
  primary:
    "bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl",

  secondary:
    "bg-[#0B1120] border border-white/10 rounded-2xl",
};

export const inputStyles =
  "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20";