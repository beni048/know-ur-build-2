// src/components/home/Pricing.tsx

import Link from 'next/link'

export default function Pricing() {
  const plans = [
    {
      name: 'Basic',
      price: '$29',
      description: 'Perfect for small website changes',
      features: [
        'One customization request',
        'Technical specification',
        'Cost breakdown',
        'Time estimation',
        '24-hour delivery',
      ],
      cta: 'Get Started',
      href: '/pricing?plan=basic',
    },
    {
      name: 'Pro',
      price: '$99',
      description: 'For complex website projects',
      features: [
        'Five customization requests',
        'Priority processing',
        'Detailed technical specifications',
        'Cost and time breakdown',
        'Same-day delivery',
        'Direct developer consultation',
      ],
      cta: 'Get Started',
      href: '/pricing?plan=pro',
      featured: true,
    },
  ]

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the plan that works best for your needs
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-4xl lg:mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-lg divide-y divide-gray-200 ${
                plan.featured ? 'border-2 border-indigo-500' : ''
              }`}
            >
              <div className="p-6">
                <h3 className="text-2xl font-medium text-gray-900">{plan.name}</h3>
                <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-base font-medium text-gray-500">/request</span>
                </p>
                <Link
                  href={plan.href}
                  className={`mt-8 block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md text-center ${
                    plan.featured ? 'bg-indigo-600 hover:bg-indigo-700' : ''
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide">
                  What's included
                </h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}