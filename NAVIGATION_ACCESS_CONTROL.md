# Navigation Access Control Documentation

## Overview

The Wayback Wednesday platform implements role-based navigation access control to ensure that administrative features (Dashboard, Analytics, Admin Sign In) are only visible to authenticated administrators.

## Implementation Details

### 1. Navigation Item Filtering

The navigation system now filters items based on the user's authentication status:

- **Public Users**: See only the main navigation items (About, Music, Shop, Events, etc.)
- **Authenticated Admins**: See all navigation items including Dashboard and Analytics

### 2. Components Modified

#### HeroNav Component (`src/components/Nav/HeroNav.tsx`)

- Filters navigation items before rendering
- Shows "Admin Access →" link for non-authenticated users
- Displays "Admin Controls" section with sign-out for authenticated admins
- Removes admin items from the menu for public users

#### HomeHero Component (`src/components/Hero/HomeHero.tsx`)

- Uses `useAdminAuth` hook to check authentication status
- Conditionally passes USER_NAV_ITEMS only to authenticated users
- Maintains clean navigation for public visitors

#### App Component (`src/App.tsx`)

- Filters navigation items in the main navigation bar
- Only includes admin items when user is authenticated
- Maintains consistent behavior across all non-hero pages

### 3. Navigation Structure

```typescript
// Public Navigation Items (Always Visible)
MAIN_NAV_ITEMS = ["About", "Music", "Shop", "Events", "Wayback Whensday"];

// Admin Navigation Items (Only for Authenticated Admins)
USER_NAV_ITEMS = [
  "Dashboard",
  "Analytics",
  "Admin Sign In", // Hidden when already authenticated
];
```

### 4. Authentication Flow

1. **Public User Visit**:

   - Sees only MAIN_NAV_ITEMS
   - Can access "Admin Access →" link at bottom of menu
   - Clicking admin link navigates to `/admin-signin`

2. **Admin Sign In**:

   - Admin enters password on sign-in page
   - Password is hashed using SHA-256
   - Compared against VITE_ADMIN_PASS_HASH environment variable
   - Session stored with configurable expiry (default 12 hours)

3. **Authenticated Admin**:
   - Sees all navigation items
   - Admin items marked with green indicator
   - "Admin Controls" section appears with sign-out option
   - Sign out clears session and redirects to home

### 5. Security Features

- **Session-based Authentication**: Uses sessionStorage with expiry
- **SHA-256 Password Hashing**: Passwords never stored in plain text
- **Rate Limiting**: Failed login attempts trigger lockout
- **Environment Variable Protection**: Sensitive data in .env files
- **Route Protection**: AdminRoute component guards admin pages

### 6. User Experience

#### For Public Users:

- Clean, uncluttered navigation
- No confusing admin options
- Clear path to admin access if needed

#### For Admins:

- Full access to all features
- Visual indicators for admin status
- Easy sign-out option
- Persistent session across page refreshes

### 7. Testing the Implementation

1. **As a Public User**:

   ```bash
   # Visit the site without authentication
   # Verify only public nav items are visible
   # Check that Dashboard/Analytics are not shown
   ```

2. **As an Admin**:

   ```bash
   # Navigate to /admin-signin
   # Enter admin password
   # Verify Dashboard/Analytics appear in navigation
   # Check green indicator on admin items
   ```

3. **Session Persistence**:
   ```bash
   # Sign in as admin
   # Refresh the page
   # Verify admin access is maintained
   # Wait for session expiry
   # Verify automatic sign-out
   ```

### 8. Configuration

Set these environment variables:

```env
# Admin password hash (SHA-256)
VITE_ADMIN_PASS_HASH=your_password_hash_here

# Session duration in hours (optional, default: 12)
VITE_ADMIN_SESSION_HOURS=12
```

To generate a password hash:

```javascript
// In browser console
async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Generate hash for your password
sha256("your-secure-password").then(console.log);
```

### 9. Best Practices

1. **Never commit real passwords or hashes to version control**
2. **Use strong, unique admin passwords**
3. **Rotate admin passwords regularly**
4. **Monitor failed login attempts**
5. **Set appropriate session timeouts**
6. **Use HTTPS in production**

### 10. Troubleshooting

**Issue**: Admin items still visible after sign out

- **Solution**: Clear browser cache and sessionStorage

**Issue**: Can't access admin features after sign in

- **Solution**: Check VITE_ADMIN_PASS_HASH is set correctly

**Issue**: Session expires too quickly/slowly

- **Solution**: Adjust VITE_ADMIN_SESSION_HOURS

## Summary

The navigation access control system provides a secure, user-friendly way to manage administrative features while keeping the public interface clean and focused. The implementation ensures that sensitive admin functionality is properly protected while maintaining a smooth user experience for both public visitors and administrators.
