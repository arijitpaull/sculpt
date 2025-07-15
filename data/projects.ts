export interface Project {
  id: string
  title: string
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
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Charmify",
    category: "Dating",
    description: "AI-powered texting assistant and dating coach to level up your dating game.",
    fullDescription:
      "Charmify is an AI-driven dating assistant designed to help users confidently handle texting and dating conversations. It suggests replies based on message context, personality traits, and even profile screenshots. It also generates pickup lines and icebreakers tailored to different personalities and dating scenarios.",
    image: "/images/charmify-thumbnail.png",
    challenge:
      "Texting during early dating stages can be stressful—users often struggle with what to say, how to keep conversations going, or how to make a memorable first impression.",
    solution:
      "Charmify analyzes chats and dating profiles to provide context-aware, witty, and relevant reply suggestions, as well as personalized icebreakers. It's like having a dating coach and texting assistant in your pocket.",
    results:
      "Early users report that Charmify’s suggestions helped them feel more confident and keep conversations flowing naturally. Many found the icebreakers and replies to be fun, timely, and surprisingly effective.",
    technologies: ["Flutter", "OpenAI API", "Revenuecat", "Hive", "Dart"],
    testimonial: {
      quote:
        "I used to stare at my phone for ages not knowing what to reply. Now with Charmify, I actually enjoy texting—it feels smooth, natural, and even fun.",
      author: "Ananya R., beta tester"
    },
    gallery: [
      "/images/ch_banner.png",
      "/images/ch_ss1.png",
      "/images/ch_ss2.png",
      "/images/ch_ss3.png"
    ]
  }
  ,{
    id: "2",
    title: "Woque",
    category: "Lifestyle",
    description: "Daily journaling questions that help you reflect, grow, and track your emotional journey.",
    fullDescription:
      "Woque is a self-reflection and journaling app that asks you one thought-provoking question every day. On the same date the following year, the same question reappears—so you can compare your past and present answers and witness your personal growth. With built-in mood tracking, streak rewards in the form of collectible characters, and Mistral AI-powered growth insights, Woque turns journaling into a powerful, gamified habit.",
    image: "/images/woque-thumbnail.png",
    challenge:
      "People often struggle with consistent journaling, lose motivation over time, or don’t know what to write about. Most apps lack a sense of progression or self-comparison that reflects personal development meaningfully.",
    solution:
      "Woque simplifies journaling with one unique daily prompt and makes reflection engaging with a futuristic AI-driven analysis engine. Mood tracking visualizes emotional patterns, and users unlock fun characters by maintaining journaling streaks—adding both purpose and joy to the process.",
    results:
      "Users who journaled regularly with Woque found it easier to stay consistent and introspective. Many appreciated seeing emotional patterns and past answers, noting an improved sense of self-awareness over time.",
    technologies: ["Flutter", "Mistral AI", "Hive", "Dart"],
    testimonial: {
      quote:
        "Woque turned journaling from a chore into something I look forward to every night. Seeing my old answers and how I’ve changed is genuinely eye-opening.",
      author: "Nikita A., Early User"
    },
    gallery: [
      "/images/wq_banner.png",
      "/images/wq_ss1.png",
      "/images/wq_ss2.png",
      "/images/wq_ss3.png"
    ]
  }
  ,
  {
    id: "3",
    title: "Mynd",
    category: "Health and mindfulness",
    description: "AI-powered therapy and journaling to support emotional wellbeing.",
    fullDescription:
      "Mynd is a mental wellness app that offers users an AI therapy experience through conversations. It allows users to journal, talk to a compassionate AI therapist, and get emotional insight. Powered by OpenAI on the backend and integrated with Supabase and Hive for secure data storage, Mynd is designed to make mental health support more accessible and private. It also generates mood analysis and monthly summaries based on journal entries.",
    image: "/images/mynd-thumbnail.png",
    challenge:
      "Mental health support is expensive, often inaccessible, and people struggle to find safe spaces for consistent self-expression and emotional clarity.",
    solution:
      "Mynd bridges the gap between traditional therapy and daily emotional needs by providing a private, AI-powered therapist available anytime. Users can journal, converse, and receive emotional summaries and insights, helping them manage their feelings better and track progress over time.",
    results:
      "Users shared that Mynd helped them feel heard and supported without judgment. The journaling feature combined with mood tracking encouraged consistent self-reflection, and the AI therapist provided a safe space to talk through tough emotions.",
    technologies: ["Flutter", "OpenAI API", "Supabase", "Hive", "Dart"],
    testimonial: {
      quote:
        "Using Mynd has become part of my nightly routine. I get to express myself, reflect, and even get support when I feel low—all without needing to wait for a therapy session.",
      author: "Aarav D., User"
    },
    gallery: [
      "/images/my_banner.png",
      "/images/my_ss1.png",
      "/images/my_ss2.png",
      "/images/my_ss3.png"
    ]
  },{
    id: "4",
    title: "Medi Hydrate",
    category: "Health and Lifestyle",
    description: "Smart medicine and hydration tracker for better daily wellness.",
    fullDescription:
      "Medi Hydrate is a dual-purpose health tracking app that helps users stay consistent with their medication and hydration routines. Users can add medicines, set custom reminders by date and interval, and view upcoming doses in a clean, organized interface. The app also includes a water tracking feature that calculates ideal daily intake based on the user's health profile and sends timely reminders to stay hydrated.",
    image: "/images/medihydrate-thumbnail.png",
    challenge:
      "Forgetting to take medication or stay hydrated is a common issue, especially for people with busy schedules or chronic conditions. Most apps either focus on one or the other, making it inconvenient for users to manage both in one place.",
    solution:
      "Medi Hydrate combines medicine scheduling and water intake tracking into a single, easy-to-use app. With customizable reminders and clean visuals, it helps users maintain health routines without the stress of remembering every detail themselves.",
    results:
      "Users found Medi Hydrate helpful in building consistent habits for medicine adherence and hydration. The personalized reminders led to fewer missed doses and improved daily water intake patterns.",
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
    id: "5",
    title: "Dakkapel Offerte",
    category: "Utilities",
    description: "A precise roof angle measurement and renovation request app built for Dakkapel Fabriek in the Netherlands.",
    fullDescription:
      "Dakkapel Offerte is a utility app developed for Dakkapel Fabriek, a Dutch company specializing in roof renovations. The app leverages phone sensors to calculate the roof’s angle in real-time and lets users send a full renovation request—complete with project details, address, angle data (manual, normal, or AR mode), and attic images—to the company via email. It’s designed to streamline appointment booking and eliminate the need for initial site visits.",
    image: "/images/dakkapel-thumbnail.png",
    challenge:
      "Capturing the roof angle accurately using the phone's sensors was the toughest challenge. Making sure the reading stayed consistent without fluctuating due to unwanted phone movement or shaky hands required a lot of experimentation. Implementing a visual protractor with a dynamic arrow that reflected real-time angle changes further added to the complexity. Calibrating the sensor to lock in stable values demanded trial-and-error across multiple Flutter packages.",
    solution:
      "I developed a clean, intuitive interface with three modes of angle entry: sensor-based, AR-assisted, and manual. A custom-built protractor UI displayed a real-time arrow indicating the roof angle based on sensor orientation. To ensure angle stability, I experimented with filtering and calibration techniques across several device orientations. Project submissions—including user info, angle values, and up to 3 attic photos—were sent directly to the company’s email using SMTP integration, automating the appointment request process.",
    results:
      "The app drastically improved the client's lead intake workflow, allowing customers to send accurate project details remotely. Dakkapel Fabriek reported better engagement and fewer scheduling hassles since the angle readings came in with context-rich project information. Despite being a niche use-case app, it stood out due to its precision and thoughtful user experience.",
    technologies: ["Flutter", "Dart", "Device Sensors", "SMTP", "AR Mode"],
    testimonial: {
      quote:
        "The combination of ease of use and a sleek, professional design makes the final product truly outstanding.",
      author: "Aria, Dakkapel Fabbriek"
    },
    gallery: [
      "/images/do_banner.png",
      "/images/do_ss1.png",
      "/images/do_ss2.png",
      "/images/do_ss3.png"
    ]
  },
  {
    id: "6",
    title: "Funutrition",
    category: "Education",
    description: "A child-friendly app to track food, water, mood, and daily activities with full parental and admin supervision.",
    fullDescription:
      "Funutrition is a complete wellness and learning tracker designed for children. The app helps young users log meals, water intake, moods, and physical activities in a fun, engaging way. It also offers a portal for parents to track everything in one place and for admins to monitor data, assign lessons and challenges, and upload recipes or custom plans for each child. Admins can respond to user requests, issue personalized nutrition quotes, and view uploaded challenge proofs submitted by children—all stored securely through a sophisticated database and storage system.",
    image: "/images/funutrition-thumbnail.png",
    challenge:
      "Designing an engaging, child-friendly experience that integrates multiple complex features like custom lesson uploads, secure photo storage, mood/activity tracking, and role-based dashboards for parents and admins. Database architecture had to support authentication, permissions, media uploads, and custom workflows across multiple user roles.",
    solution:
      "I designed and developed Funutrition with a playful yet structured UI, ensuring it appealed to children while maintaining clarity for parents and admins. The app incorporated 200+ AI-generated lessons and 40+ unique challenges. Admins could upload content, track responses, and send custom plans, while users could log habits, upload proof-of-completion images, and receive personalized responses. I used Supabase for database logic, policies, and storage buckets, ensuring fast, secure operations and seamless integration of media handling with user actions.",
    results:
      "The client was extremely satisfied with the polished architecture and smooth UX of the app. They praised how child-friendly the interface turned out while also being feature-rich for admins. The use of AI-generated media saved significant time. The structured database and clean UI received great feedback during initial trials, leading the client to greenlight future enhancements, including gamification and multi-child family support.",
    technologies: ["Flutter", "Supabase", "Hive", "Dart", "AI Media Tools"],
    testimonial: {
      quote:
        "Looks promising ! Great work so far man.",
      author: "Anurag Sharma, Arctic Bee"
    },
    gallery: [
      "/images/fn_banner.png",
      "/images/fn_ss1.png",
      "/images/fn_ss2.png",
      "/images/fn_ss3.png"
    ]
  },
]
