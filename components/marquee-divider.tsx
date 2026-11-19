// Big faded section word (TESTIMONIALS, FLOW...) sliding forever.
// The text is rendered as two identical halves and the track moves exactly one
// half's width, so when the animation restarts the second half is sitting where
// the first one began and the loop has no visible jump.

// Each half needs to be wider than the widest screen, so short words repeat more.
const CHARS_PER_HALF = 48
// Seconds per character of travel; keeps every strip at the same speed.
const SECONDS_PER_CHAR = 1.4

export default function MarqueeDivider({
  word,
  reverse = false,
  className = "py-10",
}: {
  word: string
  reverse?: boolean
  className?: string
}) {
  const repeats = Math.ceil(CHARS_PER_HALF / word.length)
  const half = word.repeat(repeats)
  const duration = half.length * SECONDS_PER_CHAR

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <div
        className={`marquee-track flex w-max whitespace-nowrap text-[80px] md:text-[120px] font-bold opacity-10 ${reverse ? "marquee-reverse" : ""}`}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <span>{half}</span>
        <span>{half}</span>
      </div>
    </div>
  )
}
