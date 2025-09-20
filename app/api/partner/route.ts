import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CREATE Partner
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, ideas } = body; // use ideas instead of message

    // Validate required fields
    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Name and Email are required" },
        { status: 400 }
      );
    }

    // Check for existing email
    const existing = await prisma.partner.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "This email is already registered" },
        { status: 400 }
      );
    }

    // Create new partner
    const partner = await prisma.partner.create({
      data: { name, email, phone, company, ideas }, // save ideas
    });

    return NextResponse.json({ success: true, partner }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/partner error:", error);

    // Handle Prisma unique constraint error
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "This email is already registered" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET all Partners
export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(partners);
  } catch (error) {
    console.error("GET /api/partner error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
