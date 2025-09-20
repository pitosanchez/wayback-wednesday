#!/bin/bash

# Create .env.local file with your Stripe key
cat > .env.local << 'EOF'
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51S9WMB008SnEQ5xyTVsEX4D3ikucs8xijDUNqKZ8KDq9xp9YAgsH9iYJZByejJ2LMkvV3prlYcbxxStmLmwIWCNI00Pi984ki1

# Firebase Configuration (Add these when you set up Firebase)
# VITE_FIREBASE_API_KEY=
# VITE_FIREBASE_AUTH_DOMAIN=
# VITE_FIREBASE_PROJECT_ID=
# VITE_FIREBASE_STORAGE_BUCKET=
# VITE_FIREBASE_MESSAGING_SENDER_ID=
# VITE_FIREBASE_APP_ID=

# Admin Configuration
# VITE_ADMIN_PASS_HASH=
# VITE_ADMIN_SESSION_HOURS=12

# Preview/Maintenance Gate (Optional)
# VITE_PREVIEW_TOKEN=
EOF

echo "✅ Created .env.local with your Stripe key!"
echo "📝 Your Stripe key has been configured."
echo ""
echo "Next steps:"
echo "1. Restart your development server:"
echo "   npm run dev"
echo ""
echo "2. Test with Stripe's test card:"
echo "   Card: 4242 4242 4242 4242"
echo "   Expiry: Any future date (e.g., 12/34)"
echo "   CVC: Any 3 digits (e.g., 123)"
echo ""
echo "🎉 Your payment system should now work!"
