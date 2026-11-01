import { FaGithub } from "react-icons/fa"

import { projects, projectsIntro } from "../data/portfolio"
import ProjectCover from "./ProjectCover"
import { SectionDivider } from "./shared"
import { useInView } from "../hooks/useInView"

function Projects() {
  const [sectionRef, isVisible] = useInView<HTMLDivElement>()

  return (
    <div ref={sectionRef} className="px-6 py-16 text-ink md:px-10 lg:px-16">

      <SectionDivider label="Projects" hint="Selected Work" visible={isVisible} />

      {/* Intro */}
      <div
        className={`mx-auto mt-8 w-full max-w-5xl ${
          isVisible ? "animate-[heroFadeUp_0.7s_ease-out_0.15s_both]" : "opacity-0"
        }`}
      >
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
          {projectsIntro.eyebrow}
        </p>

        <h2 className="mt-2 max-w-xl text-2xl font-extrabold tracking-tight sm:text-3xl">
          {projectsIntro.heading[0]}
          <br />
          {projectsIntro.heading[1]}
        </h2>
      </div>

      {/* Card grid */}
      <div
        className={`mx-auto mt-10 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 ${
          isVisible ? "animate-[heroFadeUp_0.7s_ease-out_0.35s_both]" : "opacity-0"
        }`}
      >
        {projects.map((project) => {
          const primary = project.live || project.github

          return (
            <article
              key={project.slug}
              className="group relative flex flex-col overflow-hidden rounded-[28px] border-[5px] border-black bg-[#1c1c1c] shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-accent/10"
            >
              {/* Hover tooltip */}
              <span className="pointer-events-none absolute right-4 top-4 z-10 origin-top-right rotate-6 scale-75 rounded-full bg-accent px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide text-ink-deep opacity-0 shadow-lg shadow-black/20 transition-all duration-300 group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100">
                {project.status ?? "Check this out!"}
              </span>

              {/* Cover */}
              <div className="relative h-40 w-full overflow-hidden sm:h-44">
                <ProjectCover project={project} />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Folder-tab title */}
              <div className="relative -mt-5 w-[78%] rounded-t-2xl bg-[#1c1c1c] px-5 pb-2 pt-4">
                <p className="font-mono text-[9px] font-bold uppercase leading-tight tracking-wide text-accent">
                  {project.category}
                </p>
                <h3 className="mt-0.5 truncate text-base font-extrabold uppercase tracking-tight text-white">
                  {project.title}
                </h3>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col justify-between gap-4 bg-[#1c1c1c] px-5 pb-5 pt-1">
                <p className="text-xs leading-5 text-white/55">{project.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-white/8 px-2 py-1 text-[9px] font-bold uppercase text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Bottom actions row */}
                <div className="mt-1 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-white/30">
                    {primary ? "" : "Code coming soon"}
                  </span>

                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all duration-300 hover:border-accent hover:bg-accent hover:text-ink-deep"
                      >
                        <FaGithub className="h-3.5 w-3.5" />
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${project.title}`}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-sm text-white/50 transition-all duration-300 hover:border-accent hover:bg-accent hover:text-ink-deep"
                      >
                        ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Bottom marker */}
      <div
        className={`mx-auto mt-6 flex w-full max-w-5xl items-center justify-between rounded-xl border border-ink/10 bg-ink/4 px-5 py-4 ${
          isVisible ? "animate-[heroFadeUp_0.7s_ease-out_0.65s_both]" : "opacity-0"
        }`}
      >
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink/30">
          {projectsIntro.footer}
        </span>

        <span className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-accent">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          {projectsIntro.footerStatus}
        </span>
      </div>
    </div>
  )
}

export default Projects
