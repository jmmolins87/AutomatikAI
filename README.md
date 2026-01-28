# AutomatikAI Agency App

AI-powered digital marketing agency application built with Next.js, featuring internationalization, 3D graphics, and advanced animations.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Development Commands

### Build & Development
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint checks

### API Development
- `cd api && npm start` - Start mail API server

### Testing
This project currently does not have test scripts configured. To add testing:
1. Install testing framework (Jest, Vitest, or Testing Library)
2. Add test scripts to package.json
3. Follow existing component patterns when writing tests

## Code Style Guidelines

### File Structure & Architecture
```
app/[locale]/          # Next.js App Router with internationalization
├── page.tsx           # Main pages
├── layout.tsx         # Layouts with locale support
components/
├── ui/               # Reusable UI components (shadcn/ui)
├── sections/         # Landing page sections
├── effects/          # Animation and visual effects
├── branding/         # Logo and brand components
├── navigation/       # Nav, Footer, Locale switch
├── layouts/          # Page layout wrappers
├── 3d/               # Three.js components
└── interactive/      # Interactive canvas components
lib/                  # Utilities and configurations
hooks/                # Custom React hooks
i18n/                # Internationalization config
api/                 # Express.js mail API
```

### Import Organization
```typescript
// 1. React and Next.js
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

// 2. External libraries
import { ArrowDown, Sparkles } from 'lucide-react';
import * as React from "react";

// 3. Internal imports (use @/ alias)
import { Logo } from '@/components/branding/Logo';
import { Button } from '@/components/ui/button';
import { animations, spacing } from '@/lib/design-system';
import { cn } from '@/lib/utils';
```

### Component Patterns

#### Functional Components
- Use "use client" directive for client-side components
- Export named components, not default exports
- Use TypeScript interfaces for props
- Leverage class-variance-authority (cva) for component variants

```typescript
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        secondary: "secondary-classes",
      },
      size: {
        default: "default-size",
        sm: "small-size",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ComponentProps extends React.ComponentProps<"div"> {
  variant?: VariantProps<typeof componentVariants>["variant"];
  size?: VariantProps<typeof componentVariants>["size"];
}

export function Component({
  className,
  variant,
  size,
  ...props
}: ComponentProps) {
  return (
    <div
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

#### Hooks Custom Pattern
```typescript
"use client";

import { useEffect, useState } from 'react';

export function useCustomHook() {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Hook logic
  }, []);

  return { state };
}
```

### TypeScript Configuration
- Strict mode enabled
- Path aliases: `@/*` maps to root directory
- JSX transform: `react-jsx`
- Target: ES2017

### Styling Guidelines
- **Primary**: Tailwind CSS with custom design tokens
- **Utilities**: Use `cn()` function from `@/lib/utils` for class merging
- **Design System**: Import from `@/lib/design-system` for consistent spacing/animations
- **Animations**: Framer Motion for complex animations
- **3D Graphics**: React Three Fiber for WebGL components

### CSS Variables & Dark Mode
- Custom CSS variables for colors (e.g., `--color-purple-60`)
- Dark mode support with theme detection
- Client-side theme persistence in localStorage

### Internationalization
- next-intl for translations
- Supported locales: `['es', 'en']` with Spanish as default
- Locale-based routing: `app/[locale]/`
- Use `useTranslations()` hook in components

### Naming Conventions
- **Components**: PascalCase (e.g., `Hero.tsx`, `GlowCard.tsx`)
- **Files**: kebab-case for utilities, PascalCase for components
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase with descriptive names

### Error Handling
- Use TypeScript for compile-time type safety
- Implement proper error boundaries in React components
- Validate props with TypeScript interfaces
- Handle async operations with try-catch blocks

### Performance Guidelines
- Use Next.js Image optimization
- Implement code splitting with dynamic imports
- Leverage React.memo for expensive components
- Use Framer Motion `layout` prop for layout animations
- Optimize Three.js scenes with proper disposal

### Accessibility
- Semantic HTML5 elements
- ARIA labels where appropriate
- Keyboard navigation support
- Focus management in modals and dropdowns

### Git & Commit Messages
- Follow conventional commits when possible
- Feature: `feat: add new component`
- Bug fix: `fix: resolve animation issue`
- Refactor: `refactor: improve component structure`

### Development Workflow
1. Run `npm run dev` for development
2. Use `npm run lint` before committing
3. Test internationalization for both locales
4. Verify dark/light theme switching
5. Check responsive design across breakpoints

### Dependencies Philosophy
- Prefer minimal, focused libraries
- Use Radix UI for accessible component primitives
- Leverage shadcn/ui for design system consistency
- Three.js ecosystem for 3D graphics
- Framer Motion for animations

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.