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
        cloud: '#f8f9fa',
        sand: '#F5E8D1',
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
      backgroundImage: {
        'gradient-hero': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'gradient-cool': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-subtle': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'radial-dark': 'radial-gradient(circle at center, var(--color-obsidian), var(--color-cloud))',
        'radial-purple': 'radial-gradient(circle at center, var(--color-plum), var(--color-amethyst))',
        'radial-modern-hero-inverted': 'radial-gradient(circle at center, var(--color-plum), var(--color-amethyst), #111827)', // New gradient with dark on outside
        'radial-green': 'radial-gradient(circle at center, var(--color-evergreen), var(--color-sage))',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 10px 25px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};
