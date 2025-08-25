const { Webhook } = require("svix");
const User = require("../models/userModel");

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payloadString = req.body.toString(); // raw body as string
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    console.log("Headers:", headers);
    console.log("Raw payload string:", payloadString);

    // ✅ verify raw payload
    const event = whook.verify(payloadString, headers);

    const { data, type } = event;
    console.log("Webhook received:", { type, userId: data?.id });

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          email: data.email_addresses[0].email_address,
          image: data.image_url,
        };
        await User.create(userData);
        console.log("User created:", userData);
        return res.json({ success: true });
      }

      case "user.updated": {
        const userData = {
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          email: data.email_addresses[0].email_address,
          image: data.image_url,
        };
        await User.findOneAndUpdate({ clerkId: data.id }, userData, {
          new: true,
        });
        console.log("User updated:", userData);
        return res.json({ success: true });
      }

      case "user.deleted": {
        await User.findOneAndDelete({ clerkId: data.id });
        console.log("User deleted:", data.id);
        return res.json({ success: true });
      }

      default:
        console.log("Unhandled webhook type:", type);
        return res.json({ success: true });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { clerkWebhooks };
