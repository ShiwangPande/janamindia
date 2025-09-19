import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  phone: z.string().optional().nullable(),
  message: z.string().min(1, 'Message is required').max(2000, 'Message must be less than 2000 characters')
})

export async function POST( request: { json: () => Promise<{ name: string; email: string; phone: string; message: string; }>; }) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validationResult = contactSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed',
          errors: validationResult.error.errors
        },
        { status: 400 }
      )
    }

    const { name, email, phone, message } = validationResult.data

    // Save contact form submission to database
    const contactSubmission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null, // Handle optional phone field
        message,
        submittedAt: new Date()
      }
    })

    // Optional: Send email notification (you can integrate with services like SendGrid, Resend, etc.)
    // await sendEmailNotification(contactSubmission)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        id: contactSubmission.id
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form submission error:', error)
    
    // Handle Prisma specific errors
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'A submission with this email already exists'
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again later.'
      },
      { status: 500 }
    )
  }
}

// Optional: GET method to retrieve contact submissions (for admin panel)
export async function GET(request: { url: string | URL }) {
  try {
    // Add authentication/authorization here for admin access
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const [submissions, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        skip,
        take: limit,
        orderBy: {
          submittedAt: 'desc'
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          message: true,
          submittedAt: true,
          isRead: true
        }
      }),
      prisma.contactSubmission.count()
    ])

    return NextResponse.json({
      success: true,
      data: submissions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error'
      },
      { status: 500 }
    )
  }
}