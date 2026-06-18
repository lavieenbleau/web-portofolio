"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Marketing Director",
    company: "Glarisa Cosmetics",
    content: "Faisal completely transformed our visual identity. His designs are not just beautiful, they convert. Our engagement metrics skyrocketed after the rebranding.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Founder",
    company: "SnackTime",
    content: "Working with Faisal was a breeze. He understood our target audience immediately and delivered promotional designs that were exactly what we needed to push sales.",
    rating: 5,
  },
  {
    name: "Amanda Rivera",
    role: "CEO",
    company: "Aura Skincare",
    content: "An absolute professional. The level of detail and premium feel he brought to our campaign was beyond our expectations. Highly recommended for any creative needs.",
    rating: 5,
  },
  {
    name: "David Smith",
    role: "Head of Growth",
    company: "TechNova",
    content: "Faisal's ability to blend aesthetics with marketing strategy is rare. He doesn't just make things look good, he makes them work for your business goals.",
    rating: 5,
  }
]

export function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!scrollerRef.current) return

    // Simple infinite marquee effect using GSAP
    const scroller = scrollerRef.current
    const tl = gsap.to(scroller, {
      x: "-50%",
      ease: "none",
      duration: 30,
      repeat: -1,
    })

    // Pause on hover
    scroller.addEventListener("mouseenter", () => tl.pause())
    scroller.addEventListener("mouseleave", () => tl.play())

    return () => {
      tl.kill()
      scroller.removeEventListener("mouseenter", () => tl.pause())
      scroller.removeEventListener("mouseleave", () => tl.play())
    }
  }, [])

  return (
    <section className="py-32 bg-card overflow-hidden" id="testimonials">
      <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Client Love</h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">What people say about working with me.</p>
      </div>

      <div className="relative w-full flex">
        {/* Gradient Masks */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none"></div>

        {/* Carousel Container */}
        <div className="flex w-fit whitespace-nowrap gap-6 px-6" ref={scrollerRef}>
          {/* Duplicate the list to create a seamless loop */}
          {[...testimonials, ...testimonials].map((testimonial, idx) => (
            <div 
              key={idx} 
              className="w-[350px] md:w-[450px] bg-background border border-border p-8 rounded-3xl shadow-sm whitespace-normal flex-shrink-0 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <div className="flex gap-1 mb-6 text-primary">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-lg text-foreground italic mb-8">&quot;{testimonial.content}&quot;</p>
              </div>
              
              <div className="flex items-center gap-4 border-t border-border pt-6">
                <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-xl">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
