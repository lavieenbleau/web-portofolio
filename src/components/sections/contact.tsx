"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setSubmitStatus("success")
        ;(e.target as HTMLFormElement).reset()
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-32 bg-background relative overflow-hidden" id="contact">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black leading-[1.1] mb-8"
            >
              Let's Work<br />
              Together.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-neutral-600 dark:text-neutral-400 mb-12"
            >
              Tertarik bekerja sama atau mendiskusikan proyek baru? Mari terhubung dan mulai membangun sesuatu yang bermanfaat.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <a href="https://wa.me/6289513103507" target="_blank" rel="noreferrer" className="px-8 py-4 bg-card border border-border rounded-full hover:border-primary hover:text-primary transition-all shadow-sm">
                WhatsApp
              </a>
              <a href="https://www.instagram.com/f.ysl__a" target="_blank" rel="noreferrer" className="px-8 py-4 bg-card border border-border rounded-full hover:border-primary hover:text-primary transition-all shadow-sm">
                Instagram
              </a>
              <a href="mailto:faisalanugrah13@gmail.com" className="px-8 py-4 bg-card border border-border rounded-full hover:border-primary hover:text-primary transition-all shadow-sm">
                Email
              </a>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card p-8 md:p-12 rounded-3xl border border-border shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  rows={5}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground font-bold rounded-xl px-4 py-4 hover:bg-primary/90 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitStatus === "success" && (
                <p className="text-green-500 text-sm mt-4 text-center">Message sent successfully! I will get back to you soon.</p>
              )}
              {submitStatus === "error" && (
                <p className="text-destructive text-sm mt-4 text-center">Failed to send message. Please try again later.</p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
