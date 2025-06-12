/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
     extend: {
      keyframes: {
        slideFadeIn: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px) scale(1.05)', opacity: 1 },
        },
      },
      animation: {
        slideFadeIn: 'slideFadeIn 0.8s ease-out forwards',
        bounceSlow: 'bounceSlow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
