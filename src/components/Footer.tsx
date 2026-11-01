import { footer, site } from "../data/portfolio"
import { navItems } from "./navItems"

function Footer() {
  return (
    <footer className="border-t border-ink/10 px-6 py-8 pb-28 text-ink md:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-5xl">

        {/* Main footer row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight">
                {site.initials}
                <span className="text-accent">.</span>
              </span>

              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/30">
                {site.role}
              </span>
            </div>

            <p className="mt-2 text-xs text-ink/40">{footer.tagline}</p>
          </div>

          {/* Navigation + Back to top */}
          <div className="flex items-center gap-4">
            <nav className="flex flex-wrap items-center gap-4 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-ink/40">
              {navItems.map(({ id, label }) => (
                <a key={id} href={`#${id}`} className="transition-colors hover:text-accent">
                  {label}
                </a>
              ))}
            </nav>

            <a
              href="#home"
              aria-label="Back to top"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent text-ink-deep transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-accent/30"
            >
              ↑
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-7 flex flex-col gap-2 border-t border-ink/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/30">
            © {new Date().getFullYear()} {site.name}
          </p>

          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/30">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            <span className="text-accent/60">//</span> {footer.status}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
