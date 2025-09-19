// pages/api/signup.js (for Pages Router)
// or app/api/signup/route.js (for App Router)

import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Validation helper function
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhone = (phone: string) => {
  const re = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  return re.test(phone);
};

// For Pages Router (pages/api/signup.js)
export default async function handler(req: { method: string; body: { name: any; email: any; phone: any; message: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: string; data?: { id: string; createdAt: Date; }; }): any; new(): any; }; }; }) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone are required fields'
      });
    }

    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Name must be between 2 and 100 characters'
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone number'
      });
    }

    if (message && message.length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Message must be less than 1000 characters'
      });
    }

    // Check for duplicate submission (same email in last 5 minutes)
    const recentSubmission = await prisma.signup.findFirst({
      where: {
        email: email,
        createdAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
        }
      }
    });

    if (recentSubmission) {
      return res.status(429).json({
        success: false,
        message: 'Please wait before submitting another message'
      });
    }

    // Save to database
    const signup = await prisma.signup.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        message: message?.trim() || null
      }
    });

    // Optional: Send email notification (you can add this later)
    // await sendEmailNotification(signup);

    return res.status(201).json({
      success: true,
      message: 'signup form submitted successfully',
      data: {
        id: signup.id,
        createdAt: signup.createdAt
      }
    });

  } catch (error) {
    console.error('signup form error:', error);
    
    // Handle Prisma-specific errors
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: 'A record with this information already exists'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  } finally {
    await prisma.$disconnect();
  }
}

// For App Router (app/api/signup/route.js)
export async function POST(request: { json: () => PromiseLike<{ name: any; email: any; phone: any; message: any; }> | { name: any; email: any; phone: any; message: any; }; }) {
  try {
    const { name, email, phone, message } = await request.json();

    // Validation
    if (!name || !email || !phone) {
      return Response.json({
        success: false,
        message: 'Name, email, and phone are required fields'
      }, { status: 400 });
    }

    if (name.length < 2 || name.length > 100) {
      return Response.json({
        success: false,
        message: 'Name must be between 2 and 100 characters'
      }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return Response.json({
        success: false,
        message: 'Please provide a valid email address'
      }, { status: 400 });
    }

    if (!validatePhone(phone)) {
      return Response.json({
        success: false,
        message: 'Please provide a valid phone number'
      }, { status: 400 });
    }

    if (message && message.length > 1000) {
      return Response.json({
        success: false,
        message: 'Message must be less than 1000 characters'
      }, { status: 400 });
    }

    // Check for duplicate submission
    const recentSubmission = await prisma.signup.findFirst({
      where: {
        email: email,
        createdAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000)
        }
      }
    });

    if (recentSubmission) {
      return Response.json({
        success: false,
        message: 'Please wait before submitting another message'
      }, { status: 429 });
    }

    // Save to database
    const signup = await prisma.signup.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        message: message?.trim() || null
      }
    });

    return Response.json({
      success: true,
      message: 'signup form submitted successfully',
      data: {
        id: signup.id,
        createdAt: signup.createdAt
      }
    }, { status: 201 });

  } catch (error) {
    console.error('signup form error:', error);
    
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
      return Response.json({
        success: false,
        message: 'A record with this information already exists'
      }, { status: 400 });
    }

    return Response.json({
      success: false,
      message: 'Internal server error. Please try again later.'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const [signups, totalCount] = await Promise.all([
      prisma.signup.findMany({
        orderBy: { createdAt: 'desc' },
        skip: skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          message: true,
          createdAt: true
        }
      }),
      prisma.signup.count()
    ])

    return NextResponse.json({
      success: true,
      data: {
        signups: signups,
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
    console.error('Error fetching signups:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch signups'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}