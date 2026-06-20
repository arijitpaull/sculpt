"use client";

import { motion } from "framer-motion";
import { pricingLeadIn, pricingTiers, pricingFootnote } from "@/lib/pricingData";

const PricingSection = ({ onSelectPackage }: { onSelectPackage: (packageName: string) => void }) => {
  return (
    <section id="pricing" className="py-16 md:py-24 px-4 md:px-8">
      <div className="w-full max-w-[1600px] mx-auto">

        {/* Lead-in strip */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center text-[#EAEFFF]/60 text-lg md:text-xl leading-relaxed mb-14"
        >
          {pricingLeadIn}
        </motion.p>

        {/* Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {pricingTiers.map((tier, index) => (
            <motion.button
              key={tier.name}
              type="button"
              onClick={() => onSelectPackage(tier.name)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`group relative w-full text-left rounded-3xl border p-8 md:p-10 flex flex-col min-h-[560px] cursor-pointer transition-all duration-300 hover:bg-[#EAEFFF] hover:shadow-[0_0_60px_rgba(234,239,255,0.25)] ${
                tier.highlight
                  ? "bg-[#181818] border-[#EAEFFF]/40"
                  : "bg-[#151515] border-[#252525]"
              }`}
            >
              <h3 className="text-[#EAEFFF] group-hover:text-[#101010] text-2xl mb-2 transition-colors duration-300">
                <span className="font-bold">{tier.name}</span>{" "}
                <span className="font-normal">package</span>
              </h3>

              <p className="text-[#EAEFFF] group-hover:text-[#101010] text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300">
                {tier.priceFrom}
              </p>

              <p className="text-[#EAEFFF]/85 group-hover:text-[#101010]/85 text-lg md:text-xl leading-snug mb-6 transition-colors duration-300">
                <span className="font-semibold">{tier.forWhoBold}</span>{" "}
                <span className="font-normal">{tier.forWhoRest}</span>
              </p>

              <ul className="space-y-2 mb-8">
                {tier.includes.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-[#EAEFFF]/40 group-hover:text-[#101010]/50 text-sm leading-relaxed tracking-normal transition-colors duration-300"
                  >
                    <span className="mt-[7px] h-1 w-1 rounded-full bg-current shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto space-y-1">
                <p className="text-[#EAEFFF]/35 group-hover:text-[#101010]/45 text-xs font-mono transition-colors duration-300">
                  {tier.scope}
                </p>
                <p className="text-[#EAEFFF]/35 group-hover:text-[#101010]/45 text-xs font-mono transition-colors duration-300">
                  {tier.care}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footnote */}
        <p className="text-center text-[#EAEFFF]/40 text-xs md:text-sm leading-relaxed mt-8 max-w-2xl mx-auto">
          {pricingFootnote}
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
