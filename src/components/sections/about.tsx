"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { projects } from "@/data/projects"

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  
  // Counters refs
  const projectsRef = useRef<HTMLSpanElement>(null)
  const clientsRef = useRef<HTMLSpanElement>(null)
  const expRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 80%",
        toggleActions: "play none none reverse"
      }
    })

    tl.fromTo(
      imageRef.current,
      { x: -50, opacity: 0, scale: 0.95 },
      { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
    ).fromTo(
      textRef.current?.children ? Array.from(textRef.current.children) : [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )

    // Animate counters
    const animateCounter = (ref: React.RefObject<HTMLSpanElement | null>, endVal: number) => {
      if (ref.current) {
        gsap.to(ref.current, {
          innerHTML: endVal,
          duration: 2,
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%"
          }
        })
      }
    }

    // Calculate dynamic stats from projects data
    const totalProjects = projects.length
    const uniqueClients = new Set(projects.filter(p => p.client !== "Personal Project").map(p => p.client)).size
    // Assuming 2 years of experience based on 2025-2026 projects
    const yearsExp = 2

    animateCounter(projectsRef, totalProjects)
    animateCounter(clientsRef, uniqueClients)
    animateCounter(expRef, yearsExp)

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section className="py-32 bg-background relative overflow-hidden" id="about" ref={sectionRef}>
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Profile Image */}
        <div ref={imageRef} className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-card border border-border shadow-2xl mx-auto w-full max-w-md group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>
          
          <Image 
            src="/profile/about-profile.jpg"
            alt="Faisal Anugrah - Creative Designer"
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
          />

          <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
            <h3 className="text-white text-2xl font-bold">Faisal Anugrah</h3>
            <p className="text-white/80 text-sm mt-1 uppercase tracking-widest font-medium">Creative Designer | Web Developer | UI Designer</p>
          </div>
        </div>

        {/* Text Content */}
        <div ref={textRef} className="flex flex-col justify-center">
          <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-4">About Me</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
            Designing and building with <span className="text-primary italic">purpose</span>.
          </h3>
          
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
            Saya adalah Creative Designer dan Web Developer yang menggabungkan kreativitas dan teknologi untuk menciptakan website, aplikasi, dan pengalaman digital yang modern serta mudah digunakan.
          </p>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
            <div>
              <div className="text-4xl md:text-5xl font-black text-foreground flex items-baseline">
                <span ref={projectsRef}>0</span><span className="text-primary">+</span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mt-2">Projects</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-foreground flex items-baseline">
                <span ref={clientsRef}>0</span><span className="text-primary">+</span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mt-2">Clients</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-foreground flex items-baseline">
                <span ref={expRef}>0</span><span className="text-primary">+</span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mt-2">Years Exp</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
