export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fff7ed",
      },
      boxShadow: {
        soft: "0 12px 30px rgba(15, 23, 42, 0.08)",
        card: "0 24px 70px rgba(15, 23, 42, 0.16)",
        orange: "0 16px 35px rgba(249, 115, 22, 0.35)",
      },
    },
  },
  plugins: [],
};