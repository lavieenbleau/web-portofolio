"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-lg font-bold">© 2026 Faisal Anugrah</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Creative Designer</p>
        </div>
        <div className="flex gap-6">
          <Link href="https://instagram.com" target="_blank" className="text-sm hover:text-primary transition-colors">
            Instagram
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="text-sm hover:text-primary transition-colors">
            LinkedIn
          </Link>
          <Link href="https://behance.net" target="_blank" className="text-sm hover:text-primary transition-colors">
            Behance
          </Link>
        </div>
      </div>
    </footer>
  )
}
