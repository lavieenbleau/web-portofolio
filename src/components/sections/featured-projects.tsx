"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { projects } from "@/data/projects"
import Image from "next/image"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

export function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState(0)

  useEffect(() => {
    // Basic sticky logic handled by CSS sticky, but we use GSAP to animate image changes
    // Alternatively, we can use a pure ScrollTrigger pin
    if (!containerRef.current || !rightColRef.current || !leftColRef.current) return

    const mm = gsap.matchMedia()

    mm.add("(min-width: 1024px)", () => {
      // Pin the right column
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 100px", // Below navbar
        end: "bottom bottom",
        pin: rightColRef.current,
        pinSpacing: false,
      })
    })

    return () => {
      mm.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section className="py-32 bg-card relative" id="projects">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">Eksplorasi desain, pengembangan web, dan pengalaman digital yang saya kerjakan untuk berbagai kebutuhan kreatif dan bisnis.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative" ref={containerRef}>
          
          {/* Left Column - List of Projects */}
          <div className="flex flex-col gap-24 lg:gap-48 py-10" ref={leftColRef}>
            {projects.filter(p => p.featured).map((project, index) => (
              <div 
                key={project.slug} 
                className="flex flex-col"
                onMouseEnter={() => setActiveProject(index)}
                data-cursor="project"
              >
                {/* Mobile Image (Hidden on Desktop) */}
                <div className="lg:hidden w-full aspect-[4/3] relative rounded-2xl overflow-hidden mb-6 bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-500">
                  {/* Center card */}
                  <div className="absolute w-[50%] aspect-square z-20 shadow-2xl rounded-lg overflow-hidden transform transition-transform duration-500 group-hover:scale-105">
                    <Image src={project.images[0]} alt="1" fill sizes="50vw" className="object-cover" />
                  </div>
                  {/* Left card */}
                  <div className="absolute w-[45%] aspect-square z-10 shadow-xl rounded-lg overflow-hidden -translate-x-[55%] -rotate-6 opacity-80 transform transition-all duration-500 group-hover:-translate-x-[65%] group-hover:-rotate-12 group-hover:opacity-100">
                    <Image src={project.images[1]} alt="2" fill sizes="50vw" className="object-cover" />
                  </div>
                  {/* Right card */}
                  <div className="absolute w-[45%] aspect-square z-10 shadow-xl rounded-lg overflow-hidden translate-x-[55%] rotate-6 opacity-80 transform transition-all duration-500 group-hover:translate-x-[65%] group-hover:rotate-12 group-hover:opacity-100">
                    <Image src={project.images[2]} alt="3" fill sizes="50vw" className="object-cover" />
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-mono text-primary px-3 py-1 bg-primary/10 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">{project.year}</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-4 hover:text-primary transition-colors cursor-pointer">
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>
                
                <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.services.slice(0,3).map(service => (
                    <span key={service} className="text-xs border border-border px-3 py-1 rounded-full text-foreground/80">
                      {service}
                    </span>
                  ))}
                </div>

                <Link 
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors w-fit group"
                >
                  View Case Study
                  <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Right Column - Sticky Image (Desktop Only) */}
          <div className="hidden lg:block relative h-[80vh]" ref={rightColRef}>
            <div className="w-full h-full relative rounded-3xl overflow-hidden bg-background border border-border shadow-2xl">
              {projects.filter(p => p.featured).map((project, index) => (
                <div 
                  key={project.slug}
                  className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                  style={{ opacity: activeProject === index ? 1 : 0, zIndex: activeProject === index ? 10 : 0 }}
                >
                  <div className="w-full h-full bg-primary/5 flex items-center justify-center relative overflow-hidden group">
                    {/* Center card */}
                    <div className="absolute w-[45%] aspect-square z-20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden transform transition-transform duration-700 hover:scale-110 hover:z-30 cursor-pointer">
                      <Image src={project.images[0]} alt="1" fill sizes="50vw" className="object-cover" />
                    </div>
                    {/* Left card */}
                    <div className="absolute w-[40%] aspect-square z-10 shadow-2xl rounded-2xl overflow-hidden -translate-x-[60%] -rotate-12 opacity-70 transform transition-all duration-700 group-hover:-translate-x-[75%] group-hover:-rotate-[15deg] group-hover:opacity-100 hover:!z-30 hover:!scale-105 hover:!rotate-0 cursor-pointer">
                      <Image src={project.images[1]} alt="2" fill sizes="50vw" className="object-cover" />
                    </div>
                    {/* Right card */}
                    <div className="absolute w-[40%] aspect-square z-10 shadow-2xl rounded-2xl overflow-hidden translate-x-[60%] rotate-12 opacity-70 transform transition-all duration-700 group-hover:translate-x-[75%] group-hover:rotate-[15deg] group-hover:opacity-100 hover:!z-30 hover:!scale-105 hover:!rotate-0 cursor-pointer">
                      <Image src={project.images[2]} alt="3" fill sizes="50vw" className="object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
