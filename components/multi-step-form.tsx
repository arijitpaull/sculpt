"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check } from "lucide-react"
import { sendEmail } from "@/lib/actions"
import Toast from "@/components/toast"

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

export default function MultiStepForm() {
  const [isOpen, setIsOpen] = useState(false)
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

      // Close the form immediately
      setIsOpen(false)

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

  const openForm = () => {
    setIsOpen(true)
    document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
  }

  const closeForm = () => {
    setIsOpen(false)
    document.body.style.overflow = "auto" // Re-enable scrolling
    setStep(1) // Reset to first step when closing
    setFormStatus({ type: null, message: "" })
  }

  const countryCodes = [
    { code: "+1", country: "US/CA" },
    { code: "+44", country: "UK" },
    { code: "+91", country: "IN" },
    { code: "+61", country: "AU" },
    { code: "+33", country: "FR" },
    { code: "+49", country: "DE" },
    { code: "+81", country: "JP" },
    { code: "+86", country: "CN" },
  ]

  const currencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "INR", "CNY"]

  return (
    <>
      <button
        onClick={openForm}
        className="inline-flex items-center justify-center border border-[#EAEFFF] px-8 py-4 rounded-full hover:bg-[#EAEFFF] hover:text-[#101010] transition-colors text-lg font-medium"
      >
        Get Started
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeForm}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#151515] rounded-xl w-full max-w-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-[#252525]">
                <h3 className="text-xl font-bold">
                  {step === 1 ? "Select Services" : step === 2 ? "Project Details" : "Review & Submit"}
                </h3>
                <button onClick={closeForm} className="hover:opacity-70 transition-opacity" title="Close form">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
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
                              className={`p-4 rounded-lg border cursor-pointer transition-all ${
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
                            className="w-full px-4 py-3 bg-[#101010] border border-[#252525] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EAEFFF] focus:border-transparent transition-colors"
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
                            className="w-full px-4 py-3 bg-[#101010] border border-[#252525] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EAEFFF] focus:border-transparent transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label htmlFor="countryCode" className="block text-sm font-medium mb-2">
                              Country Code
                            </label>
                            <select
                              id="countryCode"
                              name="countryCode"
                              value={formData.countryCode}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-[#101010] border border-[#252525] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EAEFFF] focus:border-transparent transition-colors"
                            >
                              {countryCodes.map((item) => (
                                <option key={item.code} value={item.code}>
                                  {item.code} ({item.country})
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-span-2">
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
                              className="w-full px-4 py-3 bg-[#101010] border border-[#252525] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EAEFFF] focus:border-transparent transition-colors"
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
                            className="w-full px-4 py-3 bg-[#101010] border border-[#252525] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EAEFFF] focus:border-transparent transition-colors resize-none"
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
                            <select
                              id="currency"
                              name="currency"
                              value={formData.currency}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-[#101010] border border-[#252525] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EAEFFF] focus:border-transparent transition-colors"
                            >
                              {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                  {currency}
                                </option>
                              ))}
                            </select>
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
                              placeholder="5,000"
                              className="w-full px-4 py-3 bg-[#101010] border border-[#252525] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EAEFFF] focus:border-transparent transition-colors"
                            />
                          </div>
                        </div>

                        <div className="bg-[#101010] p-4 rounded-lg mb-6">
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
                      className={`p-4 rounded-lg mb-6 ${
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast notification */}
      <Toast show={showToast} message={toastMessage} onClose={() => setShowToast(false)} />
    </>
  )
}
