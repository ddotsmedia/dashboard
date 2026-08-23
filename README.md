# Enterprise Accounts Dashboard

A modern financial management dashboard built with Next.js 15, React 18, and Tailwind CSS.

## Project Status

**Phase 0: Fresh Scaffold**
- ✅ Next.js 15.1.3 + React 18.3.1
- ✅ TypeScript strict mode
- ✅ Tailwind CSS 3.4.1
- ✅ Production build verified (0 errors)
- ✅ PM2 cluster mode ready

## Technology Stack

- **Framework**: Next.js 15.1.3 (App Router)
- **React**: 18.3.1
- **Styling**: Tailwind CSS 3.4.1
- **Language**: TypeScript 5.6.2
- **Build Tools**: PostCSS 8.4.31, Autoprefixer 10.4.16
- **Deployment**: PM2 (cluster mode, 2 instances)

## Quick Start

### Local Development

```bash
npm install --legacy-peer-deps
npm run dev
# Open http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Deployment

### VPS Setup (194.164.151.202:3115)

```bash
# SSH into VPS
ssh -i <your-key> user@194.164.151.202

# Clone and setup
cd /opt
rm -rf accounts-dashboard
git clone https://github.com/ddotsmedia/dashboard.git accounts-dashboard
cd accounts-dashboard

# Install and build
npm install --legacy-peer-deps
npm run build

# Start with PM2
pm2 start ecosystem.config.cjs

# Verify
curl http://localhost:3115
```

### Environment Variables

Copy `.env.example` to `.env.local` and update values:

```bash
cp .env.example .env.local
```

### PM2 Commands

```bash
pm2 status                    # Check status
pm2 logs accounts-web         # View logs
pm2 restart accounts-web      # Restart app
pm2 stop accounts-web         # Stop app
pm2 delete accounts-web       # Remove app
```

## Project Structure

```
dashboard/
├── app/                  # Next.js 15 App Router
│   ├── page.tsx         # Home page
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Global styles
├── public/              # Static assets
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── next.config.ts       # Next.js config
├── tailwind.config.ts   # Tailwind config
├── ecosystem.config.cjs # PM2 configuration
└── README.md           # This file
```

## Build Output

- **Build Time**: ~30 seconds
- **Bundle Size**: ~111 kB (First Load JS)
- **CSS**: ~52.9 kB
- **JavaScript**: ~50.5 kB
- **Files Generated**: 128

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

## Phases (Planned)

- **Phase 0**: Fresh scaffold ✅
- **Phase 1**: Navigation & layout (Next)
- **Phase 2**: Dashboard components
- **Phase 3**: Financial widgets
- **Phase 4-13**: Feature implementation

## Notes

- Uses `--legacy-peer-deps` for compatibility
- No pnpm - use npm
- TypeScript strict mode enabled
- Mobile-first responsive design
- Tailwind CSS v3 (not v4)

## Support

For issues or questions, refer to the documentation or contact the development team.

---

**Version**: 0.1.0  
**Last Updated**: 2026-08-24  
**Environment**: Production Ready
