# IronCanvas - Collaborative Drawing Board

A real-time collaborative drawing application built with Next.js, Liveblocks, and Convex. Create, edit, and collaborate on digital canvases with multiple users simultaneously.

## 🚀 Features

- **Real-time Collaboration**: Multiple users can draw and edit simultaneously
- **Shape Tools**: Rectangle, Ellipse, and Pen tools for versatile drawing
- **Color Picker**: 10 predefined colors for styling layers
- **Layer Management**: Select, move, resize, and delete layers
- **Live Cursors**: See other users' cursors in real-time
- **Selection Tools**: Multi-select and bulk operations
- **Responsive Design**: Works across different screen sizes
- **Organization Support**: Clerk authentication with organization management

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Real-time**: Liveblocks (WebSocket-based collaboration)
- **Backend**: Convex (Real-time database and API)
- **Authentication**: Clerk
- **UI Components**: Radix UI, Lucide Icons
- **Styling**: Tailwind CSS, Shadcn/ui

## � Prerequisites

Before setting up IronCanvas, ensure you have:

- **Node.js 18+** - Latest LTS version recommended
- **npm or yarn** - Package manager
- **Git** - Version control
- **Clerk Account** - For authentication ([clerk.com](https://clerk.com))
- **Liveblocks Account** - For real-time features ([liveblocks.io](https://liveblocks.io))
- **Convex Account** - For backend/database ([convex.dev](https://convex.dev))

## �📦 Installation

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

### Layer Types

The application supports these layer types:

- **Rectangle Layer**: Geometric rectangles with position, size, and fill color
- **Ellipse Layer**: Geometric circles/ovals with position, size, and fill color
- **Path Layer**: Free-form drawing paths with vector points
- **Text Layer**: Text elements (structure defined, implementation pending)
- **Note Layer**: Sticky note-style elements (structure defined, implementation pending)

### Selection & Editing

- **Selection Tool**: Click to select individual layers
- **Multi-select**: Click multiple layers to select them together
- **Move**: Drag selected layers to reposition them
- **Resize**: Use corner handles to resize rectangular and elliptical layers
- **Delete**: Use the delete layers hook to remove selected elements
- **Color Change**: Use selection tools to change fill colors of selected layers

### Keyboard Shortcuts

- **Delete**: Remove selected layers
- **Undo/Redo**: Navigation through canvas history (via toolbar)

### Color System

The application uses a predefined color palette defined in `lib/utils.ts`:

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

## 🔧 Development

### Database Schema (Convex)

#### Boards Table

```typescript
{
  title: string,           // Board title
  orgId: string,          // Organization ID from Clerk
  authorId: string,       // User ID who created the board
  authorName: string,     // Display name of the author
  imageUrl: string,       // Thumbnail/preview image URL
}
```

#### User Favorites Table

```typescript
{
  orgId: string,          // Organization ID
  userId: string,         // User ID who favorited
  boardId: Id<"boards">   // Reference to favorited board
}
```

### API Endpoints

#### Convex Mutations

- `board.create` - Create a new board
- `board.remove` - Delete a board
- `board.update` - Update board metadata
- `board.favorite` - Add board to user favorites
- `board.unfavorite` - Remove board from user favorites

#### Convex Queries

- `board.get` - Get single board by ID
- `boards.get` - Get boards list with filtering and search

### Custom Hooks

#### `useSelectionBounds`

Calculates bounding box for selected layers:

```typescript
const bounds = useSelectionBounds();
// Returns: { x, y, width, height } | null
```

#### `useDeleteLayers`

Handles layer deletion with proper cleanup:

```typescript
const deleteLayers = useDeleteLayers();
// Usage: deleteLayers() - deletes currently selected layers
// Automatically clears selection and updates layer arrays
```

#### `useApiMutation` (from Convex helpers)

Provides mutation state management:

```typescript
const { mutate, pending } = useApiMutation(api.board.create);
```

### Liveblocks Configuration

#### Presence Type

```typescript
type Presence = {
  cursor: { x: number; y: number } | null;
  selection: string[]; // Array of selected layer IDs
};
```

#### Storage Type

```typescript
type Storage = {
  layers: LiveMap<string, LiveObject<Layer>>; // All canvas layers
  layerIds: LiveList<string>; // Ordered list of layer IDs
};
```

### Key Components

#### Canvas (`canvas.tsx`)

- Main drawing surface with SVG rendering
- Tool state management (Rectangle, Ellipse, Pen, Selection)
- Pointer event handling for drawing and selection
- Camera system for pan/zoom
- Layer rendering and interaction

#### Toolbar (`toolbar.tsx`)

- Tool selection interface
- Undo/redo functionality via Liveblocks history
- Visual feedback for active tools

#### Selection Tools (`selection-tools.tsx`)

- Floating toolbar that appears above selected layers
- Color picker integration
- Mutation handling for layer property changes

#### Layer Preview (`layer-preview.tsx`)

- Renders individual layers based on type
- Handles Rectangle, Ellipse, and Path layer rendering
- Applies fill colors and transformations

#### Color Picker (`color-picker.tsx`)

- Displays all available colors from utils.ts
- Converts hex colors to RGB format for layer storage
- Handles color selection and mutation triggering

### Authentication & Authorization

The app uses Clerk for authentication with organization support:

- **Organization-based access**: Boards belong to organizations
- **Role-based permissions**: Managed through Clerk
- **Liveblocks auth**: Custom endpoint validates access to rooms
- **Board ownership**: Tracked via authorId and orgId

### Real-time Architecture

#### Liveblocks Integration

- **Room-based collaboration**: Each board is a separate Liveblocks room
- **Conflict-free updates**: Automatic conflict resolution for concurrent edits
- **Presence sharing**: Real-time cursor positions and selections
- **History tracking**: Built-in undo/redo with Liveblocks history

#### Data Flow

1. User actions trigger local state updates
2. Liveblocks syncs changes to all connected clients
3. Storage mutations update the shared canvas state
4. Components re-render based on storage changes
5. Presence updates broadcast user interactions

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

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

#### Real-time sync not working

- Check Liveblocks secret key configuration
- Verify room IDs match between components
- Check browser console for WebSocket connection errors

### Environment Variables Checklist

```env
# Required for Convex
CONVEX_DEPLOYMENT=your-deployment-name
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Required for Liveblocks
LIVEBLOCKS_SECRET_KEY=sk_prod_...
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=pk_prod_...

# Required for Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## 🆘 Support

If you encounter any issues:

1. Check the [documentation](docs/)
2. Open an issue on GitHub
3. Contact the development team

## 🔮 Roadmap

### Phase 1 - Core Enhancements

- [ ] Text layers with rich text editing
- [ ] Layer ordering (bring to front/back, z-index control)
- [ ] Copy/paste functionality
- [ ] Keyboard shortcuts (Ctrl+C, Ctrl+V, Ctrl+Z, etc.)

### Phase 2 - Advanced Features

- [ ] Image upload and embedding
- [ ] Export functionality (PNG, SVG, PDF)
- [ ] Templates and presets
- [ ] Grid/snap-to-grid functionality
- [ ] Rulers and guides

### Phase 3 - Collaboration

- [ ] Comments and annotations
- [ ] Version history and branching
- [ ] Real-time chat integration
- [ ] User permissions (view-only, edit access)

### Phase 4 - Platform

- [ ] Mobile app support (React Native)
- [ ] Desktop app (Electron)
- [ ] API for third-party integrations
- [ ] Plugin system

### Performance & Quality

- [ ] Canvas virtualization for large documents
- [ ] Progressive loading
- [ ] Offline support with sync
- [ ] Comprehensive testing suite
- [ ] Accessibility improvements

---

Built with ❤️ using Next.js, Liveblocks, and Convex.
