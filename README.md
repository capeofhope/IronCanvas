# IronCanvas - Collaborative Drawing Board

A modern, real-time collaborative whiteboard application built with cutting-edge web technologies. IronCanvas enables teams and individuals to create, edit, and collaborate on digital canvases with seamless multi-user support and professional-grade drawing tools.

## ✨ Key Features

### 🎨 Drawing & Design Tools

- **Multi-Layer Canvas**: Support for Rectangle, Ellipse, Text, Note, and Freehand Path layers
- **Advanced Pen Tool**: Smooth freehand drawing with perfect-freehand integration
- **Color System**: 10 carefully selected predefined colors with RGB support
- **Text & Notes**: Rich text editing and sticky note functionality
- **Layer Management**: Complete layer control with selection, movement, and resizing

### 🤝 Real-Time Collaboration

- **Live Cursors**: See other users' cursor positions in real-time
- **Presence Indicators**: Real-time user presence with live pencil drafts
- **Conflict-Free Editing**: Automatic conflict resolution for concurrent edits
- **Instant Synchronization**: WebSocket-based updates across all connected clients

### 🔧 Professional Tools

- **Selection System**: Multi-select with drag selection and bulk operations
- **Layer Ordering**: Bring to front/send to back with proper z-index management
- **Undo/Redo**: Complete history tracking with Liveblocks history API
- **Pan & Zoom**: Smooth camera controls for large canvases
- **Responsive Design**: Optimized for desktop and tablet experiences

### 🏢 Organization Features

- **Team Collaboration**: Clerk-powered organization management
- **Board Management**: Create, organize, and share boards within teams
- **Access Control**: Organization-based permissions and board ownership
- **Dashboard**: Comprehensive board overview with favorites and search

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 15 with App Router and TypeScript
- **Real-Time Engine**: Liveblocks for WebSocket-based collaboration
- **Backend & Database**: Convex for serverless functions and real-time data
- **Authentication**: Clerk with organization support
- **UI Components**: Radix UI primitives with Shadcn/ui design system
- **Styling**: Tailwind CSS with custom animations
- **Drawing Engine**: Perfect-freehand for smooth pen input
- **State Management**: Zustand for local state and Liveblocks for shared state

## 🎯 Live Demo & Screenshots

> **Note**: IronCanvas is optimized for desktop and tablet experiences. Mobile support is planned for future releases.

### Core Functionality

- **Multi-user collaboration** with real-time cursor tracking
- **Professional drawing tools** including shapes, text, and freehand drawing
- **Advanced selection system** with multi-layer operations
- **Organization-based board management** with role-based access

## 📋 Prerequisites

Ensure you have the following before setting up IronCanvas:

- **Node.js 18+** (LTS version recommended)
- **Package Manager**: npm, yarn, or pnpm
- **Git** for version control

### Required Service Accounts

- **[Clerk Account](https://clerk.com)** - Authentication & organization management
- **[Liveblocks Account](https://liveblocks.io)** - Real-time collaboration features
- **[Convex Account](https://convex.dev)** - Backend database and serverless functions

## � Quick Installation

### 1. Clone and Setup

```bash
git clone https://github.com/yourusername/ironcanvas.git
cd ironcanvas
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Convex Backend
CONVEX_DEPLOYMENT=your-deployment-name
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Liveblocks Real-time
LIVEBLOCKS_SECRET_KEY=sk_prod_...
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=pk_prod_...

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### 3. Start Development Environment

```bash
# Terminal 1: Start Next.js development server
npm run dev

# Terminal 2: Start Convex backend (new terminal)
npx convex dev
```

Your application will be available at:

- **Frontend**: http://localhost:3000
- **Convex Dashboard**: https://dashboard.convex.dev
- **Liveblocks Dashboard**: https://liveblocks.io/dashboard

## 🎯 Getting Started

### First-Time Setup

1. **Create an Organization** in your Clerk dashboard or through the app
2. **Create your first board** from the IronCanvas dashboard
3. **Start drawing** with the toolbar on the left side
4. **Invite team members** to test real-time collaboration features

### Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint checks
npx convex dev       # Start Convex development mode
npx convex deploy    # Deploy Convex functions to production
```

## 🏗️ Project Architecture

```
ironcanvas/
├── app/                          # Next.js App Router
│   ├── (dashboard)/             # Dashboard routes
│   │   ├── _components/         # Dashboard-specific components
│   │   │   ├── board-card/      # Board preview cards
│   │   │   ├── sidebar/         # Organization sidebar
│   │   │   ├── navbar.tsx       # Top navigation
│   │   │   ├── board-list.tsx   # Board grid display
│   │   │   └── empty-*.tsx      # Empty state components
│   │   └── page.tsx             # Dashboard main page
│   ├── board/[boardId]/         # Individual board routes
│   │   ├── _components/         # Canvas-specific components
│   │   │   ├── canvas.tsx       # Main drawing canvas
│   │   │   ├── toolbar.tsx      # Drawing tools sidebar
│   │   │   ├── color-picker.tsx # Color selection palette
│   │   │   ├── selection-*.tsx  # Selection tools & UI
│   │   │   ├── cursor-*.tsx     # Real-time cursor system
│   │   │   ├── layer-*.tsx      # Layer rendering components
│   │   │   └── info.tsx         # Board information header
│   │   └── page.tsx             # Board main page
│   ├── api/                     # API routes
│   │   └── liveblocks-auth/     # Liveblocks authentication
│   ├── globals.css              # Global styles
│   └── layout.tsx               # Root layout
├── components/                   # Shared UI components
│   ├── ui/                      # Shadcn/ui components
│   ├── auth/                    # Authentication components
│   ├── modals/                  # Modal dialogs
│   ├── actions.tsx              # Action menus
│   ├── hint.tsx                 # Tooltip component
│   └── room.tsx                 # Liveblocks room wrapper
├── convex/                      # Convex backend
│   ├── hooks/                   # Custom Liveblocks hooks
│   │   ├── use_api_mutation.ts  # API mutation helper
│   │   ├── use_delete_layers.ts # Layer deletion logic
│   │   └── use_selection_bounds.ts # Selection calculations
│   ├── board.ts                 # Individual board operations
│   ├── boards.ts                # Board listing & management
│   ├── schema.ts                # Database schema definition
│   └── auth.config.js           # Clerk integration config
├── lib/                         # Utility functions
│   └── utils.ts                 # Canvas utilities & helpers
├── providers/                   # React context providers
│   ├── convex-client-provider.tsx # Convex + Clerk integration
│   └── modal-provider.tsx       # Modal state management
├── store/                       # Global state management
│   └── use-rename-modal.ts      # Rename modal state
├── types/                       # TypeScript definitions
│   └── canvas.ts                # Canvas & layer type definitions
├── public/                      # Static assets
│   ├── placeholders/            # Board thumbnail images
│   └── *.svg                    # Icon assets
├── liveblocks.config.ts         # Liveblocks configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── components.json              # Shadcn/ui configuration
└── package.json                 # Dependencies & scripts
```

### Key Architectural Decisions

#### **Real-Time Architecture**

- **Liveblocks**: Handles all real-time collaboration features including presence, storage, and conflict resolution
- **Room-based isolation**: Each board operates in its own Liveblocks room for optimal performance
- **Optimistic updates**: Immediate UI feedback with automatic rollback on conflicts

#### **Data Flow**

- **Client → Liveblocks → All Clients**: Real-time canvas updates
- **Client → Convex → Client**: Board metadata and user management
- **Clerk → Convex**: Authentication and organization data

#### **State Management**

- **Canvas state**: Managed by Liveblocks storage for real-time sync
- **UI state**: Local React state for immediate responsiveness
- **Global modals**: Zustand for modal state management
- **Authentication**: Clerk with Convex integration

## 🎨 Canvas Features & Tools

### Drawing Tools

| Tool             | Description                                           | Usage                                 |
| ---------------- | ----------------------------------------------------- | ------------------------------------- |
| **Select**       | Default selection tool for moving and resizing layers | Click to select, drag to multi-select |
| **Rectangle**    | Create rectangular shapes with customizable colors    | Click and drag to define bounds       |
| **Ellipse**      | Draw circles and ellipses                             | Click and drag to define bounds       |
| **Pen/Pencil**   | Freehand drawing with smooth stroke rendering         | Click and drag to draw                |
| **Text**         | Add text layers with custom styling                   | Click to place, type to edit          |
| **Sticky Notes** | Create note layers for annotations                    | Click to place, type to add content   |

### Layer Management

- **Multi-Selection**: Drag to select multiple layers or hold Ctrl+Click
- **Move & Resize**: Drag layers to move, use corner handles to resize
- **Layer Ordering**: Bring to front/send to back via selection tools
- **Delete Operations**: Remove selected layers with delete button
- **Color Customization**: Change fill colors via color picker

### Color System

Professional color palette with 10 carefully selected colors:

- Red (#DC2626), Amber (#F59E0B), Green (#10B981), Blue (#3B82F6), Purple (#8B5CF6)
- Pink (#EC4899), Orange (#F97316), Teal (#059669), Indigo (#6366F1), Yellow (#D97706)

### Real-Time Collaboration

- **Live Cursors**: See other users' cursor positions with color-coded indicators
- **Presence Awareness**: Real-time user indicators showing active participants
- **Live Drawing**: Watch collaborators draw with pencil tool in real-time
- **Collaborative Selection**: See what layers other users have selected
- **Instant Synchronization**: All changes sync immediately across connected clients
- **Conflict Resolution**: Automatic handling of concurrent edits without data loss

### Performance Features

- **Optimistic Updates**: Immediate UI feedback before server confirmation
- **Selective Rendering**: Only affected layers re-render on changes
- **Efficient Storage**: Liveblocks CRDT for conflict-free data structures
- **Canvas Virtualization**: Smooth performance with large numbers of layers

## 🔧 Advanced Development Setup

### Prerequisites Verification

```bash
node --version    # Should be 18.0.0 or higher
npm --version     # Should be 8.0.0 or higher
git --version     # Any recent version
```

### Core Dependencies Installation

```bash
# Essential packages for development
npm install @clerk/nextjs @clerk/clerk-react
npm install @liveblocks/client @liveblocks/react @liveblocks/node
npm install convex convex-helpers
npm install nanoid date-fns zustand perfect-freehand
npm install lucide-react tailwind-merge clsx class-variance-authority
```

### UI Component Library Setup

```bash
# Initialize Shadcn/ui
npx shadcn@latest init

# Install required UI components
npx shadcn@latest add dialog tooltip input button avatar
npx shadcn@latest add dropdown-menu alert-dialog skeleton sonner
```

## 🌐 Production Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Environment**: Add all environment variables in Vercel dashboard
3. **Deploy Convex**: Run `npx convex deploy` before deploying frontend
4. **Deploy**: Automatic deployment on git push

### Manual Production Build

```bash
# Build the application
npm run build

# Deploy Convex functions
npx convex deploy

# Start production server (if self-hosting)
npm run start
```

### Environment Variables Checklist

```env
# Required for production
CONVEX_DEPLOYMENT=prod:your-deployment-name
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
LIVEBLOCKS_SECRET_KEY=sk_prod_...
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=pk_prod_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
```

## � Troubleshooting

### Common Issues & Solutions

#### "RoomProvider is missing from the React tree"

**Cause**: Liveblocks hooks used outside of Room context  
**Solution**:

- Ensure all Liveblocks hooks import from `@/liveblocks.config`
- Verify Room component wraps canvas components
- Check Liveblocks environment variables are set correctly

#### Convex Functions Not Working

**Cause**: Backend connection or deployment issues  
**Solution**:

- Run `npx convex dev` in separate terminal during development
- Verify `NEXT_PUBLIC_CONVEX_URL` matches your deployment
- Deploy functions with `npx convex deploy` for production

#### Authentication Issues

**Cause**: Clerk configuration problems  
**Solution**:

- Confirm all Clerk environment variables are correct
- Check organization setup in Clerk dashboard
- Verify webhook endpoints if using organization features

#### Real-time Sync Not Working

**Cause**: Liveblocks connection issues  
**Solution**:

- Check Liveblocks secret key configuration
- Verify room IDs match between components
- Check browser console for WebSocket connection errors
- Ensure `/api/liveblocks-auth` endpoint is accessible

### Development Tips

- Use browser dev tools Network tab to debug API calls
- Check Convex dashboard for function logs and errors
- Monitor Liveblocks dashboard for room activity and connections
- Use React DevTools to inspect component state and props

## 🤝 Contributing

We welcome contributions to IronCanvas! Here's how to get involved:

### Development Workflow

1. **Fork** the repository on GitHub
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Develop** your changes with proper testing
4. **Commit** changes: `git commit -m 'feat: add amazing feature'`
5. **Push** to branch: `git push origin feature/amazing-feature`
6. **Submit** a pull request with detailed description

### Contribution Guidelines

- Follow TypeScript best practices and existing code style
- Add JSDoc comments for new functions and components
- Update README if adding new features or changing setup
- Test your changes across different browsers
- Ensure real-time features work with multiple users

### Areas for Contribution

- 🎨 **UI/UX improvements** and accessibility enhancements
- 🚀 **Performance optimizations** and code quality improvements
- 🧪 **Testing** - unit tests, integration tests, E2E tests
- 📚 **Documentation** improvements and examples
- 🌐 **Internationalization** support for multiple languages

## � License

This project is open source and available under the [MIT License](LICENSE).

## �️ Roadmap & Future Features

### 🎯 Phase 1: Core Enhancements (In Progress)

- [x] **Real-time collaboration** with live cursors and presence
- [x] **Multi-layer support** (Rectangle, Ellipse, Text, Note, Path)
- [x] **Advanced selection tools** with multi-select and layer ordering
- [x] **Undo/Redo system** with complete history tracking
- [ ] **Keyboard shortcuts** (Ctrl+Z, Ctrl+Y, Ctrl+C, Ctrl+V, etc.)
- [ ] **Copy/paste functionality** for layers across boards
- [ ] **Grid and snap-to-grid** for precise alignment

### 🚀 Phase 2: Advanced Tools (Planned)

- [ ] **Image upload and embedding** with drag-and-drop support
- [ ] **Export functionality** (PNG, SVG, PDF formats)
- [ ] **Template system** with pre-built layouts and components
- [ ] **Advanced text editing** with rich formatting options
- [ ] **Shape library** with additional geometric shapes and icons
- [ ] **Layer grouping** for complex object management

### 🌐 Phase 3: Collaboration & Sharing (Future)

- [ ] **Comments and annotations** system for feedback
- [ ] **Version history** with branching and restore functionality
- [ ] **Real-time chat integration** within boards
- [ ] **User permissions** (view-only, comment-only, full edit)
- [ ] **Public sharing** with embeddable boards
- [ ] **Team templates** and organization-wide assets

### 📱 Phase 4: Platform Expansion (Future)

- [ ] **Mobile app** (React Native) for iOS and Android
- [ ] **Desktop application** (Electron) for offline work
- [ ] **API for integrations** with third-party tools
- [ ] **Plugin system** for custom tools and extensions
- [ ] **Offline support** with automatic sync when reconnected

### ⚡ Phase 5: Performance & Scale (Future)

- [ ] **Canvas virtualization** for very large documents
- [ ] **Progressive loading** for faster initial render
- [ ] **Advanced caching** strategies for improved performance
- [ ] **Database optimization** for handling enterprise-scale usage
- [ ] **CDN integration** for global performance optimization

---

## 🌟 Acknowledgments

Built with ❤️ using modern web technologies:

- **Next.js** - The React framework for production
- **Liveblocks** - Real-time collaboration infrastructure
- **Convex** - The backend for real-time applications
- **Clerk** - Authentication and user management
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautifully designed components

Special thanks to the open-source community and the teams behind these amazing tools that make IronCanvas possible.

---

**Made with collaboration in mind. Build something amazing together!** 🚀
