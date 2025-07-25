# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Vite
- `npm run build` - TypeScript compilation + Vite production build
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## Architecture Overview

This is a React 19 + TypeScript e-commerce application for "Wayback Wednesday" (vintage/retro merchandise) using Vite as the build tool.

### State Management
- **React Context API** for global state (no Redux/Zustand)
- **AuthContext**: Manages Firebase authentication, user profiles, preferences
- **CartContext**: Shopping cart with localStorage persistence, inventory integration
- All contexts provide comprehensive error handling and loading states

### Authentication System
- **Firebase Auth** with email/password authentication
- **Demo configuration** in `src/config/firebase.ts` with emulator support
- **Protected routes** using `ProtectedRoute` and `AdminRoute` components
- **User data** stored in Firestore with profiles and preferences
- Email verification, password reset, and account management features

### E-commerce Architecture
- **Service layer pattern** with dedicated services (`src/services/`)
- **Stripe integration** for payments (demo keys configured)
- **Inventory management** with localStorage persistence and stock tracking
- **Product variants** (size, color) with comprehensive type definitions
- **Cart persistence** in localStorage with key `wayback-cart`

### Data Flow
1. **Services** handle all external API calls (Firebase, Stripe, mock data)
2. **Contexts** manage global state and provide data to components
3. **Components** are organized by feature domains (Auth, Cart, Product, etc.)
4. **Types** directory contains comprehensive TypeScript interfaces

### Key Integrations
- **Firebase**: Auth, Firestore, Storage with offline support
- **Stripe**: Payment processing with both Payment Intents and Checkout Sessions
- **GSAP**: Animations (excluded from Vite optimizeDeps)
- **Tailwind CSS**: Custom color palette with design system

### Development Environment
- **Base path**: `/wayback-wednesday/` in production, `/` in development
- **TypeScript**: Strict mode enabled with comprehensive type checking
- **No testing framework** currently configured
- **HashRouter** used for routing (React Router DOM)

### Data Persistence Strategy
- **Authentication state**: Firebase Auth persistence
- **Cart data**: localStorage (`wayback-cart`)
- **Inventory**: localStorage (`wayback-inventory`) 
- **User preferences**: Firestore with offline caching
- **Analytics**: Service-based with localStorage fallback

### Component Patterns
- **Index files** for clean imports from component directories
- **Feature-based organization** (Auth/, Cart/, Product/, etc.)
- **Comprehensive TypeScript interfaces** for all data structures
- **Error boundaries** not implemented - consider adding for production

### Recent Features
Based on git status, recently added:
- Advanced analytics dashboard with business intelligence
- Enhanced product features and variants
- Comprehensive reporting system

### Development Notes
- Mock data used for most services (reviews, inventory, analytics)
- Firebase emulator ready for local development
- Stripe demo keys configured - update for production
- Custom color system: denim-blue, fire-red, sunshine-yellow, warm-white, rich-black