"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(1)
  const [pauseNumbers] = useState(() => {
    // Generate two random numbers between 15-85 to pause at
    const first = Math.floor(Math.random() * 30) + 15 // 15-44
    const second = Math.floor(Math.random() * 30) + 50 // 50-79
    // Add 1% as the first pause point
    return [1, first, second].sort((a, b) => a - b) // This will keep 1 as the first element
  })
  const [currentPauseIndex, setCurrentPauseIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(true) // Start paused at 1%

  // Define pause durations in milliseconds
  const pauseDurations = [200, 400, 200] // 0.2s for 1%, 0.4s for first random, 0.2s for second random

  useEffect(() => {
    // Initial pause at 1%
    const initialPauseTimer = setTimeout(() => {
      setIsPaused(false)
      setCurrentPauseIndex(1) // Move to the next pause point
    }, pauseDurations[0])

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            // Mark splash screen as shown in session storage
            if (typeof window !== "undefined") {
              sessionStorage.setItem("sculpt-splash-shown", "true")
            }
            onComplete()
          }, 200)
          return 100
        }

        // Don't increment if we're currently paused
        if (isPaused) {
          return prev
        }

        const nextValue = prev + 1

        // Check if we should pause at this number (skip index 0 as we handled it separately)
        if (currentPauseIndex < pauseNumbers.length && nextValue === pauseNumbers[currentPauseIndex]) {
          setIsPaused(true)
          setTimeout(() => {
            setIsPaused(false)
            setCurrentPauseIndex((prevIndex) => prevIndex + 1)
          }, pauseDurations[currentPauseIndex]) // Use the appropriate pause duration
          return nextValue
        }

        return nextValue
      })
    }, 30)

    return () => {
      clearInterval(timer)
      clearTimeout(initialPauseTimer)
    }
  }, [onComplete, pauseNumbers, currentPauseIndex, isPaused, pauseDurations])

  return (
    <motion.div
      className="fixed inset-0 bg-[#101010] flex items-center justify-center z-[100]"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-bold tracking-tighter font-helvetica text-[#EAEFFF]">{progress}%</div>
      </div>
    </motion.div>
  )
}
