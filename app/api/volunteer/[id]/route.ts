import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Application ID is required' 
        },
        { status: 400 }
      )
    }

    // Delete the volunteer application
    const deletedApplication = await prisma.volunteerApplication.delete({
      where: {
        id: id
      }
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Volunteer application deleted successfully',
        data: { id: deletedApplication.id }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error deleting volunteer application:', error)
    
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Volunteer application not found' 
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}