import { NextResponse } from "next/server";

// This mirrors the users store from signup route. In a real app you'd query a DB.
const users = globalThis.__sales_users__ as any[] | undefined;

// If the shared global isn't set, create a minimal fallback store. This is only
// for dev/testing inside the same Node instance.
if (!users) {
  (globalThis as any).__sales_users__ = [];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const store = (globalThis as any).__sales_users__ as any[];
    const user = store.find((u) => u.email === email.toLowerCase());
    if (!user || user.password !== password) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // In a real app you'd return a JWT or set a cookie.
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email } });
  } catch (err) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
