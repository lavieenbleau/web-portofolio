"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import SplitType from "split-type"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!titleRef.current || !descRef.current) return

    let ctx = gsap.context(() => {
      // Initialize SplitType
      const splitTitle = new SplitType(titleRef.current!, { types: 'words,chars' })
      
      const tl = gsap.timeline({ delay: 2.2 }) // Wait for loading screen

      tl.fromTo(
        splitTitle.chars,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, duration: 0.8, ease: "back.out(1.7)" }
      ).fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )

      return () => {
        splitTitle.revert()
      }
    })

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" id="home">
      {/* Interactive Background Gradient (subtle) */}
      <div className="absolute inset-0 z-0 opacity-20 md:opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary rounded-full mix-blend-normal md:mix-blend-multiply filter blur-[80px] md:blur-[128px] md:animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-secondary rounded-full mix-blend-normal md:mix-blend-multiply filter blur-[80px] md:blur-[128px] md:animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 z-10 relative">
        <div className="flex flex-col justify-center" ref={containerRef}>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="text-primary font-medium tracking-wider uppercase mb-4 text-sm"
          >
            CREATIVE DESIGNER | WEB DEVELOPER | UI DESIGNER
          </motion.span>
          
          <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-[80px] font-black leading-[1.1] mb-6 overflow-hidden">
            Designing &<br/>Building Digital<br/>Experiences.
          </h1>
          
          <p ref={descRef} className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-lg mb-10">
            Mengubah ide menjadi website, aplikasi, dan pengalaman digital yang modern, fungsional, dan berkesan.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link 
              href="#projects" 
              className="px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1"
            >
              View Projects
            </Link>
            <Link 
              href="#contact" 
              className="px-8 py-4 bg-transparent border border-border text-foreground font-medium rounded-full hover:border-primary hover:text-primary transition-all duration-300 transform hover:-translate-y-1"
            >
              Contact Me
            </Link>
          </motion.div>
        </div>

        <div className="hidden lg:flex items-center justify-center relative">
          {/* Floating showcase abstract shapes */}
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative w-full aspect-square max-w-md"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-3xl transform rotate-6 opacity-80 backdrop-blur-3xl"></div>
            <div className="absolute inset-4 bg-card rounded-2xl shadow-xl border border-border overflow-hidden flex items-center justify-center group">
              <Image 
                src="/profile/hero-profile.png" 
                alt="Faisal Anugrah" 
                fill 
                sizes="(max-width: 768px) 100vw, 512px"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                priority
              />
            </div>
            
            {/* Additional floating shapes */}
            <motion.div 
              animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-accent rounded-full opacity-20 blur-xl"
            />
            <motion.div 
              animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary rounded-full opacity-20 blur-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
