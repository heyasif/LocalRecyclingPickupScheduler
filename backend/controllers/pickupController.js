import Pickup from "../models/Pickup.js";

export const createPickup = async (req, res) => {
  const { materialType, pickupDate, pickupTime, address } = req.body;

  if (!materialType || !pickupDate || !pickupTime || !address) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const pickup = await Pickup.create({
      userId: req.user.id,
      vendorId: "680dce69983cc7e47f36eaf7" ,// TODO: Replace manually with your real vendor's _id
      materialType,
      pickupDate,
      pickupTime,
      address,
    });

    res.status(201).json({ message: "Pickup scheduled successfully", pickup });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const getMyPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find({ userId: req.user.id });
    res.status(200).json(pickups);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const getVendorPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find({ vendorId: req.vendor.id });
    res.status(200).json(pickups);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const markPickupCompleted = async (req, res) => {
  const { pickupId } = req.params;

  try {
    const pickup = await Pickup.findById(pickupId);
    if (!pickup) {
      return res.status(404).json({ message: "Pickup not found" });
    }

    pickup.status = "Completed";
    await pickup.save();

    res.status(200).json({ message: "Pickup marked as completed", pickup });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
