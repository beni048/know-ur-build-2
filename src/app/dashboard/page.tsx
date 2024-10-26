// src/app/dashboard/page.tsx

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import EstimationForm from '@/components/form/EstimationForm'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null // This will briefly show while redirecting
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user.username}! 👋</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Get an estimate for your website customization
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <EstimationForm />
      </div>
    </div>
  )
}