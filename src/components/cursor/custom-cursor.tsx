"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [hoverText, setHoverText] = useState("")

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Setup mouse move tracking
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out"
      })
    }

    // Setup hover states for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isLinkOrBtn = target.closest('a') || target.closest('button')
      const isProject = target.closest('[data-cursor="project"]')

      if (isProject) {
        setIsHovering(true)
        setHoverText("VIEW PROJECT")
        gsap.to(cursor, { scale: 3, duration: 0.3, ease: "power2.out" })
      } else if (isLinkOrBtn) {
        setIsHovering(true)
        setHoverText("")
        gsap.to(cursor, { scale: 1.5, duration: 0.3, ease: "power2.out" })
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
      setHoverText("")
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" })
    }

    window.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[90] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-colors duration-300 ${
        isHovering ? "bg-white" : "border-2 border-white"
      }`}
      style={{
        transform: "translate(-50%, -50%)"
      }}
    >
      {hoverText && (
        <span className="text-[4px] font-bold text-black opacity-100 whitespace-nowrap">
          {hoverText}
        </span>
      )}
    </div>
  )
}
