import axios from 'axios';
import type { Schema } from '../../data/resource';

const PAYPAL_API = 'https://api-m.paypal.com';
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

// Function to generate PayPal access token
const generateAccessToken = async () => {
  try {
    const response = await axios.post(
      `${PAYPAL_API}/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        auth: { username: CLIENT_ID as string, password: CLIENT_SECRET as string},
      }
    );
    return response.data.access_token;
  } catch (error) {
    throw new Error('Failed to generate PayPal access token');
  }
};

// Lambda function for capturing PayPal order
export const handler: Schema['paypalHandlerCapture']['functionHandler'] = async (event) => {
  try {
    const { orderId } = event.arguments;

    // Validate orderId
    if (!orderId) {
      throw new Error('Order ID is required');
    }

    // Generate PayPal access token
    const accessToken = await generateAccessToken();

    // Capture PayPal order
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Return success response with data
    return "success";
  } catch (error: any) {
    console.error('Capture Order Error:', error.message || error);
    return error.message || 'Internal Server Error';
  }
};
