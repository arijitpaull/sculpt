import React from 'react';
import mediHydrateBg from '../images/medi_hydrate_bg.png';
import myndBg from '../images/mynd_bg.png';

const projects = [
  {
    title: 'Medi Hydrate',
    description: 'A mobile app for tracking and setting medicine and hydration alerts.',
    image: mediHydrateBg,
    link: 'https://play.google.com/store/apps/details?id=com.premnaren.medi_hydrate', // Add link here
  },
  {
    title: 'mynd - Journaling and AI Therapy',
    description: 'Flutter based platform for journaling and AI therapeutic conversations.',
    image: myndBg,
    link: 'https://play.google.com/store/apps/details?id=com.mycompany.mynd', // Add link here
  },
  
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-white dark:bg-[#151515]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 text-center animate-fade-in">Featured Projects</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl animate-scale"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white/80">{project.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
