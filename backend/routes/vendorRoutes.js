import express from "express";
import {signupVendor, vendorLogin } from "../controllers/vendorController.js";

const router = express.Router();

router.post("/vendor-login", vendorLogin);
router.post("/create-vendor", signupVendor);

export default router;
