# Stripe Payment Integration

This document outlines the Stripe payment integration implemented in the Wayback Wednesday React application.

## Overview

The integration provides secure credit/debit card processing using Stripe Elements with the following features:

- **Secure Payment Processing**: PCI DSS compliant payment handling
- **Real-time Card Validation**: Instant feedback on card details
- **Responsive Design**: Mobile-friendly payment forms
- **Error Handling**: Comprehensive error management
- **Cart Integration**: Seamless checkout flow from shopping cart
- **TypeScript Support**: Full type safety throughout

## Architecture

### Components Structure

```
src/
├── components/
│   ├── Cart/
│   │   ├── CartIcon.tsx           # Cart icon with item count
│   │   ├── CartDrawer.tsx         # Sliding cart panel
│   │   ├── CartItem.tsx           # Individual cart item
│   │   ├── AddToCartButton.tsx    # Reusable add to cart button
│   │   └── CartDemo.tsx           # Cart functionality demo
│   └── Stripe/
│       ├── StripePaymentForm.tsx  # Main payment form
│       └── StripeDemo.tsx         # Stripe integration demo
├── pages/
│   └── Checkout.tsx               # Complete checkout page
├── context/
│   └── CartContext.tsx            # Cart state management
├── hooks/
│   └── useLocalStorage.ts         # localStorage persistence
├── services/
│   └── stripeService.ts           # Stripe API interactions
├── types/
│   ├── cart.ts                    # Cart-related types
│   └── stripe.ts                  # Stripe-related types
└── config/
    └── stripe.ts                  # Stripe configuration
```

### Key Features

#### 1. Shopping Cart System

- **Persistent Storage**: Cart data persists across browser sessions using localStorage
- **Quantity Management**: Add, remove, and update item quantities
- **Product Variants**: Support for size and color options
- **Real-time Totals**: Automatic calculation of subtotals and totals

#### 2. Stripe Payment Processing

- **Card Elements**: Secure card input using Stripe Elements
- **Payment Intents**: Server-side payment processing (demo mode)
- **Billing Information**: Complete billing address collection
- **Error Handling**: User-friendly error messages and validation

#### 3. Checkout Flow

- **Order Summary**: Clear breakdown of items, taxes, and totals
- **Form Validation**: Real-time validation of payment and billing info
- **Success Handling**: Order confirmation and cart clearing
- **Responsive Design**: Mobile-optimized checkout experience

## Setup Instructions

### 1. Install Dependencies

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### 2. Environment Configuration

Create a `.env` file in your project root:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

**Note**: The current implementation includes a demo key for testing purposes.

### 3. Stripe Account Setup

1. Create a [Stripe account](https://stripe.com)
2. Get your publishable key from the Stripe Dashboard
3. Replace the demo key in `src/config/stripe.ts`

### 4. Backend Requirements (Production)

For production deployment, you'll need a backend API to handle:

#### Payment Intent Creation

```javascript
// Example Node.js/Express endpoint
app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency: currency,
  });

  res.send({
    client_secret: paymentIntent.client_secret,
  });
});
```

#### Webhook Handling

```javascript
// Handle Stripe webhooks for payment confirmation
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      // Handle successful payment
    }

    res.json({ received: true });
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
```

## Usage Examples

### Basic Payment Form

```tsx
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../config/stripe";
import StripePaymentForm from "../components/Stripe/StripePaymentForm";

function PaymentPage() {
  const handlePaymentSuccess = (result) => {
    console.log("Payment successful:", result);
  };

  const handlePaymentError = (error) => {
    console.error("Payment failed:", error);
  };

  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm
        amount={29.99}
        currency="usd"
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
      />
    </Elements>
  );
}
```

### Cart Integration

```tsx
import { useCart } from "../context/CartContext";
import AddToCartButton from "../components/Cart/AddToCartButton";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <AddToCartButton product={product} className="btn-primary" />
    </div>
  );
}
```

## Testing

### Test Card Numbers

Use these test card numbers in development:

| Card Number         | Brand      | Description        |
| ------------------- | ---------- | ------------------ |
| 4242 4242 4242 4242 | Visa       | Succeeds           |
| 4000 0000 0000 0002 | Visa       | Declined           |
| 4000 0000 0000 9995 | Visa       | Insufficient funds |
| 5555 5555 5555 4444 | Mastercard | Succeeds           |

### Test Data

- **Expiry**: Any future date (e.g., 12/25)
- **CVC**: Any 3-digit number (e.g., 123)
- **ZIP**: Any 5-digit number (e.g., 12345)

## Security Considerations

1. **Never store card details**: Stripe handles all sensitive card data
2. **Use HTTPS**: Always serve your application over HTTPS in production
3. **Validate on server**: Always validate payments on your backend
4. **Environment variables**: Store keys securely using environment variables
5. **Webhook verification**: Verify webhook signatures to prevent fraud

## Customization

### Styling Card Elements

```tsx
const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

<CardElement options={cardElementOptions} />;
```

### Custom Payment Flow

```tsx
const handleCustomPayment = async () => {
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: "card",
    card: cardElement,
    billing_details: billingDetails,
  });

  if (error) {
    // Handle error
    return;
  }

  // Confirm payment with your backend
  const response = await fetch("/confirm-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      payment_method_id: paymentMethod.id,
      amount: amount * 100,
    }),
  });
};
```

## Troubleshooting

### Common Issues

1. **"Stripe has not been properly initialized"**

   - Ensure `stripePromise` is loaded before rendering Elements
   - Check your publishable key is correct

2. **Card element not appearing**

   - Verify Stripe Elements are wrapped in `<Elements>` provider
   - Check for JavaScript errors in console

3. **Payment not processing**
   - Ensure backend is creating payment intents correctly
   - Verify webhook endpoints are configured

### Debug Mode

Enable debug logging in development:

```tsx
// In your stripe config
const stripePromise = loadStripe(publishableKey, {
  stripeAccount: "acct_test_account_id", // Optional
});
```

## Production Deployment

### Checklist

- [ ] Replace test keys with live keys
- [ ] Set up webhook endpoints
- [ ] Configure HTTPS
- [ ] Implement proper error logging
- [ ] Set up monitoring and alerts
- [ ] Test payment flow end-to-end
- [ ] Configure tax calculation
- [ ] Set up order management system

### Environment Variables

```env
# Production
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
STRIPE_SECRET_KEY=sk_live_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## Support

For additional help:

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe React Documentation](https://stripe.com/docs/stripe-js/react)
- [Stripe Testing Guide](https://stripe.com/docs/testing)

## License

This integration is part of the Wayback Wednesday project and follows the same licensing terms.
