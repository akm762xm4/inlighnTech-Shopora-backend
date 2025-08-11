// routes/orderRoutes.ts
import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
} from "../controllers/orderControllers.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/:userId", getUserOrders);
router.get("/single/:id", getOrderById);

export default router;
