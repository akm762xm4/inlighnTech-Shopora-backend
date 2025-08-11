import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // You'll create this next
import authRoutes from "./routes/authRoutes.js"; // Import auth routes
import productRoutes from "./routes/productRoutes.js"; // Import product routes'
import orderRoutes from "./routes/orderRoutes.js"; // Import order routes

// Existing code...

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes); // Use product routes
app.use("/api/orders", orderRoutes);
// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
