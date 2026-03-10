"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Globe, Bot, Layers, LayoutTemplate } from "lucide-react";
import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { animate } from "framer-motion";

// ── Glowing Effect (white/EAEFFF variant) ─────────────────────────────────────
const GlowingEffect = memo(({
  blur = 0,
  inactiveZone = 0.65,
  proximity = 60,
  spread = 28,
  glow = false,
  className,
  movementDuration = 1.4,
  borderWidth = 1,
  disabled = false,
}: {
  blur?: number; inactiveZone?: number; proximity?: number; spread?: number;
  glow?: boolean; className?: string; movementDuration?: number;
  borderWidth?: number; disabled?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);

  const handleMove = useCallback((e?: MouseEvent | { x: number; y: number }) => {
    if (!containerRef.current) return;
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(() => {
      const element = containerRef.current;
      if (!element) return;
      const { left, top, width, height } = element.getBoundingClientRect();
      const mouseX = e?.x ?? lastPosition.current.x;
      const mouseY = e?.y ?? lastPosition.current.y;
      if (e) lastPosition.current = { x: mouseX, y: mouseY };
      const center = [left + width * 0.5, top + height * 0.5];
      const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
      const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;
      if (distanceFromCenter < inactiveRadius) { element.style.setProperty("--active", "0"); return; }
      const isActive = mouseX > left - proximity && mouseX < left + width + proximity &&
        mouseY > top - proximity && mouseY < top + height + proximity;
      element.style.setProperty("--active", isActive ? "1" : "0");
      if (!isActive) return;
      const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0;
      let targetAngle = (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;
      const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
      const newAngle = currentAngle + angleDiff;
      animate(currentAngle, newAngle, {
        duration: movementDuration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (value) => { element.style.setProperty("--start", String(value)); },
      });
    });
  }, [inactiveZone, proximity, movementDuration]);

  useEffect(() => {
    if (disabled) return;
    const handleScroll = () => handleMove();
    const handlePointerMove = (e: PointerEvent) => handleMove(e);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.body.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("scroll", handleScroll);
      document.body.removeEventListener("pointermove", handlePointerMove);
    };
  }, [handleMove, disabled]);

  return (
    <>
      <div className={cn("pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity", glow && "opacity-100", disabled && "!block")} />
      <div
        ref={containerRef}
        style={{
          "--blur": `${blur}px`,
          "--spread": spread,
          "--start": "0",
          "--active": "0",
          "--glowingeffect-border-width": `${borderWidth}px`,
          "--repeating-conic-gradient-times": "5",
          "--gradient": `repeating-conic-gradient(
            from 236.84deg at 50% 50%,
            #eaefff 0%,
            #eaefff99 calc(25% / var(--repeating-conic-gradient-times)),
            #eaefff44 calc(50% / var(--repeating-conic-gradient-times)),
            #eaefff99 calc(75% / var(--repeating-conic-gradient-times)),
            #eaefff calc(100% / var(--repeating-conic-gradient-times))
          )`,
        } as React.CSSProperties}
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
          glow && "opacity-100",
          blur > 0 && "blur-[var(--blur)]",
          className,
          disabled && "!hidden"
        )}
      >
        <div className={cn(
          "glow rounded-[inherit]",
          'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
          "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
          "after:[background:var(--gradient)] after:[background-attachment:fixed]",
          "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
          "after:[mask-clip:padding-box,border-box]",
          "after:[mask-composite:intersect]",
          "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
        )} />
      </div>
    </>
  );
});
GlowingEffect.displayName = "GlowingEffect";

// ── Arts ───────────────────────────────────────────────────────────────────────
const MobileArt = () => (
  <div className="relative flex h-28 w-full items-center justify-center">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="h-20 w-20 rounded-full bg-[#EAEFFF]/8 blur-2xl" />
    </div>
    <div className="flex gap-3 items-end">
      {[{ h: "h-24", delay: 0 }, { h: "h-20", delay: 0.3 }].map(({ h, delay }, i) => (
        <div key={i} className={`relative ${h} w-11 rounded-[10px] border border-[#EAEFFF]/20 bg-[#0d0d0d] overflow-hidden`}>
          <div className="absolute top-1 left-1/2 -translate-x-1/2 h-1 w-5 rounded-full bg-[#EAEFFF]/10" />
          <div className="absolute inset-0 pt-4 pb-1.5 px-1.5 flex flex-col gap-1">
            <div className="h-1.5 w-full rounded bg-[#EAEFFF]/15" />
            <div className="h-1.5 w-2/3 rounded bg-[#EAEFFF]/8" />
            <div className="h-5 w-full rounded-md bg-[#EAEFFF]/8 mt-0.5" />
            <div className="flex gap-0.5 mt-0.5">
              <div className="h-3 flex-1 rounded bg-[#EAEFFF]/10" />
              <div className="h-3 flex-1 rounded bg-[#EAEFFF]/6" />
            </div>
          </div>
          <motion.div
            animate={{ y: ["0%", "100%", "0%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay }}
            className="absolute inset-x-0 h-4 bg-gradient-to-b from-transparent via-[#EAEFFF]/6 to-transparent pointer-events-none"
          />
        </div>
      ))}
    </div>
    <div className="absolute bottom-0 flex gap-1.5">
      {["iOS", "Android"].map((p) => (
        <span key={p} className="px-1.5 py-0.5 rounded-full border border-[#EAEFFF]/15 bg-[#151515] text-[8px] font-mono text-[#EAEFFF]/40">{p}</span>
      ))}
    </div>
  </div>
);

const WebArt = () => (
  <div className="relative w-full overflow-hidden">
    <div className="relative w-full rounded-xl border border-[#EAEFFF]/12 bg-[#0a0a0a] overflow-hidden">
      <div className="flex items-center gap-1 px-3 py-2 border-b border-[#EAEFFF]/8">
        {[15, 10, 8].map((o, i) => <div key={i} className={`h-1.5 w-1.5 rounded-full bg-[#EAEFFF]/${o}`} />)}
        <div className="flex-1 ml-1.5 h-2 rounded-full bg-[#EAEFFF]/8" />
      </div>
      <div className="p-2.5">
        <div className="grid grid-cols-3 gap-1.5 mb-2">
          {[{ v: 74, label: "MRR" }, { v: 52, label: "CAC" }, { v: 91, label: "LTV" }].map(({ v, label }, i) => (
            <div key={label} className="rounded-lg bg-[#EAEFFF]/5 border border-[#EAEFFF]/8 px-2 py-1.5">
              <div className="text-[9px] text-[#EAEFFF]/30 font-mono mb-0.5">{label}</div>
              <div className="text-xs font-bold text-[#EAEFFF]/70">{v}%</div>
              <div className="h-0.5 w-full rounded-full bg-[#EAEFFF]/8 mt-1">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${v}%` }} transition={{ duration: 1, delay: i * 0.15 }} viewport={{ once: true }} className="h-full rounded-full bg-[#EAEFFF]/40" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-end gap-0.5 h-8">
          {[25,45,35,65,48,80,55,72,40,88,62,78].map((h, i) => (
            <motion.div key={i} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} transition={{ duration: 0.3, delay: i * 0.04 }} viewport={{ once: true }} className="flex-1 rounded-sm origin-bottom bg-[#EAEFFF]/18" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SaasArt = () => (
  <div className="relative h-28 w-full flex items-center justify-center">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="h-16 w-32 rounded-full bg-[#EAEFFF]/5 blur-3xl" />
    </div>
    {[2, 1, 0].map((depth) => (
      <div key={depth} className="absolute w-52 rounded-xl border border-[#EAEFFF]/10 bg-[#111] overflow-hidden" style={{ top: `${14 + depth * 16}px`, zIndex: 3 - depth, opacity: 1 - depth * 0.28 }}>
        <div className="px-3 py-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <div className="h-1.5 w-14 rounded-full bg-[#EAEFFF]/20" />
            <div className="h-1.5 w-6 rounded-full bg-[#EAEFFF]/10" />
          </div>
          <div className="h-1 w-full rounded-full bg-[#EAEFFF]/8 mb-1" />
          <div className="h-1 w-3/4 rounded-full bg-[#EAEFFF]/5" />
          {depth === 0 && (
            <div className="mt-2 flex gap-1.5">
              <div className="h-4 w-14 rounded-lg bg-[#EAEFFF]/10 border border-[#EAEFFF]/15" />
              <div className="h-4 w-10 rounded-lg bg-[#EAEFFF]/5" />
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

const AIArt = () => (
  <div className="relative w-full rounded-xl border border-[#EAEFFF]/12 bg-[#0a0a0a] overflow-hidden">
    <div className="flex items-center gap-1 px-3 py-2 border-b border-[#EAEFFF]/8">
      {[15,10,8].map((o,i) => <div key={i} className={`h-1.5 w-1.5 rounded-full bg-[#EAEFFF]/${o}`} />)}
      <span className="ml-2 text-[8px] font-mono text-[#EAEFFF]/20">ai_agent.ts</span>
    </div>
    <div className="p-3 space-y-2">
      {[
        { label: "model", value: "claude-sonnet-4-5", delay: 0 },
        { label: "tools", value: "search · memory · exec", delay: 0.1 },
        { label: "status", value: "▸ streaming response...", delay: 0.2 },
      ].map(({ label, value, delay }) => (
        <motion.div key={label} initial={{ opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.35 }} viewport={{ once: true }} className="flex gap-3 font-mono text-[10px]">
          <span className="text-[#EAEFFF]/20 w-10 shrink-0">{label}</span>
          <span className="text-[#EAEFFF]/50">{value}</span>
        </motion.div>
      ))}
      <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#EAEFFF]/40 mt-1">
        <span>output</span><span className="text-[#EAEFFF]/20">→</span>
        <span className="text-[#EAEFFF]/50">"Here's what I found..."</span>
        <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }} className="inline-block h-2.5 w-0.5 bg-[#EAEFFF]/50" />
      </div>
    </div>
  </div>
);

const LandingArt = () => (
  <div className="relative w-full flex items-center justify-center">
    <div className="w-full space-y-1.5">
      <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-[#EAEFFF]/10 bg-[#0d0d0d]">
        <div className="h-2 w-10 rounded-full bg-[#EAEFFF]/25" />
        <div className="flex gap-2">{[0,1,2].map(i=><div key={i} className="h-1.5 w-7 rounded-full bg-[#EAEFFF]/10"/>)}</div>
        <div className="h-5 w-14 rounded-full border border-[#EAEFFF]/20 bg-[#EAEFFF]/8" />
      </div>
      <div className="px-4 pt-4 pb-3 rounded-xl border border-[#EAEFFF]/10 bg-[#0d0d0d]">
        <div className="h-4 w-28 rounded-full border border-[#EAEFFF]/12 bg-[#EAEFFF]/5 mx-auto mb-2" />
        <div className="space-y-1.5 mb-3">
          <div className="h-3 w-48 rounded bg-[#EAEFFF]/20 mx-auto" />
          <div className="h-3 w-40 rounded bg-[#EAEFFF]/15 mx-auto" />
        </div>
        <div className="h-1.5 w-52 rounded-full bg-[#EAEFFF]/8 mx-auto mb-1" />
        <div className="h-1.5 w-44 rounded-full bg-[#EAEFFF]/6 mx-auto mb-3" />
        <div className="flex gap-2 justify-center">
          <div className="h-6 w-24 rounded-full border-2 border-[#EAEFFF]/25 bg-[#EAEFFF]/8" />
          <div className="h-6 w-20 rounded-full border border-[#EAEFFF]/12" />
        </div>
      </div>
    </div>
  </div>
);

// ── Glowing Card wrapper ───────────────────────────────────────────────────────
const GlowCard = ({ children, className, index }: { children: React.ReactNode; className?: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    viewport={{ once: true }}
    className={cn("relative rounded-3xl", className)}
  >
    <GlowingEffect spread={28} proximity={60} borderWidth={1.5} />
    <Card className="h-full rounded-3xl bg-[#151515] border-[#252525] overflow-hidden">
      {children}
    </Card>
  </motion.div>
);

// ── Section ────────────────────────────────────────────────────────────────────
export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 px-4 md:px-8">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="grid grid-cols-6 gap-3">

          {/* Card 1 — Mobile Apps */}
          <GlowCard index={0} className="col-span-6 lg:col-span-2">
            <CardContent className="pt-6 flex flex-col h-full">
              <MobileArt />
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex aspect-square size-8 rounded-full border border-[#EAEFFF]/15 bg-[#EAEFFF]/5 items-center justify-center">
                    <Smartphone className="size-3.5 text-[#EAEFFF]/60" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[#EAEFFF] font-bold">Mobile Apps</h3>
                </div>
                <p className="text-[#EAEFFF]/55 text-sm font-bold leading-relaxed">
                  Native-quality iOS & Android from a single Flutter codebase. Both stores, shipped in 60 days.
                </p>
              </div>
            </CardContent>
          </GlowCard>

          {/* Card 2 — Web Applications */}
          <GlowCard index={1} className="col-span-6 sm:col-span-3 lg:col-span-2">
            <CardContent className="pt-6 flex flex-col h-full">
              <WebArt />
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex aspect-square size-8 rounded-full border border-[#EAEFFF]/15 bg-[#EAEFFF]/5 items-center justify-center">
                    <Globe className="size-3.5 text-[#EAEFFF]/60" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[#EAEFFF] font-bold">Web Applications</h3>
                </div>
                <p className="text-[#EAEFFF]/55 text-sm font-bold leading-relaxed">
                  Full-stack Next.js apps with Supabase — dashboards, portals, and internal tools with real-time data.
                </p>
              </div>
            </CardContent>
          </GlowCard>

          {/* Card 3 — SaaS Platforms */}
          <GlowCard index={2} className="col-span-6 sm:col-span-3 lg:col-span-2">
            <CardContent className="pt-6 flex flex-col h-full">
              <SaasArt />
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex aspect-square size-8 rounded-full border border-[#EAEFFF]/15 bg-[#EAEFFF]/5 items-center justify-center">
                    <Layers className="size-3.5 text-[#EAEFFF]/60" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[#EAEFFF] font-bold">SaaS Platforms</h3>
                </div>
                <p className="text-[#EAEFFF]/55 text-sm font-bold leading-relaxed">
                  Auth, billing, multi-tenancy — everything a paying product needs before you acquire your first user.
                </p>
              </div>
            </CardContent>
          </GlowCard>

          {/* Card 4 — AI Integrations */}
          <GlowCard index={3} className="col-span-6 lg:col-span-3">
            <CardContent className="pt-6 grid sm:grid-cols-2 gap-6 h-full">
              <div className="flex flex-col justify-between space-y-6">
                <div className="flex items-center gap-2">
                  <div className="flex aspect-square size-8 rounded-full border border-[#EAEFFF]/15 bg-[#EAEFFF]/5 items-center justify-center shrink-0">
                    <Bot className="size-3.5 text-[#EAEFFF]/60" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[#EAEFFF] font-bold">AI Integrations</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-[#EAEFFF]/55 text-sm font-bold leading-relaxed">
                    LLMs, voice AI, RAG pipelines, and agents embedded into your product — not bolted on as an afterthought.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["OpenAI", "Claude", "Deepgram", "ElevenLabs"].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full border border-[#EAEFFF]/12 bg-[#EAEFFF]/5 text-[9px] font-mono text-[#EAEFFF]/40">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center"><AIArt /></div>
            </CardContent>
          </GlowCard>

          {/* Card 5 — Landing Pages */}
          <GlowCard index={4} className="col-span-6 lg:col-span-3">
            <CardContent className="pt-6 grid sm:grid-cols-2 gap-6 h-full">
              <div className="flex flex-col justify-between space-y-6">
                <div className="flex items-center gap-2">
                  <div className="flex aspect-square size-8 rounded-full border border-[#EAEFFF]/15 bg-[#EAEFFF]/5 items-center justify-center shrink-0">
                    <LayoutTemplate className="size-3.5 text-[#EAEFFF]/60" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[#EAEFFF] font-bold">Landing Pages</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-[#EAEFFF]/55 text-sm font-bold leading-relaxed">
                    High-conversion pages built for ad traffic. Designed to turn visitors into discovery calls — not just look nice.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["Framer Motion", "Next.js", "CRO-optimised"].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full border border-[#EAEFFF]/12 bg-[#EAEFFF]/5 text-[9px] font-mono text-[#EAEFFF]/40">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center sm:-mb-6 sm:-mr-6 sm:mt-0 mt-4 border-l border-t border-[#252525] rounded-tl-2xl p-4 relative">
                <div className="absolute top-2 left-3 flex gap-1">
                  {[0,1,2].map(i=><span key={i} className="block size-1.5 rounded-full border border-[#EAEFFF]/12 bg-[#EAEFFF]/8"/>)}
                </div>
                <LandingArt />
              </div>
            </CardContent>
          </GlowCard>

        </div>
      </div>
    </section>
  );
}