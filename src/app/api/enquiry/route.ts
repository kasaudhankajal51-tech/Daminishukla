import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { fullName, email, phone, enquiryType, message } = data;

    // 1. Save to MongoDB
    const db = await getDb();
    const enquiryCollection = db.collection("enquiries");
    
    const result = await enquiryCollection.insertOne({
      full_name: fullName,
      email,
      phone,
      enquiry_type: enquiryType,
      message,
      created_at: new Date()
    });

    // 2. Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "AAPKIDAMINI@GMAIL.COM",
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #eaeaea; }
        .header { background: linear-gradient(135deg, #0ea5e9, #06b6d4); padding: 35px 20px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 0.5px; }
        .content { padding: 40px; }
        .greeting { color: #334155; font-size: 16px; line-height: 1.6; margin-bottom: 30px; }
        .details-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px; margin-bottom: 30px; }
        .row { margin-bottom: 16px; }
        .row:last-child { margin-bottom: 0; }
        .label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.8px; display: block; margin-bottom: 4px; }
        .value { font-size: 15px; color: #0f172a; font-weight: 600; }
        .message-box { background-color: #ffffff; border-left: 4px solid #0ea5e9; padding: 15px 20px; margin-top: 8px; color: #334155; line-height: 1.6; font-size: 15px; border-radius: 0 8px 8px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.02); }
        .footer { background-color: #f1f5f9; padding: 25px; text-align: center; color: #94a3b8; font-size: 13px; border-top: 1px solid #e2e8f0; }
        .btn { display: inline-block; padding: 14px 28px; background-color: #0f172a; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; margin-top: 10px; }
      </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Website Enquiry</h1>
          </div>
          <div class="content">
            <div class="greeting">
              Hello Damini,<br><br>
              You have just received a new enquiry through your website. Here are the details:
            </div>
            
            <div class="details-box">
              <div class="row">
                <span class="label">Full Name</span>
                <span class="value">${fullName}</span>
              </div>
              <div class="row">
                <span class="label">Email Address</span>
                <span class="value"><a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a></span>
              </div>
              <div class="row">
                <span class="label">Phone Number</span>
                <span class="value">${phone || 'Not provided'}</span>
              </div>
              <div class="row">
                <span class="label">Enquiry Type</span>
                <span class="value" style="display: inline-block; background-color: #e0f2fe; color: #0369a1; padding: 4px 12px; border-radius: 20px; font-size: 13px; margin-top: 4px;">${enquiryType}</span>
              </div>
            </div>
            
            <div class="row">
              <span class="label">Message from Client</span>
              <div class="message-box">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 40px;">
              <a href="mailto:${email}?subject=Re: ${enquiryType} Enquiry - Damini Shukla" class="btn">Reply to ${fullName}</a>
            </div>
          </div>
          
          <div class="footer">
            Automated notification from DaminiShukla.com<br>
            Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER || "AAPKIDAMINI@GMAIL.COM",
      to: process.env.EMAIL_USER || "AAPKIDAMINI@GMAIL.COM",
      replyTo: email,
      subject: `New Enquiry: ${enquiryType} from ${fullName}`,
      html: htmlTemplate,
    };

    if (process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
    } else {
      console.log("EMAIL_PASS not configured. Skipping email send. Data saved to MongoDB.");
    }

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("Enquiry API Error:", error);
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}
