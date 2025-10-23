import { NextResponse } from "next/server";

type User = { id: string; name: string; email: string; password: string };

// Use a global shared store for the running Node instance so login can access the same users
if (!(globalThis as any).__sales_users__) {
  (globalThis as any).__sales_users__ = [] as User[];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const users = (globalThis as any).__sales_users__ as User[];
    const exists = users.find((u) => u.email === email.toLowerCase());
    if (exists) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const newUser: User = {
      id: String(users.length + 1),
      name,
      email: email.toLowerCase(),
      password,
    };
    users.push(newUser);

    return NextResponse.json({ ok: true, user: { id: newUser.id, email: newUser.email } });
  } catch (err) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
