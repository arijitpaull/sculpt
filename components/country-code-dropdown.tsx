import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface CountryCode {
  code: string;
  country: string;
  flag: string;
}

const countryCodes: CountryCode[] = [
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+1', country: 'Canada', flag: '🇨🇦' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+7', country: 'Russia', flag: '🇷🇺' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+46', country: 'Sweden', flag: '🇸🇪' },
  { code: '+47', country: 'Norway', flag: '🇳🇴' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+48', country: 'Poland', flag: '🇵🇱' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+66', country: 'Thailand', flag: '🇹🇭' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭' },
  { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
  { code: '+20', country: 'Egypt', flag: '🇪🇬' },
];

interface CountryCodeDropdownProps {
  value: string;
  onChange: (code: string) => void;
  className?: string;
}

const CountryCodeDropdown: React.FC<CountryCodeDropdownProps> = ({
  value,
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customCode, setCustomCode] = useState('');
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Find selected country
  const selectedCountry = countryCodes.find((c) => c.code === value);

  // Filter countries based on search
  const filteredCountries = countryCodes.filter(
    (country) =>
      country.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery)
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
        setShowCustomInput(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update button position when dropdown opens
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSelect = (code: string) => {
    onChange(code);
    setIsOpen(false);
    setSearchQuery('');
    setShowCustomInput(false);
  };

  const handleCustomSubmit = () => {
    if (customCode.trim()) {
      const formattedCode = customCode.startsWith('+') ? customCode : `+${customCode}`;
      onChange(formattedCode);
      setCustomCode('');
      setShowCustomInput(false);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-[#151515] border border-[#252525] rounded-xl text-[#EAEFFF] text-left flex items-center justify-between hover:border-[#353535] transition-colors focus:outline-none focus:ring-2 focus:ring-[#EAEFFF]/20"
      >
        <span className="flex items-center gap-2">
          {selectedCountry ? (
            <>
              <span className="text-xl">{selectedCountry.flag}</span>
              <span className="font-medium">{selectedCountry.code}</span>
            </>
          ) : value ? (
            <span className="font-medium">{value}</span>
          ) : (
            <span className="text-[#EAEFFF]/60">Select code</span>
          )}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 text-[#EAEFFF]/60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      {/* Dropdown Menu - Portal */}
      {isOpen && buttonRect && typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: `${buttonRect.bottom + 8}px`,
              left: `${buttonRect.left}px`,
              width: `${buttonRect.width}px`,
              zIndex: 9999,
              maxHeight: '320px',
            }}
            className="bg-[#151515] border border-[#252525] rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="p-3 border-b border-[#252525]">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#EAEFFF]/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search country or code..."
                  className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-[#252525] rounded-lg text-[#EAEFFF] placeholder-[#EAEFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#EAEFFF]/20 focus:border-[#353535]"
                />
              </div>
            </div>

            {/* Custom Code Option */}
            {!showCustomInput ? (
              <button
                type="button"
                onClick={() => setShowCustomInput(true)}
                className="w-full px-4 py-3 text-left hover:bg-[#1a1a1a] transition-colors border-b border-[#252525] flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#252525] flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-[#EAEFFF]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-[#EAEFFF]">Custom Country Code</div>
                  <div className="text-xs text-[#EAEFFF]/60">Enter your own code</div>
                </div>
              </button>
            ) : (
              <div className="p-3 border-b border-[#252525] bg-[#1a1a1a]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customCode}
                    onChange={(e) => setCustomCode(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCustomSubmit()}
                    placeholder="e.g., +123"
                    className="flex-1 px-3 py-2 bg-[#151515] border border-[#252525] rounded-lg text-[#EAEFFF] placeholder-[#EAEFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#EAEFFF]/20 focus:border-[#353535]"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleCustomSubmit}
                    className="px-4 py-2 bg-[#EAEFFF] text-[#101010] rounded-lg hover:bg-[#EAEFFF]/90 transition-colors font-medium"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustomInput(false);
                      setCustomCode('');
                    }}
                    className="px-3 py-2 bg-[#252525] text-[#EAEFFF] rounded-lg hover:bg-[#353535] transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Country List */}
            <div className="max-h-48 overflow-y-auto custom-scrollbar">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country, index) => (
                  <button
                    key={`${country.code}-${country.country}-${index}`}
                    type="button"
                    onClick={() => handleSelect(country.code)}
                    className={`w-full px-4 py-3 text-left hover:bg-[#1a1a1a] transition-colors flex items-center gap-3 ${
                      value === country.code ? 'bg-[#1a1a1a]' : ''
                    }`}
                  >
                    <span className="text-2xl">{country.flag}</span>
                    <div className="flex-1">
                      <div className="text-[#EAEFFF] font-medium">{country.country}</div>
                      <div className="text-[#EAEFFF]/60 text-sm">{country.code}</div>
                    </div>
                    {value === country.code && (
                      <svg
                        className="w-5 h-5 text-[#EAEFFF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-[#EAEFFF]/60">
                  No countries found
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #151515;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #252525;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #353535;
        }
      `}</style>
    </div>
  );
};

export default CountryCodeDropdown;