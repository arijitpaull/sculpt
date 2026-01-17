"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Menu, X, Instagram, Linkedin, Mail, Calendar, FileText, Check, ChevronLeft, ChevronRight } from "lucide-react"
import ProjectCard from "@/components/project-card"

import FiverrLogo from "@/components/fiverr-logo"
import Toast from "@/components/toast"
import { sendEmail } from "@/lib/actions"
import { Project, projects } from "@/data/projects"

import { socialLinks } from "@/data/social-links"
import { siteConfig } from "@/data/site-config"
import InfiniteTestimonialCarousel from "@/components/infinite-testimonial-carousel"
import CountryCodeDropdown from "@/components/country-code-dropdown"


// Icon mapping for dynamic icon rendering
const iconMap = {
  Instagram,
  Linkedin,
  Mail,
  FiverrLogo,
}

// Multi-step form types
type Service = "App Development" | "Web Development" | "AI Model Development" | "Logo and Branding Design"

interface FormData {
  name: string
  email: string
  countryCode: string
  phone: string
  details: string
  currency: string
  budget: string
  services: Service[]
}

// Currency Dropdown Component (matching CountryCodeDropdown style)
function CurrencyDropdown({ value, onChange }: { value: string; onChange: (currency: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  ]

  const selectedCurrency = currencies.find((c) => c.code === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect())
    }
  }, [isOpen])

  const handleSelect = (code: string) => {
    onChange(code)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-[#151515] border border-[#252525] rounded-xl text-[#EAEFFF] text-left flex items-center justify-between hover:border-[#353535] transition-colors focus:outline-none focus:ring-2 focus:ring-[#EAEFFF]/20"
      >
        <span className="flex items-center gap-2">
          {selectedCurrency ? (
            <>
              <span className="font-medium">{selectedCurrency.symbol}</span>
              <span className="text-[#EAEFFF]/80">{selectedCurrency.code}</span>
            </>
          ) : (
            <span className="text-[#EAEFFF]/60">Select currency</span>
          )}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 text-[#EAEFFF]/60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      {isOpen && buttonRect && typeof window !== 'undefined' && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: `${buttonRect.bottom + 8}px`,
              left: `${buttonRect.left}px`,
              width: `${buttonRect.width}px`,
              zIndex: 9999,
              maxHeight: '320px',
            }}
            className="bg-[#151515] border border-[#252525] rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="max-h-64 overflow-y-auto custom-scrollbar">
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  type="button"
                  onClick={() => handleSelect(currency.code)}
                  className={`w-full px-4 py-3 text-left hover:bg-[#1a1a1a] transition-colors flex items-center gap-3 ${
                    value === currency.code ? 'bg-[#1a1a1a]' : ''
                  }`}
                >
                  <span className="text-xl font-medium">{currency.symbol}</span>
                  <div className="flex-1">
                    <div className="text-[#EAEFFF] font-medium">{currency.name}</div>
                    <div className="text-[#EAEFFF]/60 text-sm">{currency.code}</div>
                  </div>
                  {value === currency.code && (
                    <svg
                      className="w-5 h-5 text-[#EAEFFF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #151515;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #252525;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #353535;
        }
      `}</style>
    </div>
  )
}

// Embedded MultiStepForm component
function EmbeddedMultiStepForm({ onComplete }: { onComplete?: () => void }) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({
    type: null,
    message: "",
  })
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")


  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    countryCode: "+1",
    phone: "",
    details: "",
    currency: "USD",
    budget: "",
    services: [],
  })

  const services: Service[] = ["App Development", "Web Development", "AI Model Development", "Logo and Branding Design"]

  // Validation functions for each step
  const isStep1Valid = () => {
    return formData.services.length > 0
  }

  const isStep2Valid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.details.trim() !== ""
    )
  }

  const isStep3Valid = () => {
    return formData.budget.trim() !== ""
  }

  const isCurrentStepValid = () => {
    switch (step) {
      case 1:
        return isStep1Valid()
      case 2:
        return isStep2Valid()
      case 3:
        return isStep3Valid()
      default:
        return false
    }
  }

  const toggleService = (service: Service) => {
    setFormData((prev) => {
      if (prev.services.includes(service)) {
        return {
          ...prev,
          services: prev.services.filter((s) => s !== service),
        }
      } else {
        return {
          ...prev,
          services: [...prev.services, service],
        }
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: null, message: "" })

    try {
      // Format the services and other data for the email
      const emailData = {
        name: formData.name,
        email: formData.email,
        message: `
Services: ${formData.services.join(", ")}
Phone: ${formData.countryCode} ${formData.phone}
Budget: ${formData.currency} ${formData.budget}

Project Details:
${formData.details}
        `,
      }

      await sendEmail(emailData)

      // Show toast notification
      setToastMessage("Your project inquiry has been submitted! We'll get back to you soon.")
      setShowToast(true)

      // Reset form data
      setFormData({
        name: "",
        email: "",
        countryCode: "+1",
        phone: "",
        details: "",
        currency: "USD",
        budget: "",
        services: [],
      })
      setStep(1)

      // Close the modal if onComplete is provided
      if (onComplete) {
        setTimeout(() => {
          onComplete()
        }, 1000)
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message:
          "There was an issue submitting your form. Please try again or contact us directly at sculptvisions@gmail.com",
      })
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (!isCurrentStepValid()) {
      let errorMessage = ""
      switch (step) {
        case 1:
          errorMessage = "Please select at least one service"
          break
        case 2:
          errorMessage = "Please fill in all required fields"
          break
        case 3:
          errorMessage = "Please enter your budget"
          break
      }
      setFormStatus({
        type: "error",
        message: errorMessage,
      })
      return
    }

    setFormStatus({ type: null, message: "" })
    setStep(step + 1)
  }

  const prevStep = () => {
    setFormStatus({ type: null, message: "" })
    setStep(step - 1)
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? "bg-[#EAEFFF] text-[#101010]" : "bg-[#252525] text-[#EAEFFF]"
            }`}
          >
            {step > 1 ? <Check className="h-4 w-4" /> : "1"}
          </div>
          <div className={`h-[2px] w-12 ${step > 1 ? "bg-[#EAEFFF]" : "bg-[#252525]"}`}></div>
        </div>
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-[#EAEFFF] text-[#101010]" : "bg-[#252525] text-[#EAEFFF]"
            }`}
          >
            {step > 2 ? <Check className="h-4 w-4" /> : "2"}
          </div>
          <div className={`h-[2px] w-12 ${step > 2 ? "bg-[#EAEFFF]" : "bg-[#252525]"}`}></div>
        </div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 3 ? "bg-[#EAEFFF] text-[#101010]" : "bg-[#252525] text-[#EAEFFF]"
          }`}
        >
          3
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-6 text-[#EAEFFF]/70">
                Select the services you're interested in. You can choose multiple options.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {services.map((service) => (
                  <div
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.services.includes(service)
                        ? "border-[#EAEFFF] bg-[#EAEFFF]/10"
                        : "border-[#252525] hover:border-[#EAEFFF]/50"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                          formData.services.includes(service)
                            ? "border-[#EAEFFF] bg-[#EAEFFF]"
                            : "border-[#454545]"
                        }`}
                      >
                        {formData.services.includes(service) && <Check className="h-3 w-3 text-[#101010]" />}
                      </div>
                      <span>{service}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#151515] border border-[#252525] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EAEFFF]/20 focus:border-[#353535] transition-colors text-[#EAEFFF]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#151515] border border-[#252525] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EAEFFF]/20 focus:border-[#353535] transition-colors text-[#EAEFFF]"
                />
              </div>

              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-2">
                  <label htmlFor="countryCode" className="block text-sm font-medium mb-2">
                    Country Code
                  </label>
                  <CountryCodeDropdown
                    value={formData.countryCode}
                    onChange={(code) => setFormData((prev) => ({ ...prev, countryCode: code }))}
                  />
                </div>
                <div className="col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]*"  
                    inputMode="numeric"
                    className="w-full px-4 py-3 bg-[#151515] border border-[#252525] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EAEFFF]/20 focus:border-[#353535] transition-colors text-[#EAEFFF]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="details" className="block text-sm font-medium mb-2">
                  Project Details <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-[#151515] border border-[#252525] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EAEFFF]/20 focus:border-[#353535] transition-colors resize-none text-[#EAEFFF]"
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="currency" className="block text-sm font-medium mb-2">
                    Currency
                  </label>
                  <CurrencyDropdown
                    value={formData.currency}
                    onChange={(currency) => setFormData((prev) => ({ ...prev, currency }))}
                  />
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium mb-2">
                    Budget <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    pattern="[0-9,]*" 
                    inputMode="numeric"
                    placeholder="2,000"
                    className="w-full px-4 py-3 bg-[#151515] border border-[#252525] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EAEFFF]/20 focus:border-[#353535] transition-colors text-[#EAEFFF]"
                  />
                </div>
              </div>

              <div className="bg-[#101010] p-4 rounded-xl mb-6">
                <h4 className="font-medium mb-2">Review Your Information</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="opacity-70">Name:</span> {formData.name}
                  </p>
                  <p>
                    <span className="opacity-70">Email:</span> {formData.email}
                  </p>
                  <p>
                    <span className="opacity-70">Phone:</span> {formData.countryCode} {formData.phone}
                  </p>
                  <p>
                    <span className="opacity-70">Services:</span> {formData.services.join(", ")}
                  </p>
                  <p>
                    <span className="opacity-70">Budget:</span> {formData.currency} {formData.budget}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {formStatus.type && (
          <div
          className={`p-4 rounded-xl mb-6 ${
              formStatus.type === "success" ? "bg-green-900/20 text-green-400" : "bg-red-900/20 text-red-400"
            }`}
          >
            {formStatus.message}
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 border border-[#252525] rounded-full hover:border-[#EAEFFF] transition-colors"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!isCurrentStepValid()}
              className={`px-6 py-2 rounded-full transition-colors ${
                isCurrentStepValid()
                  ? "bg-[#EAEFFF] text-[#101010] hover:bg-[#EAEFFF]/90"
                  : "bg-[#252525] text-[#EAEFFF]/50 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting || !isCurrentStepValid()}
              className={`px-6 py-2 rounded-full transition-colors ${
                !isSubmitting && isCurrentStepValid()
                  ? "bg-[#EAEFFF] text-[#101010] hover:bg-[#EAEFFF]/90"
                  : "bg-[#252525] text-[#EAEFFF]/50 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </form>

      {/* Toast notification */}
      <Toast show={showToast} message={toastMessage} onClose={() => setShowToast(false)} />
    </>
  )
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [showCalModal, setShowCalModal] = useState(false)
  const [showConnectModal, setShowConnectModal] = useState(false)
  const [currentProjectPage, setCurrentProjectPage] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentHeroImage, setCurrentHeroImage] = useState(0)
  const [currentFlowStep, setCurrentFlowStep] = useState('kickoff')
  const { scrollYProgress } = useScroll()
  const headerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  // Hero image carousel
  const heroImages = ['/images/heroimage_1.png', '/images/heroimage_2.png']
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length)
    }, 10000) // Change every 10 seconds
    
    return () => clearInterval(interval)
  }, [])

  // Projects pagination logic
  const PROJECTS_PER_PAGE = 4
  
  // Reverse the projects array to show newest first
  const reversedProjects = [...projects].reverse()
  const totalPages = Math.ceil(reversedProjects.length / PROJECTS_PER_PAGE)
  const startIndex = currentProjectPage * PROJECTS_PER_PAGE
  const endIndex = startIndex + PROJECTS_PER_PAGE
  const currentProjects = reversedProjects.slice(startIndex, endIndex)
  
  const nextProjectPage = () => {
    if (currentProjectPage < totalPages - 1) {
      setCurrentProjectPage(currentProjectPage + 1)
    }
  }
  
  const prevProjectPage = () => {
    if (currentProjectPage > 0) {
      setCurrentProjectPage(currentProjectPage - 1)
    }
  }

  // Handle video loading
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoadedData = () => {
        console.log("Video loaded successfully")
        setVideoError(false)
      }

      const handleError = (e: any) => {
        console.error("Video failed to load:", e)
        setVideoError(true)
      }

      video.addEventListener("loadeddata", handleLoadedData)
      video.addEventListener("error", handleError)

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData)
        video.removeEventListener("error", handleError)
      }
    }
  }, [])

  const openContactModal = () => {
    setShowContactModal(true)
    document.body.style.overflow = "hidden"
  }

  const closeContactModal = () => {
    setShowContactModal(false)
    document.body.style.overflow = "auto"
  }

  const openServiceForm = () => {
    setShowContactModal(false)
    setShowServiceForm(true)
  }

  const closeServiceForm = () => {
    setShowServiceForm(false)
    document.body.style.overflow = "auto"
  }

  const openCalModal = () => {
    setShowContactModal(false)
    setShowCalModal(true)
    
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const embedContainer = document.getElementById('my-cal-inline')
        if (embedContainer) {
          embedContainer.innerHTML = ''
        }

        const initCalEmbed = () => {
          const script = document.createElement('script')
          script.innerHTML = `
            (function (C, A, L) { 
              let p = function (a, ar) { a.q.push(ar); }; 
              let d = C.document; 
              C.Cal = C.Cal || function () { 
                let cal = C.Cal; 
                let ar = arguments; 
                if (!cal.loaded) { 
                  cal.ns = {}; 
                  cal.q = cal.q || []; 
                  d.head.appendChild(d.createElement("script")).src = A; 
                  cal.loaded = true; 
                } 
                if (ar[0] === L) { 
                  const api = function () { p(api, arguments); }; 
                  const namespace = ar[1]; 
                  api.q = api.q || []; 
                  if(typeof namespace === "string"){
                    cal.ns[namespace] = cal.ns[namespace] || api;
                    p(cal.ns[namespace], ar);
                    p(cal, ["initNamespace", namespace]);
                  } else p(cal, ar); 
                  return;
                } 
                p(cal, ar); 
              }; 
            })(window, "https://app.cal.com/embed/embed.js", "init");
            
            Cal("init", "new-project", {origin:"https://app.cal.com"});

            Cal.ns["new-project"]("inline", {
              elementOrSelector:"#my-cal-inline",
              config: {
                "layout":"column_view",
                "theme": "dark"
              },
              calLink: "sculptvisions/new-project",
            });

            Cal.ns["new-project"]("ui", {
              "cssVarsPerTheme":{
                "light":{"cal-brand":"#101010"},
                "dark":{"cal-brand":"#eaefff"}
              },
              "hideEventTypeDetails":true,
              "layout":"column_view",
              "styles": {
                "branding": {
                  "brandColor": "#eaefff"
                }
              }
            });

            setTimeout(() => {
              const style = document.createElement('style');
              style.textContent = \`
                #my-cal-inline * {
                  box-sizing: border-box;
                }
                #my-cal-inline iframe {
                  width: 100% !important;
                  height: 100% !important;
                  min-height: 600px !important;
                }
                .cal-embed {
                  height: 100% !important;
                  overflow: visible !important;
                }
                .cal-embed .cal-embed-body {
                  height: auto !important;
                  min-height: 100% !important;
                  overflow: visible !important;
                }
                [data-cal-embed] {
                  position: relative !important;
                  height: 100% !important;
                  overflow: visible !important;
                }
                .cal-booking-form,
                .cal-confirm-details,
                .cal-event-details {
                  max-height: none !important;
                  overflow: visible !important;
                }
              \`;
              document.head.appendChild(style);
            }, 1000);
          `
          
          try {
            eval(script.innerHTML)
          } catch (error) {
            console.error('Cal.com embed error:', error)
            if (embedContainer) {
              embedContainer.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 2rem; text-align: center;">
                  <h3 style="color: #EAEFFF; margin-bottom: 1rem;">Unable to load booking calendar</h3>
                  <p style="color: #EAEFFF; opacity: 0.7; margin-bottom: 2rem;">Please book directly on our calendar:</p>
                  <a href="https://cal.com/sculptvisions/new-project" target="_blank" rel="noopener noreferrer" style="background: #EAEFFF; color: #101010; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                    Book on Cal.com →
                  </a>
                </div>
              `
            }
          }
        }

        initCalEmbed()
      }
    }, 500)
  }

  const closeCalModal = () => {
    setShowCalModal(false)
    document.body.style.overflow = "auto"
  }

  const openConnectModal = () => {
    setShowConnectModal(true)
    document.body.style.overflow = "hidden"
    
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const embedContainer = document.getElementById('my-cal-connect-inline')
        if (embedContainer) {
          embedContainer.innerHTML = ''
        }

        const initCalEmbed = () => {
          const script = document.createElement('script')
          script.innerHTML = `
            (function (C, A, L) { 
              let p = function (a, ar) { a.q.push(ar); }; 
              let d = C.document; 
              C.Cal = C.Cal || function () { 
                let cal = C.Cal; 
                let ar = arguments; 
                if (!cal.loaded) { 
                  cal.ns = {}; 
                  cal.q = cal.q || []; 
                  d.head.appendChild(d.createElement("script")).src = A; 
                  cal.loaded = true; 
                } 
                if (ar[0] === L) { 
                  const api = function () { p(api, arguments); }; 
                  const namespace = ar[1]; 
                  api.q = api.q || []; 
                  if(typeof namespace === "string"){
                    cal.ns[namespace] = cal.ns[namespace] || api;
                    p(cal.ns[namespace], ar);
                    p(cal, ["initNamespace", namespace]);
                  } else p(cal, ar); 
                  return;
                } 
                p(cal, ar); 
              }; 
            })(window, "https://app.cal.com/embed/embed.js", "init");
            
            Cal("init", "new-connection", {origin:"https://app.cal.com"});

            Cal.ns["new-connection"]("inline", {
              elementOrSelector:"#my-cal-connect-inline",
              config: {
                "layout":"column_view",
                "theme": "dark"
              },
              calLink: "sculptvisions/new-connection",
            });

            Cal.ns["new-connection"]("ui", {
              "cssVarsPerTheme":{
                "light":{"cal-brand":"#101010"},
                "dark":{"cal-brand":"#eaefff"}
              },
              "hideEventTypeDetails":false,
              "layout":"column_view",
              "styles": {
                "branding": {
                  "brandColor": "#eaefff"
                }
              }
            });

            setTimeout(() => {
              const style = document.createElement('style');
              style.textContent = \`
                #my-cal-connect-inline {
                  background-color: #151515 !important;
                }
                #my-cal-connect-inline * {
                  box-sizing: border-box;
                }
                #my-cal-connect-inline iframe {
                  width: 100% !important;
                  height: 100% !important;
                  min-height: 100% !important;
                  background-color: transparent !important;
                }
                #my-cal-connect-inline .cal-embed {
                  height: 100% !important;
                  min-height: 100% !important;
                  overflow: hidden !important;
                  background-color: transparent !important;
                }
                #my-cal-connect-inline [data-cal-embed] {
                  position: relative !important;
                  height: 100% !important;
                  min-height: 100% !important;
                  overflow: hidden !important;
                  background-color: transparent !important;
                }
              \`;
              document.head.appendChild(style);
            }, 1000);
          `
          
          try {
            eval(script.innerHTML)
          } catch (error) {
            console.error('Cal.com embed error:', error)
            if (embedContainer) {
              embedContainer.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 2rem; text-align: center;"><h3 style="color: #EAEFFF; margin-bottom: 1rem;">Unable to load booking calendar</h3><p style="color: #EAEFFF; opacity: 0.7; margin-bottom: 2rem;">Please book directly on our calendar:</p><a href="https://cal.com/sculptvisions/new-connection" target="_blank" rel="noopener noreferrer" style="background: #EAEFFF; color: #101010; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Book on Cal.com →</a></div>'
            }
          }
        }

        initCalEmbed()
      }
    }, 500)
  }

  const closeConnectModal = () => {
    setShowConnectModal(false)
    document.body.style.overflow = "auto"
  }

  const renderSocialIcon = (link: (typeof socialLinks)[0]) => {
    const IconComponent = iconMap[link.icon as keyof typeof iconMap]
    if (!IconComponent) return null

    return (
      <Link
        key={link.id}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-70 transition-opacity"
        aria-label={link.ariaLabel}
      >
        <IconComponent className="h-5 w-5" />
      </Link>
    )
  }

  const renderMobileSocialIcon = (link: (typeof socialLinks)[0]) => {
    const IconComponent = iconMap[link.icon as keyof typeof iconMap]
    if (!IconComponent) return null

    return (
      <Link
        key={link.id}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-70 transition-opacity"
        aria-label={link.ariaLabel}
      >
        <IconComponent className="h-6 w-6" />
      </Link>
    )
  }

  return (
    <>
      {/* Floating Header */}
      <motion.header 
        className="fixed top-4 left-0 right-0 z-50 flex justify-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-[#202020]/50 backdrop-blur-md rounded-full px-6 py-3 flex items-center space-x-8 border border-[#303030]/30 shadow-2xl">
          <Link href="/" className="flex items-center">
            <img 
              src="/images/sculpt_logo.png" 
              alt={siteConfig.name}
              className="h-10 w-auto"
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-5">
              {socialLinks.map(renderSocialIcon)}
            </div>
            
            <button
              onClick={openContactModal}
              className="relative overflow-hidden bg-[#EAEFFF] text-[#202020] px-6 py-2.5 rounded-full font-bold transition-all duration-300 hover:scale-105 group shadow-lg shadow-[#EAEFFF]/20 text-lg"
              style={{
                boxShadow: '0 0 20px rgba(234, 239, 255, 0.3), 0 4px 14px rgba(234, 239, 255, 0.15)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10 flex items-center justify-center h-full">Let's Build!</span>
            </button>
          </div>
          
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={openContactModal}
              className="relative overflow-hidden bg-[#EAEFFF] text-[#202020] px-4 py-2 rounded-full font-bold transition-all duration-300 hover:scale-105 group shadow-lg text-sm"
              style={{
                boxShadow: '0 0 15px rgba(234, 239, 255, 0.3), 0 4px 10px rgba(234, 239, 255, 0.15)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10 flex items-center justify-center h-full">Let's Build!</span>
            </button>
            
            <button 
              className="text-[#EAEFFF]" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#101010]/95 backdrop-blur-md z-40 flex items-center justify-center"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex flex-col items-center space-y-8 text-2xl">
            <div className="flex items-center space-x-6">
              {socialLinks.map(renderMobileSocialIcon)}
            </div>
          </div>
        </motion.div>
      )}

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeContactModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#151515] rounded-3xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-[#252525]">
                <h3 className="text-xl font-bold">Choose how you'd like to get started with us.</h3>
                <button onClick={closeContactModal} className="hover:opacity-70 transition-opacity" title="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <button
                  onClick={openCalModal}
                  className="w-full bg-[#EAEFFF] text-[#101010] p-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Book a Call</span>
                </button>

                <button
                  onClick={openServiceForm}
                  className="w-full border border-[#EAEFFF] text-[#EAEFFF] p-4 rounded-2xl font-bold transition-all duration-300 hover:bg-[#EAEFFF] hover:text-[#101010] flex items-center justify-center space-x-3"
                >
                  <FileText className="h-5 w-5" />
                  <span>Request Services</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cal.com Modal */}
      <AnimatePresence>
        {showCalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeCalModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#151515] rounded-3xl w-full max-w-4xl h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-[#252525]">
                <h3 className="text-xl font-bold">Let's Build!</h3>
                <button onClick={closeCalModal} className="hover:opacity-70 transition-opacity" title="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="h-[calc(100%-88px)] overflow-hidden">
                <div 
                  style={{
                    width:'100%', 
                    height:'100%', 
                    overflow:'auto',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    position: 'relative',
                    contain: 'layout style paint'
                  }} 
                  id="my-cal-inline"
                  className="rounded-xl bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                >
                  <div style={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100%', 
                    padding: '2rem', 
                    textAlign: 'center',
                    minHeight: '400px'
                  }}>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EAEFFF] mb-4"></div>
                    <h3 style={{color: '#EAEFFF', marginBottom: '1rem'}}>Loading your booking calendar...</h3>
                    <p style={{color: '#EAEFFF', opacity: 0.7}}>This will just take a moment</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connect Modal */}
      <AnimatePresence>
        {showConnectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeConnectModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#151515] rounded-3xl w-full max-w-4xl overflow-hidden"
              style={{ height: '80vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-[#252525]">
                <h3 className="text-xl font-bold">Let's Connect!</h3>
                <button onClick={closeConnectModal} className="hover:opacity-70 transition-opacity" title="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div style={{ height: 'calc(100% - 88px)', overflow: 'hidden' }}>
                <div 
                  style={{
                    width:'100%', 
                    height:'100%', 
                    overflow:'hidden',
                    position: 'relative',
                    backgroundColor: '#151515'
                  }} 
                  id="my-cal-connect-inline"
                >
                  <div style={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100%', 
                    padding: '2rem', 
                    textAlign: 'center',
                    minHeight: '400px',
                    backgroundColor: '#151515'
                  }}>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EAEFFF] mb-4"></div>
                    <h3 style={{color: '#EAEFFF', marginBottom: '1rem'}}>Loading your booking calendar...</h3>
                    <p style={{color: '#EAEFFF', opacity: 0.7}}>This will just take a moment</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service Form Modal */}
      {showServiceForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#151515] rounded-xl w-full max-w-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-[#252525]">
              <h3 className="text-xl font-bold">Request Services</h3>
              <button onClick={closeServiceForm} className="hover:opacity-70 transition-opacity" title="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <EmbeddedMultiStepForm onComplete={closeServiceForm} />
            </div>
          </div>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-6 py-32" ref={headerRef}>
          {/* Background video */}
          <div className="absolute inset-0 z-0">
            {!videoError ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-30"
                onError={() => setVideoError(true)}
              >
                <source src={siteConfig.heroVideo} type="video/mp4" />
              </video>
            ) : (
              <div className={`w-full h-full ${siteConfig.heroVideoFallback} opacity-30`} />
            )}
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto space-y-8 md:space-y-12">
            {/* Hero Text */}
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.8 }}
  className="text-center relative mt-12 md:mt-16"
>
<h1 
  className="text-5xl md:text-7xl lg:text-8xl xl:text-[5.5rem] font-bold tracking-tighter leading-tight relative inline-block"
  style={{ color: '#EAEFFF' }}
>
    Build <span className="relative inline-block px-3">
      premium
      <img 
        src="/images/circle_p.png" 
        alt=""
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        style={{ 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          width: '300%',
          height: '300%'
        }}
      />
    </span> AI apps<br />that print <span className="relative inline-block">
      money
      <img 
        src="/images/line_mo.png" 
        alt=""
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{ 
          transform: 'translateY(-1px)'
        }}
      />
    </span>.
  </h1>
</motion.div>

            {/* Hero Image Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative w-full"
            >
              <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentHeroImage}
                    src={heroImages[currentHeroImage]}
                    alt="Hero showcase"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="w-full h-full object-contain absolute inset-0"
                    style={{ transform: 'scale(1.28)' }}
                  />
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#101010] via-[#101010]/80 to-transparent z-5" />
        </section>

        {/* Animated Divider - SERVICES */}
        <div className="relative py-12 overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            className="whitespace-nowrap text-[80px] md:text-[120px] font-bold opacity-10"
          >
            SERVICESSERVICESSERVICESSERVICESSERVICESSERVICESSERVICESSERVICESSERVICESSERVICES
          </motion.div>
        </div>

        {/* Services Section */}
        <section id="services" className="py-0 px-6 relative">
          <div className="max-w-9xl mx-auto">
            {/* Desktop: Grid Layout */}
            <div className="hidden md:block space-y-6">
              {/* First Row */}
              <div className="flex gap-6 justify-center">
                {/* First image - 760x396 - Apps */}
                <div className="w-[760px] h-[396px]">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="relative rounded-2xl overflow-hidden w-full h-full cursor-pointer group"
                  >
                    <img 
                      src="/images/apps_service.png"
                      alt="App Development"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 p-6 md:p-8 lg:p-10 flex items-start">
                      <h3 className="text-[#EAEFFF] font-light text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight max-w-md">
                        Cross-platform apps that earn on day one
                      </h3>
                    </div>
                  </motion.div>
                </div>

                {/* Second image - 570x396 - Web */}
                <div className="w-[570px] h-[396px]">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="relative rounded-2xl overflow-hidden w-full h-full cursor-pointer group"
                  >
                    <img 
                      src="/images/web_service.png"
                      alt="Web Development"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 p-6 md:p-8 lg:p-10 flex items-start">
                      <h3 className="text-[#EAEFFF] font-light text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight max-w-xs">
                        Landing pages that sell your app
                      </h3>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Second Row */}
              <div className="flex gap-6 justify-center">
                {/* Third image - 570x396 - Deployment */}
                <div className="w-[570px] h-[396px]">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="relative rounded-2xl overflow-hidden w-full h-full cursor-pointer group"
                  >
                    <img 
                      src="/images/depl_service.png"
                      alt="Deployment & Maintenance"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 p-6 md:p-8 lg:p-10 flex items-start">
                      <h3 className="text-[#EAEFFF] font-light text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight max-w-sm">
                        Deployment & maintenance that protect your MRR
                      </h3>
                    </div>
                  </motion.div>
                </div>

                {/* Fourth image - 760x396 - AI */}
                <div className="w-[760px] h-[396px]">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="relative rounded-2xl overflow-hidden w-full h-full cursor-pointer group"
                  >
                    <img 
                      src="/images/aiml_service.png"
                      alt="AI/ML Integration"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 p-6 md:p-8 lg:p-10 flex items-start">
                      <h3 className="text-[#EAEFFF] font-light text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight max-w-md">
                        AI brains that power your product
                      </h3>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Mobile: Column Layout */}
            <div className="md:hidden flex flex-col space-y-6">
              {/* Apps Service */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                viewport={{ once: true }}
                className="relative w-full aspect-[16/9] cursor-pointer rounded-2xl overflow-hidden"
              >
                <img 
                  src="/images/apps_service.png"
                  alt="App Development"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 p-4 sm:p-6 flex items-start">
                  <h3 className="text-[#EAEFFF] font-light text-xl sm:text-2xl leading-tight">
                    Cross-platform apps that earn on day one
                  </h3>
                </div>
              </motion.div>

              {/* Web Service */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative w-full aspect-[16/9] cursor-pointer rounded-2xl overflow-hidden"
              >
                <img 
                  src="/images/web_service.png"
                  alt="Web Development"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 p-4 sm:p-6 flex items-start">
                  <h3 className="text-[#EAEFFF] font-light text-xl sm:text-2xl leading-tight">
                    Landing pages that sell your app
                  </h3>
                </div>
              </motion.div>

              {/* Deployment Service */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative w-full aspect-[16/9] cursor-pointer rounded-2xl overflow-hidden"
              >
                <img 
                  src="/images/depl_service.png"
                  alt="Deployment & Maintenance"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 p-4 sm:p-6 flex items-start">
                  <h3 className="text-[#EAEFFF] font-light text-xl sm:text-2xl leading-tight">
                    Deployment & maintenance that protect your MRR
                  </h3>
                </div>
              </motion.div>

              {/* AI Service */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative w-full aspect-[16/9] cursor-pointer rounded-2xl overflow-hidden"
              >
                <img 
                  src="/images/aiml_service.png"
                  alt="AI/ML Integration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 p-4 sm:p-6 flex items-start">
                  <h3 className="text-[#EAEFFF] font-light text-xl sm:text-2xl leading-tight">
                    AI brains that power your product
                  </h3>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Animated Divider - FLOW */}
        <div className="relative py-12 overflow-hidden">
          <motion.div
            animate={{ x: [-1000, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            className="whitespace-nowrap text-[80px] md:text-[120px] font-bold opacity-10"
          >
            FLOWFLOWFLOWFLOWFLOWFLOWFLOWFLOWFLOWFLOWFLOWFLOWFLOWFLOWFLOWFLOW
          </motion.div>
        </div>

        {/* Flow Section */}
        <section id="flow" className="py-0 px-6 relative">
          <div className="max-w-7xl mx-auto">
            {/* Flow Navigation Buttons */}
            <div className="relative mb-12">
              {/* Buttons - Scrollable on mobile */}
              <div className="overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide">
                <div className="flex md:justify-center gap-3 md:gap-5 min-w-max md:min-w-0">
                  {[
                    { id: 'kickoff', label: 'Kickoff', img: '/images/kickoff.png' },
                    { id: 'advtrn', label: 'Advance transfer', img: '/images/advtrn.png' },
                    { id: 'uxdes', label: 'UX design', img: '/images/uxdes.png' },
                    { id: 'dev', label: 'Development', img: '/images/devlop.png' },
                    { id: 'dep', label: 'Deployment & Maintenance', img: '/images/dep.png' },
                    { id: 'handoff', label: 'Final payment & handoff', img: '/images/handoff.png' },
                  ].map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => setCurrentFlowStep(step.id)}
                      className={`relative px-4 py-2 font-medium transition-all duration-300 whitespace-nowrap ${
                        currentFlowStep === step.id
                          ? 'text-[#EAEFFF]'
                          : 'text-[#EAEFFF]/50 hover:text-[#EAEFFF]/80'
                      }`}
                    >
                      {step.label}
                      {/* Individual button underline */}
                      {currentFlowStep === step.id && (
                        <motion.div
                          layoutId="flowUnderline"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EAEFFF]"
                          style={{
                            boxShadow: '0 0 10px rgba(234, 239, 255, 0.8), 0 0 20px rgba(234, 239, 255, 0.4)'
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Grey line under all buttons */}
              <div className="absolute bottom-0 left-0 right-0 h-[0px] bg-[#454545]" />
            </div>

            {/* Flow Image Display */}
            <motion.div
              key={currentFlowStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden"
            >
              <img 
                src={
                  currentFlowStep === 'kickoff' ? '/images/kickoff.png' :
                  currentFlowStep === 'advtrn' ? '/images/advtrn.png' :
                  currentFlowStep === 'uxdes' ? '/images/uxdes.png' :
                  currentFlowStep === 'dev' ? '/images/devlop.png' :
                  currentFlowStep === 'dep' ? '/images/dep.png' :
                  '/images/handoff.png'
                }
                alt="Flow step"
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </div>
        </section>

        {/* Animated Divider - TESTIMONIALS */}
        <div className="relative py-1 overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            className="whitespace-nowrap text-[80px] md:text-[120px] font-bold opacity-10"
          >
            TESTIMONIALSTESTIMONIALSTESTIMONIALSTESTIMONIALSTESTIMONIALSTESTIMONIALSTESTIMONIALS
          </motion.div>
        </div>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-0 relative">
          <InfiniteTestimonialCarousel />
        </section>

        {/* Animated Divider - PROJECTS */}
        <div className="relative py-10 overflow-hidden">
          <motion.div
            animate={{ x: [-1000, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            className="whitespace-nowrap text-[80px] md:text-[120px] font-bold opacity-10"
          >
            PROJECTSPROJECTSPROJECTSPROJECTSPROJECTSPROJECTSPROJECTSPROJECTSPROJECTSPROJECTS
          </motion.div>
        </div>

        {/* Projects Section */}
        <section id="projects" className="relative py-0 px-6">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
            </motion.div>

            {/* Featured Project */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400">
                    {reversedProjects[0]?.image ? (
                      <img 
                        src={reversedProjects[0].image} 
                        alt={reversedProjects[0].title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-8">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <span className="text-2xl font-bold text-white">
                              {reversedProjects[0]?.title?.charAt(0) || 'F'}
                            </span>
                          </div>
                          <h3 className="text-white text-xl font-bold">{reversedProjects[0]?.title || 'Funutrition'}</h3>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
                      {reversedProjects[0]?.title || 'Funutrition'}
                    </h3>
                    <p className="text-lg opacity-80 leading-relaxed">
                      {reversedProjects[0]?.description || 
                       'Funutrition is a complete wellness and learning tracker designed for children.'}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(reversedProjects[0]?.technologies || ['React Native', 'Node.js', 'MongoDB', 'AWS']).map((tech: string, index: number) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-[#252525] rounded-full text-sm opacity-80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    href={`/projects/${reversedProjects[0]?.slug}`}
                    className="inline-flex items-center px-6 py-3 border border-[#EAEFFF] rounded-full hover:bg-[#EAEFFF] hover:text-[#101010] transition-colors"
                  >
                    View Project Details
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Other Projects */}
            {reversedProjects.slice(1).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-center mb-8">
                  <h4 className="text-xl font-semibold opacity-80">More Projects</h4>
                  
                  {Math.ceil(reversedProjects.slice(1).length / 3) > 1 && (
                    <div className="flex items-center space-x-4">
                      <button
                        title="Previous projects page"
                        onClick={() => setCurrentProjectPage(Math.max(0, currentProjectPage - 1))}
                        disabled={currentProjectPage === 0}
                        className={`p-2 rounded-full border transition-all duration-300 ${
                          currentProjectPage === 0
                            ? "border-[#252525] text-[#252525] cursor-not-allowed"
                            : "border-[#EAEFFF] text-[#EAEFFF] hover:bg-[#EAEFFF] hover:text-[#101010]"
                        }`}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      
                      <div className="flex items-center space-x-2">
                        {Array.from({ length: Math.ceil(reversedProjects.slice(1).length / 3) }, (_, i) => (
                          <button
  key={i}
  type="button"
  onClick={() => setCurrentProjectPage(i)}
  className={`w-2 h-2 rounded-full transition-all duration-300 ${
    i === currentProjectPage ? "bg-[#EAEFFF]" : "bg-[#252525] hover:bg-[#EAEFFF]/50"
  }`}
  aria-label={`Go to page ${i + 1}`}
/>
                        ))}
                      </div>
                      
                      <button
                        title="Next projects page"
                        onClick={() => setCurrentProjectPage(Math.min(Math.ceil(reversedProjects.slice(1).length / 3) - 1, currentProjectPage + 1))}
                        disabled={currentProjectPage === Math.ceil(reversedProjects.slice(1).length / 3) - 1}
                        className={`p-2 rounded-full border transition-all duration-300 ${
                          currentProjectPage === Math.ceil(reversedProjects.slice(1).length / 3) - 1
                            ? "border-[#252525] text-[#252525] cursor-not-allowed"
                            : "border-[#EAEFFF] text-[#EAEFFF] hover:bg-[#EAEFFF] hover:text-[#101010]"
                        }`}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProjectPage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  >
                    {reversedProjects.slice(1).slice(currentProjectPage * 3, (currentProjectPage + 1) * 3).map((project: Project, index: number) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="cursor-pointer group"
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 border border-[#252525] group-hover:border-[#EAEFFF]/50 transition-all duration-300 group-hover:scale-105">
                          {project.image ? (
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center p-6">
                              <div className="text-center">
                                <div className="w-12 h-12 bg-[#EAEFFF]/20 rounded-full flex items-center justify-center mb-3 mx-auto">
                                  <span className="text-lg font-bold text-[#EAEFFF]">
                                    {project.title?.charAt(0) || 'P'}
                                  </span>
                                </div>
                                <h4 className="text-[#EAEFFF] font-medium text-sm">{project.title}</h4>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mt-3 text-center">
                          <h4 className="font-medium group-hover:text-[#EAEFFF] transition-colors">
                            {project.title}
                          </h4>
                          <p className="text-sm opacity-60 mt-1 line-clamp-2">
                            {project.description?.substring(0, 80)}...
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {/* Project Modal */}
            <AnimatePresence>
              {selectedProject && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                  onClick={() => setSelectedProject(null)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#151515] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                        <button 
                          onClick={() => setSelectedProject(null)}
                          className="text-[#EAEFFF]/60 hover:text-[#EAEFFF] transition-colors text-2xl"
                        >
                          ×
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800">
                          {selectedProject.image ? (
                            <img 
                              src={selectedProject.image} 
                              alt={selectedProject.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-20 h-20 bg-[#EAEFFF]/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                                  <span className="text-2xl font-bold text-[#EAEFFF]">
                                    {selectedProject.title?.charAt(0)}
                                  </span>
                                </div>
                                <h4 className="text-[#EAEFFF] text-xl font-bold">{selectedProject.title}</h4>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-6">
                          <p className="text-[#EAEFFF]/80 leading-relaxed">
                            {selectedProject.description}
                          </p>
                          
                          {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-3">Technologies Used</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedProject.technologies.map((tech: string, index: number) => (
                                  <span 
                                    key={index}
                                    className="px-3 py-1 bg-[#252525] rounded-full text-sm"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <Link 
                            href={`/projects/${selectedProject.slug}`}
                            onClick={() => setSelectedProject(null)}
                            className="inline-flex items-center px-6 py-3 bg-[#EAEFFF] text-[#101010] rounded-full hover:bg-[#EAEFFF]/90 transition-colors font-medium"
                          >
                            View Project Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Build With Us Section */}
        <section id="contact" className="py-32 px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-9xl font-bold tracking-tighter mb-6 opacity-30">
                BUILD WITH US
              </h2>
              <h3 className="text-2xl md:text-4xl font-regular mb-8 opacity-90">
                Have an app idea that should be making you money?
              </h3>
              <p className="text-lg md:text-xl opacity-70 mb-12 max-w-2xl mx-auto">
                Tell SCULPT about your idea, target users, and revenue goal — and get a clear build plan with timeline and budget.
              </p>
              <button
                onClick={openContactModal}
                className="relative overflow-hidden border-2 border-[#EAEFFF] text-[#EAEFFF] px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 group text-lg hover:text-[#101010]"
              >
                <div className="absolute inset-0 bg-[#EAEFFF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                <span className="relative z-10">Let's Build!</span>
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 relative overflow-visible">
        <div 
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/images/footer_img.png)',
            backgroundPosition: 'bottom center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '1000px',
            transform: 'translateY(0)',
            zIndex: -2
          }}
        />
        
        <div 
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '1000px',
            background: 'linear-gradient(to bottom, #101010 0%, transparent 100%)',
            zIndex: -1
          }}
        />
          
          <div className="text-center md:text-right mb-10 md:mb-1">

            <p 
              className="text-3xl md:text-5xl mb-2" 
              style={{ 
                color: '#EAEFFF', 
                opacity: 0.7,
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 'bold'
              }}
            >
              See how you can provide us value
            </p>
            <button
              onClick={openConnectModal}
              className="text-2xl underline hover:opacity-100 transition-all duration-300 relative inline-block group"
              style={{ color: '#EAEFFF', opacity: 0.5 }}
            >
              <span className="inline-block group-hover:scale-110 group-active:scale-95 transition-transform duration-200">
                Let's Connect!
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#EAEFFF] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </button>
          </div>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center relative z-10">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="block">
              <div className="text-xl font-bold tracking-tighter text-[#EAEFFF]">
                {siteConfig.name}
              </div>
            </Link>
            <p className="mt-4 text-sm opacity-70">
              © {new Date().getFullYear()} {siteConfig.company.name} All rights reserved.
            </p>
          </div>

        </div>
      </footer>
    </>
  )
}