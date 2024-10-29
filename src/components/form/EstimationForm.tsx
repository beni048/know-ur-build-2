// src/components/form/EstimationForm.tsx

'use client'

import { useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { motion } from 'framer-motion'

interface EstimateResult {
  technicalDetails: string;
  timeEstimate: string;
  costEstimate: string;
}

export default function EstimationForm() {
  const { user } = useAuth()
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<EstimateResult | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate estimate')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError('Failed to generate estimate. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Describe your website customization needs
          </label>
          <textarea
            id="description"
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     text-gray-900 dark:text-white bg-white dark:bg-gray-700
                     focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400
                     placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Example: I need to add a shopping cart to my existing website..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 text-red-500 dark:text-red-200 p-3 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm 
                   text-white bg-indigo-600 hover:bg-indigo-700 
                   dark:bg-indigo-500 dark:hover:bg-indigo-600
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                   transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Estimate...
            </span>
          ) : (
            'Get Estimate'
          )}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Estimate Results
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Technical Details
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {result.technicalDetails}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Time Estimate
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {result.timeEstimate}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Cost Estimate
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {result.costEstimate}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}