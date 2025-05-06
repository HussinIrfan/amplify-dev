import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import type { Schema } from '../../data/resource';
import { env } from '$amplify/env/contact-email'; // Access the environment variables

export const handler: Schema['sendContactEmail']['functionHandler'] = async (event) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = event.arguments;

    // If phone is null or undefined, we can just use an empty string
    const phoneNumber = phone ?? ''; 

    // Ensure email and subject are defined, or provide defaults
    if (!email || !subject) {
      throw new Error("Email and subject are required fields.");
    }


    const mailerSend = new MailerSend({
        apiKey: env.MAILERSEND_API_KEY, // Use the API key retrieved from secrets
      });

    const sentFrom = new Sender("support@sltfirefoundation.org", "Lance Hubbard");
    const recipients = [new Recipient("support@sltfirefoundation.org", "Lance Hubbard")];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(new Sender(email, `${firstName} ${lastName}`)) // Ensure email is defined here
      .setSubject(subject) // Ensure subject is defined here
      .setHtml(`
        <strong>Name:</strong> ${firstName} ${lastName}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Phone:</strong> ${phoneNumber}<br>
        <strong>Message:</strong><br>${message}
      `)
      .setText(`
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phoneNumber}
        Message:
        ${message}
      `);

    await mailerSend.email.send(emailParams);

    return "Message sent successfully"; // Return a simple success message
  } catch (error: any) {
    console.error("Error:", error);
    return error.message || 'Internal Server Error'; // Return an error message
  }
};
