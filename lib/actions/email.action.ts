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

export async function sendOrderConfirmationEmail(orderData: {
  orderId: string;
  customerName: string;
  customerEmail: string;
  total: number;
  items: any[];
  shippingAddress: any;
}) {
  try {
    const { orderId, customerName, customerEmail, total, items, shippingAddress } = orderData;

    const { data, error } = await resend.emails.send({
      from: "Ketchupp Store <onboarding@resend.dev>",
      to: [customerEmail],
      subject: `Order Confirmed: #KC-${orderId.slice(-6).toUpperCase()}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FAF7F2; padding: 40px; color: #1A1A1A;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 24px; border: 1px solid #DDD8CE; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div style="text-align: center; margin-bottom: 32px;">
               <h1 style="color: #C1121F; margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px; font-weight: 900;">Ketchupp</h1>
               <p style="font-size: 10px; color: #8B8580; text-transform: uppercase; letter-spacing: 4px; margin-top: 8px;">Order Authenticated</p>
            </div>

            <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 8px;">Hi ${customerName},</h2>
            <p style="font-size: 15px; color: #4A4A4A; line-height: 1.5; margin-bottom: 24px;">
              Your order has been received and is being prepared for the archive. You'll receive another transmission once your pieces are shipped.
            </p>

            <div style="background-color: #FAF7F2; border-radius: 16px; padding: 24px; margin-bottom: 32px; border: 1px solid #EDE8E0;">
               <p style="margin: 0; font-size: 11px; color: #8B8580; text-transform: uppercase; letter-spacing: 1px;">Order Reference</p>
               <p style="margin: 4px 0 0 0; font-size: 18px; font-weight: 900; color: #C1121F;">#KC-${orderId.slice(-6).toUpperCase()}</p>
            </div>

            <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #8B8580; margin-bottom: 16px; border-bottom: 1px solid #EDE8E0; padding-bottom: 8px;">Order Details</h3>
            
            ${items.map(item => `
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #FAF7F2;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  ${item.image ? `<img src="${item.image}" width="40" height="50" style="border-radius: 8px; object-fit: cover; background-color: #EDE8E0;" />` : ''}
                  <div>
                    <p style="margin: 0; font-weight: bold; font-size: 14px;">${item.name}</p>
                    <p style="margin: 2px 0 0 0; font-size: 12px; color: #8B8580;">Size: ${item.size} | Qty: ${item.quantity}</p>
                  </div>
                </div>
                <p style="margin: 0; font-weight: bold; font-size: 14px;">₹${(item.price * item.quantity).toLocaleString("en-IN")}</p>
              </div>
            `).join('')}

            <div style="margin-top: 24px; padding-top: 16px; border-top: 2px solid #1A1A1A;">
               <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                 <p style="margin: 0; font-size: 14px; color: #8B8580;">Total Paid</p>
                 <p style="margin: 0; font-size: 18px; font-weight: 900; color: #1A1A1A;">₹${total.toLocaleString("en-IN")}</p>
               </div>
            </div>

            <div style="margin-top: 40px;">
               <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #8B8580; margin-bottom: 8px;">Shipping Destination</h3>
               <p style="margin: 0; font-size: 14px; line-height: 1.4; color: #4A4A4A;">
                 ${shippingAddress.address}<br>
                 ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}
               </p>
            </div>

            <div style="margin-top: 48px; text-align: center; border-top: 1px solid #EDE8E0; padding-top: 24px;">
              <p style="font-size: 12px; color: #8B8580;">
                If you have any questions about your order, please reply to this email or contact us at ketchuppclothing33@gmail.com
              </p>
              <p style="font-size: 10px; color: #DDD8CE; margin-top: 16px; text-transform: uppercase; letter-spacing: 2px;">
                &copy; ${new Date().getFullYear()} Ketchupp Clothing. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Order Email Error:", error);
    return { success: false, error };
  }
}
