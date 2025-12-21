import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Download, Home as HomeIcon, User, Code, Briefcase, Moon, Sun } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import LoadingInterface from "@/components/LoadingInterface";
import { useState, useEffect } from "react";
import ConstellationBackground from "@/components/ConstellationBackground";
import WaveBackground from "@/components/WaveBackground";
import SocialLinks from "@/components/SocialLinks";
import { useTheme } from "@/contexts/ThemeContext";
import ProjectCard from "@/components/ProjectCard";
import SkillCategory from "@/components/SkillCategory";
import GitHubContributions from "@/components/GitHubContributions";
import ContactModal from "@/components/ContactModal";

export default function Home() {
    const [activeSection, setActiveSection] = useState("home");
    const { theme, toggleTheme } = useTheme();
    const [skillsVisible, setSkillsVisible] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    // Scroll animation states
    const [aboutVisible, setAboutVisible] = useState(false);
    const [projectsVisible, setProjectsVisible] = useState(false);
    const [codingProfilesVisible, setCodingProfilesVisible] = useState(false);
    const [githubVisible, setGithubVisible] = useState(false);
    const [educationVisible, setEducationVisible] = useState(false);

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        if (id === "skills") setSkillsVisible(true);
                        if (id === "about") setAboutVisible(true);
                        if (id === "projects") setProjectsVisible(true);
                        if (id === "coding-profiles") setCodingProfilesVisible(true);
                        if (id === "github-contributions") setGithubVisible(true);
                        if (id === "education") setEducationVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const sections = ["skills", "about", "projects", "coding-profiles", "github-contributions", "education"];
        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => {
            sections.forEach(id => {
                const element = document.getElementById(id);
                if (element) observer.unobserve(element);
            });
        };
    }, []);

    const [currentRole, setCurrentRole] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const roles = ["Full Stack Developer", "UI/UX Developer"];

    useEffect(() => {
        const currentText = roles[currentRole];
        const typingSpeed = isDeleting ? 50 : 100;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                if (displayedText.length < currentText.length) {
                    setDisplayedText(currentText.slice(0, displayedText.length + 1));
                } else {
                    // Finished typing, wait then start deleting
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                // Deleting
                if (displayedText.length > 0) {
                    setDisplayedText(displayedText.slice(0, -1));
                } else {
                    // Finished deleting, move to next role
                    setIsDeleting(false);
                    setCurrentRole((prev) => (prev + 1) % roles.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, currentRole]);

    // Auto-scroll carousel effect
    useEffect(() => {
        const carousel = document.querySelector('#projects-carousel');
        if (!carousel) return;

        let animationId;
        let isPaused = false;
        let userScrollTimeout;
        let scrollSpeed = 0.3; // Slower speed - pixels per frame

        const smoothScroll = () => {
            if (!isPaused && carousel) {
                const maxScroll = carousel.scrollWidth - carousel.clientWidth;

                // If we're at the end, smoothly loop back to start
                if (carousel.scrollLeft >= maxScroll - 1) {
                    carousel.scrollLeft = 0;
                } else {
                    // Smooth continuous scroll
                    carousel.scrollLeft += scrollSpeed;
                }
            }
            animationId = requestAnimationFrame(smoothScroll);
        };

        // Pause on hover
        const handleMouseEnter = () => {
            isPaused = true;
        };

        const handleMouseLeave = () => {
            isPaused = false;
        };

        // Pause on user scroll, resume after 3 seconds
        const handleUserScroll = () => {
            isPaused = true;
            clearTimeout(userScrollTimeout);
            userScrollTimeout = setTimeout(() => {
                isPaused = false;
            }, 3000); // Resume after 3 seconds of no scrolling
        };

        carousel.addEventListener('mouseenter', handleMouseEnter);
        carousel.addEventListener('mouseleave', handleMouseLeave);
        carousel.addEventListener('scroll', handleUserScroll, { passive: true });

        animationId = requestAnimationFrame(smoothScroll);

        return () => {
            cancelAnimationFrame(animationId);
            clearTimeout(userScrollTimeout);
            carousel.removeEventListener('mouseenter', handleMouseEnter);
            carousel.removeEventListener('mouseleave', handleMouseLeave);
            carousel.removeEventListener('scroll', handleUserScroll);
        };
    }, [projectsVisible]);

    return (
        <>
            {theme === "dark" ? <ConstellationBackground /> : <WaveBackground />}
            <div className="min-h-screen text-foreground overflow-visible relative z-10">
                <LoadingInterface />
                <div className="relative z-10">
                    <section id="home" className="min-h-screen flex flex-col items-center justify-between px-4 py-20">
                        <button
                            onClick={toggleTheme}
                            className="absolute top-8 right-8 z-30 w-12 h-12 rounded-full bg-card/50 backdrop-blur border border-border/50 flex items-center justify-center hover:border-accent/50 transition-all"
                            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {theme === "dark" ? (
                                <Sun className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <Moon className="w-5 h-5 text-blue-600" />
                            )}
                        </button>

                        <div className="flex-1 flex items-center justify-center w-full max-w-4xl mx-auto px-8">
                            <div className="flex flex-col items-center text-center space-y-6">
                                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-accent">
                                    {portfolioData.name}
                                </h2>
                                <div className="h-16 flex items-center justify-center">
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground">
                                        {displayedText}
                                        <span className="animate-pulse">|</span>
                                    </h3>
                                </div>
                                <p className="text-base md:text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
                                    I am a Full Stack and UI/UX Developer actively seeking new opportunities to build impactful digital experiences.                </p>
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Button
                                        size="lg"
                                        onClick={() => setIsContactModalOpen(true)}
                                        className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-full font-semibold"
                                    >
                                        Contact Me
                                    </Button>
                                    <a href="/Ankii_CV.pdf" target="_blank" rel="noopener noreferrer">
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="px-8 py-3 rounded-full font-semibold"
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download CV
                                        </Button>
                                    </a>
                                </div>
                                <div className="mt-8">
                                    <SocialLinks
                                        github={portfolioData.github}
                                        linkedin={portfolioData.linkedin}
                                        phone={portfolioData.phone}
                                    />
                                </div>
                            </div>
                        </div>
                        <nav className={`fixed bottom-2 left-1/2 -translate-x-1/2 z-20 backdrop-blur-md border border-border/50 rounded-full px-6 py-4 flex items-center justify-center gap-6 ${theme === "dark" ? "bg-black/40" : "bg-white/40"
                            }`}>
                            <button
                                onClick={() => scrollToSection("home")}
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${activeSection === "home"
                                    ? "bg-accent/20 border border-accent text-accent"
                                    : `${theme === "dark" ? "bg-[#1e293b]" : "bg-[#FAF9F6]"} border border-border/50 text-muted-foreground hover:border-accent/50`
                                    }`}
                                title="Home"
                            >
                                <HomeIcon className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scrollToSection("skills")}
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${activeSection === "skills"
                                    ? "bg-accent/20 border border-accent text-accent"
                                    : `${theme === "dark" ? "bg-[#2a2a2a]" : "bg-[#FAF9F6]"} border border-border/50 text-muted-foreground hover:border-accent/50`
                                    }`}
                                title="Skills"
                            >
                                <User className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scrollToSection("projects")}
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${activeSection === "projects"
                                    ? "bg-accent/20 border border-accent text-accent"
                                    : `${theme === "dark" ? "bg-[#2a2a2a]" : "bg-white"} border border-border/50 text-muted-foreground hover:border-accent/50`
                                    }`}
                                title="Projects"
                            >
                                <Code className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scrollToSection("education")}
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${activeSection === "education"
                                    ? "bg-accent/20 border border-accent text-accent"
                                    : `${theme === "dark" ? "bg-[#2a2a2a]" : "bg-white"} border border-border/50 text-muted-foreground hover:border-accent/50`
                                    }`}
                                title="Education"
                            >
                                <Briefcase className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scrollToSection("contact")}
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${activeSection === "contact"
                                    ? "bg-accent/20 border border-accent text-accent"
                                    : `${theme === "dark" ? "bg-[#2a2a2a]" : "bg-white"} border border-border/50 text-muted-foreground hover:border-accent/50`
                                    }`}
                                title="Contact"
                            >
                                <Mail className="w-5 h-5" />
                            </button>
                        </nav>
                    </section>

                    <section id="skills" className="py-10 px-4">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-16">
                                <p className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-4">Tech Stack</p>
                                <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Skills</h2>
                                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                    Technologies and tools I use to build modern web applications
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <SkillCategory
                                    title="MERN Stack"
                                    icon="🌐"
                                    skills={portfolioData.skills.frameworks}
                                    delay={0}
                                    visible={skillsVisible}
                                />
                                <SkillCategory
                                    title="Frontend"
                                    icon="🎨"
                                    skills={portfolioData.skills.frontend}
                                    delay={200}
                                    visible={skillsVisible}
                                />
                                <SkillCategory
                                    title="Languages"
                                    icon="💻"
                                    skills={portfolioData.skills.programmingLanguages}
                                    delay={400}
                                    visible={skillsVisible}
                                />
                                <SkillCategory
                                    title="Backend & DB"
                                    icon="🗄️"
                                    skills={portfolioData.skills.database}
                                    delay={600}
                                    visible={skillsVisible}
                                />
                                <SkillCategory
                                    title="Tools"
                                    icon="🛠️"
                                    skills={portfolioData.skills.tools}
                                    delay={800}
                                    visible={skillsVisible}
                                />
                            </div>
                        </div>
                    </section>

                    <section id="projects" className={`py-10 px-4 transition-all duration-[1500ms] ${projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Featured Projects</h2>
                            <p className="text-center text-muted-foreground mb-12">
                                Auto-scrolling gallery • Hover to pause
                            </p>
                            <div className="relative overflow-hidden">
                                {/* 3D Carousel Container */}
                                <div
                                    id="projects-carousel"
                                    className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth hide-scrollbar"
                                    style={{
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none'
                                    }}
                                >
                                    {portfolioData.projects.map((project, idx) => (
                                        <div
                                            key={idx}
                                            className={`project-card-wrapper flex-shrink-0 w-[75vw] sm:w-[320px] md:w-[350px] snap-center transition-all duration-1000 ${projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                            style={{
                                                transitionDelay: projectsVisible ? `${idx * 150}ms` : '0ms'
                                            }}
                                        >
                                            <ProjectCard
                                                title={project.title}
                                                description={project.description}
                                                features={project.features}
                                                tech={project.tech}
                                                highlights={project.highlights}
                                                github={project.github}
                                                demo={project.demo}
                                                image={project.image}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="coding-profiles" className={`py-20 px-4 transition-all duration-[1500ms] ${codingProfilesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center gap-2">
                                <span role="img" aria-label="trophy">🏆</span> Coding Profiles
                            </h2>
                            <p className="text-muted-foreground mb-8">Solving problems and building logical thinking through coding platforms.</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
                                <a
                                    href="https://leetcode.com/u/ankii04/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative group"
                                    style={{ transitionDelay: codingProfilesVisible ? '0ms' : '0ms' }}
                                >
                                    <div className={`absolute -inset-[2px] bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500`}></div>
                                    <div className={`relative ${theme === "dark" ? "bg-[#1e293b]/80" : "bg-[#f0f0f0]/80"} backdrop-blur-xl border ${theme === "dark" ? "border-white/10" : "border-black/10"} rounded-xl p-8 flex flex-col items-center transition-all shadow-xl hover:shadow-2xl duration-1000 ${codingProfilesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="LeetCode" className="w-16 h-16 mb-4" />
                                        <span className="text-lg font-semibold mb-2">LeetCode</span>
                                    </div>
                                </a>
                                <a
                                    href="https://www.geeksforgeeks.org/profile/ankitk3hwk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative group"
                                    style={{ transitionDelay: codingProfilesVisible ? '200ms' : '0ms' }}
                                >
                                    <div className={`absolute -inset-[2px] bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500`}></div>
                                    <div className={`relative ${theme === "dark" ? "bg-[#1e293b]/80" : "bg-[#f0f0f0]/80"} backdrop-blur-xl border ${theme === "dark" ? "border-white/10" : "border-black/10"} rounded-xl p-8 flex flex-col items-center transition-all shadow-xl hover:shadow-2xl duration-1000 ${codingProfilesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg" alt="GeeksforGeeks" className="w-16 h-16 mb-4" />
                                        <span className="text-lg font-semibold mb-2">GeeksforGeeks</span>
                                    </div>
                                </a>
                                <a
                                    href="https://www.hackerrank.com/profile/ankitkr1841"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative group"
                                    style={{ transitionDelay: codingProfilesVisible ? '400ms' : '0ms' }}
                                >
                                    <div className={`absolute -inset-[2px] bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500`}></div>
                                    <div className={`relative ${theme === "dark" ? "bg-[#1e293b]/80" : "bg-[#f0f0f0]/80"} backdrop-blur-xl border ${theme === "dark" ? "border-white/10" : "border-black/10"} rounded-xl p-8 flex flex-col items-center transition-all shadow-xl hover:shadow-2xl duration-1000 ${codingProfilesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png" alt="HackerRank" className="w-16 h-16 mb-4" />
                                        <span className="text-lg font-semibold mb-2">HackerRank</span>
                                    </div>
                                </a>
                            </div>
                            <p className="mt-8 text-muted-foreground">Total Problems Solved: <span className="text-accent font-bold">200+</span> across all platforms</p>
                        </div>
                    </section>

                    <section id="github-contributions" className={`py-20 px-4 transition-all duration-[1500ms] ${githubVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center flex items-center justify-center gap-2">
                                <Github className="w-10 h-10 text-accent" />
                                GitHub Contributions
                            </h2>
                            <p className="text-center text-muted-foreground mb-8">
                                My coding activity and contributions this year
                            </p>
                            <div className="relative group">
                                <div className={`absolute -inset-[2px] bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500`}></div>
                                <div className={`relative ${theme === "dark" ? "bg-[#1e293b]" : "bg-[#FAF9F6]"} backdrop-blur border border-border/50 rounded-xl p-6`}>
                                    <GitHubContributions username={portfolioData.github} />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="education" className={`py-10 px-4 transition-all duration-[1500ms] ${educationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Education</h2>
                            <div className="space-y-6">
                                {portfolioData.education.map((edu, idx) => (
                                    <div
                                        key={idx}
                                        className={`relative group transition-all duration-1000 ${educationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                        style={{ transitionDelay: educationVisible ? `${idx * 250}ms` : '0ms' }}
                                    >
                                        <div className={`absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 ${theme === "dark" ? "bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700" : "bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"}`}></div>
                                        <div className={`relative ${theme === "dark" ? "bg-[#1e293b]/80" : "bg-[#f0f0f0]/80"} backdrop-blur-xl border ${theme === "dark" ? "border-white/10" : "border-black/10"} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-1000`}>
                                            <div className="flex items-start gap-6">
                                                {/* Icon */}
                                                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                                                    <Code className="w-7 h-7 text-accent" />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{edu.degree}</h3>
                                                    <p className="text-lg italic text-muted-foreground mb-1">{edu.field}</p>
                                                    <p className="text-base italic text-muted-foreground/80 mb-6">{edu.school}</p>

                                                    {/* Bottom Row: Date and CGPA */}
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm italic text-muted-foreground">{edu.duration}</p>
                                                        <div className={`flex items-center gap-2 ${theme === "dark" ? "bg-accent/10" : "bg-accent/5"} border border-accent/30 rounded-lg px-4 py-2`}>
                                                            <span className="text-yellow-500">⭐</span>
                                                            <span className="text-lg font-bold">
                                                                {edu.cgpa || edu.percentage}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="contact" className="py-20 px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <p className="text-muted-foreground uppercase tracking-widest mb-4">Have a project in mind?</p>
                            <h2 className="text-5xl md:text-6xl font-bold mb-8">Let's Talk</h2>
                            <Button
                                size="lg"
                                onClick={() => setIsContactModalOpen(true)}
                                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-full font-semibold mb-12"
                            >
                                Contact Me
                            </Button>
                            <div className="flex justify-center gap-6 mb-12">
                                <a
                                    href={`mailto:${portfolioData.email}`}
                                    className={`w-12 h-12 rounded-full ${theme === "dark" ? "bg-card/50" : "bg-white/50"} backdrop-blur border border-border/50 flex items-center justify-center hover:border-accent/50 transition-colors`}
                                    title="Email"
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                                <a
                                    href={`https://github.com/${portfolioData.github}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-12 h-12 rounded-full ${theme === "dark" ? "bg-card/50" : "bg-white/50"} backdrop-blur border border-border/50 flex items-center justify-center hover:border-accent/50 transition-colors`}
                                    title="GitHub"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                                <a
                                    href={`https://linkedin.com/in/${portfolioData.linkedin}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-12 h-12 rounded-full ${theme === "dark" ? "bg-card/50" : "bg-white/50"} backdrop-blur border border-border/50 flex items-center justify-center hover:border-accent/50 transition-colors`}
                                    title="LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a
                                    href={`tel:${portfolioData.phone}`}
                                    className={`w-12 h-12 rounded-full ${theme === "dark" ? "bg-card/50" : "bg-white/50"} backdrop-blur border border-border/50 flex items-center justify-center hover:border-accent/50 transition-colors`}
                                    title="Phone"
                                >
                                    <Code className="w-5 h-5" />
                                </a>
                                <a
                                    href="/Ankii_CV.pdf"
                                    download
                                    className={`w-12 h-12 rounded-full ${theme === "dark" ? "bg-card/50" : "bg-white/50"} backdrop-blur border border-border/50 flex items-center justify-center hover:border-accent/50 transition-colors`}
                                    title="Download CV"
                                >
                                    <Download className="w-5 h-5" />
                                </a>
                            </div>
                            <div className="flex justify-center gap-8 text-sm text-muted-foreground">
                                <a
                                    href={`https://github.com/${portfolioData.github}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-foreground transition-colors"
                                >
                                    GITHUB
                                </a>
                                <a
                                    href={`https://linkedin.com/in/${portfolioData.linkedin}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-foreground transition-colors"
                                >
                                    LINKEDIN
                                </a>
                                <a
                                    href={`mailto:${portfolioData.email}`}
                                    className="hover:text-foreground transition-colors"
                                >
                                    EMAIL
                                </a>
                            </div>
                        </div>
                    </section>
                    <footer className="border-t border-border/20 py-8 px-4 text-center text-sm text-muted-foreground">
                        <p>© 2024 {portfolioData.name}. All rights reserved.</p>
                    </footer>
                </div >
            </div >

            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
                email={portfolioData.email}
                github={`https://github.com/${portfolioData.github}`}
                linkedin={`https://linkedin.com/in/${portfolioData.linkedin}`}
            />
        </>
    );
}
