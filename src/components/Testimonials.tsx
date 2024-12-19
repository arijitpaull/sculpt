import React from 'react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart',
    content: 'SCULPT transformed our vision into reality. Their attention to detail and technical expertise is unmatched.'
  },
  {
    name: 'Michael Chen',
    role: 'Founder, InnovateLab',
    content: 'Working with SCULPT was a game-changer for our startup. They delivered beyond our expectations.'
  },
  {
    name: 'Emma Williams',
    role: 'CTO, FinTech Solutions',
    content: 'The team at SCULPT brings both creativity and technical excellence to every project.'
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 text-center animate-fade-in">Client Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-white dark:bg-[#151515] animate-slide-in-right"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mb-4">
                <h3 className="font-bold text-lg">{testimonial.name}</h3>
                <p className="text-sm opacity-75">{testimonial.role}</p>
              </div>
              <p className="italic opacity-90">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};