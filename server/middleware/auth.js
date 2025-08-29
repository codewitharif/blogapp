const { getAuth } = require("@clerk/express");

const authUser = (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login Again.",
      });
    }

    req.clerkId = userId; // Clerk user ID
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = authUser;
