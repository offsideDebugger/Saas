import ProfileComponent from '@/components/profile/profilePage'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const session = await getServerSession()
  if (!session || !session.user) {
    redirect("/auth/signin")
  }

  

  return (
    <div>
      <ProfileComponent/>
    </div>
  )
}
