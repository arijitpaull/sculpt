"use client";
import {
  useScroll,
  useTransform,
  motion,
  useInView,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

function TimelineItem({ item, index }: { item: TimelineEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: "-20% 0px -20% 0px",
    once: false,
  });

  return (
    <div
      ref={ref}
      className="flex justify-start pt-40 md:pt-80 md:gap-10"
    >
      {/* Sticky title + dot */}
      <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
        <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[#101010] flex items-center justify-center">
          <motion.div
            animate={{
              backgroundColor: isInView ? "#EAEFFF" : "#252525",
              boxShadow: isInView
                ? "0 0 12px rgba(234,239,255,0.6)"
                : "none",
            }}
            transition={{ duration: 0.4 }}
            className="h-4 w-4 rounded-full border border-[#353535] p-2"
          />
        </div>
        <motion.h3
          animate={{
            color: isInView
              ? "rgba(234,239,255,1)"
              : "rgba(234,239,255,0.2)",
          }}
          transition={{ duration: 0.4 }}
          className="hidden md:block text-2xl md:pl-20 md:text-5xl font-bold"
        >
          {item.title}
        </motion.h3>
      </div>

      {/* Content */}
      <motion.div
        animate={{
          opacity: isInView ? 1 : 0.25,
        }}
        transition={{ duration: 0.4 }}
        className="relative pl-20 pr-4 md:pl-4 w-full"
      >
        <motion.h3
          animate={{
            color: isInView
              ? "rgba(234,239,255,1)"
              : "rgba(234,239,255,0.2)",
          }}
          transition={{ duration: 0.4 }}
          className="md:hidden block text-3xl mb-6 text-left font-bold"
        >
          {item.title}
        </motion.h3>
        {item.content}
      </motion.div>
    </div>
  );
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const updateHeight = () => {
        // scrollHeight captures the full content height, not just visible
        if (ref.current) setHeight(ref.current.scrollHeight);
      };

      updateHeight();

      const resizeObserver = new ResizeObserver(updateHeight);
      if (ref.current) resizeObserver.observe(ref.current);

      return () => resizeObserver.disconnect();
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 95%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans md:px-10" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-40 md:pb-80">
        {data.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}

        {/* Scrolling line */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-[#EAEFFF]/15 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#EAEFFF] via-[#EAEFFF]/60 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};