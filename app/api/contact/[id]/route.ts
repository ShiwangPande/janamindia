import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params as { id: string }

    // Validate ID format (assuming UUID or similar)
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Submission ID is required' 
        },
        { status: 400 }
      )
    }

    // Delete the contact submission
    const deletedSubmission = await prisma.contactSubmission.delete({
      where: {
        id: id
      }
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact submission deleted successfully',
        data: { id: deletedSubmission.id }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error deleting contact submission:', error)
    
    // Handle case where record doesn't exist
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Contact submission not found' 
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