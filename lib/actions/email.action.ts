"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const { firstName, lastName, email, subject, message } = formData;

    const { data, error } = await resend.emails.send({
      from: "Ketchupp Store <onboarding@resend.dev>", // Note: Replace with your domain once verified on Resend
      to: ["ketchuppclothing33@gmail.com"],
      subject: `New Contact Form: ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FAF7F2; padding: 40px; color: #1A1A1A;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 24px; border: 1px solid #DDD8CE; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <h2 style="color: #C1121F; margin-top: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px;">New Data Transmission</h2>
            <p style="font-size: 14px; color: #8B8580; text-transform: uppercase; letter-spacing: 2px; font-weight: bold; margin-bottom: 24px;">Origin Intel</p>
            
            <div style="margin-bottom: 24px;">
              <p style="margin: 0; font-size: 12px; color: #8B8580; text-transform: uppercase;">Sender</p>
              <p style="margin: 4px 0 0 0; font-weight: bold; font-size: 16px;">${firstName} ${lastName}</p>
            </div>
            
            <div style="margin-bottom: 24px;">
              <p style="margin: 0; font-size: 12px; color: #8B8580; text-transform: uppercase;">Email</p>
              <p style="margin: 4px 0 0 0; font-weight: bold; font-size: 16px;">${email}</p>
            </div>
            
            <div style="margin-bottom: 24px;">
              <p style="margin: 0; font-size: 12px; color: #8B8580; text-transform: uppercase;">Protocol (Subject)</p>
              <p style="margin: 4px 0 0 0; font-weight: bold; font-size: 16px;">${subject}</p>
            </div>
            
            <div style="margin-top: 32px; padding-top: 32px; border-top: 1px solid #EDE8E0;">
              <p style="margin: 0 0 12px 0; font-size: 12px; color: #8B8580; text-transform: uppercase;">Message Content</p>
              <div style="background-color: #FAF7F2; padding: 24px; border-radius: 16px; font-size: 16px; line-height: 1.6; color: #1A1A1A; white-space: pre-wrap;">
                ${message}
              </div>
            </div>
            
            <div style="margin-top: 40px; font-size: 12px; color: #8B8580; text-align: center;">
              This is an automated transmission from Ketchupp Clothing Store.
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email Action Error:", error);
    return { success: false, error };
  }
}
