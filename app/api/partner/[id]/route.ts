import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST new partner application
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, ideas } = body;

    // Check if the same email has already applied
    const existing = await prisma.partner.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 400 }
      );
    }

    const partner = await prisma.partner.create({
      data: { name, email, phone, company, ideas },
    });

    return NextResponse.json({ success: true, data: partner });
  } catch (error) {
    console.error("POST /api/partner error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
