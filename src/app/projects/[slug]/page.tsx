import { projects } from "@/data/projects"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Cpu } from "lucide-react"
import { SiCanva, SiLaravel, SiPhp, SiMysql, SiLivewire, SiTailwindcss, SiHtml5, SiCss, SiJavascript, SiBootstrap } from "react-icons/si"

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const projectIndex = projects.findIndex((p) => p.slug === slug)
  const project = projects[projectIndex]

  if (!project) {
    notFound()
  }

  const nextProject = projects[(projectIndex + 1) % projects.length]

  return (
    <article className="min-h-screen bg-background">
      {/* Full-Bleed Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[80vh] min-h-[500px] flex items-end pb-8 md:pb-16 pt-32">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={project.heroImage || project.cover} 
            alt={project.title} 
            fill 
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Elegant Gradient Overlay - fades to background at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col items-start mt-auto">
          <Link href="/#projects" className="inline-flex items-center text-foreground/80 hover:text-foreground transition-colors mb-6 backdrop-blur-md bg-white/20 dark:bg-white/10 px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium hover:bg-white/30 dark:hover:bg-white/20">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
          
          {/* Glassmorphism Card */}
          <div className="bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/20 shadow-2xl rounded-3xl p-6 md:p-10 w-fit max-w-full">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-8 text-foreground drop-shadow-sm">{project.title}</h1>
            
            <div className="flex flex-wrap gap-6 md:gap-12 border-t border-border/30 dark:border-white/20 pt-6 mt-2">
              <div>
                <h4 className="text-xs md:text-sm text-foreground/80 uppercase tracking-widest mb-1 font-medium">Client</h4>
                <p className="font-bold text-base md:text-lg">{project.client}</p>
              </div>
              <div>
                <h4 className="text-xs md:text-sm text-foreground/80 uppercase tracking-widest mb-1 font-medium">Category</h4>
                <p className="font-bold text-base md:text-lg">{project.category}</p>
              </div>
              <div>
                <h4 className="text-xs md:text-sm text-foreground/80 uppercase tracking-widest mb-1 font-medium">Year</h4>
                <p className="font-bold text-base md:text-lg">{project.year}</p>
              </div>
              <div>
                <h4 className="text-xs md:text-sm text-foreground/80 uppercase tracking-widest mb-1 font-medium">Services</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.services.map(service => (
                    <span key={service} className="text-[10px] md:text-xs font-bold px-3 py-1 bg-primary text-primary-foreground rounded-full shadow-sm">{service}</span>
                  ))}
                </div>
              </div>
              {project.linkUrl && (
                <div>
                  <h4 className="text-xs md:text-sm text-foreground/80 uppercase tracking-widest mb-1 font-medium">Link</h4>
                  <a 
                    href={project.linkUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-base md:text-lg hover:text-primary transition-colors"
                  >
                    {project.linkLabel || "View Project"}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Project Overview Section */}
      <div className="container mx-auto px-6 md:px-12 max-w-5xl py-20 md:py-28">
        <div className="flex flex-col items-center text-center mb-16">
          <h3 className="text-xs md:text-sm text-[#F4A6C1] font-bold mb-6 tracking-[0.3em] uppercase">About The Project</h3>
          <p className="text-xl md:text-3xl text-foreground leading-[1.6] max-w-[800px] font-medium">
            {project.description}
          </p>
        </div>

        {/* Elegant Pink Gradient Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#F4A6C1]/30 to-transparent mb-16"></div>

        {/* 3-Column Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Role */}
          <div className="bg-[#F4A6C1]/5 border border-[#F4A6C1]/15 rounded-[20px] p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#F4A6C1]/40 hover:shadow-[0_0_30px_rgba(244,166,193,0.15)] group">
            <h4 className="text-xs font-bold text-[#F4A6C1] uppercase tracking-widest mb-6">Role</h4>
            <div className="flex flex-col gap-3 text-white text-base font-medium">
              {project.role ? project.role.map((r, i) => <span key={i}>{r}</span>) : project.services.map((s, i) => <span key={i}>{s}</span>)}
            </div>
          </div>
          
          {/* Card 2: Tools */}
          <div className="bg-[#F4A6C1]/5 border border-[#F4A6C1]/15 rounded-[20px] p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#F4A6C1]/40 hover:shadow-[0_0_30px_rgba(244,166,193,0.15)] group">
            <h4 className="text-xs font-bold text-[#F4A6C1] uppercase tracking-widest mb-6">Tools</h4>
            <div className="flex flex-col gap-3 text-white text-base font-medium">
              {project.tools ? project.tools.map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F4A6C1]/10 flex items-center justify-center">
                    {/* SVG Icon for tools */}
                    {t.toLowerCase().includes('canva') ? (
                      <SiCanva className="w-4 h-4" color="#00C4CC" />
                    ) : t.toLowerCase().includes('photoshop') ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#31A8FF" className="w-4 h-4"><path d="M0 0v24h24V0H0zm6.94 13.922c-.655 0-1.127-.123-1.42-.365-.291-.246-.438-.564-.438-.96 0-.395.147-.714.438-.96.293-.243.765-.365 1.42-.365h1.564v2.65H6.94zm2.148-5.328c1.378 0 2.404.301 3.076.9.673.6 1.01 1.458 1.01 2.576 0 1.118-.337 1.976-1.01 2.576-.672.6-1.698.9-3.076.9H7.525v3.13h-2.18V8.594h3.743zm7.625 10.13c-1.396 0-2.521-.384-3.374-1.152-.854-.768-1.28-1.848-1.28-3.24h2.158c0 .8.212 1.411.638 1.832.424.421 1 .632 1.725.632.748 0 1.314-.194 1.697-.582.384-.388.576-.874.576-1.458 0-.584-.175-1.036-.526-1.356-.35-.32-.821-.572-1.413-.756l-.89-.28c-.808-.255-1.428-.616-1.858-1.082-.43-.467-.646-1.096-.646-1.89 0-1.05.372-1.872 1.116-2.466.744-.594 1.73-.89 2.958-.89 1.157 0 2.113.315 2.868.944.755.629 1.133 1.54 1.133 2.734H17.27c0-.663-.193-1.187-.577-1.572-.385-.385-.92-.578-1.605-.578-.66 0-1.173.167-1.54.502-.366.335-.55 1.31 0 .502.164.896.492 1.182.328.286.76.518 1.296.696l.89.302c.866.29 1.517.68 1.954 1.168.437.488.655 1.144.655 1.968 0 1.13-.393 2.016-1.178 2.658-.785.642-1.85 0-3.394 0z"/></svg>
                    ) : t.toLowerCase().includes('laravel') ? (
                      <SiLaravel className="w-4 h-4" color="#FF2D20" />
                    ) : t.toLowerCase().includes('php') ? (
                      <SiPhp className="w-4 h-4" color="#777BB4" />
                    ) : t.toLowerCase().includes('mysql') ? (
                      <SiMysql className="w-4 h-4" color="#4479A1" />
                    ) : t.toLowerCase().includes('livewire') ? (
                      <SiLivewire className="w-4 h-4" color="#FB70A9" />
                    ) : t.toLowerCase().includes('tailwind') ? (
                      <SiTailwindcss className="w-4 h-4" color="#06B6D4" />
                    ) : t.toLowerCase().includes('html') ? (
                      <SiHtml5 className="w-4 h-4" color="#E34F26" />
                    ) : t.toLowerCase().includes('css') ? (
                      <SiCss className="w-4 h-4" color="#1572B6" />
                    ) : t.toLowerCase().includes('javascript') ? (
                      <SiJavascript className="w-4 h-4" color="#F7DF1E" />
                    ) : t.toLowerCase().includes('bootstrap') ? (
                      <SiBootstrap className="w-4 h-4" color="#7952B3" />
                    ) : t.toLowerCase().includes('openrouter') ? (
                      <Cpu className="w-4 h-4 text-purple-400" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    )}
                  </div>
                  <span>{t}</span>
                </div>
              )) : <span>Design Suite</span>}
            </div>
          </div>

          {/* Card 3: Deliverables */}
          <div className="bg-[#F4A6C1]/5 border border-[#F4A6C1]/15 rounded-[20px] p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#F4A6C1]/40 hover:shadow-[0_0_30px_rgba(244,166,193,0.15)] group md:col-span-2 lg:col-span-1">
            <h4 className="text-xs font-bold text-[#F4A6C1] uppercase tracking-widest mb-6">Deliverables</h4>
            <div className="flex flex-col gap-3 text-white text-base font-medium">
              {project.deliverables ? project.deliverables.map((d, i) => <span key={i}>{d}</span>) : <span>Full Project Assets</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Showcase Intro */}
      <div className="container mx-auto px-6 md:px-12 text-center mb-10">
        <h3 className="text-xs md:text-sm text-[#F4A6C1] font-bold mb-4 tracking-[0.3em] uppercase">Project Showcase</h3>
        <p className="text-neutral-400 text-sm md:text-base max-w-2xl mx-auto">{project.showcaseDescription || "A selection of visual content created to educate, engage, and strengthen brand presence."}</p>
      </div>

      {/* Gallery Section */}
      <div className="container mx-auto px-6 md:px-12 mb-32">
        {project.layoutType === "instagram-feed" ? (
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {project.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-xl group border border-border/50"
                >
                  <Image 
                    src={img} 
                    alt={`${project.title} post ${idx + 1}`} 
                    fill 
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-12 md:gap-24 max-w-6xl mx-auto">
            {project.images.map((img, idx) => (
              <div 
                key={idx} 
                className="w-full relative"
              >
                <Image 
                  src={img} 
                  alt={`${project.title} image ${idx + 1}`} 
                  width={1920}
                  height={1080}
                  className="w-full h-auto rounded-2xl z-10 transition-all duration-500 shadow-md hover:shadow-[0_0_60px_15px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_0_60px_15px_rgba(255,255,255,0.3)] hover:ring-2 hover:ring-primary relative"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cinematic Next Project */}
      <div className="relative border-t border-border mt-24 group overflow-hidden">
        {/* Next project background image revealing on hover */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={nextProject.heroImage || nextProject.cover} 
            alt={nextProject.title}
            fill
            sizes="100vw"
            className="object-cover opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-1000 scale-105 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-background/95 group-hover:bg-background/80 transition-colors duration-1000"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 text-center py-24 md:py-32 relative z-10">
          <p className="text-neutral-500 dark:text-neutral-400 uppercase tracking-[0.2em] mb-4 text-xs md:text-sm font-semibold">Next Project</p>
          <Link href={`/projects/${nextProject.slug}`} className="inline-block">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground hover:text-primary transition-all duration-500 transform hover:scale-105">
               {nextProject.title}
            </h2>
          </Link>
        </div>
      </div>
    </article>
  )
}
