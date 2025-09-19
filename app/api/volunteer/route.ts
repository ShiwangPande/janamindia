// app/api/volunteer/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Availability, PrismaClient, RolePreference } from '@prisma/client'

const prisma = new PrismaClient()

// Define mappings at module level
const ROLE_MAPPING: Record<string, RolePreference> = {
  'WORKSHOP_FACILITATOR': RolePreference.WORKSHOP_FACILITATOR,
  'TRAINER': RolePreference.TRAINER,
  'FIELD_VOLUNTEER': RolePreference.FIELD_VOLUNTEER,
  'FUNDRAISER': RolePreference.FUNDRAISER
}

const AVAILABILITY_MAPPING: Record<string, Availability> = {
  'WEEKDAYS': Availability.WEEKDAYS,
  'WEEKENDS': Availability.WEEKENDS, 
  'FLEXIBLE': Availability.FLEXIBLE
}

// Validation helper function
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, organization, role, availability, skills, message } = body

    // Basic required field validation
    if (!name || !email || !role || !availability) {
      return NextResponse.json({
        success: false,
        message: 'Name, email, role preference, and availability are required fields'
      }, { status: 400 })
    }

    // Detailed validation
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json({
        success: false,
        message: 'Name must be between 2 and 100 characters'
      }, { status: 400 })
    }

    if (!validateEmail(email)) {
      return NextResponse.json({
        success: false,
        message: 'Please provide a valid email address'
      }, { status: 400 })
    }

    if (!ROLE_MAPPING[role as keyof typeof ROLE_MAPPING]) {
      return NextResponse.json({
        success: false,
        message: 'Invalid role preference selected'
      }, { status: 400 })
    }

    if (!AVAILABILITY_MAPPING[availability as keyof typeof AVAILABILITY_MAPPING]) {
      return NextResponse.json({
        success: false,
        message: 'Invalid availability option selected'
      }, { status: 400 })
    }

    if (organization && organization.length > 200) {
      return NextResponse.json({
        success: false,
        message: 'Organization name must be less than 200 characters'
      }, { status: 400 })
    }

    if (skills && skills.length > 500) {
      return NextResponse.json({
        success: false,
        message: 'Skills must be less than 500 characters'
      }, { status: 400 })
    }

    if (message && message.length > 1000) {
      return NextResponse.json({
        success: false,
        message: 'Message must be less than 1000 characters'
      }, { status: 400 })
    }

    // Check for duplicate submission (same email in last 24 hours)
    const recentSubmission = await prisma.volunteerApplication.findFirst({
      where: {
        email: email.trim().toLowerCase(),
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // 24 hours ago
        }
      }
    })

    if (recentSubmission) {
      return NextResponse.json({
        success: false,
        message: 'You have already submitted a volunteer application recently. Please wait 24 hours before submitting again.'
      }, { status: 429 })
    }

    // Save to database
    const volunteerApplication = await prisma.volunteerApplication.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        organization: organization?.trim() || null,
        role: ROLE_MAPPING[role as keyof typeof ROLE_MAPPING],
        availability: AVAILABILITY_MAPPING[availability as keyof typeof AVAILABILITY_MAPPING],
        skills: skills?.trim() || null,
        message: message?.trim() || null
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Volunteer application submitted successfully',
      data: {
        id: volunteerApplication.id,
        createdAt: volunteerApplication.createdAt
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Volunteer application error:', error)
    
    // Handle Prisma unique constraint errors
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
      return NextResponse.json({
        success: false,
        message: 'A volunteer application with this information already exists'
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      message: 'Internal server error. Please try again later.'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const [applications, totalCount] = await Promise.all([
      prisma.volunteerApplication.findMany({
        orderBy: { createdAt: 'desc' },
        skip: skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          organization: true,
          role: true,
          availability: true,
          skills: true,
          message: true,
          createdAt: true
        }
      }),
      prisma.volunteerApplication.count()
    ])

    // Convert enum values back to readable format
    const formattedApplications = applications.map(app => ({
      ...app,
      role: Object.keys(ROLE_MAPPING).find(key => ROLE_MAPPING[key as keyof typeof ROLE_MAPPING] === app.role),
      availability: Object.keys(AVAILABILITY_MAPPING).find(key => AVAILABILITY_MAPPING[key as keyof typeof AVAILABILITY_MAPPING] === app.availability)
    }))

    return NextResponse.json({
      success: true,
      data: {
        applications: formattedApplications,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalCount,
          hasNextPage: skip + limit < totalCount,
          hasPreviousPage: page > 1
        }
      }
    })

  } catch (error) {
    console.error('Error fetching volunteer applications:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch volunteer applications'
    }, { status: 500 })
  }
}