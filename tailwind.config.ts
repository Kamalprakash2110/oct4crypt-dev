import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cyber theme colors
        'neon-green': '#00ff9c',
        'electric-blue': '#00e5ff',
        'cyber-purple': '#8b5cf6',
        'dark-navy': '#0a0e27',
        'cyber-black': '#000000',
        'cyber-gray': '#1a1a2e',
        'glass-white': 'rgba(255, 255, 255, 0.1)',
        'glass-border': 'rgba(255, 255, 255, 0.2)',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #00ff9c 0%, #00e5ff 50%, #8b5cf6 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'matrix-rain': 'linear-gradient(to bottom, transparent, rgba(0, 255, 156, 0.1), transparent)',
      },
      boxShadow: {
        'neon-green': '0 0 20px rgba(0, 255, 156, 0.5), 0 0 40px rgba(0, 255, 156, 0.3)',
        'electric-blue': '0 0 20px rgba(0, 229, 255, 0.5), 0 0 40px rgba(0, 229, 255, 0.3)',
        'cyber-purple': '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-border': 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        'glass': '12px',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scanline': 'scanline 3s linear infinite',
        'matrix-fall': 'matrix-fall 10s linear infinite',
        'cyber-float': 'cyber-float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'matrix-fall': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'cyber-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      borderImage: {
        'cyber-gradient': 'linear-gradient(135deg, #00ff9c, #00e5ff, #8b5cf6) 1',
      },
    },
  },
  plugins: [],
};

export default config;
