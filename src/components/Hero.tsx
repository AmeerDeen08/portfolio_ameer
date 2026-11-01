import { useEffect, useState } from "react"
import { SiGithub } from "react-icons/si"
import { FaFileDownload } from "react-icons/fa"

import { GitHubContributionGraph } from "github-contrib-graph/react"
import "github-contrib-graph/styles.css"

import { hero, projects, site } from "../data/portfolio"
import ProjectCover from "./ProjectCover"
import { Tag } from "./shared"

const GRAPH_LEVELS = [
  "rgba(38, 38, 38, 0.9)",    // no contributions
  "rgba(242, 87, 43, 0.25)", // accent tints
  "rgba(242, 87, 43, 0.45)",
  "rgba(242, 87, 43, 0.7)",
  "#F2572B",                  // most contributions
]

// Fixed positions for the tilted icon pile (one per stack item, max 6)
const PILE_POSITIONS = [
  "left-6 top-3 z-10 -rotate-6 shadow-sm",
  "right-4 top-1 z-20 rotate-[5deg] shadow-sm",
  "left-9 top-16 z-30 rotate-3 shadow-md",
  "right-7 top-14 z-30 rotate-[-4deg] shadow-md",
  "bottom-5 left-12 z-40 rotate-[-4deg] shadow-lg",
  "bottom-3 right-11 z-50 rotate-[7deg] shadow-xl",
]

// Types out each role, pauses, deletes it, then moves to the next
function useTypewriter(words: string[], typeMs = 70, holdMs = 1800) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]

    if (!deleting && text === word) {
      const t = window.setTimeout(() => setDeleting(true), holdMs)
      return () => window.clearTimeout(t)
    }

    const t = window.setTimeout(
      () => {
        if (!deleting) {
          setText(word.slice(0, text.length + 1))
          return
        }

        const next = word.slice(0, text.length - 1)
        setText(next)
        if (next === "") {
          setDeleting(false)
          setIndex((i) => (i + 1) % words.length)
        }
      },
      deleting ? typeMs / 2 : typeMs
    )
    return () => window.clearTimeout(t)
  }, [text, deleting, index, words, typeMs, holdMs])

  return text
}

const SEGMENT_CLIP =
  "polygon(14px 0, 100% 0, calc(100% - 14px) 50%, 100% 100%, 14px 100%, 0 50%)"

function Hero() {
  const [githubMonths, setGithubMonths] = useState<
    { name: string; totalWeeks: number }[]
  >([])

  const role = useTypewriter(hero.roles)
  const featured =
    projects.find((p) => p.slug === hero.featuredProject) ?? projects[0]
  const featuredLink = featured.live || featured.github

  return (
    <div className="relative min-h-screen px-6 py-6 md:px-10 lg:px-16">

      {/* Terminal */}
      <div className="mx-auto mb-8 hidden w-full animate-[heroFadeDown_0.7s_ease-out_both] md:block md:max-w-5xl">
        <div className="flex w-full items-stretch overflow-hidden font-mono text-xs font-bold sm:text-sm">

          <span className="flex shrink-0 items-center bg-accent py-3 pl-5 pr-8 text-ink-deep" style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 14px) 50%, 100% 100%, 0 100%)" }}>
            root
          </span>

          {hero.terminal.map((segment, i) => (
            <span
              key={segment}
              className={`-ml-3.5 flex shrink-0 items-center py-3 pl-9 pr-8 text-white ${
                i === 0 ? "bg-doom" : "bg-doom/80"
              }`}
              style={{ clipPath: SEGMENT_CLIP }}
            >
              {segment}
            </span>
          ))}

          <span className="-ml-3.5 flex min-w-0 flex-1 items-center bg-ink/6 py-3 pl-9 pr-8 text-ink/90" style={{ clipPath: SEGMENT_CLIP }}>
            <span className="truncate text-accent">{role}</span>
            <span className="ml-0.5 h-4 w-2 shrink-0 animate-caret bg-accent" />
          </span>

        </div>
      </div>

      {/* Hero */}
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">

        {/* Profile */}
        <div className="flex animate-[heroScale_0.7s_ease-out_0.15s_both] flex-col items-center gap-3 md:items-start">
          <div className="relative aspect-square w-30 overflow-hidden rounded-xl border-2 border-ink/15 lg:w-38">
            <img
              src={site.photo}
              alt={site.name}
              className="h-full w-full object-cover object-top"
            />
            {/* Scanner line */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 animate-scan bg-linear-to-b from-transparent via-white/10 to-transparent" />
          </div>

          {site.resumeUrl && (
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-38 items-center justify-center gap-2 rounded-lg bg-doom/90 py-2 text-xs font-bold text-ink/80 transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent sm:text-sm"
            >
              <FaFileDownload className="h-3.5 w-3.5" aria-hidden="true" />
              {hero.resumeLabel}
            </a>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 animate-[heroFadeUp_0.7s_ease-out_0.25s_both]">
          <p className="mb-4 mt-4 flex justify-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent sm:text-sm md:justify-start">
            <span className="text-ink/30">&gt;_&nbsp;</span>
            {hero.eyebrow}
          </p>

          <p className="mb-2 text-center text-sm font-semibold text-ink/70 md:text-left">
            Hi, I'm {site.name}
          </p>

          <h1
            className="glitch-text relative w-full text-center text-2xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-left lg:text-3xl"
            data-text={hero.heading}
          >
            {hero.heading}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-6 text-ink/60 sm:text-base md:mx-0 md:text-left">
            {hero.intro}
          </p>
        </div>

      </div>

      <div className="mx-auto mt-5 flex w-full max-w-5xl items-center gap-4 font-mono text-[10px] font-bold uppercase tracking-wider text-ink/40 sm:text-xs">
        <span className="flex shrink-0 items-center gap-2">
          <kbd className="rounded border border-ink/10 bg-ink/10 px-2 py-1"> ↓ </kbd>
          Scroll to explore
        </span>

        <div className="h-1 flex-1 bg-accent/10" />
      </div>

      {/* Bento grid */}
      <div className="mx-auto mt-5 grid w-full max-w-5xl grid-cols-1 gap-3 lg:grid-cols-4">

        {/* Featured Project */}
        <div className="animate-[heroFadeUp_0.7s_ease-out_0.55s_both] rounded-xl border border-ink/10 bg-ink/4 p-4 lg:col-span-3">

          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40 md:text-xs">
              Featured
            </span>

            {featured.status && (
              <span className="flex items-center gap-1.5 rounded-full border border-accent/30 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-accent">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                {featured.status}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.1fr_0.9fr]">

            {/* Project image / cover */}
            <div className="group relative min-h-44 overflow-hidden rounded-lg border border-ink/20">
              <ProjectCover project={featured} className="absolute inset-0" />
            </div>

            {/* Project information */}
            <div className="flex flex-col justify-between py-0">

              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-ink">
                  {featured.category}
                </p>

                <h2 className="mt-1.5 text-xl font-extrabold uppercase leading-none tracking-tight">
                  {featured.title}
                </h2>

                <p className="mt-2 text-xs leading-4.5 text-ink/50 sm:text-sm">
                  {featured.description}
                </p>
              </div>

              <div className="mt-4">
                <p className="mb-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40">
                  Stack
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {featured.stack.slice(0, 5).map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <a
                  href={featuredLink || "#projects"}
                  {...(featuredLink && { target: "_blank", rel: "noopener noreferrer" })}
                  className="flex items-center gap-2 text-xs font-bold uppercase text-accent transition-transform hover:translate-x-1"
                >
                  {featuredLink ? "View project" : "All projects"}
                  <span>↗</span>
                </a>

                {featured.github && (
                  <a
                    href={featured.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View project on GitHub"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-ink/10 text-ink/50 transition-all hover:border-accent hover:bg-accent hover:text-ink-deep"
                  >
                    <SiGithub className="h-4 w-4" />
                  </a>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Projects stat */}
        <a
          href="#projects"
          className="group relative flex min-h-64 animate-[heroFadeUp_0.7s_ease-out_0.7s_both] flex-col transition-transform duration-300 hover:-translate-y-1 lg:col-span-1"
        >
          <div className="ml-auto h-7 w-[65%] shrink-0 rounded-tl-2xl rounded-tr-xl bg-accent/90" />

          <div className="flex flex-1 flex-col justify-between rounded-xl rounded-tr-none bg-accent/90 p-5 text-ink-deep">

            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink-deep/60">
                Projects
              </span>

              <span className="text-xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                ↗
              </span>
            </div>

            <div>
              <span className="text-5xl font-extrabold leading-none">{hero.stat.value}</span>
              <p className="mt-2 text-xs font-bold uppercase text-ink-deep/60">{hero.stat.label}</p>
            </div>

            <p className="max-w-40 text-sm leading-5 text-ink-deep/60">{hero.stat.blurb}</p>
          </div>
        </a>

        {/* Stack */}
        <div className="animate-[heroFadeUp_0.7s_ease-out_0.85s_both] rounded-xl border border-ink/10 bg-ink/6 p-2 lg:col-span-1">

          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-ink/40">
              Arsenal
            </span>
          </div>

          <div className="relative mx-auto mt-4 flex min-h-52 max-w-60 items-center justify-center">
            {hero.stack.slice(0, PILE_POSITIONS.length).map(({ name, icon: Icon, color }, i) => (
              <div
                key={name}
                title={name}
                className={`absolute flex h-14 w-14 items-center justify-center rounded-lg border-2 border-ink/10 bg-doom transition-transform duration-300 hover:z-60 hover:-translate-y-1 hover:rotate-0 ${PILE_POSITIONS[i]}`}
              >
                <Icon className="h-7 w-7 shrink-0" style={{ color }} aria-label={name} />
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Contribution */}
        <div className="animate-[heroFadeUp_0.7s_ease-out_1s_both] rounded-xl border border-ink/10 bg-ink/4 p-5 lg:col-span-3">

          <div className="mb-5 flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40">
              GitHub Contributions
            </span>
          </div>

          <div className="-mx-6 w-[calc(100%+3rem)] overflow-x-auto overflow-y-visible px-6 [&::-webkit-scrollbar]:hidden md:mx-0 md:w-full md:overflow-visible md:px-0">
            <div className="min-w-170 md:min-w-0">

              {githubMonths.length > 0 && (
                <div className="mt-1 flex w-full overflow-visible">
                  {githubMonths.map((month, index) => {
                    const isCurrentMonth = index === githubMonths.length - 1
                    return (
                      <div key={`${month.name}-${index}`} className="min-w-0" style={{ flexGrow: month.totalWeeks, flexBasis: 0 }}>
                        <span className={`whitespace-nowrap font-mono text-[10px] tracking-widest ${isCurrentMonth ? "font-bold text-accent" : "font-medium text-ink/30"}`}>
                          {month.name}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}

              <div className="w-full overflow-visible">
                <GitHubContributionGraph
                  username={site.githubUsername}
                  theme={{
                    bgColor: "transparent",
                    textColor: "#DEDEDE",
                    inactiveTextColor: "#4D4D4D",
                    cellLevel0: GRAPH_LEVELS[0],
                    cellLevel1: GRAPH_LEVELS[1],
                    cellLevel2: GRAPH_LEVELS[2],
                    cellLevel3: GRAPH_LEVELS[3],
                    cellLevel4: GRAPH_LEVELS[4],
                    borderColor: "transparent",
                    cellBorderColor: "transparent",
                    cardPadding: 0,
                    cardPaddingBlock: 0,
                    canvasPaddingTop: 0,
                    canvasMarginInline: 0,
                    cellSize: 10,
                    cellGap: 3,
                    cellRadius: 2,
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                  showHeader={false}
                  showFooter={false}
                  showThumbnail={false}
                  showMonthLabels={false}
                  showWeekdayLabels={false}
                  showTooltips={true}
                  onDataLoaded={(data) => {
                    const calendar = data.contributionsCollection.contributionCalendar
                    setGithubMonths(
                      calendar.months.map((month) => ({
                        name: month.name,
                        totalWeeks: month.totalWeeks,
                      }))
                    )
                  }}
                />
              </div>

            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-1.5">
            <span className="font-mono text-[9px] font-medium uppercase tracking-widest text-ink/30">Less</span>
            {GRAPH_LEVELS.map((color) => (
              <span key={color} className="h-2.5 w-2.5 rounded-xs" style={{ backgroundColor: color }} />
            ))}
            <span className="font-mono text-[9px] font-medium uppercase tracking-widest text-ink/30">More</span>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-3">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ink/30">
              github.com/{site.githubUsername}
            </span>
            <a
              href={`https://github.com/${site.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-accent transition-transform hover:translate-x-1"
            >
              View profile ↗
            </a>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Hero
