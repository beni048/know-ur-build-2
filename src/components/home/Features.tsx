export default function Features() {
  const features = [
    {
      title: 'Accurate Estimates',
      description: 'Get precise cost estimates using advanced AI technology',
      icon: '💡',
    },
    {
      title: 'Technical Breakdown',
      description: 'Detailed technical specifications for developers',
      icon: '🔧',
    },
    {
      title: 'Time Estimation',
      description: 'Know exactly how long your project will take',
      icon: '⏱️',
    },
    {
      title: 'Cost Analysis',
      description: 'Understand the cost breakdown of each component',
      icon: '💰',
    },
  ]

  return (
    <div id="features" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to understand your project
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Get detailed insights into your website customization needs
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="pt-6"
            >
              <div className="flow-root bg-white dark:bg-gray-900 rounded-lg px-6 pb-8 h-full">
                <div className="-mt-6">
                  <div className="inline-flex items-center justify-center p-3 bg-indigo-500 dark:bg-indigo-600 rounded-md shadow-lg text-3xl">
                    {feature.icon}
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}