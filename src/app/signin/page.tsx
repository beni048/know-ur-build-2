// src/app/signin/page.tsx

import SigninForm from '@/components/auth/SigninForm';

export default function SigninPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <SigninForm />
    </div>
  );
}