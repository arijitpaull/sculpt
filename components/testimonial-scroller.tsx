"use client"

import { motion } from "framer-motion"
import type { Testimonial } from "@/data/testimonials"

interface TestimonialScrollerProps {
  testimonials: Testimonial[]
}

export default function TestimonialScroller({ testimonials }: TestimonialScrollerProps) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex space-x-8"
        animate={{
          x: [0, -100 * testimonials.length],
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: testimonials.length * 8,
            ease: "linear",
          },
        }}
      >
        {/* Duplicate testimonials for seamless loop */}
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div
            key={`${testimonial.id}-${index}`}
            className="flex-shrink-0 w-80 bg-[#151515] p-6 rounded-xl border border-[#252525]"
          >
            <p className="text-lg mb-4 leading-relaxed">"{testimonial.content}"</p>
            <div className="flex items-center">
              {testimonial.avatar && (
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
              )}
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm opacity-70">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
