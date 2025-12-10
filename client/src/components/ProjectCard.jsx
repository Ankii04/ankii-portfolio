import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ProjectCard({
    title,
    description,
    features,
    tech,
    highlights,
    github,
    demo,
    image,
}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const { theme } = useTheme();

    return (
        <div
            className="relative h-[450px] w-full perspective-1000"
            onMouseLeave={() => setIsFlipped(false)}
        >
            <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? "rotate-y-180" : ""
                    }`}
                style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
            >
                {/* Front Side */}
                <div
                    className={`absolute inset-0 ${theme === "dark" ? "bg-[#1e293b]" : "bg-[#f0f0f0]"
                        } backdrop-blur border border-border/50 rounded-xl overflow-hidden backface-hidden`}
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <div className="h-full flex flex-col p-6">
                        <div
                            onMouseEnter={() => setIsFlipped(true)}
                            className="flex-1 cursor-pointer"
                        >
                            {image && (
                                <div className="-mx-6 -mt-6 mb-6 h-48 overflow-hidden">
                                    <img
                                        src={image}
                                        alt={title}
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}
                            <h3 className="text-2xl font-bold mb-3">{title}</h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                {description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {tech.slice(0, 3).map((t) => (
                                    <span
                                        key={t}
                                        className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-medium"
                                    >
                                        {t}
                                    </span>
                                ))}
                                {tech.length > 3 && (
                                    <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-medium">
                                        +{tech.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            {github && (
                                <a href={github} target="_blank" rel="noopener noreferrer" className="flex-1">
                                    <Button variant="outline" size="sm" className="w-full">
                                        <Github className="w-4 h-4 mr-2" />
                                        Repo
                                    </Button>
                                </a>
                            )}
                            {demo && (
                                <a href={demo} target="_blank" rel="noopener noreferrer" className="flex-1">
                                    <Button variant="outline" size="sm" className="w-full">
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Live
                                    </Button>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Back Side */}
                <div
                    className={`absolute inset-0 ${theme === "dark" ? "bg-[#1e293b]" : "bg-[#f0f0f0]"
                        } backdrop-blur border border-accent/50 rounded-xl overflow-hidden backface-hidden`}
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    <div className="h-full flex flex-col p-6 overflow-y-auto">
                        <h3 className="text-xl font-bold mb-3 text-accent">{title}</h3>

                        <div className="mb-4">
                            <p className="text-sm font-semibold text-foreground mb-2">Features:</p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                {features.slice(0, 3).map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-accent mt-0.5">•</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm font-semibold text-foreground mb-2">Tech Stack:</p>
                            <div className="flex flex-wrap gap-2">
                                {tech.map((t) => (
                                    <span
                                        key={t}
                                        className="text-xs bg-accent/20 text-accent px-2 py-1 rounded font-medium"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4 flex-1">
                            <p className="text-xs text-muted-foreground italic">{highlights}</p>
                        </div>

                        <div className="flex gap-3 mt-auto">
                            {github && (
                                <a href={github} target="_blank" rel="noopener noreferrer" className="flex-1">
                                    <Button size="sm" className="w-full bg-accent hover:bg-accent/90">
                                        <Github className="w-4 h-4 mr-2" />
                                        View Code
                                    </Button>
                                </a>
                            )}
                            {demo && (
                                <a href={demo} target="_blank" rel="noopener noreferrer" className="flex-1">
                                    <Button size="sm" variant="outline" className="w-full">
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Live Demo
                                    </Button>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
