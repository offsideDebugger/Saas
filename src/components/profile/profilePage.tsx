'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
export default  function ProfileComponent() {
  const { data: session } = useSession()
  const [name, setName] = useState(session?.user?.username || '')
  const [email, setEmail] = useState(session?.user?.email || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await fetch('/api/profile', {
      method: 'POST',
      body: JSON.stringify({ name, email }),
      headers: { 'Content-Type': 'application/json' },
    })
    setIsSaving(false)
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-md shadow-md bg-white">
      <h1 className="text-2xl font-semibold mb-6">Your Profile</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium">Name</label>
        <input
          className="w-full mt-1 p-2 border rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Email</label>
        <input
          className="w-full mt-1 p-2 border rounded-md bg-gray-100 text-gray-500"
          value={email}
          disabled
          onChange={(e) => setEmail(e.target.value)}  // This line is not necessary since the input is disabled
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          onClick={() => signOut()}
          className="text-red-600 font-semibold hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  )
}