/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#05070b',
          900: '#0a0d14',
          850: '#0f1420',
          800: '#141b2a',
          700: '#1e293b',
          600: '#334155',
        },
        cyber: {
          cyan: '#00f2fe',
          blue: '#4facfe',
          violet: '#8b5cf6',
          purple: '#c084fc',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-gradient': 'linear-gradient(135deg, #00f2fe 0%, #4facfe 50%, #8b5cf6 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(20, 27, 42, 0.7) 0%, rgba(10, 13, 20, 0.85) 100%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -3px rgba(0, 242, 254, 0.35)',
        'glow-violet': '0 0 25px -3px rgba(139, 92, 246, 0.35)',
        'glow-card': '0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 15px -3px rgba(0, 242, 254, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
