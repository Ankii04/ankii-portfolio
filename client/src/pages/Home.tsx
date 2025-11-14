import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Download, Home as HomeIcon, User, Code, Briefcase, Moon, Sun } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import LoadingInterface from "@/components/LoadingInterface";
import { useState, useEffect } from "react";
import ConstellationBackground from "@/components/ConstellationBackground";
import WaveBackground from "@/components/WaveBackground";
import PersonIllustration from "@/components/PersonIllustration";
import SocialLinks from "@/components/SocialLinks";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();
  const [skillsVisible, setSkillsVisible] = useState(false);

  const scrollToSection = (sectionId: string) => {
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
          if (entry.target.id === "skills" && entry.isIntersecting) {
            setSkillsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => {
      if (skillsSection) {
        observer.unobserve(skillsSection);
      }
    };
  }, []);

  return (
    <>
      {theme === "dark" ? <ConstellationBackground /> : <WaveBackground />}
      <div className="min-h-screen text-foreground overflow-visible relative z-10">
      <LoadingInterface />
      <div className="relative z-10">
        <section id="home" className="min-h-screen flex flex-col items-center justify-between px-4 py-20">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="fixed top-8 right-8 z-30 w-12 h-12 rounded-full bg-card/50 backdrop-blur border border-border/50 flex items-center justify-center hover:border-accent/50 transition-all"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-600" />
            )}
          </button>

          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
            {/* Centered Text Content */}
            <p className="text-xs md:text-sm text-accent uppercase tracking-[0.2em] mb-8 font-semibold text-center">
              {portfolioData.title}
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-center bg-gradient-to-r from-accent via-accent to-accent bg-clip-text text-transparent">
              {portfolioData.name}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-12 font-light max-w-2xl text-center leading-relaxed">
              Frontend Developer passionate about creating beautiful and functional web experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              <a href={`mailto:${portfolioData.email}`}>
                <Button 
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-full font-semibold"
                >
                  Get In Touch
                </Button>
              </a>
              <a href="/Ankii_CV.pdf" download>
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
            {/* Social Links */}
            <div className="mt-12 flex justify-center">
              <SocialLinks
                email={portfolioData.email}
                github={portfolioData.github}
                linkedin={portfolioData.linkedin}
                phone={portfolioData.phone}
              />
            </div>
          </div>
          <nav className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-20 backdrop-blur-md border border-border/50 rounded-full px-6 py-4 flex items-center justify-center gap-6 ${
            theme === "dark" ? "bg-black/40" : "bg-white/40"
          }`}>
            <button
              onClick={() => scrollToSection("home")}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                activeSection === "home"
                  ? "bg-accent/20 border border-accent text-accent"
                  : "bg-card/50 border border-border/50 text-muted-foreground hover:border-accent/50"
              }`}
              title="Home"
            >
              <HomeIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                activeSection === "about"
                  ? "bg-accent/20 border border-accent text-accent"
                  : "bg-card/50 border border-border/50 text-muted-foreground hover:border-accent/50"
              }`}
              title="About"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                activeSection === "projects"
                  ? "bg-accent/20 border border-accent text-accent"
                  : "bg-card/50 border border-border/50 text-muted-foreground hover:border-accent/50"
              }`}
              title="Projects"
            >
              <Code className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToSection("education")}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                activeSection === "education"
                  ? "bg-accent/20 border border-accent text-accent"
                  : "bg-card/50 border border-border/50 text-muted-foreground hover:border-accent/50"
              }`}
              title="Education"
            >
              <Briefcase className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                activeSection === "contact"
                  ? "bg-accent/20 border border-accent text-accent"
                  : "bg-card/50 border border-border/50 text-muted-foreground hover:border-accent/50"
              }`}
              title="Contact"
            >
              <Mail className="w-5 h-5" />
            </button>
          </nav>
        </section>
        <section id="skills" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center flex items-center justify-center gap-2">
              <span className="text-accent text-2xl">⚡</span> Technical Skills
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
              {portfolioData.skills.languages.map((tech, idx) => (
                <div 
                  key={tech} 
                  className={`${theme === "dark" ? "bg-black/40" : "bg-white/40"} border border-border/30 hover:border-accent/50 rounded-lg p-4 flex flex-col items-center transition-all hover:shadow-lg hover:shadow-accent/10 ${
                    skillsVisible ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"
                  }`}
                  style={{ animationDelay: skillsVisible ? `${idx * 50}ms` : "0ms" }}
                >
                  <span className="text-2xl mb-2">🌐</span>
                  <span className="font-semibold text-sm mb-1 text-center">{tech}</span>
                  <span className="text-xs text-muted-foreground">Frontend</span>
                </div>
              ))}
              {portfolioData.skills.frameworks.map((tech, idx) => (
                <div 
                  key={tech} 
                  className={`${theme === "dark" ? "bg-black/40" : "bg-white/40"} border border-border/30 hover:border-accent/50 rounded-lg p-4 flex flex-col items-center transition-all hover:shadow-lg hover:shadow-accent/10 ${
                    skillsVisible ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"
                  }`}
                  style={{ animationDelay: skillsVisible ? `${(idx + 8) * 50}ms` : "0ms" }}
                >
                  <span className="text-2xl mb-2">🧩</span>
                  <span className="font-semibold text-sm mb-1 text-center">{tech}</span>
                  <span className="text-xs text-muted-foreground">Frontend</span>
                </div>
              ))}
              {portfolioData.skills.database.map((tech, idx) => (
                <div 
                  key={tech} 
                  className={`${theme === "dark" ? "bg-black/40" : "bg-white/40"} border border-border/30 hover:border-accent/50 rounded-lg p-4 flex flex-col items-center transition-all hover:shadow-lg hover:shadow-accent/10 ${
                    skillsVisible ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"
                  }`}
                  style={{ animationDelay: skillsVisible ? `${(idx + 12) * 50}ms` : "0ms" }}
                >
                  <span className="text-2xl mb-2">🗄️</span>
                  <span className="font-semibold text-sm mb-1 text-center">{tech}</span>
                  <span className="text-xs text-muted-foreground">Backend</span>
                </div>
              ))}
              {portfolioData.skills.tools.map((tech, idx) => (
                <div 
                  key={tech} 
                  className={`${theme === "dark" ? "bg-black/40" : "bg-white/40"} border border-border/30 hover:border-accent/50 rounded-lg p-4 flex flex-col items-center transition-all hover:shadow-lg hover:shadow-accent/10 ${
                    skillsVisible ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"
                  }`}
                  style={{ animationDelay: skillsVisible ? `${(idx + 14) * 50}ms` : "0ms" }}
                >
                  <span className="text-2xl mb-2">🛠️</span>
                  <span className="font-semibold text-sm mb-1 text-center">{tech}</span>
                  <span className="text-xs text-muted-foreground">Tools</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="text-center">
                <span className="text-lg font-bold text-accent">12+</span>
                <p className="text-muted-foreground italic text-xs">Technologies</p>
              </div>
              <div className="text-center">
                <span className="text-lg font-bold text-accent">2+</span>
                <p className="text-muted-foreground italic text-xs">Years Experience</p>
              </div>
              <div className="text-center">
                <span className="text-lg font-bold text-accent">10+</span>
                <p className="text-muted-foreground italic text-xs">Projects Built</p>
              </div>
              <div className="text-center">
                <span className="text-lg font-bold text-accent">∞</span>
                <p className="text-muted-foreground italic text-xs">Coffee Consumed</p>
              </div>
            </div>
          </div>
        </section>
        <section id="projects" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Featured Projects</h2>
            <p className="text-center text-muted-foreground mb-12">
              Showcasing innovative solutions and modern web applications built with cutting-edge technologies
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioData.projects.map((project, idx) => (
                <div
                  key={idx}
                  className={`${theme === "dark" ? "bg-card/50" : "bg-white/50"} backdrop-blur border border-border/50 rounded-xl overflow-hidden hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10`}
                >
                  <div className="h-40 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                    <Briefcase className="w-12 h-12 text-accent/50" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-foreground mb-2">Key Features:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {project.features.map((feature, i) => (
                          <li key={i}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground italic mb-4">{project.highlights}</p>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        Live Demo
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        View Code
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-full font-semibold"
              >
                View All Projects
              </Button>
            </div>
          </div>
        </section>
        <section id="education" className={`py-20 px-4 backdrop-blur-sm ${theme === "dark" ? "bg-black/20" : "bg-blue-50/20"}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Education</h2>
            <div className="space-y-6">
              {portfolioData.education.map((edu, idx) => (
                <div key={idx} className={`${theme === "dark" ? "bg-card/50" : "bg-white/50"} backdrop-blur border border-border/50 rounded-xl p-8`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Code className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-1">{edu.degree}</h3>
                      <p className="text-muted-foreground mb-2">{edu.field}</p>
                      <p className="text-sm text-muted-foreground mb-4">{edu.school}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">{edu.duration}</p>
                        <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-semibold">
                          {edu.cgpa || edu.percentage}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioData.certifications.map((cert, idx) => (
                  <div key={idx} className={`${theme === "dark" ? "bg-card/50" : "bg-white/50"} backdrop-blur border border-border/50 rounded-lg p-4`}>
                    <p className="text-foreground text-sm">{cert}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="coding-profiles" className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center gap-2">
              <span role="img" aria-label="trophy">🏆</span> Coding Profiles
            </h2>
            <p className="text-muted-foreground mb-8">Solving problems and building logical thinking through coding platforms.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
              <a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer" className={`${theme === "dark" ? "bg-card/50" : "bg-white/50"} hover:border-accent/50 border border-border/50 rounded-xl p-8 flex flex-col items-center transition-all`}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="LeetCode" className="w-16 h-16 mb-4" />
                <span className="text-lg font-semibold mb-2">LeetCode</span>
              </a>
              <a href="https://www.geeksforgeeks.org/" target="_blank" rel="noopener noreferrer" className={`${theme === "dark" ? "bg-card/50" : "bg-white/50"} hover:border-accent/50 border border-border/50 rounded-xl p-8 flex flex-col items-center transition-all`}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg" alt="GeeksforGeeks" className="w-16 h-16 mb-4" />
                <span className="text-lg font-semibold mb-2">GeeksforGeeks</span>
              </a>
              <a href="https://www.hackerrank.com/" target="_blank" rel="noopener noreferrer" className={`${theme === "dark" ? "bg-card/50" : "bg-white/50"} hover:border-accent/50 border border-border/50 rounded-xl p-8 flex flex-col items-center transition-all`}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png" alt="HackerRank" className="w-16 h-16 mb-4" />
                <span className="text-lg font-semibold mb-2">HackerRank</span>
              </a>
            </div>
            <p className="mt-8 text-muted-foreground">Total Problems Solved: <span className="text-accent font-bold">200+</span> across all platforms</p>
          </div>
        </section>
        <section id="contact" className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground uppercase tracking-widest mb-4">Have a project in mind?</p>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Let's Talk</h2>
            <a href={`mailto:${portfolioData.email}`}>
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-full font-semibold mb-12"
              >
                Contact Me
              </Button>
            </a>
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
          <p> 2024 {portfolioData.name}. All rights reserved.</p>
        </footer>
      </div>
    </div>
    </>
  );
}
