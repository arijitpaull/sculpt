"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export interface VideoTestimonial {
  /** File name inside /public/videos, e.g. "video1.mp4" */
  video: string;
  name: string;
  role: string;
}

const VIDEO_DIR = "/videos/";

// ─── Icons ───────────────────────────────────────────────────────────────────

const PlayIcon = ({ className = "h-3 w-3" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
    <path d="M2 1l9 5-9 5z" />
  </svg>
);

const PauseIcon = ({ className = "h-3 w-3" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
    <path d="M2 1h3v10H2zM7 1h3v10H7z" />
  </svg>
);

const MutedIcon = ({ className = "h-3 w-3" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
    <path d="M1 4h3l4-3v10L4 8H1z" />
    <path d="M9.5 3.5l2 5M11.5 3.5l-2 5" stroke="currentColor" strokeWidth="1.2" fill="none" />
  </svg>
);

const SoundIcon = ({ className = "h-3 w-3" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
    <path d="M1 4h3l4-3v10L4 8H1z" />
    <path d="M9.5 3.5a3.5 3.5 0 010 5M10.8 1.8a5.8 5.8 0 010 8.4" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round" />
  </svg>
);

const CloseIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
    <path d="M2 2l8 8M10 2l-8 8" />
  </svg>
);

// ─── Card (in the wall) ──────────────────────────────────────────────────────
// At rest: shows the middle frame of the video as its thumbnail.
// Hover: plays from the start, muted, with a progress bar + "muted" badge.
// Click: opens the full-screen player with sound.

export const VideoCard = ({
  item,
  onOpen,
  className = "",
}: {
  item: VideoTestimonial;
  onOpen: (item: VideoTestimonial) => void;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [previewing, setPreviewing] = useState(false);
  const [progress, setProgress] = useState(0);
  // Landscape files sit letterboxed inside the vertical card (black bars top/bottom).
  const [landscape, setLandscape] = useState(false);

  const showThumbnail = (v: HTMLVideoElement) => {
    if (v.videoWidth && v.videoHeight) setLandscape(v.videoWidth > v.videoHeight);
    if (Number.isFinite(v.duration) && v.duration > 0) v.currentTime = v.duration / 2;
  };

  // Cached files can fire loadedmetadata before React attaches the listener.
  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 1) showThumbnail(v);
  }, []);

  const startPreview = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.currentTime = 0;
    v.play().then(() => setPreviewing(true)).catch(() => {});
  };

  const stopPreview = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setPreviewing(false);
    setProgress(0);
    showThumbnail(v);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Play testimonial from ${item.name}`}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      onFocus={startPreview}
      onBlur={stopPreview}
      onClick={() => onOpen(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(item);
        }
      }}
      className={`relative aspect-[9/16] rounded-2xl overflow-hidden border border-[#252525] bg-black cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#EAEFFF] ${className}`}
    >
      <video
        ref={videoRef}
        src={VIDEO_DIR + item.video}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedMetadata={(e) => showThumbnail(e.currentTarget)}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (!v.paused && v.duration) setProgress((v.currentTime / v.duration) * 100);
        }}
        className={`absolute inset-0 h-full w-full ${landscape ? "object-contain" : "object-cover"}`}
      />

      {/* Bottom dimming gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101010]/95 via-[#101010]/35 to-transparent" />

      {/* Muted badge (only while previewing) */}
      <div
        className={`absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-[#EAEFFF]/20 bg-[#101010]/60 px-2 py-1 text-[10px] uppercase tracking-wider text-[#EAEFFF] transition-opacity ${previewing ? "opacity-100" : "opacity-0"}`}
      >
        <MutedIcon className="h-2.5 w-2.5" />
        Muted
      </div>

      {/* Play affordance */}
      <div className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full border border-[#EAEFFF]/20 bg-[#101010]/60 text-[#EAEFFF]">
        <PlayIcon />
      </div>

      {/* Name + designation */}
      <div className="absolute inset-x-0 bottom-0 p-4 pb-5">
        <p className="text-sm font-medium leading-tight text-[#EAEFFF]">{item.name}</p>
        <p className="mt-1 text-[11px] text-[#EAEFFF]/60">{item.role}</p>
      </div>

      {/* Progress bar (only while previewing) */}
      <div className={`absolute inset-x-0 bottom-0 h-[3px] bg-[#EAEFFF]/15 transition-opacity ${previewing ? "opacity-100" : "opacity-0"}`}>
        <div className="h-full bg-[#EAEFFF]" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

// ─── Full-screen player ──────────────────────────────────────────────────────
// Plays with sound in the video's native aspect ratio (landscape stays landscape).

export const VideoLightbox = ({
  item,
  onClose,
}: {
  item: VideoTestimonial;
  onClose: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    // If the browser blocks unmuted autoplay, fall back to muted so it still plays.
    v.play().catch(() => {
      v.muted = true;
      setMuted(true);
      v.play().catch(() => setPlaying(false));
    });
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080808]/90 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full border border-[#252525] bg-[#151515] text-[#EAEFFF] hover:bg-[#EAEFFF] hover:text-[#101010] transition-colors"
      >
        <CloseIcon />
      </button>

      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative max-h-[88vh] max-w-[92vw] overflow-hidden rounded-2xl border border-[#252525] bg-black shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={VIDEO_DIR + item.video}
          playsInline
          preload="auto"
          onClick={togglePlay}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (v.duration) setProgress((v.currentTime / v.duration) * 100);
          }}
          onEnded={() => setPlaying(false)}
          className="block max-h-[88vh] max-w-[92vw] cursor-pointer"
        />

        {/* Bottom dimming gradient + name/role */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#101010]/90 to-transparent px-4 pt-16 pb-5">
          <p className="text-base font-medium leading-tight text-[#EAEFFF]">{item.name}</p>
          <p className="mt-1 text-xs text-[#EAEFFF]/60">{item.role}</p>
        </div>

        {/* Controls */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className="grid h-9 w-9 place-items-center rounded-full border border-[#EAEFFF]/20 bg-[#101010]/60 text-[#EAEFFF] hover:bg-[#101010]/90 transition-colors"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="flex h-9 items-center gap-1.5 rounded-full border border-[#EAEFFF]/20 bg-[#101010]/60 px-3 text-[10px] uppercase tracking-wider text-[#EAEFFF] hover:bg-[#101010]/90 transition-colors"
          >
            {muted ? <MutedIcon className="h-2.5 w-2.5" /> : <SoundIcon className="h-2.5 w-2.5" />}
            {muted ? "Muted" : "Sound on"}
          </button>
        </div>

        {/* Seekable progress bar */}
        <div
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          onClick={seek}
          className="absolute inset-x-0 bottom-0 h-1.5 cursor-pointer bg-[#EAEFFF]/15"
        >
          <div className="h-full bg-[#EAEFFF]" style={{ width: `${progress}%` }} />
        </div>
      </motion.div>
    </motion.div>
  );
};
