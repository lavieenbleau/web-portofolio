"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Globe, Layout, Sparkles, Palette, MonitorPlay } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: "Web Development",
    description: "Membangun website modern dan responsif yang cepat, aman, dan berkinerja tinggi untuk skala bisnis Anda.",
    icon: <Globe className="w-8 h-8 mb-4 text-primary" />,
    className: "md:col-span-2 md:row-span-2 bg-card",
  },
  {
    title: "UI/UX Design",
    description: "Merancang antarmuka yang intuitif dan pengalaman interaktif yang memanjakan pengguna akhir Anda.",
    icon: <Layout className="w-8 h-8 mb-4 text-primary" />,
    className: "md:col-span-1 md:row-span-1 bg-secondary/30",
  },
  {
    title: "Frontend Dev",
    description: "Menerjemahkan desain visual menjadi kode interaktif dengan animasi yang mulus dan presisi piksel.",
    icon: <Sparkles className="w-8 h-8 mb-4 text-primary" />,
    className: "md:col-span-1 md:row-span-1 bg-card",
  },
  {
    title: "Web Design",
    description: "Menciptakan tata letak visual yang elegan dan estetika premium untuk kehadiran digital merek Anda.",
    icon: <Palette className="w-8 h-8 mb-4 text-primary" />,
    className: "md:col-span-1 md:row-span-1 bg-card",
  },
  {
    title: "Social Media",
    description: "Desain visual kreatif dan strategis untuk sosial media guna meningkatkan engagement dan brand awareness.",
    icon: <MonitorPlay className="w-8 h-8 mb-4 text-primary" />,
    className: "md:col-span-1 md:row-span-1 bg-secondary/30",
  }
]

export function Services() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return

    const cards = gridRef.current.children

    gsap.fromTo(
      cards,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        }
      }
    )
  }, [])

  return (
    <section className="py-32 bg-background relative" id="services">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-4">Services</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">My Expertise</h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-xl">Layanan desain dan pengembangan digital yang membantu bisnis membangun identitas yang kuat, menghadirkan pengalaman pengguna yang lebih baik, dan mencapai tujuan secara efektif.</p>
        </div>

        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-6"
        >
          {services.map((service, index) => (
            <div 
              key={index}
              className={`p-8 rounded-3xl border border-border shadow-sm flex flex-col justify-end relative overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${service.className}`}
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 dark:from-black/0 dark:to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {service.icon}
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
