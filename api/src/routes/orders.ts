import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "../middleware/validation";
import admin from "firebase-admin";

const router = Router();

// Initialize Firestore
const db = admin.firestore();

// Validation schemas
const createOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      name: z.string(),
      price: z.number().positive(),
      quantity: z.number().positive().int(),
      variant: z
        .object({
          size: z.string().optional(),
          color: z.string().optional(),
        })
        .optional(),
    })
  ),
  shippingAddress: z.object({
    name: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string().default("US"),
  }),
  billingAddress: z
    .object({
      name: z.string(),
      street: z.string(),
      city: z.string(),
      state: z.string(),
      zipCode: z.string(),
      country: z.string().default("US"),
    })
    .optional(),
  paymentIntentId: z.string(),
  total: z.number().positive(),
  subtotal: z.number().positive(),
  tax: z.number().min(0),
  shipping: z.number().min(0),
});

// Create order
router.post("/", validateRequest(createOrderSchema), async (req, res) => {
  try {
    const userId = (req as any).user.uid; // From auth middleware
    const orderData = {
      ...req.body,
      userId,
      status: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const orderRef = await db.collection("orders").add(orderData);

    res.status(201).json({
      id: orderRef.id,
      ...orderData,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Get user's orders
router.get("/my-orders", async (req, res) => {
  try {
    const userId = (req as any).user.uid;

    const ordersSnapshot = await db
      .collection("orders")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    const orders = ordersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(orders);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Get single order
router.get("/:orderId", async (req, res) => {
  try {
    const userId = (req as any).user.uid;
    const { orderId } = req.params;

    const orderDoc = await db.collection("orders").doc(orderId).get();

    if (!orderDoc.exists) {
      return res.status(404).json({ error: "Order not found" });
    }

    const orderData = orderDoc.data()!;

    // Check if user owns this order
    if (orderData.userId !== userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    return res.json({
      id: orderDoc.id,
      ...orderData,
    });
  } catch (error) {
    console.error("Failed to fetch order:", error);
    return res.status(500).json({ error: "Failed to fetch order" });
  }
});

// Update order status (admin only)
router.patch("/:orderId/status", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // TODO: Add admin check

    await db.collection("orders").doc(orderId).update({
      status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Failed to update order:", error);
    res.status(500).json({ error: "Failed to update order" });
  }
});

export { router as ordersRouter };
