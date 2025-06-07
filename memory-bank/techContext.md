# Tech Context - Specialty One Website

## Technology Stack

### Frontend Framework
- **React 18.3.1** with TypeScript
- **Vite 5.4.2** for build tooling and development server
- **React Router DOM 6.22.1** for client-side routing

### Styling & Design
- **Tailwind CSS 3.4.1** for utility-first styling
- **Custom CSS variables** for brand colors
- **Google Fonts**: Inter (body text) + Montserrat (headings)
- **Lucide React** for consistent iconography

### Development Tools
- **TypeScript 5.5.3** for type safety
- **ESLint 9.9.1** with React-specific rules
- **PostCSS** for CSS processing
- **Autoprefixer** for browser compatibility

## Project Structure

```
src/
├── components/
│   ├── admin/           # Admin-specific components
│   ├── home/           # Homepage sections
│   ├── Layout/         # Layout components (Header, Footer, MainLayout)
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Route-level page components
└── types/              # TypeScript type definitions
```

## Design System

### Color Palette
- **Primary**: Plum (#8a0067) & Amethyst (#500f61)
- **Secondary**: Evergreen (#1a473a) & Sage (#6dae94)
- **Neutral**: Obsidian (#000000), Cloud (#f8f9fa), Sand (#F0EAE0)

### Typography
- **Display Font**: Montserrat (headings, bold statements)
- **Body Font**: Inter (readable, professional)
- **Scale**: Custom sizes up to 6xl (4rem) for hero text

### Component Patterns
- **Gradient Backgrounds**: Radial and linear gradients using brand colors
- **Card System**: Consistent shadow and hover effects
- **Animation**: Fade-in and slide-up animations with staggered delays
- **Button Variants**: Primary (gradient), secondary (outline), outline styles

## Key Features

### Routing Architecture
- **14 main pages** covering all business aspects
- **Dynamic routing** for case study details (`/success/:slug`)
- **Clean URLs** matching business content structure

### Component Architecture
- **Layout wrapper** (MainLayout) for consistent header/footer
- **Section-based homepage** with modular components
- **Reusable UI components** (Button, Card, Modal, etc.)
- **Custom hooks** for data management

### Performance Optimizations
- **Vite bundling** for fast builds and hot reload
- **TypeScript** for compile-time error catching
- **Tailwind purging** for minimal CSS bundle size
- **Component-based architecture** for code splitting

## Development Setup

### Commands
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - Code linting
- `npm run preview` - Preview production build

### Environment
- **Node.js** project with ES modules
- **No additional backend dependencies** (static site)
- **Assets** served from `/dist/assets/` directory

## Browser Support
- Modern browsers supporting ES2020+
- CSS Grid and Flexbox support required
- Tailwind CSS browser compatibility

## Backend Integration (Supabase)

### Database Configuration
- **URL**: `https://fttgppbopdxjbzexntlc.supabase.co`
- **Database Schema**: Complete case studies table structure exists
- **Migration Files**: Located in `supabase/migrations/`

### Connection Status
- **Environment Variables**: Properly configured in `.env`
- **Database Structure**: Ready for case study management
- **Frontend Integration**: Hooks prepared but using mock data currently
