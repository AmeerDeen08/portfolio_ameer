import { FaBuilding, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa"

import {
  education,
  educationIntro,
  experience,
  experienceIntro,
  type TimelineItem,
} from "../data/portfolio"
import { LogoTile, SectionDivider, Tag } from "./shared"
import { useInView } from "../hooks/useInView"

function Timeline({ items, visible }: { items: TimelineItem[]; visible: boolean }) {
  return (
    <div className="mx-auto mt-10 w-full max-w-4xl">
      {items.map((item, i) => (
        <div
          key={item.title + item.period}
          className={`relative flex gap-5 transition-all duration-700 sm:gap-6 ${
            visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
          }`}
          style={{ transitionDelay: `${250 + i * 180}ms` }}
        >
          {/* Timeline rail */}
          <div className="flex flex-col items-center">
            <div
              className={`transition-all duration-700 ${
                visible ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
              style={{ transitionDelay: `${350 + i * 180}ms` }}
            >
              <LogoTile logo={item.logo} monogram={item.monogram} alt={item.org} />
            </div>

            {i !== items.length - 1 && (
              <div
                className={`mt-1 w-px flex-1 origin-top bg-linear-to-b from-accent/40 to-ink/10 transition-transform duration-1000 ${
                  visible ? "scale-y-100" : "scale-y-0"
                }`}
                style={{ transitionDelay: `${450 + i * 180}ms` }}
              />
            )}
          </div>

          {/* Card */}
          <div className={`flex-1 pb-8 ${i !== items.length - 1 ? "mb-8 border-b border-ink/10" : ""}`}>
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold sm:text-lg">{item.title}</h3>

                  {item.present && (
                    <span className="rounded-full border border-accent/30 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-accent">
                      Present
                    </span>
                  )}
                </div>

                <p className="mt-1 flex items-center gap-1.5 text-sm text-ink/50">
                  <FaBuilding className="h-3 w-3 shrink-0" />
                  {item.org}
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-1 font-mono text-sm text-ink/40 sm:items-end">
                <span className="flex items-center gap-1.5">
                  <FaCalendarAlt className="h-3 w-3" />
                  {item.period}
                </span>

                <span className="flex items-center gap-1.5">
                  <FaMapMarkerAlt className="h-3 w-3" />
                  {item.location}
                </span>
              </div>
            </div>

            {item.summary && (
              <p className="mt-3 text-sm leading-6 text-ink/60">{item.summary}</p>
            )}

            {item.points && (
              <ul className="mt-3 space-y-1.5">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-6 text-ink/60">
                    <span className="mt-0.5 font-mono text-accent">›</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              {item.tags?.map((tag) => <Tag key={tag}>{tag}</Tag>)}

              {item.link && (
                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-xs font-bold text-accent transition-transform hover:translate-x-1"
                >
                  {item.link.label} ↗
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Experience() {
  const [sectionRef, isVisible] = useInView<HTMLDivElement>()
  const [eduRef, eduVisible] = useInView<HTMLDivElement>()

  return (
    <div className="relative isolate overflow-hidden px-6 py-16 text-ink md:px-10 lg:px-16">
      <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-105 w-105 -translate-x-1/2 translate-y-1/3 rounded-full bg-accent/6 blur-3xl" />

      {/* Experience */}
      <div ref={sectionRef}>
        <SectionDivider label="Experience" hint="Career" visible={isVisible} />

        <div
          className={`mx-auto mt-8 w-full max-w-5xl transition-all delay-100 duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <h2 className="max-w-xl text-xl font-extrabold tracking-tight sm:text-2xl">
            {experienceIntro.heading}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-ink/50 sm:text-base">
            {experienceIntro.text}
          </p>
        </div>

        <Timeline items={experience} visible={isVisible} />
      </div>

      {/* Education */}
      <div ref={eduRef} className="mt-10">
        <div
          className={`mx-auto w-full max-w-5xl transition-all duration-700 ${
            eduVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Academics
          </p>
          <h2 className="mt-2 max-w-xl text-xl font-extrabold tracking-tight sm:text-2xl">
            {educationIntro.heading}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-ink/50 sm:text-base">
            {educationIntro.text}
          </p>
        </div>

        <Timeline items={education} visible={eduVisible} />
      </div>
    </div>
  )
}

export default Experience
