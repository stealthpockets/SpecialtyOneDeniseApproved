/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        plum: '#8a0067',
        amethyst: '#500f61',
        evergreen: '#1a473a',
        sage: '#6dae94',
        obsidian: '#000000',
        navy: '#181F29',
        cloud: '#f8f9fa',
        sand: '#F5E8D1',
        // Luxury purple variations
        'deep-purple': '#2A0D3B',
        'rich-purple': '#3E1C5F',
        'dark-purple': '#1F102D',
        // Luxury color system
        'luxury-dark': '#1F102D',
        'luxury-primary': '#3E1C5F',
        'luxury-secondary': '#2A0D3B',
        'luxury-light': '#B794F6',
        'luxury-accent': '#E9D8FD',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      fontSize: {
        '4xl': '2.5rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      spacing: {
        '18': '4.5rem',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'gradient-cool': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-subtle': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'radial-dark': 'radial-gradient(circle at center, var(--color-obsidian), var(--color-cloud))',
        'radial-purple': 'radial-gradient(circle at center, var(--color-plum), var(--color-amethyst))',
        'radial-modern-hero-inverted': 'radial-gradient(circle at center, var(--color-plum), var(--color-amethyst), #111827)', // New gradient with dark on outside
        'radial-green': 'radial-gradient(circle at center, var(--color-evergreen), var(--color-sage))',
        // Luxury gradients
        'luxury-purple': 'linear-gradient(135deg, #3E1C5F 0%, #2A0D3B 100%)',
        'frosted-purple': 'linear-gradient(135deg, rgba(62, 28, 95, 0.1) 0%, rgba(42, 13, 59, 0.05) 100%)',
        'gradient-luxury-dark': 'linear-gradient(135deg, #1F102D 0%, #2A0D3B 50%, #3E1C5F 100%)',
        'gradient-luxury-light': 'linear-gradient(135deg, #E9D8FD 0%, #B794F6 100%)',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 10px 25px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};
