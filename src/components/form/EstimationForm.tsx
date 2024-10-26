// src/components/form/EstimationForm.tsx

'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'

interface EstimateResult {
  technicalDetails: string;
  timeEstimate: string;
  costEstimate: string;
}

export default function EstimationForm() {
  const { data: session } = useSession()
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<EstimateResult | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) {
      setError('Please sign in to use this feature')
      return
    }

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Describe your website customization needs
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            id="description"
            name="description"
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors"
            placeholder="Example: I need to add a shopping cart to my existing website with product variants and PayPal integration..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading || !session}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
            (isLoading || !session) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Generating Estimate...' : 'Get Estimate'}
        </motion.button>

        {!session && (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Please sign in to use this feature
          </p>
        )}
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
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
        </motion.div>
      )}
    </motion.div>
  )
}