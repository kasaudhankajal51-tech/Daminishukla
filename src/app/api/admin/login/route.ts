import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

// In-memory rate limiting store (IP -> { count, resetTime })
const rateLimit = new Map<string, { count: number; resetTime: number }>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxAttempts = 5;

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
      return NextResponse.json({ error: "Too many login attempts. Please try again after 15 minutes." }, { status: 429 });
    }

    const { username, password } = await req.json();

    const validUsername = process.env.ADMIN_USERNAME || "admin";
    const validPassword = process.env.ADMIN_PASSWORD || "password";

    if (username === validUsername && password === validPassword) {
      // Clear rate limit on successful login
      rateLimit.delete(ip);
      
      const session = await getSession();
      session.isLoggedIn = true;
      await session.save();
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

export async function DELETE() {
  const session = await getSession();
  session.destroy();
  return NextResponse.json({ success: true });
}
