# Contributing to Accounts Dashboard

Thank you for your interest in contributing to the Accounts Dashboard project! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch following our naming conventions
4. Make your changes
5. Submit a pull request

## Branch Naming Conventions

Use clear, descriptive branch names:

- **Features**: `feature/description-of-feature`
  - Example: `feature/add-expense-tracking`
  - Example: `feature/improve-dashboard-performance`

- **Bug Fixes**: `fix/description-of-fix`
  - Example: `fix/incorrect-currency-conversion`
  - Example: `fix/account-filtering-bug`

- **Documentation**: `docs/description`
  - Example: `docs/api-integration-guide`

- **Refactoring**: `refactor/description`
  - Example: `refactor/optimize-chart-rendering`

## Commit Message Format

Follow conventional commits format for clear commit history:

```
<type>: <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (formatting, missing semicolons, etc)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to build process, dependencies, or other non-code changes

### Examples

```
feat: add multi-currency support to expense dashboard

- Implement currency selector component
- Add currency conversion utilities
- Update expense calculations to handle multiple currencies
```

```
fix: prevent duplicate expense entries in list view

Previously, expenses were showing twice when filtered by date range.
Now correctly filtering by single source.

Fixes #123
```

```
docs: add deployment guide

Added comprehensive deployment instructions for production environments.
```

## Pull Request Guidelines

### Before Submitting

1. **Code Quality**
   - Run `npm run lint` and fix any linting errors
   - Run `npm run type-check` and ensure zero TypeScript errors
   - Run `npm run build` and verify successful build

2. **Testing**
   - Write or update tests for your changes
   - Run `npm run test` to ensure all tests pass
   - Maintain or improve code coverage

3. **Documentation**
   - Update README.md if behavior changes
   - Add JSDoc comments for new functions/components
   - Update relevant documentation files

### PR Description Template

```markdown
## Description
Brief description of the changes and why they were needed.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing Done
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] No breaking changes to existing functionality

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally
- [ ] Build passes locally
```

## Code Style Guidelines

### TypeScript

- Use **strict mode**: `"strict": true` in tsconfig.json
- Use **descriptive variable names** (no single letters except for loop counters)
- Avoid `any` type; use `unknown` when type is uncertain
- Use `const` by default, `let` when needed, avoid `var`
- Use interfaces/types for object shapes

Example:
```typescript
// Good
interface ExpenseItem {
  id: string;
  amount: number;
  category: string;
  date: Date;
  description: string;
}

const calculateTotal = (expenses: ExpenseItem[]): number => {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
};

// Avoid
const calcTotal = (items: any[]): any => {
  return items.reduce((s: any, i: any) => s + i.amount, 0);
};
```

### React Components

- Use functional components with hooks
- Use TypeScript for prop types
- Memoize expensive computations
- Keep components focused and single-responsibility
- Use proper naming: PascalCase for components, camelCase for functions

Example:
```typescript
interface DashboardProps {
  accountId: string;
  onUpdate?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ accountId, onUpdate }) => {
  const [data, setData] = useState<ExpenseData[]>([]);

  const filteredData = useMemo(() => {
    return data.filter(item => item.accountId === accountId);
  }, [data, accountId]);

  return <div>{/* Component JSX */}</div>;
};
```

### Tailwind CSS

- Use utility classes instead of custom CSS when possible
- Follow mobile-first responsive design
- Use semantic class ordering (layout, box model, typography, visual)
- Create reusable component classes when needed

Example:
```typescript
// Good
<div className="flex items-center justify-between gap-4 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    Action
  </button>
</div>

// Avoid excessive nesting or unclear class ordering
<div className="p-6 shadow-md rounded-lg bg-white flex justify-between items-center gap-4">
```

## Code Review Process

1. **Automated Checks**: GitHub Actions will run linting, type checking, and tests
2. **Code Review**: At least one maintainer review is required
3. **Feedback**: Address all review comments or discuss concerns
4. **Approval**: PR requires approval before merging
5. **Merge**: Use squash commit for cleaner history

## Debugging & Development

### Development Server

```bash
npm run dev
```

Runs Next.js development server at `http://localhost:3000`

### Type Checking

```bash
npm run type-check
```

Check TypeScript without emitting files

### Linting

```bash
npm run lint
```

Run ESLint to check code quality

### Testing

```bash
npm run test
npm run test:watch
```

### Building for Production

```bash
npm run build
npm run start
```

## Performance Considerations

- Use React.memo for expensive components
- Implement code splitting with dynamic imports
- Optimize images and assets
- Use proper key props in lists
- Avoid unnecessary re-renders
- Monitor bundle size

## Internationalization (i18n)

The project supports multiple languages and RTL:

- Add translation strings in `messages/` directory
- Use `useTranslations()` hook for translations
- Test RTL rendering for Arabic content
- Ensure proper text direction handling

## Accessibility

Follow WCAG 2.2 Level AA guidelines:

- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard navigation works
- Use proper color contrast ratios
- Include ARIA labels when needed
- Test with screen readers

## Questions?

- Check existing issues and discussions
- Create a new discussion for questions
- Email: support@ddotsmedia.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to making Accounts Dashboard better!
