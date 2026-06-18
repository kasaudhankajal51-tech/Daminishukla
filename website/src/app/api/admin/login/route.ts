import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const validUsername = process.env.ADMIN_USERNAME || "admin";
    const validPassword = process.env.ADMIN_PASSWORD || "password";

    if (username === validUsername && password === validPassword) {
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
