export interface PricingTier {
  name: string
  priceFrom: string
  highlight?: boolean
  forWhoBold: string
  forWhoRest: string
  includes: string[]
  scope: string
  care: string
}

export const pricingLeadIn =
  "Every engagement starts with a Blueprint, a paid discovery sprint, credited in full to your build."

export const pricingTiers: PricingTier[] = [
  {
    name: "Launch",
    priceFrom: "from $3,000",
    forWhoBold: "For solo founders",
    forWhoRest:
      "and unfunded startups putting a real idea in front of real users for the first time.",
    includes: [
      "Core features for the idea",
      "Secure sign-in",
      "A control room to run it without touching code",
      "A landing page to launch from",
    ],
    scope: "Up to ~15 build sprints · ~4–6 weeks",
    care: "Care from $250/mo · first month free",
  },
  {
    name: "Build",
    priceFrom: "from $7,500",
    highlight: true,
    forWhoBold: "For founders with traction",
    forWhoRest:
      "or funding building the product they'll actually grow, not testing whether it works, but making it win.",
    includes: [
      "Everything in Launch",
      "Separate access for owners, team members, and customers",
      "AI that does real work inside the product, not a gimmick",
      "Safe payments and subscriptions",
      "A clear view of how people actually use the product",
    ],
    scope: "Up to ~30 build sprints · ~8–10 weeks",
    care: "Care from $450/mo · first month free",
  },
  {
    name: "Scale",
    priceFrom: "from $15,000",
    forWhoBold: "For established businesses",
    forWhoRest:
      "digitizing operations, or funded teams building something heavy, real AI, real infrastructure, real traffic.",
    includes: [
      "Everything in Build",
      "Custom AI/ML",
      "Complex logic engines",
      "Infrastructure that holds under real traffic",
      "Automated pipelines that keep it shipping reliably",
    ],
    scope: "Up to ~50+ build sprints · 12+ weeks",
    care: "Care from $750/mo · first month free",
  },
]

export const pricingFootnote =
  "Care means maintenance, it's included with every package and scales with your product's complexity and how critical uptime is. Every project is fixed-scope and fixed-price, your proposal is the final number."
