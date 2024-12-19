import React from 'react';

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center">
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        style={{ filter: 'grayscale(100%)' }}
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-lines-forming-a-human-profile-8244-large.mp4" type="video/mp4" />
      </video>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            We Develop.<br />
            We Sculpt.
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
            Transforming ideas into exceptional digital experiences through innovative development and design solutions.
          </p>
          <a 
            href="#contact"
            className="inline-block bg-[#000000] dark:bg-[#FFFFFF] text-white dark:text-[#101010] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors animate-fade-in"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
};