#!/bin/bash

# Append admin configuration to .env.local
cat >> .env.local << 'EOF'

# Admin Configuration
VITE_ADMIN_PASS_HASH=bc53dff8eed6f48184cd92d59053ee0e09640e4c07d973170d76e7fcb64cd765
VITE_ADMIN_SESSION_HOURS=12
EOF

echo "✅ Admin password hash added to .env.local!"
echo ""
echo "🔐 Admin Access Configuration Complete!"
echo ""
echo "Your admin password: Gv2!25343038"
echo ""
echo "To access admin features:"
echo "1. Restart your dev server (Ctrl+C then npm run dev)"
echo "2. Go to: http://localhost:5173/#/admin-signin"
echo "3. Enter password: Gv2!25343038"
echo ""
echo "Once signed in, you'll have access to:"
echo "✅ Dashboard"
echo "✅ Analytics"
echo "✅ Admin features"
echo ""
echo "These pages will ONLY be visible to you when authenticated!"
