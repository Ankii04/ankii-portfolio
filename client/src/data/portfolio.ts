export const portfolioData = {
  name: "Ankit Kumar",
  title: "Full Stack Web Developer",
  email: "ankitkr1841@gmail.com",
  phone: "+91 9279954924",
  location: "Patna, Bihar",
  github: "ankii04",
  linkedin: "ankii04",
  objective:
    "Aspiring full-stack web developer with a strong foundation in computer science and hands-on experience in both frontend and backend development. Passionate about creating scalable, user-friendly web applications using modern tools and frameworks. Always eager to learn, build, and innovate in the tech space.",

  education: [
    {
      degree: "Bachelor of Technology",
      field: "Computer Science Engineering",
      school: "Lovely Professional University – Phagwara, Punjab",
      duration: "Aug 23 - Present",
      cgpa: "7.64",
    },
    {
      degree: "Higher Secondary Certificate",
      field: "12th Grade",
      school: "Eklavya Educational Complex – Patna, Bihar",
      duration: "Apr 22 - Feb 23",
      percentage: "70%",
    },
    {
      degree: "Secondary School Certificate",
      field: "10th Grade",
      school: "Eklavya Educational Complex – Patna, Bihar",
      duration: "Apr 20 - Feb 21",
      percentage: "74%",
    },
  ],

  skills: {
    frontend: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Redux", "React Router"],
    programmingLanguages: ["C", "C++", "Java", "Python", "JavaScript", "PHP"],
    frameworks: ["React.js", "Next.js", "Express.js", "Node.js"],
    database: ["Node.js", "Express.js", "MongoDB", "MySQL"],
    tools: ["Git", "GitHub", "VS Code", "Postman", "Figma"],
    soft: ["Team Management", "Quick Learner", "Problem Solving", "Project Management"],
  },

  projects: [
    {
      title: "File Recovery System",
      description:
        "A web-based file management system built using Flask that allows users to upload and manage files efficiently with a distributed file system for storage.",
      features: [
        "User-friendly file upload and recovery system",
        "Organized Distributed File System to manage uploaded files",
        "File operations: upload, list, delete, rename, restore",
        "Trash folder management for deleted files",
        "Debug mode for easy development",
      ],
      tech: ["Python", "Flask", "HTML", "CSS", "JavaScript", "File System"],
      highlights: "Clean architecture with virtual environment support and clear directory structure",
      github: "https://github.com/Ankii04/File-Recovery-System",
      demo: "https://file-recovery-system.vercel.app/",
      image: "/projects/file-recovery-system.png",
    },
    {
      title: "AI Medication Reminder Chatbot",
      description:
        "An intelligent chatbot application that helps users set medication reminders through natural language conversations with SMS notifications.",
      features: [
        "Natural language chat interface for setting reminders",
        "Automatic extraction of medication names, times, and frequencies",
        "SMS notifications via Twilio integration",
        "Clean and modern UI built with React and Tailwind CSS",
        "Real-time reminder list display",
      ],
      tech: ["Python", "React", "Tailwind CSS", "Google Gemini API", "Twilio", "Flask"],
      highlights: "AI-powered medication management with seamless user experience",
      github: "https://github.com/Ankii04/Ai-Medication-Reminder-Chatbot",
      demo: "",
      image: "/projects/medication-chatbot.png",
    },
    {
      title: "Expense Sharing Website",
      description:
        "A modern full-stack web application for sharing expenses among friends and groups, built with PHP, MySQL, HTML, CSS, and JavaScript.",
      features: [
        "Implemented Google OAuth for secure authentication",
        "Razorpay integration for payment processing",
        "Created and managing expense groups",
        "Automatic expense splitting",
        "Real-time balance calculations",
      ],
      tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Google OAuth", "Razorpay"],
      highlights: "Responsive UI with interactive notifications and robust form validation",
      github: "https://github.com/Ankii04/Expense-Sharing-Website",
      demo: "",
      image: "/projects/expense-sharing.png",
    },
  ],

  certifications: [
    "Data Structures and Algorithms Certification – NeoColab, 2024",
    "Coursera – HKU, 2024",
    "The Bits and Bytes of Computer Networking Certificate – Google Sept 2024",
    "NPTEL Certification in Cloud Computing – Elite Category, issued by IIT Kharagpur, April 2025",
    "C++ Programming Certificate – NeoColab, Dec 2024",
  ],

  events: [
    "HackQuest 24-Hour CTF Challenge Participant – Event Convocation 2024, Intra-University Tech Fusion (April 2024)",
    "Attended 24-Hour Web Hackathon - BinaryBlitz Achievement Certificate-Coding Ninja Lpu",
    "Attended Web Development Workshop, learning HTML, CSS, and JavaScript fundamentals",
  ],

  stats: {
    technologies: 12,
    yearsExperience: 1,
    projectsBuilt: 5,
    coffeeConsumed: "∞",
  },
};
