const express = require("express");
const accountRoutes = require("./routes/accountRoutes");
const payoutRoutes = require("./routes/payoutRoutes");
const webhookHandler = require("./webhooks/webhookHandler");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

// Routes
app.use("/api", accountRoutes);
app.use("/api", payoutRoutes);

// Webhooks
app.post(
  "/webhooks",
  express.raw({ type: "application/json" }),
  webhookHandler.handleWebhook
);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
