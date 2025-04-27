import jwt from "jsonwebtoken";

export const protectUser = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: userId }
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};

export const protectVendor = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.vendor = decoded; // { id: vendorId }
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};
