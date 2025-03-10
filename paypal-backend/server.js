require("dotenv").config();
console.log("🔍 PAYPAL_CLIENT_ID:", process.env.PAYPAL_CLIENT_ID ? "Loaded" : "Missing");
console.log("🔍 PAYPAL_CLIENT_SECRET:", process.env.PAYPAL_CLIENT_SECRET ? "Loaded" : "Missing");

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

const PAYPAL_API = "https://api-m.sandbox.paypal.com";
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// **Generate PayPal Access Token**
const generateAccessToken = async () => {
  try {
    const response = await axios.post(
      `${PAYPAL_API}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        auth: { username: CLIENT_ID, password: CLIENT_SECRET },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("🚨 Error generating PayPal access token:", error.response?.data || error.message);
    throw new Error("Failed to generate PayPal access token");
  }
};

// **Create PayPal Order**
app.post("/api/orders", async (req, res) => {
  try {
    const { totalAmount, currency = "USD", items = [] } = req.body;

    if (!totalAmount) {
      return res.status(400).json({ error: "Total amount is required" });
    }

    const accessToken = await generateAccessToken();
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: { currency_code: currency, value: totalAmount },
            items,
          },
        ],
      },
      { headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` } }
    );

    console.log("✅ PayPal Order Created:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("🚨 Error creating order:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// **Capture PayPal Payment & Send Confirmation Email**
app.post("/api/orders/:orderId/capture", async (req, res) => {
  try {
    const { orderId } = req.params;
    const accessToken = await generateAccessToken();

    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
      {},
      { headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` } }
    );

    console.log("✅ Full PayPal Response:", JSON.stringify(response.data, null, 2));

    // 🔹 Extract correct amount location
    const purchaseUnit = response.data.purchase_units?.[0];
    const captureDetails = purchaseUnit?.payments?.captures?.[0];

    if (!purchaseUnit || !captureDetails) {
      console.error("🚨 PayPal response missing necessary fields:", response.data);
      return res.status(500).json({ error: "Invalid PayPal response structure" });
    }

    // Extract transaction details safely
    const transactionID = captureDetails.id;
    const paymentStatus = captureDetails.status;
    const payerEmail = response.data.payer?.email_address || "No email provided";
    const totalAmount = captureDetails.amount.value;
    const currency = captureDetails.amount.currency_code;
    const items = purchaseUnit.items || [];

    console.log("✅ Payment Captured Successfully:", transactionID);

    // If payment is successful, send email
    if (paymentStatus === "COMPLETED") {
      await sendConfirmationEmail(payerEmail, transactionID, totalAmount, currency, items);
    }

    return res.json({
      success: true,
      message: "Payment captured successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("🚨 Error capturing payment:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to capture payment" });
  }
});

// ** Send Confirmation Email**
const sendConfirmationEmail = async (toEmail, transactionID, totalAmount, currency, items) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

    let itemDetails = items.length
      ? items.map((item) => `<li>${item.name} - ${item.quantity} x $${item.price} ${currency}</li>`).join("")
      : "No item details provided";

    const mailOptions = {
      from: EMAIL_USER,
      to: toEmail,
      subject: "Payment Confirmation - SLT Fire Foundation",
      html: `
        <h2>Thank you for your payment!</h2>
        <p><strong>Transaction ID:</strong> ${transactionID}</p>
        <p><strong>Amount Paid:</strong> $${totalAmount} ${currency}</p>
        <p><strong>Items Purchased:</strong></p>
        <ul>${itemDetails}</ul>
        <p>Your payment was successfully processed. If you have any questions, contact us at sltfirefoundation@gmail.com.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Confirmation email sent to ${toEmail}`);
  } catch (error) {
    console.error("🚨 Error sending confirmation email:", error);
  }
};

// ** Start the Server**
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 PayPal backend running on port ${PORT}`));
