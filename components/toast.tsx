"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle } from "lucide-react"

interface ToastProps {
  show: boolean
  message: string
  onClose: () => void
  duration?: number
}

export default function Toast({ show, message, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [show, onClose, duration])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[100] px-6 py-4 bg-[#151515] border border-[#252525] rounded-lg shadow-xl flex items-center gap-3 min-w-[320px] max-w-md"
        >
          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
          <p className="text-[#EAEFFF] text-sm flex-grow">{message}</p>
          <button onClick={onClose} className="text-[#EAEFFF]/70 hover:text-[#EAEFFF] transition-colors">
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
