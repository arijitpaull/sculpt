import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { sendEmail } from '../services/email';

const services = [
  'Cross-platform Apps',
  'Website Development',
  'Logo Design',
  'Deployment & Maintenance'
];

interface FormData {
  name: string;
  email: string;
  services: string[];
  message: string;
}

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    services: [],
    message: ''
  });

  const handleServicesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData({ ...formData, services: selectedOptions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendEmail(formData);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', services: [], message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-[#151515]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 text-center animate-fade-in">Start Your Project</h2>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-[#EAEFFF] dark:bg-[#101010] border border-gray-300 dark:border-gray-700"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-[#EAEFFF] dark:bg-[#101010] border border-gray-300 dark:border-gray-700"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Services (Hold Ctrl/Cmd to select multiple)</label>
              <select
                multiple
                value={formData.services}
                onChange={handleServicesChange}
                className="w-full px-4 py-3 rounded-lg bg-[#EAEFFF] dark:bg-[#101010] border border-gray-300 dark:border-gray-700"
                required
                size={4}
              >
                {services.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold">Project Details</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-[#EAEFFF] dark:bg-[#101010] border border-gray-300 dark:border-gray-700"
                rows={6}
                required
              ></textarea>
            </div>
            <button
  type="submit"
  disabled={isSubmitting}
  className="w-full bg-[#000000] dark:bg-[#FFFFFF] text-white dark:text-[#101010] py-3 rounded-lg font-semibold hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
>
  {isSubmitting ? (
    <svg
      className="animate-spin h-5 w-5 text-white dark:text-[#101010]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l1.707-1.707A1 1 0 007 15H1a1 1 0 00-.707 1.707l1.707 1.707A8.014 8.014 0 006 17.291z"
      ></path>
    </svg>
  ) : (
    'Send Message'
  )}
</button>

          </form>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </section>
  );
};