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
            cgpa: "7.89",
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
            title: "CineScope - Movie & TV Discovery Hub",
            description:
                "A premium, performance-optimized movie discovery platform designed for film lovers to explore trending movies and TV shows. Features a stunning glassmorphism UI with intelligent search capabilities and real-time performance tracking.",
            features: [
                "Access to millions of movies and TV shows via the TMDB API integration",
                "Intelligent search with 300ms debounce to optimize network performance",
                "High-performance infinite scrolling with 200ms throttling for smooth discovery",
                "Advanced filtering by genre, release year, and sort criteria (popularity, rating, etc.)",
                "Dynamic performance metrics dashboard tracking API calls and efficiency gains",
                "Rich content pages with YouTube trailers, cast info, and contextual recommendations",
                "Persistent watchlist functionality using localStorage for localized data storage",
                "Robust network layer with auto-retry mechanisms and exponential backoff",
            ],
            tech: ["HTML5", "CSS3", "JavaScript", "TMDB API", "Font Awesome", "GitHub Pages"],
            highlights: "Demonstrates advanced JS performance optimization (Throttle/Debounce) and premium glassmorphism design aesthetics",
            github: "https://github.com/Ankii04/CineScope",
            demo: "https://ankii04.github.io/CineScope/",
            image: "/projects/CineScope.png",

        },
        {
            title: "Cookiify - Recipe Sharing Platform",
            description:
                "A vibrant, full-stack recipe-sharing platform designed for home chefs to discover, share, and rate culinary creations from around the world. Features a vast library of recipes with advanced search and filtering capabilities.",
            features: [
                "Access to thousands of recipes from diverse global cuisines",
                "Dynamic search and filtering by category, cuisine, and dietary preferences",
                "User authentication system for sharing personal recipes",
                "Community engagement with recipe ratings and reviews",
                "Modern responsive UI with dark mode support",
                "Detailed recipe pages with cooking time, servings, and ingredients",
            ],
            tech: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Vercel"],
            highlights: "Full-stack MERN application with seamless user experience and modern design aesthetics",
            github: "https://github.com/Ankii04/cookiify",
            demo: "https://cookiify.vercel.app/",
            image: "/projects/cookiify.png",
        },
        {
            title: "Code2Placement - DSA Learning Platform",
            description:
                "A comprehensive preparation platform for mastering Data Structures & Algorithms and acing technical job placements. Features 500+ curated coding problems, company-specific mock tests, and daily challenges.",
            features: [
                "DSA Hub with comprehensive coverage of all major data structures and algorithms",
                "500+ curated coding problems with detailed solutions and test cases",
                "Interview Kit with Technical and HR questions for top companies",
                "Daily coding challenges to maintain consistency",
                "Company-specific mock tests in simulated environments",
                "Community forum for peer-to-peer networking and experience sharing",
            ],
            tech: ["React", "Vite", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Vercel"],
            highlights: "Complete placement preparation ecosystem with interactive coding environment and comprehensive resources",
            github: "https://github.com/Ankii04/code2-placement",
            demo: "https://code2-placement-uvrp.vercel.app/",
            image: "/projects/code2-placement.png",
        },
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
        {
            title: "Data Structures and Algorithms Certification",
            issuer: "NeoColab",
            date: "2024",
            description: "Advanced certification covering complex data structures, algorithmic paradigms, and problem-solving techniques.",
            image: "/Certification/DSA.png",
            link: "https://drive.google.com/file/d/1n3xf7_1tSvS3TDrWYUyEP7qR7AfODjWt/view?usp=sharing",
        },
        {
            title: "The Bits and Bytes of Computer Networking",
            issuer: "Google",
            date: "Sept 2024",
            description: "Comprehensive foundation in computer networking, covering TCP/IP, DNS, and network security protocols.",
            image: "/Certification/TheBits.png",
            link: "https://coursera.org/share/7221f51e91cbd050ca5936101a4f85a4",
        },
        {
            title: "Cloud Computing Certification (Elite Category)",
            issuer: "NPTEL / IIT Kharagpur",
            date: "April 2025",
            description: "Deep dive into cloud architecture, virtualization, and distributed systems. Achieved Elite Category recognition.",
            image: "/Certification/NPTEL.png",
            link: "https://drive.google.com/file/d/1WS6v-C9dhCi5GZq3ezSUBM9A97Yy5nwe/view",
        },
        {
            title: "C++ Programming Certificate",
            issuer: "NeoColab",
            date: "Dec 2024",
            description: "Mastery of C++ programming language, focusing on OOP principles and memory management.",
            image: "/Certification/C.png",
            link: "https://drive.google.com/drive/u/0/folders/1iranid51ZHzHpwLKRoVWSQVbKNxoR6it",
        },
    ],

    achievements: [
        "Solved 400+ Data Structures and Algorithms problems on LeetCode, GFG, and Codeforces.",
        "Achieved a LeetCode rating of 1414, reflecting consistent performance and solid understanding of algorithms.",
        "Secured a CodeChef rating of 1459, showcasing competitive programming proficiency.",
        "HackQuest 24-Hour CTF Challenge Participant – Event Convocation 2024, Intra-University Tech Fusion (April 2024)",
        "Attended 24-Hour Web Hackathon - BinaryBlitz Achievement Certificate-Coding Ninja Lpu",
        "Attended Web Development Workshop, learning HTML, CSS, and JavaScript fundamentals",
    ],

    stats: {
        technologies: 12,
        yearsExperience: 1,
        projectsBuilt: 7,
        coffeeConsumed: "∞",
    },
};
