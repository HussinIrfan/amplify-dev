import 'dotenv/config';
import { NextResponse } from 'next/server';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.API_KEY!,
});

export async function POST(req: Request) {
  try {
    // Get form data from request body
    const { firstName, lastName, email, phone, subject, message } = await req.json();

    // Define the sender and recipient
    const sentFrom = new Sender("support@sltfirefoundation.org", "Lance Hubbard");
    const recipients = [
      new Recipient("support@sltfirefoundation.org", "Lance Hubbard")
    ];

    // Compose email content with dynamic form data
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(new Sender(email, `${firstName} ${lastName}`)) // Reply to user's email
      .setSubject(subject) // Use the subject as the email subject
      .setHtml(`
        <strong>Name:</strong> ${firstName} ${lastName}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Phone:</strong> ${phone}<br>
        <strong>Message:</strong><br>${message}
      `)
      .setText(`
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        Message:
        ${message}
      `);

    // Send the email
    await mailerSend.email.send(emailParams);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });

  } catch (error: any) {
    console.error("Email details:", error);
    console.error("Email sending failed:", error.message); // Logs the error message
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
