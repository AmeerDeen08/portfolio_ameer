import { useEffect, useRef, useState } from "react"
import { navItems } from "./navItems"

// How long the page must stop scrolling before we trust scroll position again
const SETTLE_MS = 120

export default function Navbar() {
  const [activeId, setActiveId] = useState(navItems[0].id)

  const isNavigating = useRef(false)
  const settleTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    const update = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2

      if (atBottom) {
        setActiveId(navItems[navItems.length - 1].id)
        return
      }

      const line = window.innerHeight * 0.35
      let current = navItems[0].id

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) {
          current = section.id
        }
      }

      setActiveId(current)
    }

    const handleScroll = () => {
      if (isNavigating.current) {
        window.clearTimeout(settleTimer.current)
        settleTimer.current = window.setTimeout(() => {
          isNavigating.current = false
          update()
        }, SETTLE_MS)
        return
      }

      update()
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", update)
    update()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", update)
      window.clearTimeout(settleTimer.current)
    }
  }, [])

  const handleClick = (id: string) => {
    setActiveId(id)
    isNavigating.current = true

    // Safety net: if the click causes no scroll (already at the target),
    // no scroll event fires, so release the lock ourselves.
    window.clearTimeout(settleTimer.current)
    settleTimer.current = window.setTimeout(() => {
      isNavigating.current = false
    }, 200)
  }

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-full border border-ink/10 bg-doom/90 px-2 py-2 shadow-lg shadow-black/40 backdrop-blur-md">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeId === id

          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => handleClick(id)}
              aria-label={label}
              aria-current={isActive ? "location" : undefined}
              className={`flex items-center gap-2 rounded-full px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isActive
                  ? "bg-accent/20 text-accent"
                  : "text-ink/50 hover:bg-ink/5 hover:text-ink/80"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.12em] md:block">
                {label}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
