"use client"

import { useEffect, useRef, useState } from "react"
import { Mic, MicOff } from "lucide-react"

// Minimal typings for the non-standard Web Speech API (not in lib.dom.d.ts)
interface SpeechRecognitionResultEvent extends Event {
  resultIndex: number
  results: {
    length: number
    item(index: number): { isFinal: boolean; 0: { transcript: string } }
    [index: number]: { isFinal: boolean; 0: { transcript: string } }
  }
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null
  onerror: (() => void) | null
  onend: (() => void) | null
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance
  }
}

interface VoiceTextareaProps {
  id: string
  name: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  rows?: number
}

export default function VoiceTextarea({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 5,
}: VoiceTextareaProps) {
  const [isSupported, setIsSupported] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const baseTextRef = useRef("")

  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
    setIsSupported(!!SpeechRecognitionAPI)
  }, [])

  const stopListening = () => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }

  const startListening = () => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognitionAPI) return

    baseTextRef.current = value ? `${value.trim()} ` : ""

    const recognition = new SpeechRecognitionAPI()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onresult = (event) => {
      let finalTranscript = ""
      let interimTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          finalTranscript += result[0].transcript
          baseTextRef.current += `${result[0].transcript} `
        } else {
          interimTranscript += result[0].transcript
        }
      }

      onChange(`${baseTextRef.current}${interimTranscript}`)
    }

    recognition.onerror = () => setIsListening(false)
    recognition.onend = () => setIsListening(false)

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop()
    }
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={id} className="block text-sm font-medium">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        {isSupported && (
          <button
            type="button"
            onClick={toggleListening}
            aria-pressed={isListening}
            title={isListening ? "Stop dictation" : "Speak instead of typing"}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              isListening
                ? "border-red-400/60 bg-red-400/10 text-red-300"
                : "border-[#252525] text-[#EAEFFF]/70 hover:border-[#EAEFFF]/50 hover:text-[#EAEFFF]"
            }`}
          >
            {isListening ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
                </span>
                Listening…
              </>
            ) : (
              <>
                <Mic className="h-3.5 w-3.5" />
                Speak
              </>
            )}
          </button>
        )}
      </div>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full px-4 py-3 bg-[#101010] border border-[#252525] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EAEFFF] focus:border-transparent transition-colors resize-none"
      />
    </div>
  )
}
