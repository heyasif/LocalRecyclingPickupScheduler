import express from "express";
import { createPickup, getMyPickups, getVendorPickups, markPickupCompleted } from "../controllers/pickupController.js";
import { protectUser, protectVendor } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User side
router.post("/schedule-pickup", protectUser, createPickup);
router.get("/my-pickups", protectUser, getMyPickups);

// Vendor side
router.get("/vendor/pickups", protectVendor, getVendorPickups);
router.patch("/vendor/complete/:pickupId", protectVendor, markPickupCompleted);

export default router;
