import {
  House,
  User,
  Folder,
  BriefcaseBusiness,
  Award,
  Mail,
  type LucideIcon,
} from "lucide-react"

type NavItem = { id: string; label: string; icon: LucideIcon }

export const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: House },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: Folder },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "certifications", label: "Certs", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
]
