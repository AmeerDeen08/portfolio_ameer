import type { ReactNode } from "react"
import type { Logo } from "../data/portfolio"

export function SectionDivider({
  label,
  hint,
  visible,
}: {
  label: string
  hint?: string
  visible: boolean
}) {
  return (
    <div
      className={`mx-auto flex w-full max-w-5xl items-center gap-4 font-mono text-[10px] font-bold uppercase tracking-wider text-ink/40 sm:text-xs ${
        visible ? "animate-[heroFadeDown_0.7s_ease-out_both]" : "opacity-0"
      }`}
    >
      <span className="flex shrink-0 items-center gap-2 text-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px] shadow-accent" />
        {label}
      </span>

      <div className="h-1 flex-1 bg-accent/10" />

      {hint && <span className="hidden sm:block">{hint}</span>}
    </div>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md bg-ink/6 px-2 py-1 text-[10px] font-bold uppercase">
      {children}
    </span>
  )
}

// Square tile that holds an organisation logo (or a monogram fallback)
export function LogoTile({
  logo,
  monogram,
  alt,
  size = "h-11 w-11",
}: {
  logo?: Logo
  monogram?: string
  alt: string
  size?: string
}) {
  if (!logo) {
    return (
      <div
        className={`${size} flex shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 font-mono text-xs font-extrabold text-accent`}
        aria-hidden="true"
      >
        {monogram ?? alt.slice(0, 2).toUpperCase()}
      </div>
    )
  }

  return (
    <div
      className={`${size} flex shrink-0 items-center justify-center overflow-hidden rounded-lg border p-1.5 ${
        logo.wide ? "aspect-2/1 w-auto! px-2.5" : ""
      } ${
        logo.bg === "dark"
          ? "border-ink/15 bg-doom"
          : "border-ink/10 bg-white"
      }`}
    >
      <img
        src={logo.src}
        alt={`${alt} logo`}
        loading="lazy"
        className="h-full w-full object-contain"
      />
    </div>
  )
}
