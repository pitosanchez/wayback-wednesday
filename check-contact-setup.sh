#!/bin/bash

echo "🔍 Contact Page Setup Diagnostic"
echo "=================================="
echo ""

# Check 1: Frontend Environment Variable
echo "1️⃣ Checking Frontend API URL Configuration..."
if grep -q "VITE_API_URL" .env 2>/dev/null || grep -q "VITE_API_URL" .env.local 2>/dev/null; then
    API_URL=$(grep "VITE_API_URL" .env .env.local 2>/dev/null | head -1 | cut -d'=' -f2)
    echo "   ✅ VITE_API_URL is set: $API_URL"
else
    echo "   ❌ VITE_API_URL is NOT set in .env or .env.local"
    echo "   💡 Add: VITE_API_URL=http://localhost:3001 (dev) or https://api.yourdomain.com (prod)"
fi
echo ""

# Check 2: Backend Server Status
echo "2️⃣ Checking Backend Server Status..."
if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "   ✅ Backend server is running on port 3001"
    HEALTH=$(curl -s http://localhost:3001/api/health)
    echo "   Response: $HEALTH"
else
    echo "   ❌ Backend server is NOT running on port 3001"
    echo "   💡 Start backend: cd api && npm run dev"
fi
echo ""

# Check 3: Backend Environment Variables
echo "3️⃣ Checking Backend Environment Variables..."
if [ -f "api/.env" ]; then
    echo "   ✅ Backend .env file exists"
    
    if grep -q "FRONTEND_URL" api/.env; then
        FRONTEND_URL=$(grep "FRONTEND_URL" api/.env | cut -d'=' -f2)
        echo "   ✅ FRONTEND_URL: $FRONTEND_URL"
    else
        echo "   ❌ FRONTEND_URL is NOT set"
    fi
    
    if grep -q "RESEND_API_KEY" api/.env; then
        RESEND=$(grep "RESEND_API_KEY" api/.env | cut -d'=' -f2 | cut -c1-10)
        echo "   ✅ RESEND_API_KEY is set: ${RESEND}..."
    else
        echo "   ❌ RESEND_API_KEY is NOT set"
    fi
    
    if grep -q "EMAIL_FROM" api/.env; then
        EMAIL_FROM=$(grep "EMAIL_FROM" api/.env | cut -d'=' -f2)
        echo "   ✅ EMAIL_FROM: $EMAIL_FROM"
    else
        echo "   ❌ EMAIL_FROM is NOT set"
    fi
    
    if grep -q "CONTACT_TO" api/.env; then
        CONTACT_TO=$(grep "CONTACT_TO" api/.env | cut -d'=' -f2)
        echo "   ✅ CONTACT_TO: $CONTACT_TO"
    else
        echo "   ❌ CONTACT_TO is NOT set"
    fi
else
    echo "   ❌ Backend .env file does NOT exist"
    echo "   💡 Create: cd api && cp .env.example .env"
fi
echo ""

# Check 4: CORS Configuration Match
echo "4️⃣ Checking CORS Configuration..."
FRONTEND_ENV_URL=$(grep "VITE_API_URL" .env .env.local 2>/dev/null | head -1 | cut -d'=' -f2 | sed 's|http://localhost:3001||' | sed 's|https://api.*||')
BACKEND_FRONTEND_URL=$(grep "FRONTEND_URL" api/.env 2>/dev/null | cut -d'=' -f2)

if [ -n "$BACKEND_FRONTEND_URL" ]; then
    echo "   Backend FRONTEND_URL: $BACKEND_FRONTEND_URL"
    echo "   Expected frontend origin: http://localhost:5173 (dev) or your production domain"
    echo "   💡 Ensure FRONTEND_URL matches your frontend's origin exactly"
else
    echo "   ⚠️  Cannot verify CORS - FRONTEND_URL not found"
fi
echo ""

# Check 5: Test Contact Endpoint (if backend is running)
echo "5️⃣ Testing Contact Endpoint..."
if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    TEST_RESPONSE=$(curl -s -X POST http://localhost:3001/api/contact \
        -H "Content-Type: application/json" \
        -d '{"name":"Test","email":"test@example.com","message":"Test message"}' 2>&1)
    
    if echo "$TEST_RESPONSE" | grep -q "ok"; then
        echo "   ✅ Contact endpoint is responding"
    elif echo "$TEST_RESPONSE" | grep -q "CORS"; then
        echo "   ⚠️  CORS error detected - check FRONTEND_URL in backend"
    else
        echo "   ⚠️  Contact endpoint response: $TEST_RESPONSE"
    fi
else
    echo "   ⏭️  Skipping - backend server not running"
fi
echo ""

echo "=================================="
echo "✅ Diagnostic complete!"
echo ""
echo "Next steps if issues found:"
echo "1. Set VITE_API_URL in .env or .env.local"
echo "2. Start backend: cd api && npm run dev"
echo "3. Ensure backend .env has all required variables"
echo "4. Verify FRONTEND_URL in backend matches frontend origin"
