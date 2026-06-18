"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { id: "01", title: "Discovery", desc: "Memahami visi, tujuan bisnis, dan target audiens Anda, baik untuk kebutuhan kampanye visual maupun platform digital." },
  { id: "02", title: "Strategy", desc: "Menganalisis tren pasar, posisi kompetitor, serta menentukan fondasi visual dan arsitektur teknologi yang tepat." },
  { id: "03", title: "Creation & Dev", desc: "Mengeksekusi ide menjadi karya nyata, mulai dari desain konten kreatif, identitas merek, hingga penulisan kode website." },
  { id: "04", title: "Review", desc: "Mengevaluasi draf desain dan fungsionalitas sistem bersama Anda untuk memastikan akurasi dan kualitas." },
  { id: "05", title: "Delivery", desc: "Menyerahkan aset grafis siap pakai dan meluncurkan produk digital yang telah teruji secara menyeluruh." },
]

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return

    // Animate the central line
    gsap.fromTo(
      lineRef.current,
      { height: 0 },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      }
    )

    // Animate each step
    stepsRef.current.forEach((step, index) => {
      if (!step) return
      gsap.fromTo(
        step,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
          }
        }
      )
    })
  }, [])

  return (
    <section className="py-32 bg-card relative" id="process">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-4">Workflow</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-4">Creative & Development</h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">Pendekatan terstruktur dan komprehensif, mulai dari konsep visual grafis hingga pengembangan kode pemrograman.</p>
        </div>

        <div className="relative max-w-4xl mx-auto" ref={containerRef}>
          {/* Background line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2"></div>
          {/* Animated line */}
          <div ref={lineRef} className="absolute left-[28px] md:left-1/2 top-0 w-1 bg-primary -translate-x-1/2 origin-top"></div>

          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`relative flex items-center justify-between mb-16 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
              ref={el => { stepsRef.current[index] = el }}
            >
              {/* Timeline dot */}
              <div className="absolute left-[28px] md:left-1/2 w-6 h-6 rounded-full border-4 border-card bg-primary -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(217,137,166,0.5)]"></div>
              
              {/* Content Box */}
              <div className={`w-full ml-16 md:ml-0 md:w-[45%] ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <div className="bg-background border border-border p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 text-8xl font-black text-primary/5 group-hover:text-primary/10 transition-colors duration-500 pointer-events-none">{step.id}</div>
                  <h3 className="text-2xl font-bold mb-3 relative z-10">{step.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 relative z-10 leading-relaxed">{step.desc}</p>
                </div>
              </div>

              {/* Empty space for opposite side */}
              <div className="hidden md:block w-[45%]"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
