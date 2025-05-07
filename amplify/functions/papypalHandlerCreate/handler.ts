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

// Lambda function for creating PayPal order
export const handler: Schema['paypalHandlerCreate']['functionHandler'] = async (event) => {
  try {
    const { totalAmount, currency = 'USD' } = event.arguments;

    // Validate totalAmount
    if (!totalAmount || totalAmount <= 0) {
      throw new Error('Invalid amount');
    }

    // Generate PayPal access token
    const accessToken = await generateAccessToken();

    // Create PayPal order
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      {
        intent: 'CAPTURE',
        purchase_units: [{ amount: { currency_code: currency, value: totalAmount } }],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Return the order ID from PayPal's response
    return response.data.id;
  } catch (error: any) {
    console.error('Create Order Error:', error.message || error);
    return error.message || 'Internal Server Error';
  }
};
