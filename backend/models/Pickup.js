import mongoose from "mongoose";

const pickupSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  materialType: { type: String, required: true },
  pickupDate: { type: Date, required: true },
  pickupTime: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, default: "Scheduled" }
});

export default mongoose.model("Pickup", pickupSchema);
