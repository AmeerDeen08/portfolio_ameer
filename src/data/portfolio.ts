/* ==========================================================================
   PORTFOLIO CONTENT — edit this file to update the whole site.
   --------------------------------------------------------------------------
   • Text, links, dates, projects, experience, education, certifications.
   • Images & logos live in /public. Reference them with a leading slash,
     e.g. "/logos/cisco.svg" → public/logos/cisco.svg
   • Leave a link as "" to hide its button automatically.
   • Icons come from react-icons (https://react-icons.github.io/react-icons).
     Import a new one at the top, then use it below.
   ========================================================================== */

import type { IconType } from "react-icons"
import {
  SiKalilinux,
  SiBurpsuite,
  SiWireshark,
  SiPython,
  SiDocker,
  SiC,
  SiGithub,
  SiHashnode,
} from "react-icons/si"
import {
  FaLinkedin,
  FaEnvelope,
  FaUserSecret,
  FaShieldAlt,
  FaCode,
  FaNetworkWired,
  FaBug,
  FaLock,
  FaTrophy,
  FaMicrophoneAlt,
  FaUsers,
} from "react-icons/fa"

/* ---------- Types (you normally don't need to touch these) ---------- */

export type Social = { label: string; href: string; icon: IconType }

export type Logo = {
  src: string
  /** "light" = white tile behind the logo, "dark" = dark tile (for white logos) */
  bg?: "light" | "dark"
  /** true for wide wordmark logos (gives the tile a 2:1 shape) */
  wide?: boolean
}

export type Project = {
  slug: string
  category: string
  title: string
  description: string
  stack: string[]
  status?: string
  /** Optional screenshot in /public. If empty, a generated cyber cover is shown. */
  image?: string
  /** Generated cover: icon + a few fake terminal lines */
  cover: { icon: IconType; lines: string[] }
  live: string
  github: string
}

export type TimelineItem = {
  title: string
  org: string
  period: string
  location: string
  present?: boolean
  /** Org logo. Leave out to show a monogram instead. */
  logo?: Logo
  monogram?: string
  summary?: string
  points?: string[]
  tags?: string[]
  /** Optional link, e.g. a certificate or offer letter PDF */
  link?: { label: string; href: string }
}

export type Certification = {
  title: string
  issuer: string
  date: string
  logo: Logo
  credentialId?: string
  /** PDF in /public/certificates or an online verification URL */
  credentialUrl: string
  skills: string[]
  featured?: boolean
}

/* ======================================================================
   SITE / PERSONAL
   ====================================================================== */

export const site = {
  name: "Ameerdeen N",
  firstName: "Ameerdeen",
  initials: "AN",
  role: "Cybersecurity Enthusiast",
  location: "Chennai, Tamil Nadu, India",
  email: "ameerdeen592@gmail.com",
  /** Phone is kept here but hidden on the site. Set showPhone to true to display it. */
  phone: "+91 63805 98096",
  showPhone: false,
  resumeUrl:
    "https://drive.google.com/file/d/1D0ydjFwhpr2W_KeC4PyfLeVlhYr79HV2/view?usp=sharing",
  githubUsername: "ameerdeen08",
  photo: "/images/profile.jpg",
  /** Used in the browser tab and link previews */
  seo: {
    title: "Ameerdeen N | Cybersecurity",
    description:
      "Ameerdeen N — cybersecurity enthusiast and M.Tech (Cybersecurity) student at VIT Vellore. Projects, experience and certifications.",
  },
}

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/ameerdeen08", icon: SiGithub },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ameerdeenn",
    icon: FaLinkedin,
  },
  { label: "Blog", href: "https://ameerdeen.hashnode.dev", icon: SiHashnode },
  { label: "Email", href: "mailto:ameerdeen592@gmail.com", icon: FaEnvelope },
].filter((s) => s.href)

/* ======================================================================
   HERO (top of the page)
   ====================================================================== */

export const hero = {
  /** Terminal breadcrumb. The last segment cycles through `roles`. */
  terminal: ["whoami ~", "ameerdeen ~"],
  roles: [
    "Cybersecurity Enthusiast",
    "Security Researcher",
    "Builder of Secure Systems",
  ],
  eyebrow: "Cybersecurity Enthusiast",
  heading: "Think like an attacker. Build like a defender.",
  intro:
    "I explore how systems break so I can help make them harder to break — from web apps and networks to the containers they run in.",
  resumeLabel: "View Resume",
  /** Big accent card in the bento grid */
  stat: {
    value: "04+",
    label: "Security projects",
    blurb: "Tools, monitors and experiments that make systems safer.",
  },
  /** The tilted icon pile ("Stack" card). Keep it to 6 items. */
  stack: [
    { name: "Kali Linux", icon: SiKalilinux, color: "#557C94" },
    { name: "Burp Suite", icon: SiBurpsuite, color: "#FF6633" },
    { name: "Wireshark", icon: SiWireshark, color: "#1679A7" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "C", icon: SiC, color: "#A8B9CC" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
  ],
  /** Which project (by slug) is shown in the "Featured" bento card */
  featuredProject: "ebpf-runtime-monitor",
}

/* ======================================================================
   ABOUT
   ====================================================================== */

export const about = {
  eyebrow: "Beyond the terminal",
  heading: ["Curious about how things break,", "focused on keeping them safe."],
  greeting: "Hey there! 👋",
  paragraphs: [
    "I'm a cybersecurity enthusiast who learns by taking systems apart — reading traffic, poking at web apps, and figuring out why something that should be secure isn't. I enjoy the moment a small detail turns into a real finding.",
    "I also like building. I've written security tools in C, Python and JavaScript, from a kernel-level runtime monitor for containers to a browser extension that flags phishing sites. Breaking and building go hand in hand for me.",
  ],
  facts: [
    { icon: FaNetworkWired, label: "Based in", value: "Chennai, India" },
    {
      icon: FaLock,
      label: "Studying",
      value: "M.Tech CSE (Cybersecurity) · VIT",
    },
    { icon: FaShieldAlt, label: "Exploring", value: "Web, network & cloud security" },
  ],
  /** Two small cards on the left of the toolkit terminal */
  focus: [
    {
      icon: FaUserSecret,
      tag: "Offense",
      title: "Break it to understand it",
      text: "Recon, web testing and traffic analysis to find the weak spot before someone else does.",
    },
    {
      icon: FaCode,
      tag: "Defense",
      title: "Build things that hold up",
      text: "Writing tools and software with security designed in, not bolted on afterwards.",
    },
  ],
  /** Rotating terminal card. Each group is one "file" in the toolkit. */
  toolkit: [
    {
      file: "offensive.txt",
      title: "Testing & Recon",
      items: ["Burp Suite", "Nmap", "Nikto", "SQLmap", "FFUF", "Wireshark"],
    },
    {
      file: "concepts.txt",
      title: "Security Concepts",
      items: [
        "OWASP Top 10",
        "MITRE ATT&CK",
        "Vulnerability Assessment",
        "Threat Detection",
        "Log Analysis",
        "Incident Triage",
      ],
    },
    {
      file: "network.txt",
      title: "Networks & Monitoring",
      items: ["TCP/IP", "DNS", "HTTP/HTTPS", "Firewalls", "Routing & Switching", "Splunk"],
    },
    {
      file: "languages.txt",
      title: "Languages",
      items: ["C", "C++", "Python", "Java", "JavaScript", "SQL", "Bash"],
    },
    {
      file: "platforms.txt",
      title: "Build & Platforms",
      items: ["Linux (Kali / Parrot)", "Docker", "Kubernetes", "React", "Node.js", "REST APIs"],
    },
  ],
  motto: "Always learning / always hacking",
  status: "Open to opportunities",
}

/* ======================================================================
   PROJECTS
   ====================================================================== */

export const projectsIntro = {
  eyebrow: "What I've built",
  heading: ["Security tools,", "built from scratch."],
  footer: "More projects in progress",
  footerStatus: "Building",
}

export const projects: Project[] = [
  {
    slug: "ebpf-runtime-monitor",
    category: "M.Tech Project · VIT",
    title: "eBPF Runtime Monitor",
    description:
      "An eBPF framework that records what actually runs inside each container, compares it with the image's SBOM and CVE scan, flags drift, and re-ranks vulnerabilities by real runtime evidence.",
    stack: ["C (eBPF)", "Go", "Kubernetes", "Syft / Grype", "PostgreSQL", "React"],
    status: "In progress",
    cover: {
      icon: FaShieldAlt,
      lines: [
        "exec  /usr/bin/python3",
        "cgroup → payments-svc",
        "sbom   → NOT DECLARED",
        "drift  ⚠ UNEXPECTED",
      ],
    },
    live: "",
    github: "",
  },
  {
    slug: "surfarmor",
    category: "Browser Extension · Team of 4",
    title: "SurfArmor",
    description:
      "A browser extension that checks sites in real time and warns about phishing, malware and defacement — powered by a LightGBM URL classifier, VirusTotal scans and WHOIS lookups.",
    stack: ["Python", "LightGBM", "React", "WebExtensions", "VirusTotal API"],
    cover: {
      icon: FaBug,
      lines: [
        "scan   hxxp://login-paypa1.xyz",
        "model  → LightGBM",
        "class  → PHISHING",
        "action ⚠ warn user",
      ],
    },
    live: "",
    github: "https://github.com/AmeerDeen08/surfarmor",
  },
  {
    slug: "self-healing-tree",
    category: "DSA Project · VIT",
    title: "Self-Healing AVL Tree",
    description:
      "An AVL tree in C that detects, locates and repairs corrupted nodes from bit flips or memory-corruption attacks using CRC-32C checksums and majority voting — with no backup copy.",
    stack: ["C", "CRC-32C", "ASan / UBSan", "Make"],
    cover: {
      icon: FaLock,
      lines: [
        "verify node#42  crc ✗",
        "vote   2-of-3 links",
        "repair → restored",
        "status ✓ tree intact",
      ],
    },
    live: "",
    github: "",
  },
  {
    slug: "secure-notes",
    category: "Mobile App",
    title: "Secure Notes Sharing",
    description:
      "A mobile platform for sharing notes by category, with secure authentication, protected file access and a malware-scanning pipeline that checks every upload through VirusTotal.",
    stack: ["React Native", "PostgreSQL", "VirusTotal API"],
    cover: {
      icon: FaUsers,
      lines: [
        "upload notes.pdf",
        "scan   → VirusTotal",
        "result ✓ clean",
        "store  → encrypted",
      ],
    },
    live: "",
    github: "",
  },
]

/* ======================================================================
   EXPERIENCE & EDUCATION
   ====================================================================== */

export const experienceIntro = {
  heading: "Where I've worked",
  text: "Hands-on roles where I've learned how real systems and teams operate.",
}

export const experience: TimelineItem[] = [
  {
    title: "Network Security Engineer Intern",
    org: "Secure Network Solutions India Pvt. Ltd.",
    period: "May 2026 — Jun 2026",
    location: "Chennai, India",
    logo: { src: "/logos/sns.png", bg: "light" },
    points: [
      "Worked in the Technical Department on network security projects and tasks.",
      "Supported engineers working on enterprise network security solutions.",
      "Recognised for punctuality, quick learning and communication skills.",
    ],
    tags: ["Network Security", "Enterprise Networks", "Firewalls"],
    link: {
      label: "Internship certificate",
      href: "/certificates/sns-internship-certificate.pdf",
    },
  },
  {
    title: "Full Stack Lead",
    org: "Nexus Club · HITS",
    period: "2024 — 2026",
    location: "Chennai, India",
    monogram: "NX",
    points: [
      "Led the club's full-stack division and ran hackathons, coding contests and workshops for 200+ participants.",
      "Built the club's event registration platform, raising event participation by 40%.",
      "Reviewed code and mentored junior members on Git and Agile practices.",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "Leadership"],
  },
]

export const educationIntro = {
  heading: "Education",
  text: "Where I built my foundations in computer science and security.",
}

export const education: TimelineItem[] = [
  {
    title: "M.Tech in CSE (Cybersecurity)",
    org: "Vellore Institute of Technology (VIT), Vellore",
    period: "2026 — Present",
    location: "Vellore, India",
    present: true,
    logo: { src: "/logos/vit.png", bg: "dark" },
    summary:
      "Postgraduate specialisation in cybersecurity. Current research: runtime monitoring and vulnerability reachability for containers using eBPF.",
    tags: ["Cybersecurity", "Systems Security", "Research"],
  },
  {
    title: "B.Tech in CSE (Cyber Security)",
    org: "Hindustan Institute of Technology and Science, Chennai",
    period: "2022 — 2026",
    location: "Chennai, India",
    logo: { src: "/logos/hits.svg", bg: "light" },
    summary:
      "Graduated with a CGPA of 9.3 / 10 and ranked 1st in the department in 2022–23.",
    tags: ["CGPA 9.3", "Networks", "Operating Systems", "DBMS", "DSA"],
  },
]

/* ======================================================================
   CERTIFICATIONS
   ====================================================================== */

export const certificationsIntro = {
  eyebrow: "Verified learning",
  heading: ["Credentials that", "back the craft."],
}

export const certifications: Certification[] = [
  {
    title: "CompTIA Security+",
    issuer: "CompTIA",
    date: "",
    logo: { src: "/logos/comptia.svg", bg: "light", wide: true },
    credentialUrl: "",
    skills: [
      "Threats & Vulnerabilities",
      "Security Architecture",
      "Security Operations",
      "Risk & Compliance",
    ],
    featured: true,
  },
  {
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    date: "Mar 2023",
    logo: { src: "/logos/cisco.svg", bg: "light" },
    credentialId: "1da98166-6bd2-42fd-93dd-8e3a79dfde26",
    credentialUrl: "/certificates/ccna-introduction-to-networks.pdf",
    skills: ["TCP/IP", "IPv4 / IPv6", "Ethernet"],
  },
  {
    title: "CCNA: Switching, Routing & Wireless Essentials",
    issuer: "Cisco Networking Academy",
    date: "Apr 2023",
    logo: { src: "/logos/cisco.svg", bg: "light" },
    credentialId: "ed65c1e4-ae4b-4b7c-a819-b5da70c7e827",
    credentialUrl: "/certificates/ccna-switching-routing-wireless.pdf",
    skills: ["VLANs", "Routing", "WLAN Security"],
  },
  {
    title: "CCNA: Enterprise Networking, Security & Automation",
    issuer: "Cisco Networking Academy",
    date: "Apr 2023",
    logo: { src: "/logos/cisco.svg", bg: "light" },
    credentialId: "23ddb1c7-1b4f-4f54-b798-436cd9704371",
    credentialUrl: "/certificates/ccna-enterprise-networking-security.pdf",
    skills: ["ACLs", "Network Security", "Automation"],
  },
  {
    title: "AWS Educate: Introduction to Cloud 101",
    issuer: "Amazon Web Services",
    date: "2025",
    logo: { src: "/logos/aws.svg", bg: "light" },
    credentialUrl: "",
    skills: ["Cloud Concepts", "AWS Core Services"],
  },
]

/** Small "honors" strip under the certifications */
export const achievements = [
  {
    icon: FaTrophy,
    title: "1st Rank",
    text: "B.Tech CSE – Cyber Security (2022–23), Certificate of Proficiency.",
  },
  {
    icon: FaMicrophoneAlt,
    title: "National Cyber Security Conclave",
    text: "Attended “Protecting the Connected World” at HITS, Feb 2023.",
  },
  {
    icon: FaUsers,
    title: "200+ participants",
    text: "Organised hackathons and workshops as Nexus Club Full Stack Lead.",
  },
]

/* ======================================================================
   CONTACT & FOOTER
   ====================================================================== */

export const contact = {
  heading: "Get In Touch",
  text: "Have an opportunity, a security question or just want to say hello? My inbox is open.",
}

export const footer = {
  tagline: "Learning to break things so I can help keep them safe.",
  status: "system.secure",
}
