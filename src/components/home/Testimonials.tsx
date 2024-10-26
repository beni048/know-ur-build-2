// src/components/home/Testimonials.tsx

export default function Testimonials() {
    const testimonials = [
      {
        content: "This tool helped me understand exactly what I was paying for. The technical breakdown was incredibly useful for communicating with my development team.",
        author: "Sarah Johnson",
        role: "Product Manager",
        company: "Tech Startup"
      },
      {
        content: "I was always unsure about development costs until I found this. Now I can make informed decisions about my website updates.",
        author: "Michael Chen",
        role: "Business Owner",
        company: "E-commerce Store"
      },
      {
        content: "The accuracy of the estimates is impressive. It's like having a technical consultant in your pocket.",
        author: "Emma Williams",
        role: "Marketing Director",
        company: "Digital Agency"
      }
    ]
  
    return (
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Trusted by businesses worldwide
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              See what others are saying about our service
            </p>
          </div>
  
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <p className="text-gray-600 italic mb-4">"{testimonial.content}"</p>
                <div className="mt-4">
                  <p className="text-gray-900 font-medium">{testimonial.author}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                  <p className="text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }