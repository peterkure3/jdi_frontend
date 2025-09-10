/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#b21f38",
          primaryDark: "#991b1b",
          secondary: "#f4b21d",
        },
        status: {
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
          info: "#3b82f6",
        },
        neutral: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        surface: {
          primary: "#f8fafc",
          white: "#ffffff",
        },
        accent: {
          purple: "#8b5cf6",
          skyStrong: "#1d4ed8",
          blueMat: "#2196F3",
          amber: "#FFC107",
          redDeep: "#F44336",
          redDark: "#dc2626",
          cyan: "#06b6d4",
          cyanDark: "#0891b2",
          pink: "#ec4899",
          pinkDark: "#db2777",
          lime: "#84cc16",
          limeDark: "#65a30d",
        },
      },
      boxShadow: {
        card: "0 4px 6px rgba(0,0,0,0.05)",
        'card-lg': "0 8px 25px rgba(0,0,0,0.1)",
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [],
};
