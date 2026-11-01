import { FaCertificate } from "react-icons/fa"

import {
  achievements,
  certifications,
  certificationsIntro,
  type Certification,
} from "../data/portfolio"
import { LogoTile, SectionDivider } from "./shared"
import { useInView } from "../hooks/useInView"

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  return (
    <div
      className={`group relative isolate flex flex-col overflow-hidden rounded-xl border bg-ink/4 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 ${
        cert.featured ? "border-accent/25 sm:col-span-2" : "border-ink/10"
      }`}
    >
      {cert.featured && (
        <>
          <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-accent/10 via-transparent to-transparent" />
          <div className="pointer-events-none absolute -right-14 -top-14 -z-10 h-44 w-44 rounded-full bg-accent/15 blur-2xl" />
        </>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <LogoTile
          logo={cert.logo}
          alt={cert.issuer}
          size={cert.featured ? "h-14 w-14" : "h-12 w-12"}
        />

        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink/25">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
        {cert.issuer}
      </p>

      <h3
        className={`mt-1.5 font-extrabold leading-tight tracking-tight ${
          cert.featured ? "text-xl sm:text-2xl" : "text-base"
        }`}
      >
        {cert.title}
      </h3>

      {/* Skills */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {cert.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-ink/6 px-2 py-1 text-[9px] font-bold uppercase text-ink/70"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-5">
        <div className="flex items-center justify-between gap-3 border-t border-ink/10 pt-3">
          <span className="min-w-0 truncate font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ink/30">
            {cert.credentialId
              ? `ID ${cert.credentialId.slice(0, 8)}…`
              : cert.date || "Certified"}
            {cert.credentialId && cert.date && ` · ${cert.date}`}
          </span>

          {cert.credentialUrl ? (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${cert.title} credential`}
              className="shrink-0 text-xs font-bold text-accent transition-transform hover:translate-x-1"
            >
              View ↗
            </a>
          ) : (
            <FaCertificate className="h-3.5 w-3.5 shrink-0 text-accent/60" aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  )
}

function Certifications() {
  const [sectionRef, isVisible] = useInView<HTMLDivElement>()

  return (
    <div ref={sectionRef} className="px-6 py-16 text-ink md:px-10 lg:px-16">

      <SectionDivider label="Certifications" hint="Credentials" visible={isVisible} />

      {/* Intro */}
      <div
        className={`mx-auto mt-8 w-full max-w-5xl ${
          isVisible ? "animate-[heroFadeUp_0.7s_ease-out_0.15s_both]" : "opacity-0"
        }`}
      >
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
          {certificationsIntro.eyebrow}
        </p>

        <h2 className="mt-2 max-w-xl text-2xl font-extrabold tracking-tight sm:text-3xl">
          {certificationsIntro.heading[0]}
          <br />
          {certificationsIntro.heading[1]}
        </h2>
      </div>

      {/* Cert grid */}
      <div
        className={`mx-auto mt-10 grid w-full max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 ${
          isVisible ? "animate-[heroFadeUp_0.7s_ease-out_0.35s_both]" : "opacity-0"
        }`}
      >
        {certifications.map((cert, i) => (
          <CertCard key={cert.title} cert={cert} index={i} />
        ))}
      </div>

      {/* Achievements strip */}
      <div
        className={`mx-auto mt-3 grid w-full max-w-5xl grid-cols-1 gap-3 md:grid-cols-3 ${
          isVisible ? "animate-[heroFadeUp_0.7s_ease-out_0.5s_both]" : "opacity-0"
        }`}
      >
        {achievements.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="flex items-start gap-3 rounded-xl border border-ink/10 bg-ink/4 px-5 py-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold">{title}</p>
              <p className="mt-1 text-xs leading-5 text-ink/50">{text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom marker */}
      <div
        className={`mx-auto mt-3 flex w-full max-w-5xl items-center justify-between rounded-xl border border-ink/10 bg-ink/4 px-5 py-4 ${
          isVisible ? "animate-[heroFadeUp_0.7s_ease-out_0.65s_both]" : "opacity-0"
        }`}
      >
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink/30">
          {certifications.length} credentials earned
        </span>

        <span className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-accent">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Still learning
        </span>
      </div>
    </div>
  )
}

export default Certifications
