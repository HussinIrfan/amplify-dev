import { NextRequest, NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Function to send an email
export async function POST(req: NextRequest) {
  try {
    const ses = new SESClient({
      region: "us-west-2", // Hardcoded region (replace with your desired region)
    });

    const { firstName, lastName, email, phone, subject, message } = await req.json();

    const params = {
      Destination: { ToAddresses: ["support@sltfirefoundation.org"] }, // Hardcoded email
      Message: {
        Body: {
          Text: { Data: `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}` },
        },
        Subject: { Data: subject },
      },
      Source: "support@sltfirefoundation.org", // Hardcoded sender email
    };

    await ses.send(new SendEmailCommand(params));
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("SES Error:", error);
    return NextResponse.json({ error: "Email sending failed" }, { status: 500 });
  }
}
