import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import Pricing from '@/components/home/Pricing'
import Testimonials from '@/components/home/Testimonials'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
    </div>
  )
}