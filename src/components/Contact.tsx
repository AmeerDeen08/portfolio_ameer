import { useEffect, useRef, useState, type FormEvent } from "react"
import emailjs from "@emailjs/browser"
import type { IconType } from "react-icons"
import {
  FaUser,
  FaEnvelope,
  FaPaperPlane,
  FaCheck,
  FaTimes,
  FaExclamation,
  FaPhoneAlt,
} from "react-icons/fa"

import { contact, site, socials } from "../data/portfolio"
import { SectionDivider } from "./shared"
import { useInView } from "../hooks/useInView"

// Optional: set these in a .env file to send messages straight to your inbox.
// Without them the form opens the visitor's email app instead (see .env.example).
const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined,
}
const hasEmailJS = Boolean(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey)

const DIALOG_CONTENT = {
  success: {
    icon: FaCheck,
    eyebrow: "Message sent",
    title: "Thanks for reaching out!",
    body: "Your message has been sent. I'll get back to you as soon as possible.",
    action: "Done",
    iconWrap: "bg-accent/10 text-accent",
    eyebrowText: "text-accent",
    button: "bg-accent text-ink-deep hover:shadow-accent/20 focus-visible:ring-accent",
  },
  error: {
    icon: FaExclamation,
    eyebrow: "Send failed",
    title: "Your message didn't send.",
    body: "Check your connection and try again. Your message is still in the form.",
    action: "Try again",
    iconWrap: "bg-red-500/10 text-red-500",
    eyebrowText: "text-red-500",
    button: "bg-red-500 text-white hover:shadow-red-500/20 focus-visible:ring-red-500",
  },
} as const

type DialogStatus = keyof typeof DIALOG_CONTENT
type Status = "idle" | "sending" | DialogStatus

const reveal = (visible: boolean, hidden: string, duration = "duration-700") =>
  `transition-all ${duration} motion-reduce:transition-none ${
    visible ? "translate-x-0 translate-y-0 opacity-100" : `${hidden} opacity-0`
  }`

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-deep"

type FieldProps = {
  id: string
  label: string
  placeholder: string
  type?: string
  autoComplete?: string
  icon?: IconType
  multiline?: boolean
  maxLength?: number
}

function Field({
  id,
  label,
  placeholder,
  type = "text",
  autoComplete,
  icon: Icon,
  multiline = false,
  maxLength,
}: FieldProps) {
  const control =
    "w-full bg-transparent text-base text-ink outline-none placeholder:text-ink/40 sm:text-sm"

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-widest text-ink/60"
      >
        {label}
      </label>

      <div
        className={`flex gap-2.5 rounded-xl border border-ink/10 bg-ink/2.5 px-3.5 py-3 transition-colors focus-within:border-accent ${
          multiline ? "items-start" : "items-center"
        }`}
      >
        {Icon && (
          <Icon
            aria-hidden="true"
            className={`h-3.5 w-3.5 shrink-0 text-ink/35 ${multiline ? "mt-1" : ""}`}
          />
        )}

        {multiline ? (
          <textarea
            id={id}
            name={id}
            rows={4}
            required
            maxLength={maxLength}
            placeholder={placeholder}
            className={`${control} resize-none leading-5`}
          />
        ) : (
          <input
            id={id}
            name={id}
            type={type}
            required
            maxLength={maxLength}
            autoComplete={autoComplete}
            placeholder={placeholder}
            className={control}
          />
        )}
      </div>
    </div>
  )
}

function StatusDialog({
  status,
  onClose,
}: {
  status: DialogStatus | null
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    if (status && !dialog.open) dialog.showModal()
    if (!status && dialog.open) dialog.close()
  }, [status])

  const content = status ? DIALOG_CONTENT[status] : null
  const Icon = content?.icon

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      aria-labelledby="contact-dialog-title"
      aria-describedby="contact-dialog-desc"
      className="m-auto w-[calc(100%-2rem)] max-w-xs bg-transparent p-0 backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      {content && Icon && (
        <div className="relative rounded-2xl border border-ink/10 bg-ink-deep p-4 text-ink shadow-2xl">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className={`absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-ink/5 hover:text-ink ${focusRing}`}
          >
            <FaTimes className="h-3 w-3" aria-hidden="true" />
          </button>

          <div className="flex items-start gap-3 pr-6">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${content.iconWrap}`}>
              <Icon className="h-4 w-4" aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.15em] ${content.eyebrowText}`}>
                {content.eyebrow}
              </span>

              <h3 id="contact-dialog-title" className="mt-1 text-sm font-bold tracking-tight">
                {content.title}
              </h3>

              <p id="contact-dialog-desc" className="mt-1 text-xs leading-5 text-ink/55">
                {content.body}
              </p>
            </div>
          </div>

          <button
            type="button"
            autoFocus
            onClick={onClose}
            className={`mt-4 w-full rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing} ${content.button}`}
          >
            {content.action}
          </button>
        </div>
      )}
    </dialog>
  )
}

function Contact() {
  const [sectionRef, isVisible] = useInView<HTMLDivElement>()
  const [status, setStatus] = useState<Status>("idle")

  const isSending = status === "sending"
  const dialogStatus: DialogStatus | null =
    status === "success" || status === "error" ? status : null

  useEffect(() => {
    if (status !== "success") return
    const id = window.setTimeout(() => setStatus("idle"), 4000)
    return () => window.clearTimeout(id)
  }, [status])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSending) return

    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot: bots fill the hidden field, people don't
    if (data.get("website")) {
      form.reset()
      setStatus("success")
      return
    }

    if (!hasEmailJS) {
      const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        String(data.get("subject"))
      )}&body=${encodeURIComponent(body)}`
      return
    }

    setStatus("sending")

    try {
      await emailjs.sendForm(EMAILJS.serviceId!, EMAILJS.templateId!, form, {
        publicKey: EMAILJS.publicKey!,
      })
      form.reset()
      setStatus("success")
    } catch (error) {
      console.error("Failed to send message:", error)
      setStatus("error")
    }
  }

  return (
    <>
      <div
        ref={sectionRef}
        aria-labelledby="contact-heading"
        className="relative overflow-hidden px-6 py-16 text-ink md:px-10 lg:px-16"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-accent-blue/4 blur-3xl" />

        <SectionDivider label="Contact" hint="Say hello" visible={isVisible} />

        {/* Heading */}
        <div className={`relative mx-auto mt-8 max-w-lg text-center ${reveal(isVisible, "translate-y-4")}`}>
          <h2 id="contact-heading" className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {contact.heading}
          </h2>

          <p className="mt-3 text-sm leading-6 text-ink/60">{contact.text}</p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs text-ink/60">
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 transition-colors hover:text-accent">
              <FaEnvelope className="h-3 w-3 text-accent" aria-hidden="true" />
              {site.email}
            </a>

            {site.showPhone && (
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 transition-colors hover:text-accent">
                <FaPhoneAlt className="h-3 w-3 text-accent" aria-hidden="true" />
                {site.phone}
              </a>
            )}
          </div>
        </div>

        {/* Compact form card */}
        <div className={`relative mx-auto mt-8 w-full max-w-lg delay-100 ${reveal(isVisible, "translate-y-6")}`}>
          <div className="rounded-3xl border border-ink/10 bg-ink/2.5 p-6 sm:p-7">
            <form onSubmit={handleSubmit} aria-busy={isSending} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="Name" placeholder="Your name" autoComplete="name" icon={FaUser} maxLength={100} />
                <Field id="email" label="Email" type="email" placeholder="Your email" autoComplete="email" icon={FaEnvelope} maxLength={254} />
              </div>

              <Field id="subject" label="Subject" placeholder="Subject of your message" maxLength={150} />

              <Field id="message" label="Message" placeholder="Your message" multiline maxLength={2000} />

              <button
                type="submit"
                disabled={isSending}
                className={`flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-deep transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-accent/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
              >
                <FaPaperPlane className="h-2.5 w-2.5" aria-hidden="true" />
                {isSending ? "Sending..." : "Send Message"}
              </button>

              {/* Honeypot (hidden from people and screen readers) */}
              <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="website">Leave this field empty</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
            </form>
          </div>

          {/* Social links */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-ink/50">
              Find me online
            </p>

            <ul className="flex items-center gap-2">
              {socials.map(({ label, href, icon: Icon }, i) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in a new tab)`}
                    className={`flex h-9 w-9 items-center justify-center rounded-md border border-ink/10 text-ink/55 hover:-translate-y-1 hover:border-accent/40 hover:text-accent motion-reduce:hover:translate-y-0 ${focusRing} ${reveal(isVisible, "translate-y-3", "duration-500")}`}
                    style={{ transitionDelay: `${450 + i * 100}ms` }}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <StatusDialog status={dialogStatus} onClose={() => setStatus("idle")} />
    </>
  )
}

export default Contact
