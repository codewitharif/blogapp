const express = require("express");
const { clerkWebhooks } = require("../controllers/userController");
const authUser = require("../middleware/auth");
const userRouter = express.Router();

userRouter.post("/webhooks", clerkWebhooks);

module.exports = userRouter;
