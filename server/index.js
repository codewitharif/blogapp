const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

// Routes
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");

const { clerkMiddleware } = require("@clerk/express");
const { clerkWebhooks } = require("./controllers/userController");

// Load env vars
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
// app.use(clerkMiddleware());
// app.use("/api/users/webhooks", express.raw({ type: "application/json" }));
app.use(
  "/api/users/",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

app.use(express.json()); // to handle JSON payloads

// Connect to DB
connectDB();

// Routes
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

// Health check route
app.get("/", (req, res) => {
  res.send("🚀 Blog API is running...");
});

// Error handler (optional)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
