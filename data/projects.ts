export interface Project {
  id: string
  title: string
  slug: string
  category: string
  description: string
  fullDescription: string
  image: string
  challenge: string
  solution: string
  results: string
  technologies: string[]
  testimonial: {
    quote: string
    author: string
  }
  gallery: string[]
  appStoreUrl?: string      
  playStoreUrl?: string     
  websiteUrl?: string 
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Mynd",
    slug: "mynd",
    category: "Health and mindfulness",
    description: "AI-powered therapy and journaling to support emotional wellbeing.",
    fullDescription:
      "Mynd is a mental health companion that combines AI therapy conversations, private journaling, and mood tracking in one secure app. Our goal was to offer a safe, accessible, and consistent form of emotional support to users who may not have access to traditional therapy.",
    image: "/images/mynd-thumbnail.png",
    challenge:
      "We aimed to make emotional support more accessible and judgment-free. Users often hesitate to seek therapy or don’t have the time or means. The challenge was to create something that felt safe, private, and emotionally responsive.",
    solution:
      "We built Mynd with a secure backend using Supabase and Hive for private storage. The app lets users journal and talk to a GPT-powered AI therapist. Emotional summaries and monthly insights help users understand their mood patterns. All interactions are encrypted and designed to feel supportive, not robotic.",
    results:
      "Users said Mynd helped them feel supported without the pressure of in-person therapy. Many found the AI conversations therapeutic and used the app daily to reflect. The insights led to a deeper understanding of their emotions and helped build a consistent journaling habit.",
    technologies: ["Flutter", "OpenAI API", "Supabase", "Hive", "Dart"],
    testimonial: {
      quote:
        "Using Mynd has become part of my nightly routine. I get to express myself, reflect, and even get support when I feel low—all without needing to wait for a therapy session.",
      author: "Aarav D., User"
    },
    playStoreUrl:"https://play.google.com/store/apps/details?id=com.mycompany.mynd&ref=producthunt" ,
    gallery: [
      "/images/my_banner.png",
      "/images/my_ss1.png",
      "/images/my_ss2.png",
      "/images/my_ss3.png"
    ]
  },
  {
    id: "2",
    title: "Medi Hydrate",
    slug: "medi-hydrate",
    category: "Health and Lifestyle",
    description: "Smart medicine and hydration tracker for better daily wellness.",
    fullDescription:
      "Medi Hydrate is a health companion designed to keep users consistent with their medication and hydration habits. With a focus on simplicity and precision, the app helps users track medicine doses and water intake while offering intelligent reminders.",
    image: "/images/medihydrate-thumbnail.png",
    challenge:
      "We observed that users often forget to take their medicine or drink enough water—especially with busy routines. Building an app that handled both needs seamlessly, without clutter or stress, was the main goal.",
    solution:
      "We built Medi Hydrate with a dual-focus dashboard. Users can add medications, configure custom reminders, and log doses. A water tracking module calculates ideal hydration based on health data and offers timely nudges. Notifications were handled using a custom plugin for reliability across devices.",
    results:
      "Users found Medi Hydrate to be a major productivity booster for health. It helped build consistent wellness habits, and clients reported fewer missed doses and improved hydration within the first few weeks of use.",
    technologies: ["Flutter", "Hive", "Firebase", "Dart", "Notifications Plugin"],
    testimonial: {
      quote:
        "Really helpful app! It's easy to use and a great reminder to stay hydrated, especially during busy days.",
      author: "Abhay S., User"
    },
    gallery: [
      "/images/mh_banner.png",
      "/images/mh_ss1.png",
      "/images/mh_ss2.png",
      "/images/mh_ss3.png"
    ]
  },
  {
    id: "3",
    title: "Charmify",
    slug: "charmify",
    category: "Dating",
    description: "AI-powered texting assistant and dating coach to level up your dating game.",
    fullDescription:
      "Charmify is an AI-driven dating assistant designed to help users navigate the early stages of conversation and dating with confidence. The app suggests responses based on context, tone, and even profile screenshots, while also generating pickup lines and icebreakers tailored to unique personalities and scenarios.",
    image: "/images/charmify-thumbnail.png",
    challenge:
      "We noticed that users often felt overwhelmed when texting during early dating stages—unsure what to say or how to keep the momentum going. Creating a system that could personalize replies while feeling human and timely was key.",
    solution:
      "We built a clean, chat-focused interface powered by OpenAI that analyzes chat context in real time and delivers smart, witty suggestions. Users can input screenshots or conversation cues, and Charmify delivers appropriate responses or icebreakers. RevenueCat was integrated for in-app purchases and subscription handling.",
    results:
      "Beta testers reported feeling more confident and relaxed in their interactions. Many shared that conversations flowed more naturally with Charmify’s suggestions, and they even looked forward to chatting more frequently.",
    technologies: ["Flutter", "OpenAI API", "Revenuecat", "Hive", "Dart"],
    testimonial: {
      quote:
        "I used to stare at my phone for ages not knowing what to reply. Now with Charmify, I actually enjoy texting—it feels smooth, natural, and even fun.",
      author: "Ananya R., Beta Tester"
    },
    appStoreUrl:"https://apps.apple.com/in/app/charmify-dating-coach/id6743173949" ,
    playStoreUrl:"https://play.google.com/store/apps/details?id=com.sculpt.charmify&ref=producthunt" ,
    gallery: [
      "/images/ch_banner.png",
      "/images/ch_ss1.png",
      "/images/ch_ss2.png",
      "/images/ch_ss3.png"
    ]
  },
  {
    id: "4",
    title: "Woque",
    slug: "woque",
    category: "Lifestyle",
    description: "Daily journaling questions that help you reflect, grow, and track your emotional journey.",
    fullDescription:
      "Woque is a guided journaling and reflection app designed to help users grow through consistency and introspection. Each day, the app asks one thoughtful question. A year later, the same prompt resurfaces so users can compare how they've changed. It features Mistral AI-powered growth insights, mood tracking, and streak-based rewards.",
    image: "/images/woque-thumbnail.png",
    challenge:
      "Many people struggle with journaling consistency, and most apps don’t offer meaningful progression or self-comparison. We aimed to build something simple but emotionally intelligent—something that encourages growth.",
    solution:
      "We created a clean journaling experience with a futuristic AI-driven engine. Daily questions are carefully crafted, and mood tracking is built into the flow. Over time, Woque visualizes emotional patterns and presents old responses for self-comparison. Users are rewarded for streaks with collectible characters to gamify the habit.",
    results:
      "Woque was warmly received by early adopters. They appreciated the simplicity, enjoyed the mood tracking, and felt more self-aware as they compared responses year-over-year. Many said it finally made journaling a fun, rewarding habit.",
    technologies: ["Flutter", "Mistral AI", "Hive", "Dart"],
    testimonial: {
      quote:
        "Woque turned journaling from a chore into something I look forward to every night. Seeing my old answers and how I’ve changed is genuinely eye-opening.",
      author: "Nikita A., Early User"
    },
    appStoreUrl:"https://apps.apple.com/in/app/woque-know-yourself/id6745866800" ,
    gallery: [
      "/images/wq_banner.png",
      "/images/wq_ss1.png",
      "/images/wq_ss2.png",
      "/images/wq_ss3.png"
    ]
  },
  
  {
    id: "5",
    title: "IoT Weather Integration with Thinger.io",
    slug: "thinger-weather-iot",
    category: "IoT & Automation",
    description: "Real-time weather data delivery to 100+ IoT devices using Thinger.io, Python, and AWS.",
    fullDescription:
      "This project involved enabling seamless weather data delivery to ESP32-based IoT devices for a client in Greece. Initially, the devices were integrated with Thinger.io—a no-code IoT platform compatible with the hardware. Without prior experience on Thinger.io, a proof-of-concept was developed in under 15 days, where weather data from an external API was fetched using the platform’s endpoints and Postman testing. The second phase focused on scaling this setup to over 100 devices, each with unique IDs and location parameters. A Python script was built to fetch weather data from OpenWeatherMap every 30 minutes and send it to all active devices, with AWS hosting ensuring 24/7 uptime without interruptions.",
    image: "/images/thinger-thumbnail.png",
    challenge:
      "The challenge was twofold: first, quickly learning and adapting to Thinger.io's limitations with a non-premium account, and second, scaling the weather delivery system to 100+ devices with unique location-based requests. The free deployment platforms tested—such as Render and GitHub Actions—caused interruptions or delays, resulting in inconsistent device data. Finding a hosting solution that could handle continuous execution without failure was crucial.",
    solution:
      "A phased approach was implemented. The proof-of-concept was built entirely within Thinger.io, utilizing its API endpoints to fetch external weather data. Once the scaling requirement emerged, the approach shifted to a dedicated Python backend. The script pulled weather data from OpenWeatherMap’s API based on each device's registered location, then pushed the data to the devices every 30 minutes. AWS EC2 was selected for deployment to ensure uninterrupted, high-frequency data delivery.",
    results:
      "The client received a stable, scalable, and maintenance-friendly solution that ensured real-time weather data delivery to all devices without downtime. The AWS-hosted Python system has been running smoothly, supporting future expansion beyond the initial 100 devices.",
    technologies: ["Thinger.io", "ESP32", "Python", "AWS EC2", "OpenWeatherMap API", "Postman"],
    testimonial: {
      quote:
        "Excellent job, in time with the right price ! We are going to have many more projects !",
      author: "@lighthousesolar"
    },
    gallery: [
      "/images/thng_banner.png",
      "/images/thng_ss1.png",
      "/images/thng_ss2.png",
      "/images/thng_ss3.png"
    ]
  },
  {
    id: "6",
    title: "Dakkapel Offerte",
    slug: "dakkapel-offerte",
    category: "Utilities",
    description: "A precise roof angle measurement and renovation request app built for Dakkapel Fabriek in the Netherlands.",
    fullDescription:
      "Dakkapel Offerte is a utility app developed for Dakkapel Fabriek, a Dutch company specializing in roof renovations. The app leverages phone sensors to calculate the roof’s angle in real-time and lets users send a full renovation request—complete with project details, address, angle data (manual, normal, or AR mode), and attic images—to the company via email. It’s designed to streamline appointment booking and eliminate the need for initial site visits.",
    image: "/images/dakkapel-thumbnail.png",
    challenge:
      "Capturing accurate roof angles using phone sensors proved to be a complex challenge. We had to ensure the angle readings remained stable and unaffected by unintended phone movements or shaking. Creating a real-time dynamic protractor and ensuring accurate calibration required extensive experimentation with various Flutter sensor packages.",
    solution:
      "We built a lightweight interface that offered three measurement modes: sensor-based, AR-assisted, and manual. A visual protractor displayed an animated arrow that reacted to device tilt in real time. We implemented filtering techniques and custom calibration logic to lock angles accurately. Once the data was captured, all project details—including images and user info—were sent to the company via SMTP, automating the renovation inquiry process.",
    results:
      "The app helped Dakkapel Fabriek drastically reduce lead friction. Customers were now able to send accurate, visual, and structured requests without the need for an in-person assessment. The company's internal workflow benefited from faster data collection, and the app became an effective bridge between offline renovation work and online lead generation.",
    technologies: ["Flutter", "Dart", "Device Sensors", "SMTP", "AR Mode"],
    testimonial: {
      quote:
        "The combination of ease of use and a sleek, professional design makes the final product truly outstanding.",
      author: "Aria, Dakkapel Fabriek"
    },
    gallery: [
      "/images/do_banner.png",
      "/images/do_ss1.png",
      "/images/do_ss2.png",
      "/images/do_ss3.png"
    ]
  },
  {
    id: "7",
    title: "Funutrition",
    slug: "funutrition",
    category: "Education",
    description: "A child-friendly app to track food, water, mood, and daily activities with full parental and admin supervision.",
    fullDescription:
      "Funutrition is a complete wellness and learning tracker designed for children. The app enables young users to log meals, water intake, moods, and physical activity in a playful, easy-to-use environment. Parents get access to a unified dashboard to monitor their child’s progress, while admins can manage lessons, upload challenges, and send personalized wellness plans. The system supports image uploads for completed tasks and ensures secure data handling using robust backend architecture.",
    image: "/images/funutrition-thumbnail.png",
    challenge:
      "We had to design an interface that appealed to children while integrating complex backend functionality for multiple user roles (children, parents, admins). Managing secure authentication, role-based permissions, and real-time media uploads—while keeping the experience smooth—posed significant architectural challenges. Calibrating Supabase triggers and policies for this multi-flow environment required detailed attention.",
    solution:
      "We created a vibrant, structured app interface tailored to young audiences while ensuring admins and parents had complete control and visibility. The backend was powered by Supabase and Hive, supporting features like streak tracking, media uploads, and real-time monitoring. We integrated over 200 pre-designed AI-generated lessons and 40+ gamified challenges. Admins could view logs, send personalized plans, and manage submissions from a unified backend interface.",
    results:
      "The app received positive feedback from both users and the client. Parents loved the clarity and oversight it provided, while children enjoyed the interactive challenges. The admin dashboard streamlined lesson management and communication. The app was praised for its structure, ease of use, and visual appeal. The client plans to expand the offering with family plans and gamified learning modules.",
    technologies: ["Flutter", "Supabase", "Hive", "Dart"],
    testimonial: {
      quote:
        "Looks promising! Great work so far man.",
      author: "Anurag Sharma, Arctic Bee"
    },
    appStoreUrl:"https://apps.apple.com/in/app/funutrition-meals-learning/id6751509563" ,
    playStoreUrl:"https://play.google.com/store/apps/details?id=com.sculpt.funutrition" ,
    gallery: [
      "/images/fn_banner.png",
      "/images/fn_ss1.png",
      "/images/fn_ss2.png",
      "/images/fn_ss3.png"
    ]
  }
]
