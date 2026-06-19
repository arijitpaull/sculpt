export interface PricingTier {
  name: string
  priceFrom: string
  highlight?: boolean
  forWho: string
  whatYouGet: string
  includes: string
  scope: string
  care: string
}

export const pricingLeadIn =
  "Every engagement starts with a Blueprint, a paid discovery sprint, credited in full to your build."

export const pricingTiers: PricingTier[] = [
  {
    name: "Launch",
    priceFrom: "from $3,000",
    forWho:
      "For solo founders and unfunded startups putting a real idea in front of real users for the first time.",
    whatYouGet:
      "A polished, shippable v1, your core idea built properly and live on both stores. The real thing, small, not a throwaway.",
    includes:
      "Your core features, secure sign-in, a control room to run it without touching code, and a landing page to launch from.",
    scope: "Up to ~15 build sprints · ~4–6 weeks",
    care: "Care from $250/mo · first month free",
  },
  {
    name: "Build",
    priceFrom: "from $7,500",
    highlight: true,
    forWho:
      "For founders with traction or funding building the product they'll actually grow, not testing whether it works, but making it win.",
    whatYouGet:
      "A complete product across phone and web, ready to scale and ready to put in front of investors.",
    includes:
      "Everything in Launch, plus: separate access for you, your team, and your customers; AI that does real work inside the product, not a gimmick; safe payments and subscriptions; and a clear view of how people actually use it.",
    scope: "Up to ~30 build sprints · ~8–10 weeks",
    care: "Care from $450/mo · first month free",
  },
  {
    name: "Scale",
    priceFrom: "from $15,000",
    forWho:
      "For established businesses digitizing operations, or funded teams building something heavy, real AI, real infrastructure, real traffic.",
    whatYouGet:
      "A serious system engineered to carry complexity and load without falling over, a build a single freelancer can't safely deliver.",
    includes:
      "Everything in Build, plus: custom AI/ML, complex logic engines, infrastructure that holds under real traffic, and automated pipelines that keep it shipping reliably.",
    scope: "Up to ~50+ build sprints · 12+ weeks",
    care: "Care from $750/mo · first month free",
  },
]

export const pricingFootnote =
  "Care means maintenance, it's included with every package and scales with your product's complexity and how critical uptime is. Every project is fixed-scope and fixed-price, your proposal is the final number."
