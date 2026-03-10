"use client";
import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "@premnaren 🇦🇺",
    role: "Client, Fiverr",
    content: "Best budding developer to hire!",
  },
  {
    id: "2",
    name: "Maria Zenvi 🇧🇾",
    role: "Client, Fiverr",
    content: "Great experience, always great to work with professionals. Highly recommend☺️👍",
  },
  {
    id: "3",
    name: "Anurag Sharma 🇬🇧",
    role: "Marketing manager, Arctic Bee",
    content: "Looks promising! Great work man.",
  },
  {
    id: "4",
    name: "@lighthousesolar 🇬🇷",
    role: "Client, Fiverr",
    content: "Excellent job, in time with the right price! We are going to have many more projects!",
  },
  {
    id: "5",
    name: "Aria 🇳🇱",
    role: "Client, Dakkapel Fabriek",
    content: "We had a mobile app developed and are extremely satisfied with the result. The app is not only highly functional and works exactly as intended, but it's also beautifully designed from the start. Highly recommended!",
  },
  {
    id: "6",
    name: "Meenakshi Reddy 🇮🇳",
    role: "Client, ACENAVI",
    content: "We had a great experience working with Sculpt on the ACENAVI website. All interactions were professional, responsive, and they understood our vision quickly.",
  },
  {
    id: "7",
    name: "Tanya Singh 🇮🇳",
    role: "Client",
    content: "Great experience! Fixed all bugs quickly and gave the app a clean, modern design. Very professional and responsive. Highly recommend!",
  },
];

// Desktop: 3 vertical columns
const col1 = testimonials.slice(0, 3);
const col2 = testimonials.slice(2, 6);
const col3 = testimonials.slice(4);

// Mobile: 3 horizontal rows with alternating directions
const row1 = testimonials.slice(0, 4);
const row2 = [...testimonials].reverse().slice(0, 4);
const row3 = testimonials.slice(2, 6);

// ─── Card ────────────────────────────────────────────────────────────────────

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const tags = testimonial.role.split(",").map((t) => t.trim()).filter(Boolean);
  return (
    <div className="p-6 rounded-2xl border border-[#252525] bg-[#151515] mb-4 md:w-full w-72 flex-shrink-0 md:flex-shrink">
      <p className="text-[#EAEFFF]/80 leading-relaxed mb-5">"{testimonial.content}"</p>
      <div>
        <p className="font-medium text-[#EAEFFF] mb-2">{testimonial.name}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span key={i} className="px-2 py-1 bg-[#252525] text-[#EAEFFF]/60 text-xs rounded-full border border-[#353535] whitespace-nowrap">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Desktop: vertical column ─────────────────────────────────────────────────

const TestimonialsColumn = ({
  testimonials,
  duration = 15,
  reverse = false,
}: {
  testimonials: Testimonial[];
  duration?: number;
  reverse?: boolean;
}) => {
  return (
    <div
      className="overflow-hidden flex-1 relative"
      style={{
        maxHeight: "560px",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    >
      <motion.div
        initial={{ translateY: reverse ? "-50%" : "0%" }}
        animate={{ translateY: reverse ? "0%" : "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col"
      >
        {[0, 1].map((_, dupIndex) => (
          <React.Fragment key={dupIndex}>
            {testimonials.map((t) => (
              <TestimonialCard key={`${t.id}-${dupIndex}`} testimonial={t} />
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

// ─── Mobile: horizontal row ───────────────────────────────────────────────────

const TestimonialsRow = ({
  testimonials,
  duration = 20,
  reverse = false,
}: {
  testimonials: Testimonial[];
  duration?: number;
  reverse?: boolean;
}) => {
  return (
    <div
      className="overflow-hidden relative mb-4"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <motion.div
        initial={{ translateX: reverse ? "-50%" : "0%" }}
        animate={{ translateX: reverse ? "0%" : "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-row gap-4"
        style={{ width: "max-content" }}
      >
        {[0, 1].map((_, dupIndex) => (
          <React.Fragment key={dupIndex}>
            {testimonials.map((t) => (
              <TestimonialCard key={`${t.id}-${dupIndex}`} testimonial={t} />
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const InfiniteTestimonialCarousel = () => {
  return (
    <div className="w-full py-12">
      {/* Leave a Review button */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-end">
        <a
          href="https://g.page/r/CdL3ncLslU_kEBM/review"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center border border-[#EAEFFF] px-6 py-3 rounded-full hover:bg-[#EAEFFF] hover:text-[#101010] transition-colors text-lg font-medium text-[#EAEFFF]"
        >
          <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Leave a Review
        </a>
      </div>

      {/* Mobile: 3 horizontal rows (alternating direction) */}
      <div className="md:hidden flex flex-col">
        <TestimonialsRow testimonials={row1} duration={22} />
        <TestimonialsRow testimonials={row2} duration={18} reverse />
        <TestimonialsRow testimonials={row3} duration={24} />
      </div>

      {/* Desktop: 3 vertical columns */}
      <div className="hidden md:block max-w-7xl mx-auto px-6">
        <div className="flex gap-4 items-start">
          <TestimonialsColumn testimonials={col1} duration={18} />
          <TestimonialsColumn testimonials={col2} duration={22} reverse />
          <TestimonialsColumn testimonials={col3} duration={16} />
        </div>
      </div>
    </div>
  );
};

export default InfiniteTestimonialCarousel;