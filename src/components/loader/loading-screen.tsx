"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { gsap } from "gsap"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const subtextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false)
        }
      })

      const chars = textRef.current?.querySelectorAll('.char')
      
      if (chars && chars.length > 0) {
        tl.fromTo(
          chars,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.8,
            ease: "power4.out"
          }
        )
      }

      if (subtextRef.current) {
        tl.fromTo(
          subtextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          chars && chars.length > 0 ? "-=0.4" : "0"
        )
      }
      
      // Delay before completely hiding
      tl.to({}, { duration: 0.5 }) 
    })

    // Safety timeout in case GSAP fails to complete
    const safetyTimeout = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => {
      ctx.revert() // Clean up properly
      clearTimeout(safetyTimeout)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0f0f0f] text-[#f8f8f8]"
        >
          <div className="overflow-hidden">
            <h1 ref={textRef} className="text-4xl md:text-6xl font-bold tracking-widest flex">
              {"FAISAL".split("").map((char, index) => (
                <span key={index} className="char inline-block">{char}</span>
              ))}
            </h1>
          </div>
          <div className="overflow-hidden mt-4">
            <p ref={subtextRef} className="text-sm md:text-base tracking-[0.3em] text-neutral-600 dark:text-neutral-400 uppercase">
              Creative Portfolio
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
