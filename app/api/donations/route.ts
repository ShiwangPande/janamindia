import { NextResponse, type NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client"
import QRCode from "qrcode"
import { buildUpiDeepLink } from "@/lib/utils"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { amountInRupees, isRecurring, donorName, donorEmail } = body as {
      amountInRupees: number
      isRecurring?: boolean
      donorName?: string
      donorEmail?: string
    }

    if (!amountInRupees || amountInRupees < 1) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    const payeeVpa = process.env.UPI_VPA || "example@upi"
    const payeeName = process.env.UPI_PAYEE_NAME || "Janam"
    const txnRef = `JANAM-${Date.now()}`
    const upiLink = buildUpiDeepLink({
      payeeVpa,
      payeeName,
      amountInRupees,
      txnRef,
      txnNote: "Donation to Janam",
    })

    const qrDataUrl = await QRCode.toDataURL(upiLink)

    const donation = await prisma.donation.create({
      data: {
        amountInPaise: Math.round(amountInRupees * 100),
        upiVpa: payeeVpa,
        upiPayeeName: payeeName,
        isRecurring: Boolean(isRecurring),
        donorName: donorName || null,
        donorEmail: donorEmail || null,
      },
    })

    return NextResponse.json({
      success: true,
      donationId: donation.id,
      upiLink,
      qrDataUrl,
      txnRef,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to create donation" }, { status: 500 })
  }
}

export async function GET() {
  const donations = await prisma.donation.findMany({ orderBy: { createdAt: "desc" } })
  return NextResponse.json({ success: true, donations })
}

