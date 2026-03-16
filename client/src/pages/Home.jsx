import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Download, Home as HomeIcon, User, Code, Briefcase, Moon, Sun, Trophy, Award, GraduationCap, School } from "lucide-react";
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
import CertificationCard from "@/components/certifcationCard";

export default function Home() {
    const [activeSection, setActiveSection] = useState("home");
    const { theme, toggleTheme } = useTheme();
    const [skillsVisible, setSkillsVisible] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    // Scroll animation states
    const [projectsVisible, setProjectsVisible] = useState(false);
    const [codingProfilesVisible, setCodingProfilesVisible] = useState(false);
    const [githubVisible, setGithubVisible] = useState(false);
    const [educationVisible, setEducationVisible] = useState(false);
    const [achievementsVisible, setAchievementsVisible] = useState(false);

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
                        if (id === "projects") setProjectsVisible(true);
                        if (id === "coding-profiles") setCodingProfilesVisible(true);
                        if (id === "github-contributions") setGithubVisible(true);
                        if (id === "education") setEducationVisible(true);
                        if (id === "achievements") setAchievementsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const sections = ["skills", "projects", "coding-profiles", "github-contributions", "education", "achievements"];
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

    // Auto-scroll carousel effect - Infinite Ticker Style
    useEffect(() => {
        const setupCarousel = (id, visible, reverse = false) => {
            const carousel = document.querySelector(id);
            if (!carousel || !visible) return;

            let animationId;
            let isPaused = false;
            let userScrollTimeout;
            const scrollSpeed = 0.9; // Slower, more cinematic

            // For reverse (RTL) direction, start at the end
            if (reverse) {
                carousel.scrollLeft = carousel.scrollWidth / 2;
            }

            const smoothScroll = () => {
                if (!isPaused && carousel) {
                    if (!reverse) {
                        // LTR: scroll forward, loop back
                        const halfWay = carousel.scrollWidth / 2;
                        if (carousel.scrollLeft >= halfWay) {
                            carousel.scrollLeft = 0;
                        } else {
                            carousel.scrollLeft += scrollSpeed;
                        }
                    } else {
                        // RTL: scroll backward, loop to end
                        if (carousel.scrollLeft <= 0) {
                            carousel.scrollLeft = carousel.scrollWidth / 2;
                        } else {
                            carousel.scrollLeft -= scrollSpeed;
                        }
                    }
                }
                animationId = requestAnimationFrame(smoothScroll);
            };

            const handleMouseEnter = () => { isPaused = true; };
            const handleMouseLeave = () => { isPaused = false; };
            const handleManualInteraction = () => {
                isPaused = true;
                clearTimeout(userScrollTimeout);
                userScrollTimeout = setTimeout(() => { isPaused = false; }, 2000);
            };

            carousel.addEventListener('mouseenter', handleMouseEnter);
            carousel.addEventListener('mouseleave', handleMouseLeave);
            carousel.addEventListener('mousedown', handleManualInteraction);
            carousel.addEventListener('touchstart', handleManualInteraction, { passive: true });

            animationId = requestAnimationFrame(smoothScroll);

            return () => {
                cancelAnimationFrame(animationId);
                clearTimeout(userScrollTimeout);
                carousel.removeEventListener('mouseenter', handleMouseEnter);
                carousel.removeEventListener('mouseleave', handleMouseLeave);
                carousel.removeEventListener('mousedown', handleManualInteraction);
                carousel.removeEventListener('touchstart', handleManualInteraction);
            };
        };

        const cleanupProjects = setupCarousel('#projects-carousel', projectsVisible, false);
        const cleanupCerts = setupCarousel('#certs-carousel', achievementsVisible, true); // reverse direction

        return () => {
            if (cleanupProjects) cleanupProjects();
            if (cleanupCerts) cleanupCerts();
        };
    }, [projectsVisible, achievementsVisible]);

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
                                    <a href="/Ankiii_CV.pdf" target="_blank" rel="noopener noreferrer">
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
                        <nav className={`fixed bottom-2 left-1/2 -translate-x-1/2 z-20 backdrop-blur-md border ${theme === "dark" ? "border-border/50 bg-black/40" : "border-black bg-white/60"} rounded-full px-3 sm:px-6 py-4 flex items-center justify-center gap-2 sm:gap-6`}>
                            <button
                                onClick={() => scrollToSection("home")}
                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${activeSection === "home"
                                    ? "bg-accent/20 border border-accent text-accent"
                                    : `${theme === "dark" ? "bg-[#1e293b] border-border/50" : "bg-white border-black"} border text-muted-foreground hover:border-accent/50`
                                    }`}
                                title="Home"
                            >
                                <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <button
                                onClick={() => scrollToSection("skills")}
                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${activeSection === "skills"
                                    ? "bg-accent/20 border border-accent text-accent"
                                    : `${theme === "dark" ? "bg-[#2a2a2a] border-border/50" : "bg-white border-black"} border text-muted-foreground hover:border-accent/50`
                                    }`}
                                title="Skills"
                            >
                                <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <button
                                onClick={() => scrollToSection("projects")}
                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${activeSection === "projects"
                                    ? "bg-accent/20 border border-accent text-accent"
                                    : `${theme === "dark" ? "bg-[#2a2a2a] border-border/50" : "bg-white border-black shadow-sm"} border text-muted-foreground hover:border-accent/50`
                                    }`}
                                title="Projects"
                            >
                                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <button
                                onClick={() => scrollToSection("achievements")}
                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${activeSection === "achievements"
                                    ? "bg-accent/20 border border-accent text-accent"
                                    : `${theme === "dark" ? "bg-[#2a2a2a] border-border/50" : "bg-white border-black"} border text-muted-foreground hover:border-accent/50`
                                    }`}
                                title="Achievements"
                            >
                                <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <button
                                onClick={() => scrollToSection("education")}
                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${activeSection === "education"
                                    ? "bg-accent/20 border border-accent text-accent"
                                    : `${theme === "dark" ? "bg-[#2a2a2a] border-border/50" : "bg-white border-black"} border text-muted-foreground hover:border-accent/50`
                                    }`}
                                title="Education"
                            >
                                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <button
                                onClick={() => scrollToSection("contact")}
                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${activeSection === "contact"
                                    ? "bg-accent/20 border border-accent text-accent"
                                    : `${theme === "dark" ? "bg-[#2a2a2a] border-border/50" : "bg-white border-black"} border text-muted-foreground hover:border-accent/50`
                                    }`}
                                title="Contact"
                            >
                                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </nav>
                    </section>


                    <section id="skills" className="min-h-screen scroll-mt-2 flex flex-col justify-center py-20 pb-32 px-4">
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

                    <section id="projects" className={`min-h-screen scroll-mt-2 flex flex-col justify-center py-20 pb-32 px-4 transition-all duration-[1500ms] ${projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Featured Projects</h2>
                            <p className="text-center text-muted-foreground mb-12">
                                Auto-scrolling gallery • Hover to pause
                            </p>
                            {/* overflow-visible so the 3D card flip is NOT clipped */}
                            <div className="relative overflow-visible">
                                {/* 3D Carousel Container — overflow-x-auto only for scroll, not clip */}
                                <div
                                    id="projects-carousel"
                                    className="flex gap-6 overflow-x-auto pb-8 pt-2 hide-scrollbar pointer-events-auto"
                                    style={{
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none',
                                        overflowY: 'visible',
                                    }}
                                >
                                    {[...portfolioData.projects, ...portfolioData.projects].map((project, idx) => (
                                        <div
                                            key={idx}
                                            className={`project-card-wrapper flex-shrink-0 w-[75vw] sm:w-[320px] md:w-[350px] transition-all duration-1000 ${projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                            style={{
                                                transitionDelay: projectsVisible ? `${(idx % portfolioData.projects.length) * 150}ms` : '0ms'
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

                    <section id="achievements" className={`min-h-screen scroll-mt-2 px-4 py-20 pb-32 flex flex-col justify-center transition-all duration-[1500ms] ${achievementsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="max-w-6xl mx-auto w-full flex flex-col gap-12">
                            {/* Header */}
                            <div className="text-center">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                                    <Trophy className="w-10 h-10 text-accent" />
                                    Professional Certifications
                                </h2>
                                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                                    Curated collection of my academic and technical certifications
                                </p>
                            </div>

                            {/* Certifications Carousel — scrolls RIGHT to LEFT */}
                            <div className="relative overflow-hidden">
                                <div
                                    id="certs-carousel"
                                    className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar pointer-events-auto"
                                    style={{
                                        border: 'none',
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none'
                                    }}
                                >
                                    {[...portfolioData.certifications, ...portfolioData.certifications].map((cert, idx) => (
                                        <div
                                            key={idx}
                                            className="flex-shrink-0 w-[85vw] sm:w-[360px] transition-all duration-1000"
                                            style={{
                                                transitionDelay: achievementsVisible ? `${(idx % portfolioData.certifications.length) * 150}ms` : '0ms'
                                            }}
                                        >
                                            <CertificationCard
                                                title={cert.title}
                                                issuer={cert.issuer}
                                                date={cert.date}
                                                description={cert.description}
                                                image={cert.image}
                                                link={cert.link}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── Achievements & Events — fills one full viewport ── */}
                    <section className={`min-h-screen py-20 px-4 flex flex-col justify-center transition-all duration-[1500ms] ${achievementsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="max-w-6xl mx-auto w-full flex flex-col gap-12">
                            {/* Header */}
                            <div className="text-center">
                                <p className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-3">🎖️ Honors &amp; Milestones</p>
                                <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                                    <Award className="w-10 h-10 text-accent" />
                                    Achievements &amp; Events
                                </h2>
                                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                                    Competitions, hackathons, and milestones that shaped my journey
                                </p>
                            </div>

                            {/* Achievement Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { emoji: '🧠', text: portfolioData.achievements[0] },
                                    { emoji: '⚡', text: portfolioData.achievements[1] },
                                    { emoji: '🍴', text: portfolioData.achievements[2] },
                                    { emoji: '🔐', text: portfolioData.achievements[3] },
                                    { emoji: '💻', text: portfolioData.achievements[4] },
                                    { emoji: '🌐', text: portfolioData.achievements[5] },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className={`group relative p-6 rounded-2xl border border-border/40 ${
                                            theme === 'dark' ? 'bg-slate-900/50' : 'bg-white/60'
                                        } backdrop-blur-md hover:border-accent/60 transition-all duration-500 shadow-md hover:shadow-accent/10 hover:shadow-xl overflow-hidden ${
                                            achievementsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                        }`}
                                        style={{ transitionDelay: achievementsVisible ? `${idx * 120}ms` : '0ms' }}
                                    >
                                        {/* Accent glow bar on left */}
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent/60 to-transparent rounded-l-2xl" />
                                        <div className="flex items-start gap-4 pl-3">
                                            <span className="text-3xl mt-0.5 flex-shrink-0">{item.emoji}</span>
                                            <p className="text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors font-medium leading-relaxed">
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="coding-profiles" className={`min-h-screen scroll-mt-2 flex flex-col justify-center py-20 pb-32 px-4 transition-all duration-[1500ms] ${codingProfilesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                                    <div className={`relative ${theme === "dark" ? "bg-[#1e293b]/80 border-white/10" : "bg-white border-black"} backdrop-blur-xl border rounded-xl p-8 flex flex-col items-center transition-all shadow-xl hover:shadow-2xl duration-1000 ${codingProfilesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                                    <div className={`relative ${theme === "dark" ? "bg-[#1e293b]/80 border-white/10" : "bg-white border-black"} backdrop-blur-xl border rounded-xl p-8 flex flex-col items-center transition-all shadow-xl hover:shadow-2xl duration-1000 ${codingProfilesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                                    <div className={`relative ${theme === "dark" ? "bg-[#1e293b]/80 border-white/10" : "bg-white border-black"} backdrop-blur-xl border rounded-xl p-8 flex flex-col items-center transition-all shadow-xl hover:shadow-2xl duration-1000 ${codingProfilesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png" alt="HackerRank" className="w-16 h-16 mb-4" />
                                        <span className="text-lg font-semibold mb-2">HackerRank</span>
                                    </div>
                                </a>
                            </div>
                            <p className="mt-8 text-muted-foreground">Total Problems Solved: <span className="text-accent font-bold">350+</span> across all platforms</p>
                        </div>
                    </section>

                    <section id="github-contributions" className={`min-h-screen scroll-mt-2 flex flex-col justify-center py-20 pb-32 px-4 transition-all duration-[1500ms] ${githubVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                                <div className={`relative ${theme === "dark" ? "bg-[#1e293b] border-border/50" : "bg-white border-black"} backdrop-blur border rounded-xl p-6`}>
                                    <GitHubContributions username={portfolioData.github} />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="education" className={`min-h-screen scroll-mt-2 px-4 py-20 pb-32 flex flex-col justify-center transition-all duration-[1500ms] ${educationVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="max-w-4xl mx-auto w-full">
                            {/* Section Header */}
                            <div className="text-center mb-20">
                                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-accent/10 mb-4">
                                    <GraduationCap className="w-8 h-8 text-accent" />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                                    Educational Journey
                                </h2>
                                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                                    A timeline of my academic milestones and foundational learning.
                                </p>
                            </div>

                            {/* Timeline Container with Animated Line */}
                            <div className="relative ml-4 md:ml-8 space-y-12 pb-8">
                                {/* Base Timeline Line (Static) */}
                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border/20 rounded-full" />
                                
                                {/* Active Growing Line (Animated) */}
                                <div 
                                    className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-accent/0 via-accent to-accent/0 origin-top transition-all duration-[2000ms] ease-out rounded-full shadow-[0_0_20px_rgba(var(--accent-rgb),0.5)]"
                                    style={{ 
                                        height: educationVisible ? '100%' : '0%',
                                        backgroundSize: '100% 200%',
                                    }} 
                                />

                                {portfolioData.education.map((edu, idx) => (
                                    <div
                                        key={idx}
                                        className={`relative pl-8 md:pl-12 transition-all duration-1000 ${educationVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                                        style={{ transitionDelay: educationVisible ? `${idx * 200}ms` : '0ms' }}
                                    >
                                        {/* Timeline Marker (Dot) */}
                                        <div className="absolute -left-[7px] top-0 w-[14px] h-[14px] rounded-full bg-accent border-2 border-background shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)] z-10 group-hover:scale-150 transition-transform duration-300" />
                                        
                                        {/* Year Badge */}
                                        <div className="mb-2 inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
                                            {edu.duration}
                                        </div>

                                        {/* Card Wrapper */}
                                        <div className="group relative">
                                            {/* Glow effect on hover */}
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            
                                            {/* Main Card */}
                                            <div className={`relative ${theme === "dark" ? "bg-[#1e293b]/50 border-border/40" : "bg-white border-black"} backdrop-blur-xl border rounded-2xl p-6 md:p-8 hover:border-accent/40 shadow-lg hover:shadow-accent/5 transition-all duration-500`}>
                                                {/* Left Accent Bar */}
                                                <div className="absolute left-0 top-6 bottom-6 w-1 bg-accent rounded-r-full opacity-60" />
                                                
                                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                                    <div className="space-y-4 flex-1">
                                                        <div className="space-y-1">
                                                            <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-accent transition-colors duration-300 leading-tight">
                                                                {edu.degree}
                                                            </h3>
                                                            <div className="flex items-center gap-2 text-accent/80 font-semibold italic">
                                                                <School className="w-4 h-4" />
                                                                {edu.field}
                                                            </div>
                                                        </div>
                                                        
                                                        <p className="text-lg text-muted-foreground/90 font-medium">
                                                            {edu.school}
                                                        </p>

                                                        {/* Details Footer */}
                                                        <div className="pt-2 flex flex-wrap items-center gap-4">
                                                            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${theme === "dark" ? "bg-slate-800/50 border-border/50" : "bg-white border-black"} border`}>
                                                                <span className="text-yellow-500 text-sm">⭐</span>
                                                                <span className="font-bold text-foreground">
                                                                    {edu.cgpa || edu.percentage}
                                                                </span>
                                                            </div>
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

                    <section id="contact" className="min-h-screen scroll-mt-2 flex flex-col justify-center py-20 pb-32 px-4">
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
                                    href="/Ankiii_CV.pdf"
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
