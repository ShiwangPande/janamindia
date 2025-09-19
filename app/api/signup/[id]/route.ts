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
          message: 'Signup ID is required' 
        },
        { status: 400 }
      )
    }

    // Delete the signup submission
    const deletedSignup = await prisma.signup.delete({
      where: {
        id: id
      }
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Signup deleted successfully',
        data: { id: deletedSignup.id }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error deleting signup:', error)
    
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Signup not found' 
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