import Link from "next/link"
import Image from "next/image"
import ProjectInquiryForm from "@/components/project-inquiry-form"

export const metadata = {
  title: "Project Inquiry",
  description:
    "Tell SCULPT about your app idea before we get on a call — scope, platform, budget, and timeline in one quick form.",
  alternates: {
    canonical: "https://www.sculpt.work/project-inquiry",
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function ProjectInquiryPage() {
  return (
    <main className="min-h-screen bg-[#101010] text-[#EAEFFF]">
      <header className="max-w-3xl mx-auto px-6 pt-10 pb-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/images/sculpt_logo_full.webp" alt="SCULPT" width={120} height={32} priority />
        </Link>
        <Link href="/" className="text-sm text-[#EAEFFF]/60 hover:text-[#EAEFFF] transition-colors">
          Back to site
        </Link>
      </header>

      <section className="max-w-3xl mx-auto px-6 pt-8 pb-24">
        <p className="text-sm uppercase tracking-wide text-[#EAEFFF]/50 mb-3">Project Inquiry</p>
        <h1 className="text-3xl md:text-4xl font-medium mb-4 max-w-xl">
          Before we get on a call, help us understand your vision.
        </h1>
        <p className="text-[#EAEFFF]/70 max-w-xl mb-12">
          A few quick questions about scope, platform, and budget. Takes about three minutes.
        </p>

        <div className="bg-[#151515] border border-[#252525] rounded-2xl p-6 md:p-10">
          <ProjectInquiryForm />
        </div>
      </section>
    </main>
  )
}
