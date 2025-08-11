import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import { sampleProducts } from "./data/products.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`Seeded ${inserted.length} products 🌱`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
