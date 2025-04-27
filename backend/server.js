import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import pickupRoutes from "./routes/pickupRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});
// Routes
app.use("/api", userRoutes);
app.use("/api", vendorRoutes);
app.use("/api", pickupRoutes);

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

connectDB();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
