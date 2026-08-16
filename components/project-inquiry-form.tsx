"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, ChevronLeft, ChevronRight, Loader2, CalendarCheck } from "lucide-react"
import { sendProjectInquiry } from "@/lib/actions"
import CountryCodeDropdown from "@/components/country-code-dropdown"
import VoiceTextarea from "@/components/voice-textarea"

const SCOPE_OPTIONS = [
  "UI/UX Design & Prototyping",
  "Logo & Brand Identity",
  "Backend, Database & APIs",
  "App Store / Play Store Deployment",
  "Ongoing Maintenance & Support",
  "Third-Party Integrations (payments, auth, maps, etc.)",
  "AI / ML Features",
]

const PLATFORM_OPTIONS = ["iOS", "Android", "Web App"]

const ASSET_OPTIONS = [
  "Designs & branding are ready",
  "I have some assets, not complete",
  "Starting from scratch — need everything",
]

const BUDGET_OPTIONS = [
  "$3,000 – $5,000",
  "$5,000 – $7,500",
  "$7,500 – $10,000",
  "$10,000 – $15,000",
  "$15,000 and above",
]

const TIMELINE_OPTIONS = ["ASAP", "1–3 months", "3–6 months", "6+ months", "Flexible"]

const STEP_TITLES = [
  "Who are we talking to?",
  "What do you need built?",
  "Platform & existing assets",
  "Budget & timeline",
  "Tell us about your idea",
  "Anything else we should know?",
  "Review & submit",
]

const TOTAL_STEPS = STEP_TITLES.length

interface FormState {
  name: string
  company: string
  email: string
  countryCode: string
  phone: string
  scope: string[]
  platform: string[]
  existingAssets: string
  budget: string
  timeline: string
  projectIdea: string
  mustHaveFeatures: string
  additionalNotes: string
}

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  countryCode: "+91",
  phone: "",
  scope: [],
  platform: [],
  existingAssets: "",
  budget: "",
  timeline: "",
  projectIdea: "",
  mustHaveFeatures: "",
  additionalNotes: "",
}

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left p-4 rounded-xl border cursor-pointer transition-all w-full ${
        selected ? "border-[#EAEFFF] bg-[#EAEFFF]/10" : "border-[#252525] hover:border-[#EAEFFF]/50"
      }`}
    >
      <div className="flex items-center">
        <div
          className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center flex-shrink-0 ${
            selected ? "border-[#EAEFFF] bg-[#EAEFFF]" : "border-[#454545]"
          }`}
        >
          {selected && <Check className="h-3 w-3 text-[#101010]" />}
        </div>
        <span className="text-sm">{label}</span>
      </div>
    </button>
  )
}

export default function ProjectInquiryForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormState>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const toggleScope = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      scope: prev.scope.includes(item) ? prev.scope.filter((s) => s !== item) : [...prev.scope, item],
    }))
  }

  const togglePlatform = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      platform: prev.platform.includes(item) ? prev.platform.filter((p) => p !== item) : [...prev.platform, item],
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    update(name as keyof FormState, value)
  }

  const isStepValid = (): boolean => {
    switch (step) {
      case 1:
        return formData.name.trim() !== "" && formData.email.trim() !== ""
      case 2:
        return true
      case 3:
        return formData.platform.length > 0 && formData.existingAssets !== ""
      case 4:
        return formData.budget !== "" && formData.timeline !== ""
      case 5:
        return formData.projectIdea.trim() !== ""
      case 6:
        return true
      default:
        return true
    }
  }

  const goNext = () => {
    if (!isStepValid()) {
      setError("Please fill in the required fields before continuing.")
      return
    }
    setError("")
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }

  const goBack = () => {
    setError("")
    setStep((s) => Math.max(s - 1, 1))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError("")
    try {
      await sendProjectInquiry({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone ? `${formData.countryCode} ${formData.phone}` : "",
        scope: formData.scope,
        platform: formData.platform,
        existingAssets: formData.existingAssets,
        budget: formData.budget,
        timeline: formData.timeline,
        projectIdea: formData.projectIdea,
        mustHaveFeatures: formData.mustHaveFeatures,
        additionalNotes: formData.additionalNotes,
      })
      setIsSubmitted(true)
    } catch (err) {
      setError("Something went wrong sending your inquiry. Please try again, or email us directly at admin@sculpt.work.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16 px-6"
      >
        <div className="w-16 h-16 rounded-full bg-[#EAEFFF]/10 border border-[#EAEFFF]/30 flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-[#EAEFFF]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-medium mb-4">Got it — thank you, {formData.name.split(" ")[0]}.</h2>
        <p className="text-[#EAEFFF]/70 max-w-md mx-auto mb-8">
          We've received your project inquiry and sent a confirmation to your email. Our team will review everything and
          follow up within 24 hours.
        </p>
        <a
          href="https://cal.com/sculptvisions/new-project"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#EAEFFF] text-[#101010] px-6 py-3 rounded-full font-medium hover:bg-[#EAEFFF]/90 transition-colors"
        >
          <CalendarCheck className="h-4 w-4" />
          Book a call now
        </a>
      </motion.div>
    )
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-10">
        <div className="mb-3">
          <span className="text-xs uppercase tracking-wide text-[#EAEFFF]/50">
            Step {step} of {TOTAL_STEPS}
          </span>
        </div>
        <div className="h-1 w-full bg-[#252525] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#EAEFFF] rounded-full"
            initial={false}
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-medium mb-8">{STEP_TITLES[step - 1]}</h2>

      <div className="tracking-reset">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#101010] border border-[#252525] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EAEFFF] focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Company <span className="text-[#EAEFFF]/40">(optional)</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#101010] border border-[#252525] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EAEFFF] focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#101010] border border-[#252525] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EAEFFF] focus:border-transparent transition-colors"
                />
              </div>
              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Country Code</label>
                  <CountryCodeDropdown
                    value={formData.countryCode}
                    onChange={(code) => update("countryCode", code)}
                  />
                </div>
                <div className="col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone <span className="text-[#EAEFFF]/40">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#101010] border border-[#252525] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EAEFFF] focus:border-transparent transition-colors"
                  />
                </div>
              </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 p-4 rounded-xl border border-[#EAEFFF]/30 bg-[#EAEFFF]/5 mb-6">
              <div className="w-5 h-5 rounded-full border border-[#EAEFFF] bg-[#EAEFFF] flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-[#101010]" />
              </div>
              <p className="text-sm">
                <span className="font-medium">App Development</span>{" "}
                <span className="text-[#EAEFFF]/60">— included with every inquiry</span>
              </p>
            </div>
            <p className="mb-4 text-sm text-[#EAEFFF]/60">Select anything else you'll need. Choose as many as apply.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SCOPE_OPTIONS.map((option) => (
                <Chip key={option} label={option} selected={formData.scope.includes(option)} onClick={() => toggleScope(option)} />
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
              <div>
                <p className="mb-4 text-sm text-[#EAEFFF]/60">
                  Which platform is this for? <span className="text-[#EAEFFF]/40">Select all that apply.</span>
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {PLATFORM_OPTIONS.map((option) => (
                    <Chip
                      key={option}
                      label={option}
                      selected={formData.platform.includes(option)}
                      onClick={() => togglePlatform(option)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-4 text-sm text-[#EAEFFF]/60">Do you already have designs or branding?</p>
                <div className="grid grid-cols-1 gap-3">
                  {ASSET_OPTIONS.map((option) => (
                    <Chip
                      key={option}
                      label={option}
                      selected={formData.existingAssets === option}
                      onClick={() => update("existingAssets", option)}
                    />
                  ))}
                </div>
              </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
              <div>
                <p className="mb-4 text-sm text-[#EAEFFF]/60">What's your budget range?</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {BUDGET_OPTIONS.map((option) => (
                    <Chip
                      key={option}
                      label={option}
                      selected={formData.budget === option}
                      onClick={() => update("budget", option)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-4 text-sm text-[#EAEFFF]/60">What's your ideal timeline?</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {TIMELINE_OPTIONS.map((option) => (
                    <Chip
                      key={option}
                      label={option}
                      selected={formData.timeline === option}
                      onClick={() => update("timeline", option)}
                    />
                  ))}
                </div>
              </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <VoiceTextarea
              id="projectIdea"
              name="projectIdea"
              label="Describe your app idea and the problem it solves"
              value={formData.projectIdea}
              onChange={(value) => update("projectIdea", value)}
              placeholder="Type here, or tap Speak to talk it through instead..."
              required
              rows={7}
            />
          </motion.div>
        )}

        {step === 6 && (
          <motion.div
            key="step6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <VoiceTextarea
              id="mustHaveFeatures"
              name="mustHaveFeatures"
              label="Must-have features"
              value={formData.mustHaveFeatures}
              onChange={(value) => update("mustHaveFeatures", value)}
              placeholder="Anything you already know you need — optional"
              rows={4}
            />
            <VoiceTextarea
              id="additionalNotes"
              name="additionalNotes"
              label="Inspiration, references or competitors"
              value={formData.additionalNotes}
              onChange={(value) => update("additionalNotes", value)}
              placeholder="Apps you like, links, or anything else — optional"
              rows={4}
            />
          </motion.div>
        )}

        {step === 7 && (
          <motion.div
            key="step7"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
              <div className="bg-[#101010] border border-[#252525] p-5 rounded-xl space-y-3 text-sm">
                <p>
                  <span className="text-[#EAEFFF]/50">Name:</span> {formData.name}
                  {formData.company && <span className="text-[#EAEFFF]/50"> — {formData.company}</span>}
                </p>
                <p>
                  <span className="text-[#EAEFFF]/50">Email:</span> {formData.email}
                </p>
                {formData.phone && (
                  <p>
                    <span className="text-[#EAEFFF]/50">Phone:</span> {formData.countryCode} {formData.phone}
                  </p>
                )}
                <p>
                  <span className="text-[#EAEFFF]/50">Scope:</span> App Development
                  {formData.scope.length > 0 ? `, ${formData.scope.join(", ")}` : ""}
                </p>
                <p>
                  <span className="text-[#EAEFFF]/50">Platform:</span> {formData.platform.join(", ")}
                </p>
                <p>
                  <span className="text-[#EAEFFF]/50">Existing assets:</span> {formData.existingAssets}
                </p>
                <p>
                  <span className="text-[#EAEFFF]/50">Budget:</span> {formData.budget}
                </p>
                <p>
                  <span className="text-[#EAEFFF]/50">Timeline:</span> {formData.timeline}
                </p>
                <div>
                  <span className="text-[#EAEFFF]/50">Project idea:</span>
                  <p className="mt-1 whitespace-pre-wrap">{formData.projectIdea}</p>
                </div>
                {formData.mustHaveFeatures && (
                  <div>
                    <span className="text-[#EAEFFF]/50">Must-have features:</span>
                    <p className="mt-1 whitespace-pre-wrap">{formData.mustHaveFeatures}</p>
                  </div>
                )}
                {formData.additionalNotes && (
                  <div>
                    <span className="text-[#EAEFFF]/50">Additional notes:</span>
                    <p className="mt-1 whitespace-pre-wrap">{formData.additionalNotes}</p>
                  </div>
                )}
              </div>
          </motion.div>
        )}
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl mt-6 bg-red-900/20 text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}

      <div className="flex justify-between mt-10">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-1 px-6 py-3 border border-[#252525] rounded-full hover:border-[#EAEFFF] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
        ) : (
          <div />
        )}

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-1 px-6 py-3 rounded-full bg-[#EAEFFF] text-[#101010] hover:bg-[#EAEFFF]/90 transition-colors font-medium"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#EAEFFF] text-[#101010] hover:bg-[#EAEFFF]/90 transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Submit inquiry"
            )}
          </button>
        )}
      </div>
    </div>
  )
}
