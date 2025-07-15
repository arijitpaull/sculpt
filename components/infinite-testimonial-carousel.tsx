import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
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
    name: "@lighthousesolar 🇬🇷",
    role: "Client, Fiverr",
    content: "Excellent job !",
  },
  {
    id: "4",
    name: "Anurag Sharma 🇬🇧",
    role: "Marketing manager, Arctic Bee",
    content: "Looks promising ! Great work so far man.",
  },
  {
    id: "5",
    name: "@lighthousesolar 🇬🇷",
    role: "Client, Fiverr",
    content: "Excellent job, in time with the right price ! We are going to have many more projects !",
  },
  {
    id: "6",
    name: "Aria 🇳🇱",
    role: "Client, Dakkapel Fabriek",
    content: "We had a mobile app developed and are extremely satisfied with the result. The app is not only highly functional and works exactly as intended, but it’s also beautifully designed from the start. Highly recommended!",
  },
  {
    id: "7",
    name: "Tanya Singh 🇮🇳",
    role: "Client",
    content: "Great experience! Fixed all bugs quickly and gave the app a clean, modern design. Very professional and responsive. Highly recommend!",
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  // Split role into tags if comma-separated
  const tags = testimonial.role.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

  return (
    <div className="flex-shrink-0 w-80 bg-[#151515] border border-[#252525] rounded-2xl p-6 mx-4">
      <div className="mb-4">
        <p className="text-[#EAEFFF] leading-relaxed">"{testimonial.content}"</p>
      </div>
      <div>
        <p className="font-medium text-[#EAEFFF] mb-2">{testimonial.name}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-[#252525] text-[#EAEFFF]/80 text-xs rounded-full border border-[#353535] whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const InfiniteTestimonialCarousel = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Reverse the order so newest (last) testimonials appear first
  const reversedTestimonials = [...testimonials].reverse();
  
  // Create duplicated arrays for seamless infinite scroll
  const duplicatedTestimonials = [...reversedTestimonials, ...reversedTestimonials];

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Use a much simpler approach for infinite scroll
    let currentPosition = 0;
    const speed = 0.3;

    const animate = () => {
      currentPosition -= speed;
      
      // Get the width of the scroller container
      const scrollerWidth = scroller.scrollWidth / 2; // Divide by 2 because we duplicated
      
      // Reset when we've moved one full set
      if (Math.abs(currentPosition) >= scrollerWidth) {
        currentPosition = 0;
      }
      
      scroller.style.transform = `translateX(${currentPosition}px)`;
      requestAnimationFrame(animate);
    };

    // Start after a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      animate();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden bg-[#101010] py-12">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-[#EAEFFF]">Client Testimonials</h2>
            <p className="text-lg opacity-70 text-[#EAEFFF]">What our clients say about working with us.</p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="https://g.page/r/CdL3ncLslU_kEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-[#EAEFFF] px-6 py-3 rounded-full hover:bg-[#EAEFFF] hover:text-[#101010] transition-colors text-lg font-medium text-[#EAEFFF]"
            >
              <svg
                className="mr-3 h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Leave a Review
            </a>
          </div>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#101010] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#101010] to-transparent z-10 pointer-events-none" />
        
        <div
          ref={scrollerRef}
          className="flex transition-transform ease-linear"
          style={{ width: 'fit-content' }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={`${testimonial.id}-${index}`} 
              testimonial={testimonial} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteTestimonialCarousel;