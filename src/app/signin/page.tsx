// src/app/signin/page.tsx

import SigninForm from '@/components/auth/SigninForm'

export default function SigninPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SigninForm />
    </div>
  )
}