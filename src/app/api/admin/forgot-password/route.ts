import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// In-memory rate limiting store (IP -> { count, resetTime })
const rateLimit = new Map<string, { count: number; resetTime: number }>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const windowMs = 30 * 60 * 1000; // 30 minutes
    const maxAttempts = 3; // Strict limit for forgot password

    // Clean up expired entries to prevent memory leak
    for (const [key, value] of rateLimit.entries()) {
      if (now > value.resetTime) {
        rateLimit.delete(key);
      }
    }

    const record = rateLimit.get(ip) || { count: 0, resetTime: now + windowMs };
    
    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
    } else {
      record.count++;
    }
    
    rateLimit.set(ip, record);

    if (record.count > maxAttempts) {
      return NextResponse.json({ error: "Too many forgot password attempts. Please try again after 30 minutes." }, { status: 429 });
    }

    const { username } = await req.json();
    const validUsername = process.env.ADMIN_USERNAME || "admin";

    if (username !== validUsername) {
      // Return success even if username is wrong to prevent username enumeration
      return NextResponse.json({ success: true });
    }

    // Send Email with current password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "AAPKIDAMINI@GMAIL.COM",
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || "AAPKIDAMINI@GMAIL.COM",
      to: process.env.EMAIL_USER || "AAPKIDAMINI@GMAIL.COM", // Always send to the configured admin email
      subject: "Admin Portal - Password Recovery",
      text: `Hello,\n\nA password recovery request was made for the Admin Portal.\n\nYour current admin credentials are:\nUsername: ${process.env.ADMIN_USERNAME || "admin"}\nPassword: ${process.env.ADMIN_PASSWORD || "password"}\n\nIf you did not request this, please ignore this email.`,
    };

    if (process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Forgot Password API Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
