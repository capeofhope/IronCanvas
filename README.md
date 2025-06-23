# IronCanvas - Collaborative Drawing Board

A real-time collaborative drawing application built with Next.js, Liveblocks, and Convex. Create, edit, and collaborate on digital canvases with multiple users simultaneously.

## 🚀 Features

- **Real-time Collaboration**: Multiple users can draw and edit simultaneously
- **Shape Tools**: Rectangle, Ellipse, and Pen tools for versatile drawing
- **Color Picker**: 10 predefined colors for styling layers
- **Layer Management**: Select, move, resize, and delete layers
- **Layer Ordering**: Bring to front/send to back functionality
- **Live Cursors**: See other users' cursors in real-time
- **Selection Tools**: Multi-select and bulk operations
- **Responsive Design**: Works across different screen sizes
- **Organization Support**: Clerk authentication with organization management

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Real-time**: Liveblocks (WebSocket-based collaboration)
- **Backend**: Convex (Real-time database and API)
- **Authentication**: Clerk
- **UI Components**: Radix UI, Lucide Icons, ShadcnUI
- **Styling**: Tailwind CSS, Shadcn/ui

## 📋 Prerequisites

Before setting up IronCanvas, ensure you have:

- **Node.js 18+** - Latest LTS version recommended
- **npm or yarn** - Package manager
- **Git** - Version control
- **Clerk Account** - For authentication ([clerk.com](https://clerk.com))
- **Liveblocks Account** - For real-time features ([liveblocks.io](https://liveblocks.io))
- **Convex Account** - For backend/database ([convex.dev](https://convex.dev))

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ironcanvas
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Add your credentials:

```env
# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Liveblocks
LIVEBLOCKS_SECRET_KEY=
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

4. Start the development server:

```bash
npm run dev
```

5. In a separate terminal, start Convex:

```bash
npx convex dev
```

## 🚀 Quick Start

After installation, your development environment will be running:

- **Frontend**: http://localhost:3000
- **Convex Dashboard**: https://dashboard.convex.dev
- **Liveblocks Dashboard**: https://liveblocks.io/dashboard

### First Time Setup

1. **Create an Organization** in Clerk (if using org-based access)
2. **Create your first board** from the dashboard
3. **Start drawing** with the available tools
4. **Invite collaborators** to test real-time features

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx convex dev      # Start Convex development
npx convex deploy   # Deploy Convex functions
```

## 🏗️ Project Structure

```
ironcanvas/
├── app/                          # Next.js App Router
│   ├── (dashboard)/             # Dashboard pages
│   │   ├── _components/         # Dashboard components
│   │   └── page.tsx
│   ├── board/[boardId]/         # Board pages
│   │   ├── _components/         # Canvas components
│   │   │   ├── canvas.tsx       # Main canvas component
│   │   │   ├── toolbar.tsx      # Drawing tools
│   │   │   ├── color-picker.tsx # Color selection
│   │   │   ├── selection-*.tsx  # Selection tools
│   │   │   └── layer-*.tsx      # Layer components
│   │   └── page.tsx
│   └── api/                     # API routes
├── components/                   # Shared components
│   ├── ui/                      # Shadcn/ui components
│   ├── auth/                    # Authentication components
│   └── modals/                  # Modal components
├── convex/                      # Convex backend
│   ├── hooks/                   # Custom Liveblocks hooks
│   ├── board.ts                 # Board queries/mutations
│   ├── boards.ts                # Boards management
│   └── schema.ts                # Database schema
├── lib/                         # Utilities
├── providers/                   # Context providers
├── store/                       # Global state
├── types/                       # TypeScript types
└── public/                      # Static assets
```

## 🎨 Canvas Features

### Drawing Tools

- **Rectangle**: Draw rectangular shapes with customizable colors
- **Ellipse**: Draw circular/oval shapes with customizable colors
- **Pen**: Free-hand drawing with path-based vector graphics
- **Selection**: Click and drag to select multiple layers

### Layer Management

- **Move**: Drag selected layers to reposition them
- **Resize**: Use corner handles to resize rectangular and elliptical layers
- **Delete**: Use the delete button or delete layers hook
- **Color Change**: Use selection tools to change fill colors
- **Layer Ordering**: Bring to front or send to back

### Color System

The application uses a predefined color palette:

- Red (#DC2626)
- Amber (#F59E0B)
- Green (#10B981)
- Blue (#3B82F6)
- Purple (#8B5CF6)
- Pink (#EC4899)
- Orange (#F97316)
- Teal (#059669)
- Indigo (#6366F1)
- Yellow (#D97706)

### Real-time Features

- **Live Cursors**: See other users' mouse positions in real-time
- **Presence Indicators**: User avatars showing who's currently editing
- **Collaborative Selection**: See what other users have selected
- **Instant Updates**: All changes sync immediately across all connected users

## 🔧 Development Setup

### Package Installation Commands

```bash
# Next.js installation
npx create-next-app@latest
npm run dev

# ShadcnUI (Component Library)
npx shadcn@latest init
npx shadcn@latest add dialog
npx shadcn@latest add tooltip
npx shadcn@latest add input
npx shadcn@latest add button
npx shadcn@latest add avatar
npx shadcn@latest add dropdown-menu
npx shadcn@latest add alert-dialog
npx shadcn@latest add skeleton
npx shadcn@latest add sonner

# Additional Dependencies
npm install @clerk/nextjs
npm install @liveblocks/client @liveblocks/react @liveblocks/node
npm install convex convex-helpers
npm install nanoid date-fns zustand
npm install lucide-react
npm install tailwind-merge clsx
npm install usehooks-ts
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Manual Deployment

1. Build the application:

```bash
npm run build
```

2. Deploy Convex functions:

```bash
npx convex deploy
```

## 🛠️ Troubleshooting

### Common Issues

#### "RoomProvider is missing from the React tree"

- Ensure all Liveblocks hooks import from `@/liveblocks.config`
- Check that the Room component wraps your canvas components
- Verify Liveblocks environment variables are set

#### Convex functions not working

- Run `npx convex dev` in a separate terminal
- Check that `NEXT_PUBLIC_CONVEX_URL` matches your deployment
- Verify Convex functions are deployed with `npx convex deploy`

#### Authentication issues

- Confirm Clerk environment variables are correct
- Check organization setup in Clerk dashboard
- Verify webhook endpoints if using org features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔮 Roadmap

### Phase 1 - Core Enhancements

- [ ] Text layers with rich text editing
- [ ] Copy/paste functionality
- [ ] Keyboard shortcuts (Ctrl+C, Ctrl+V, Ctrl+Z, etc.)

### Phase 2 - Advanced Features

- [ ] Image upload and embedding
- [ ] Export functionality (PNG, SVG, PDF)
- [ ] Templates and presets
- [ ] Grid/snap-to-grid functionality

### Phase 3 - Collaboration

- [ ] Comments and annotations
- [ ] Version history and branching
- [ ] Real-time chat integration
- [ ] User permissions (view-only, edit access)

### Phase 4 - Platform

- [ ] Mobile app support (React Native)
- [ ] Desktop app (Electron)
- [ ] API for third-party integrations

---

Built with ❤️ using Next.js, Liveblocks, and Convex.
