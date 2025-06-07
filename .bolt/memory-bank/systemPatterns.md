# System Patterns - Specialty One Website

## Architecture Overview

### Component Architecture
The application follows a hierarchical component structure optimized for maintainability and reusability:

```
components/
├── Layout/           # Layout components (Header, Footer, MainLayout)
├── home/            # Homepage-specific sections
├── admin/           # Administrative components
└── ui/              # Reusable UI primitives
```

### Layout Pattern
- **MainLayout** wraps all pages providing consistent header/footer
- **Header** includes sticky navigation with scroll-responsive styling
- **Footer** contains essential links and contact information
- **Responsive design** with mobile-first approach

### Page Structure Pattern
Each page follows a consistent pattern:
1. Import required components
2. Compose sections in logical order
3. Export as default function
4. Clean, declarative JSX structure

Example:
```tsx
const HomePage = () => {
  return (
    <>
      <HeroSection />
      <TrustMetrics />
      <PropertyTypes />
      <CaseStudyHighlight />
      {/* ... additional sections */}
    </>
  );
};
```

## Routing System

### Route Organization
- **Static routes** for main pages (`/`, `/about`, `/contact`)
- **Category routes** for property types (`/manufactured-housing`, `/rv-parks`, `/self-storage`)
- **Dynamic routes** for case studies (`/success/:slug`)
- **Nested navigation** with dropdown menus

### Navigation Patterns
- **Desktop**: Hover-activated dropdowns with smooth transitions
- **Mobile**: Collapsible menu with click-to-expand sections
- **Scroll behavior**: Header shrinks on scroll for better UX

## Data Management

### Custom Hooks Pattern
```tsx
// useCaseStudies.ts - Centralized data fetching
export const useCaseStudies = (filters?: CaseStudyFilters) => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // ... fetch logic
  return { caseStudies, loading, error };
};
```

### TypeScript Integration
- **Strict typing** for all data structures
- **Interface definitions** in dedicated types folder
- **Type-safe props** for all components

## Design System Patterns

### Color System
Consistent color palette using CSS custom properties:
```css
:root {
  --color-plum: #8a0067;      /* Primary brand */
  --color-amethyst: #500f61;   /* Secondary brand */
  --color-evergreen: #1a473a;  /* Accent */
  --color-sage: #6dae94;       /* Supporting */
  /* ... */
}
```

### Component Styling Patterns
1. **Utility-first** with Tailwind CSS
2. **Custom classes** for complex patterns (gradients, animations)
3. **Responsive modifiers** (`md:`, `lg:`) throughout
4. **Hover states** and transitions on interactive elements

### Button System
```tsx
// Variant-based button component
<Button 
  variant="primary"     // primary | secondary | outline
  size="lg"            // sm | md | lg
  to="/path"           // React Router Link
  icon={<Icon />}      // Optional icon
  iconPosition="right" // left | right
>
  Button Text
</Button>
```

## Animation Patterns

### CSS Animations
```css
.animate-fade-in {
  animation: fadeIn 0.6s ease-in-out;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}
```

### Staggered Animations
Components use `animationDelay` for sequenced reveals:
```tsx
<div 
  className="animate-fade-in"
  style={{ animationDelay: `${0.2 * index}s` }}
>
```

## State Management

### Local State Pattern
- **useState** for component-level state
- **useEffect** for side effects and data fetching
- **Custom hooks** for reusable stateful logic

### Future Backend Integration
- **Supabase preparation** in useCaseStudies hook
- **Mock data structure** matches expected backend schema
- **Error handling** patterns established

## Content Management

### Case Study System
- **TypeScript interfaces** define content structure
- **Slug-based routing** for SEO-friendly URLs
- **Flexible content fields** (images, testimonials, metrics)
- **Status management** (completed, in-progress, confidential)

### Image Asset Management
- **Organized asset structure** in `/dist/assets/`
- **WebP format** for optimal performance
- **Descriptive naming** for SEO and accessibility

## Performance Patterns

### Build Optimization
- **Vite bundling** for fast development and builds
- **Component lazy loading** ready via React Router
- **CSS purging** through Tailwind
- **TypeScript compilation** for optimized JavaScript

### Loading States
- **Consistent loading patterns** in data hooks
- **Error boundaries** ready for implementation
- **Graceful degradation** for failed requests
