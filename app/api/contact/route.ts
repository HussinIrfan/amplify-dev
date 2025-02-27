import { NextRequest, NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Load AWS credentials from environment variables
const ses = new SESClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, subject, message } = await req.json();

    const params = {
      Destination: { ToAddresses: ["support@sltfirefoundation.org"] },
      Message: {
        Body: {
          Text: { Data: `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`, },
        },
        Subject: { Data: subject },
      },
      Source: process.env.AWS_SES_FROM_EMAIL!,
    };

    await ses.send(new SendEmailCommand(params));
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("SES Error:", error);
    return NextResponse.json({ error: "Email sending failed" }, { status: 500 });
  }
}
