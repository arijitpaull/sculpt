import Image from "next/image"

export default function FiverrLogo({ className = "h-3 w-3" }: { className?: string }) {
  return <Image src="/images/fiverr-logo.png" alt="Fiverr" width={12} height={12} className={className} />
}
