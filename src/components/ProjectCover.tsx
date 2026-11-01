import type { Project } from "../data/portfolio"

// Project image, or a generated "terminal" cover when no screenshot is set
export default function ProjectCover({
  project,
  className = "",
}: {
  project: Project
  className?: string
}) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} preview`}
        className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${className}`}
      />
    )
  }

  const Icon = project.cover.icon

  return (
    <div
      aria-hidden="true"
      className={`relative h-full w-full overflow-hidden bg-[#08100C] transition-transform duration-500 group-hover:scale-105 ${className}`}
    >
      {/* Grid + glow */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,228,140,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(59,228,140,0.07)_1px,transparent_1px)] bg-size-[18px_18px]" />
      <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -bottom-12 left-6 h-32 w-32 rounded-full bg-accent-blue/10 blur-3xl" />

      {/* Big watermark icon */}
      <Icon className="absolute -bottom-4 -right-3 h-28 w-28 rotate-[-8deg] text-accent/10" />

      {/* Terminal lines */}
      <div className="relative flex h-full flex-col justify-center gap-1 px-5 py-4 font-mono text-[10px] leading-4 sm:text-[11px]">
        <div className="mb-1.5 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]/80" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]/80" />
          <span className="h-2 w-2 rounded-full bg-accent/80" />
          <span className="ml-2 truncate text-ink/30">~/{project.slug}</span>
        </div>

        {project.cover.lines.map((line, i) => (
          <p
            key={line}
            className={`truncate ${
              i === project.cover.lines.length - 1 ? "text-accent" : "text-ink/55"
            }`}
          >
            <span className="text-accent/50">$ </span>
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}
