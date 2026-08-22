# Development Guide

## Prerequisites

Before setting up the development environment, ensure you have:

- **Node.js 18+** ([download](https://nodejs.org/))
- **npm 9+** (comes with Node.js)
- **Git** ([download](https://git-scm.com/))
- **A code editor** (VS Code recommended)

Verify your versions:

```bash
node --version  # v18.0.0 or higher
npm --version   # 9.0.0 or higher
git --version
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/accounts-dashboard.git
cd dashboard
```

### 2. Install Dependencies

```bash
npm install
```

This installs all project dependencies listed in `package.json`. If you experience issues, try cleaning cache first:

```bash
npm cache clean --force
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory with required environment variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Internationalization
NEXT_PUBLIC_LOCALE=en

# Features (optional)
NEXT_PUBLIC_DEBUG=false
```

Copy from `.env.example` if available:

```bash
cp .env.example .env.local
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:3000**

To use a different port:

```bash
npm run dev -- -p 3001
```

## Project Structure

```
dashboard/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Localized routes
│   ├── ai-insights/       # AI features
│   ├── analytics/         # Analytics dashboard
│   ├── api/               # API routes
│   ├── budget/            # Budget management
│   ├── cash-flow/         # Cash flow analysis
│   ├── payables/          # Accounts payable
│   ├── receivables/       # Accounts receivable
│   ├── reports/           # Reporting features
│   ├── settings/          # User settings
│   ├── transactions/      # Transaction management
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
│   ├── accessibility/     # A11y utilities
│   ├── ai/               # AI-related components
│   ├── dashboard/        # Dashboard widgets
│   ├── filters/          # Filter components
│   ├── lazy/             # Lazy-loaded components
│   ├── navigation/       # Navigation components
│   ├── providers/        # Context/provider wrappers
│   ├── tables/           # Data table components
│   └── ui/               # Base UI components
├── config/                # Configuration files
│   └── constants.ts       # App constants
├── data/                  # Mock/seed data
├── lib/                   # Utility functions
│   ├── api/              # API client utilities
│   ├── dashboard/        # Dashboard calculations
│   └── utils/            # General utilities
├── types/                 # TypeScript type definitions
├── public/                # Static assets
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── next.config.js         # Next.js config
├── tailwind.config.ts     # Tailwind CSS config
└── .env.local            # Environment variables (git ignored)
```

## Development Scripts

### Build & Verification

```bash
# Start development server (hot reload)
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Run linter
npm run lint

# Type checking
npm run type-check

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

## Component Creation Guide

### Creating a New Component

1. **Determine Component Type**
   - **UI Components** → `components/ui/` (reusable, no business logic)
   - **Feature Components** → `components/[feature]/` (domain-specific)
   - **Page Components** → `app/[feature]/page.tsx` (route handlers)

2. **Component Structure**

   ```typescript
   // components/ui/MyComponent.tsx
   import { FC } from 'react';

   interface MyComponentProps {
     title: string;
     children?: React.ReactNode;
   }

   export const MyComponent: FC<MyComponentProps> = ({ 
     title, 
     children 
   }) => {
     return (
       <div className="p-4">
         <h2 className="text-lg font-semibold">{title}</h2>
         {children}
       </div>
     );
   };
   ```

3. **Add TypeScript Types**
   - Create interfaces for props in the same file
   - Use `types/` directory for shared types
   - Ensure strict TypeScript checking

4. **Use Tailwind CSS**
   - Apply styles via `className`
   - No inline styles or CSS modules
   - Follow Tailwind class organization

5. **Export & Test**
   - Export from component index files where applicable
   - Create a `.test.tsx` file for unit tests
   - Test with `npm run test`

### Component Best Practices

- Keep components small and focused
- Use React hooks for state management
- Prop drill sparingly; use context/Zustand for shared state
- Add proper TypeScript typing
- Include accessibility attributes (ARIA)
- Write meaningful JSDoc comments for complex components

## Adding Features Checklist

Follow this checklist when adding new features:

### Planning
- [ ] Define feature scope and requirements
- [ ] Identify data models needed
- [ ] Plan API endpoints (if required)
- [ ] Sketch UI/UX mockups

### Development
- [ ] Create feature directory under `app/` or `components/`
- [ ] Define TypeScript types in `types/` or component files
- [ ] Implement components with Tailwind CSS styling
- [ ] Add API integration using TanStack Query
- [ ] Implement form handling with React Hook Form + Zod validation
- [ ] Connect Zustand stores for global state
- [ ] Add internationalization strings to locale files
- [ ] Ensure RTL (right-to-left) text handling

### Testing
- [ ] Write unit tests for components
- [ ] Test API integration
- [ ] Test form validation
- [ ] Test state management
- [ ] Test i18n and RTL rendering
- [ ] Run `npm run test:watch`

### Quality Assurance
- [ ] Run linter: `npm run lint`
- [ ] Check types: `npm run type-check`
- [ ] Build successfully: `npm run build`
- [ ] Test in development: `npm run dev`
- [ ] Verify responsive design (mobile, tablet, desktop)
- [ ] Test with accessibility tools
- [ ] Test different locale variants

### Deployment
- [ ] Update documentation
- [ ] Create/update API documentation
- [ ] Prepare migration scripts (if needed)
- [ ] Submit for code review
- [ ] Merge to main branch
- [ ] Tag release version

## State Management

### Using Zustand

For global state, use Zustand stores:

```typescript
// lib/stores/userStore.ts
import { create } from 'zustand';

interface UserState {
  name: string;
  setName: (name: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: '',
  setName: (name) => set({ name }),
}));

// In component:
import { useUserStore } from '@/lib/stores/userStore';

export function UserComponent() {
  const { name, setName } = useUserStore();
  return <div>{name}</div>;
}
```

### Using TanStack Query

For server state and data fetching:

```typescript
import { useQuery } from '@tanstack/react-query';

export function DataComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users');
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <div>{JSON.stringify(data)}</div>;
}
```

## Forms & Validation

Use React Hook Form with Zod for type-safe validation:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8),
});

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
```

## Internationalization (i18n)

The project uses `next-intl` for multi-language support.

### Adding Translation Keys

1. Create/update message files in `messages/[locale].json`
2. Use in components:

```typescript
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations();
  return <h1>{t('common.welcome')}</h1>;
}
```

### Supporting RTL

RTL (right-to-left) is automatically handled. Ensure:
- Use `text-end` instead of `text-right`
- Use `start`/`end` in Tailwind (not `left`/`right`)
- Test with Arabic/Hebrew locales

## Debugging

### Enable Debug Mode

```bash
NEXT_DEBUG=true npm run dev
```

### Browser DevTools

- Open Chrome/Edge DevTools (F12)
- Check Console for errors
- Use Network tab for API calls
- Use React DevTools extension

### VS Code Extensions

Recommended extensions:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin
- Prettier - Code formatter

## Common Issues

### Port 3000 Already in Use

Kill the process:

```bash
# macOS/Linux
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows PowerShell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### TypeScript Errors

```bash
npm run type-check
# Fix errors then retry
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [TanStack Query Docs](https://tanstack.com/query/latest)

## Getting Help

- Check existing GitHub Issues
- Search documentation
- Ask in project Slack channel
- Create a new issue with reproduction steps
