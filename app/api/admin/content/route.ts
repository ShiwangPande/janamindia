import { type NextRequest, NextResponse } from "next/server"

// Mock data - in production, this would connect to your database
const mockContent = {
  pages: [
    { id: 1, title: "Homepage", content: { hero: { title: "Safe Births, Healthy Futures" } } },
    { id: 2, title: "Get Involved", content: { hero: { title: "Get Involved" } } },
  ],
  components: [
    { id: 1, name: "Hero Section", type: "hero", content: {} },
    { id: 2, name: "Impact Counters", type: "stats", content: {} },
  ],
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")

  try {
    if (type === "pages") {
      return NextResponse.json({ success: true, data: mockContent.pages })
    } else if (type === "components") {
      return NextResponse.json({ success: true, data: mockContent.components })
    }

    return NextResponse.json({ success: true, data: mockContent })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch content" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // In production, save to database
    console.log("Creating content:", body)

    return NextResponse.json({ success: true, message: "Content created successfully" })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create content" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    // In production, update in database
    console.log("Updating content:", body)

    return NextResponse.json({ success: true, message: "Content updated successfully" })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update content" }, { status: 500 })
  }
}
