/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Ensure Next.js App Router features are enabled
  },
  env: {
    NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  },
  images: {
    domains: [
      "amplify-d3h9m824z08a60-ma-sltfirestoragebucket5d60-tyvsluifahjj.s3.us-west-2.amazonaws.com",
      "s3.us-west-2.amazonaws.com",
      "sltffimagetestbucket.s3.us-west-2.amazonaws.com", // ✅ added your new bucket
    ],
  },
};

module.exports = nextConfig;
