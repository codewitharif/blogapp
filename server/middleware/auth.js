const jwt = require("jsonwebtoken");

// middleware function to decode and verify jwt token to get clerkId
const authUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login Again.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.CLERK_JWT_SECRET);
    req.clerkId = decoded.clerkId; // set clerkId in request object

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = authUser;
