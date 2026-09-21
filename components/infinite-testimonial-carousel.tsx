"use client";
import React, { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { VideoCard, VideoLightbox, type VideoTestimonial } from "@/components/video-testimonial";

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
    role: "Founder, ACENAVI",
    content: "We had a great experience working with Sculpt on the ACENAVI website. All interactions were professional, responsive, and they understood our vision quickly.",
  },
  {
    id: "7",
    name: "Tanya Singh 🇮🇳",
    role: "Client",
    content: "Great experience! Fixed all bugs quickly and gave the app a clean, modern design. Very professional and responsive. Highly recommend!",
  },
  {
    id: "8",
    name: "Kent McLaurin 🇺🇸",
    role: "Co-founder, KLMATM DIGITAL LLC",
    content: "  SCULPT delivered an exceptional landing page for KLMATM DIGITAL LLC. Communication throughout the entire process was seamless. A 100% pleasure to work with, I highly recommend SCULPT for top-tier PREMIUM web development.",
  },
];

// Video testimonials — files live in /public/videos. Add just the file name
// (mp4, webm, mov…), the person's name and their designation.
const videoTestimonials: VideoTestimonial[] = [
  //{ video: "video1.mp4", name: "Arijit Paul 🇮🇳", role: "Founder, SCULPT" },
];

// ─── Mixing videos into the wall ─────────────────────────────────────────────

type WallItem =
  | { kind: "text"; data: Testimonial }
  | { kind: "video"; data: VideoTestimonial };

// Spread videos round-robin across the lanes, dropping one in after every
// `every` text cards so they never bunch up.
const buildLanes = (textLanes: Testimonial[][], videos: VideoTestimonial[], every = 2): WallItem[][] => {
  const perLane: VideoTestimonial[][] = textLanes.map(() => []);
  videos.forEach((v, i) => perLane[i % textLanes.length].push(v));

  return textLanes.map((texts, laneIndex) => {
    const queue = [...perLane[laneIndex]];
    const lane: WallItem[] = [];
    texts.forEach((t, i) => {
      lane.push({ kind: "text", data: t });
      if ((i + 1) % every === 0 && queue.length) lane.push({ kind: "video", data: queue.shift()! });
    });
    // Anything left over goes at the end of the lane.
    queue.forEach((v) => lane.push({ kind: "video", data: v }));
    return lane;
  });
};

// Desktop: 3 vertical columns
const desktopLanes = buildLanes(
  [testimonials.slice(0, 3), testimonials.slice(2, 6), testimonials.slice(4)],
  videoTestimonials,
);

// Mobile: 3 horizontal rows (alternating direction)
const mobileLanes = buildLanes(
  [testimonials.slice(0, 4), [...testimonials].reverse().slice(0, 4), testimonials.slice(2, 6)],
  videoTestimonials,
);

// ─── Card ────────────────────────────────────────────────────────────────────

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const tags = testimonial.role.split(",").map((t) => t.trim()).filter(Boolean);
  return (
    <div className="p-6 rounded-2xl border border-[#252525] bg-[#151515] md:w-full w-72 flex-shrink-0 md:flex-shrink">
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

// Renders a lane's items twice so the CSS loop is seamless.
const LaneItems = ({
  items,
  onOpen,
  videoClassName,
}: {
  items: WallItem[];
  onOpen: (v: VideoTestimonial) => void;
  videoClassName: string;
}) =>
  [0, 1].map((dupIndex) => (
    <React.Fragment key={dupIndex}>
      {items.map((item, i) =>
        item.kind === "text" ? (
          <TestimonialCard key={`${dupIndex}-${i}-t`} testimonial={item.data} />
        ) : (
          <VideoCard key={`${dupIndex}-${i}-v`} item={item.data} onOpen={onOpen} className={videoClassName} />
        ),
      )}
    </React.Fragment>
  ));

// ─── Desktop: vertical column ─────────────────────────────────────────────────

const TestimonialsColumn = ({
  items,
  onOpen,
  duration = 15,
  reverse = false,
}: {
  items: WallItem[];
  onOpen: (v: VideoTestimonial) => void;
  duration?: number;
  reverse?: boolean;
}) => {
  return (
    <div
      className="wall-lane overflow-hidden flex-1 relative"
      style={{
        maxHeight: "680px",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    >
      <div
        className={`wall-track wall-track-up flex flex-col gap-4 ${reverse ? "wall-track-reverse" : ""}`}
        style={{ ["--wall-duration" as string]: `${duration}s` }}
      >
        <LaneItems items={items} onOpen={onOpen} videoClassName="w-full" />
      </div>
    </div>
  );
};

// ─── Mobile: horizontal row ───────────────────────────────────────────────────

const TestimonialsRow = ({
  items,
  onOpen,
  duration = 20,
  reverse = false,
}: {
  items: WallItem[];
  onOpen: (v: VideoTestimonial) => void;
  duration?: number;
  reverse?: boolean;
}) => {
  return (
    <div
      className="wall-lane overflow-hidden relative mb-4"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        className={`wall-track wall-track-left flex flex-row items-center gap-4 w-max ${reverse ? "wall-track-reverse" : ""}`}
        style={{ ["--wall-duration" as string]: `${duration}s` }}
      >
        <LaneItems items={items} onOpen={onOpen} videoClassName="w-44 flex-shrink-0" />
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const InfiniteTestimonialCarousel = () => {
  const [active, setActive] = useState<VideoTestimonial | null>(null);
  const close = useCallback(() => setActive(null), []);

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
        <TestimonialsRow items={mobileLanes[0]} onOpen={setActive} duration={22} />
        <TestimonialsRow items={mobileLanes[1]} onOpen={setActive} duration={18} reverse />
        <TestimonialsRow items={mobileLanes[2]} onOpen={setActive} duration={24} />
      </div>

      {/* Desktop: 3 vertical columns */}
      <div className="hidden md:block max-w-7xl mx-auto px-6">
        <div className="flex gap-4 items-start">
          <TestimonialsColumn items={desktopLanes[0]} onOpen={setActive} duration={18} />
          <TestimonialsColumn items={desktopLanes[1]} onOpen={setActive} duration={22} reverse />
          <TestimonialsColumn items={desktopLanes[2]} onOpen={setActive} duration={16} />
        </div>
      </div>

      <AnimatePresence>{active && <VideoLightbox item={active} onClose={close} />}</AnimatePresence>
    </div>
  );
};

export default InfiniteTestimonialCarousel;
