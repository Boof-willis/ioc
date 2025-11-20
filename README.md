# Instant Orthopedic Care - Astro Project

A modern Astro 4.x project with React islands, Tailwind CSS, and TypeScript.

## Tech Stack

- **Astro 4.x** - Static site generation
- **React 18.x** - Interactive components (islands)
- **TypeScript** - Strict mode enabled
- **Tailwind CSS 3.4.x** - Utility-first styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **shadcn/ui** - Component system (configured)

## Project Structure

```
src/
├── components/
│   └── ui/
│       ├── islands/          # React components (client-side interactive)
│       │   ├── Counter.tsx
│       │   └── InteractiveCard.tsx
│       ├── Button.astro      # Astro components (server-side)
│       └── Card.astro
├── lib/
│   └── utils.ts              # Utility functions (cn helper)
├── pages/
│   └── index.astro           # Main page
└── styles/
    └── global.css            # Global styles with CSS variables
```

## Getting Started

### Prerequisites

- Node.js >= 18.20.0

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:4321` to see your site.

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Type Checking

```bash
npm run check
```

## Component Patterns

### Astro Components (Server-Side)

Use `.astro` files for static, server-rendered content:

```astro
---
// Server-side logic
const title = "Hello World";
---

<div>
  <h1>{title}</h1>
</div>
```

### React Islands (Client-Side)

Use `.tsx` files in `islands/` folder for interactive components. Import with client directives:

```astro
---
import Counter from '@/components/ui/islands/Counter';
---

<Counter client:load />
<!-- or -->
<Counter client:visible />
```

- `client:load` - Loads immediately
- `client:visible` - Loads when component enters viewport (better performance)

## Styling

- Tailwind CSS with CSS variables for theming
- Use `cn()` utility from `@/lib/utils` for className merging
- Global styles in `src/styles/global.css`

## Path Aliases

- `@/*` maps to `src/*`
- Configured in `tsconfig.json` and `astro.config.mjs`

## shadcn/ui

The project is configured for shadcn/ui components. To add components:

```bash
npx shadcn@latest add [component-name]
```

Components will be added to `src/components/ui/`.

## License

MIT

# ioc
