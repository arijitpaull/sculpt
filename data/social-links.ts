export interface SocialLink {
  id: string
  name: string
  url: string
  icon: string
  ariaLabel: string
}

export const socialLinks: SocialLink[] = [
  {
    id: "instagram",
    name: "Instagram",
    url: "https://instagram.com/sculptvisions",
    icon: "Instagram",
    ariaLabel: "Follow us on Instagram",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/sculptvisions/?viewAsMember=true",
    icon: "Linkedin",
    ariaLabel: "Connect with us on LinkedIn",
  },
  {
    id: "fiverr",
    name: "Fiverr",
    url: "https://www.fiverr.com/arijitpaulll",
    icon: "FiverrLogo",
    ariaLabel: "Hire us on Fiverr",
  },
  {
    id: "email",
    name: "Email",
    url: "mailto:admin@sculpt.work",
    icon: "Mail",
    ariaLabel: "Send us an email",
  },
]
