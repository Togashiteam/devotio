import type { Config } from 'tailwindcss';
import safeArea from 'tailwindcss-safe-area';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1a1a2e', // deep navy — primary background
          accent: '#e94560',  // coral — primary action
          muted: '#16213e',   // subtle surface
          gold: '#f5a623',    // scripture gold highlight
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-top': 'env(safe-area-inset-top)',
      },
      minHeight: {
        touch: '44px',
      },
      minWidth: {
        touch: '44px',
      },
    },
  },
  plugins: [safeArea],
};

export default config;
