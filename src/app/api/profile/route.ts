import { getServerSession } from 'next-auth'
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name } = await req.json()

  await prisma.user.update({
    where: { email: session.user.email },
    data: { username: name },
  })

  return NextResponse.json({ success: true })
}