export interface Project {
  slug: string
  title: string
  category: string
  year: string
  client: string
  services: string[]
  description: string
  cover: string
  heroImage?: string
  images: string[]
  layoutType?: "standard" | "instagram-feed"
  featured: boolean
  role?: string[]
  deliverables?: string[]
  tools?: string[]
  linkUrl?: string
  linkLabel?: string
  showcaseDescription?: string
}
