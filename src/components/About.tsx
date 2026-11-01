import { useEffect, useState } from "react"
import { FaTerminal } from "react-icons/fa"

import { about, site } from "../data/portfolio"
import { SectionDivider } from "./shared"
import { useInView } from "../hooks/useInView"

function About() {
  const [sectionRef, isVisible] = useInView<HTMLDivElement>()
  const [activeSlide, setActiveSlide] = useState(0)
  const [paused, setPaused] = useState(false)

  const toolkit = about.toolkit

  // Auto-advance the toolkit terminal every 3.5s (paused on hover)
  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % toolkit.length)
    }, 3500)

    return () => clearInterval(timer)
  }, [toolkit.length, paused])

  const active = toolkit[activeSlide]

  return (
    <div ref={sectionRef} className="px-6 py-16 text-ink md:px-10 lg:px-16">

      <SectionDivider label="About" hint="Profile" visible={isVisible} />

      <div className="mx-auto mt-8 w-full max-w-5xl">

        {/* Intro */}
        <div
          className={`rounded-xl border border-ink/10 bg-ink/4 p-5 sm:p-7 ${
            isVisible ? "animate-[heroFadeUp_0.7s_ease-out_0.15s_both]" : "opacity-0"
          }`}
        >
          <div className="grid gap-8 md:grid-cols-[1.3fr_0.7fr]">

            {/* Main statement */}
            <div>
              <div className="mb-5 flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
                    {about.eyebrow}
                  </p>

                  <h2 className="mt-2 text-xl font-extrabold text-ink/90 sm:text-3xl">
                    {about.heading[0]}
                    <br />
                    <span className="text-accent">{about.heading[1]}</span>
                  </h2>
                </div>

                <div className="relative shrink-0">
                  <img
                    src={site.photo}
                    alt={site.name}
                    className="h-14 w-14 rounded-full border-2 border-accent object-cover object-top"
                  />

                  <div className="pointer-events-none absolute right-0 top-full z-10 mt-2 animate-profile-greeting whitespace-nowrap rounded-md border border-ink/10 bg-doom px-3 py-1.5 text-xs font-medium text-ink shadow-sm">
                    {about.greeting}
                  </div>
                </div>
              </div>

              {about.paragraphs.map((text, i) => (
                <p
                  key={i}
                  className={`max-w-xl text-sm leading-6 sm:text-base ${
                    i === 0 ? "mt-5 text-ink/60" : "mt-4 text-ink/50"
                  }`}
                >
                  {text}
                </p>
              ))}
            </div>

            {/* Quick facts */}
            <div className="border-t border-accent/10 pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <div className="mt-5 space-y-5">
                {about.facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent/80" />
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-ink/30">
                        {label}
                      </span>
                      <p className="mt-1 text-xs font-semibold sm:text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Focus cards + toolkit terminal */}
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">

          <div className="grid grid-cols-1 gap-3">
            {about.focus.map(({ icon: Icon, tag, title, text }, i) => (
              <div
                key={title}
                className={`group relative isolate overflow-hidden rounded-xl border border-ink/10 bg-ink/4 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 ${
                  isVisible
                    ? i === 0
                      ? "animate-[heroFadeUp_0.7s_ease-out_0.35s_both]"
                      : "animate-[heroFadeUp_0.7s_ease-out_0.45s_both]"
                    : "opacity-0"
                }`}
              >
                <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-accent/8 via-transparent to-transparent" />
                <div className="pointer-events-none absolute -right-10 -top-10 -z-10 h-36 w-36 rounded-full bg-accent/15 blur-xl transition-opacity duration-300 group-hover:opacity-90" />

                <Icon className="h-5 w-5 text-accent" />

                <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/30">
                  {tag}
                </p>

                <h3 className="mt-2 text-base font-bold">{title}</h3>

                <p className="mt-2 text-xs leading-5 text-ink/50 md:text-sm">{text}</p>
              </div>
            ))}
          </div>

          {/* Toolkit terminal */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className={`group relative isolate flex flex-col overflow-hidden rounded-xl border border-accent/15 bg-[#120D0B] p-5 transition-all duration-300 ${
              isVisible ? "animate-[heroFadeUp_0.7s_ease-out_0.5s_both]" : "opacity-0"
            }`}
          >
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_45%,rgba(242,87,43,0.14),transparent_60%)]" />

            <div className="flex items-center justify-between">
              <FaTerminal className="h-5 w-5 text-accent/80" />
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
              </div>
            </div>

            <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40">
              Toolkit
            </p>

            <h3 className="mt-2 text-base font-bold">What's in my arsenal</h3>

            {/* Terminal body */}
            <div
              className="mt-5 flex-1 rounded-lg border border-ink/10 bg-black/40 p-4 font-mono text-xs"
              aria-live="polite"
            >
              <p className="text-ink/40">
                <span className="text-accent">{site.firstName.toLowerCase()}@sec</span>
                <span className="text-ink/30">:</span>
                <span className="text-accent-blue">~/toolkit</span>
                <span className="text-ink/30">$ </span>
                <span className="text-ink/80">cat {active.file}</span>
              </p>

              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-accent/70">
                # {active.title}
              </p>

              <ul key={active.file} className="mt-2 grid grid-cols-1 gap-x-4 gap-y-1.5 min-[420px]:grid-cols-2">
                {active.items.map((item, i) => (
                  <li
                    key={item}
                    className="animate-[heroFadeUp_0.4s_ease-out_both] truncate text-ink/75"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <span className="text-accent">›</span> {item}
                  </li>
                ))}
              </ul>

              <p className="mt-3 text-ink/40">
                <span className="text-accent">$</span>
                <span className="ml-1 inline-block h-3 w-1.5 animate-caret bg-accent align-middle" />
              </p>
            </div>

            {/* Indicators */}
            <div className="relative z-40 mt-4 flex justify-center gap-1.5">
              {toolkit.map((group, i) => (
                <button
                  key={group.file}
                  type="button"
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Show ${group.title}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeSlide ? "w-5 bg-accent" : "w-1.5 bg-ink/20 hover:bg-ink/40"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Bottom metadata */}
        <div
          className={`mt-3 flex flex-col gap-3 rounded-xl border border-ink/10 bg-ink/4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
            isVisible ? "animate-[heroFadeUp_0.7s_ease-out_0.65s_both]" : "opacity-0"
          }`}
        >
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink/30">
            {about.motto}
          </span>

          <span className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-accent">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            {about.status}
          </span>
        </div>

      </div>
    </div>
  )
}

export default About
