import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { FeaturedProjects } from "@/components/sections/featured-projects"
import { Services } from "@/components/sections/services"
import { Process } from "@/components/sections/process"
import { Contact } from "@/components/sections/contact"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProjects />
      <Services />
      <Process />
      <Contact />
    </>
  )
}
