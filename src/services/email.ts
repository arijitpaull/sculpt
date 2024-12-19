import emailjs from '@emailjs/browser';

// Replace these with your actual EmailJS credentials
const SERVICE_ID = 'service_v3cu3x2';
const TEMPLATE_ID = 'template_m8jczss';
const PUBLIC_KEY = 'CsG8YKeq43C8CxPub';

export interface EmailData {
  name: string;
  email: string;
  services: string[];
  message: string;
}

export const sendEmail = async (data: EmailData): Promise<void> => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: data.name,
        from_email: data.email,
        services: data.services.join(', '),
        message: data.message,
      },
      PUBLIC_KEY
    );

    if (response.status !== 200) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};