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

    const mailOptions = {
      from: process.env.EMAIL_USER || "AAPKIDAMINI@GMAIL.COM",
      to: "AAPKIDAMINI@GMAIL.COM",
      subject: "Daminishukla.com website query",
      text: `New Enquiry Received:\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nType: ${enquiryType}\nMessage:\n${message}`,
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
