require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PAYPAL_API = "https://api-m.paypal.com";
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
// Test route
app.get("/test", (req, res) => {
  res.json({ message: "CORS is working" });
});
const generateAccessToken = async () => {
  const response = await axios.post(
    `${PAYPAL_API}/v1/oauth2/token`,
    "grant_type=client_credentials",
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      auth: { username: CLIENT_ID, password: CLIENT_SECRET },
    }
  );
  return response.data.access_token;
};

app.post("/api/orders", async (req, res) => {
  try {
    const { totalAmount, currency = "USD" } = req.body;
    console.log("totalammount",totalAmount)
    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const accessToken = await generateAccessToken();
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [{ amount: { currency_code: currency, value: totalAmount } }],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Create Order Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to create order" });
  }
});

app.post("/api/orders/:orderId/capture", async (req, res) => {
  try {
    const accessToken = await generateAccessToken();
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${req.params.orderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ success: true, data: response.data });
  } catch (err) {
    console.error("Capture Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to capture order" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));