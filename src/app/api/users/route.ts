import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const { name, email, password } = data;
  console.log("ROUTER HANDLER", data);

  if (!name || !email || !password) {
    return NextResponse.json("Dados inválidos.", { status: 400 });
  }
  const isUserExists = await db.user.findUnique({
    where: { email: email },
  });

  if (isUserExists) {
    return NextResponse.json({ error: "Email já existente" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
