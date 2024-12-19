import React from 'react';
import { Smartphone, Globe, Palette, Cloud } from 'lucide-react';

const services = [
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: 'Cross-platform Apps',
    description: 'Native-quality applications that work seamlessly across iOS and Android platforms.'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Website Development',
    description: 'Responsive, fast, and modern websites built with cutting-edge technologies.'
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: 'Logo Design',
    description: 'Unique and memorable brand identities that capture your essence.'
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: 'Deployment & Maintenance',
    description: 'Reliable hosting solutions and continuous support for your digital products.'
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 text-center animate-fade-in">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-white dark:bg-[#151515] hover:transform hover:-translate-y-2 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mb-4 text-[#000000] dark:text-[#FFFFFF] animate-bounce-in" style={{ animationDelay: `${index * 0.2 + 0.3}s` }}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="opacity-75">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};