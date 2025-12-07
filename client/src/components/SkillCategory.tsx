import { useTheme } from "@/contexts/ThemeContext";
import { TechIcons } from "./TechIcons";

interface SkillCategoryProps {
    title: string;
    icon: string;
    skills: string[];
    delay?: number;
    visible?: boolean;
}

export default function SkillCategory({
    title,
    icon,
    skills,
    delay = 0,
    visible = true,
}: SkillCategoryProps) {
    const { theme } = useTheme();

    return (
        <div
            className={`group relative transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
        >
            <div
                className={`relative ${theme === "dark"
                    ? "bg-[#1e293b]/80"
                    : "bg-[#f0f0f0]/80"
                    } backdrop-blur-xl border ${theme === "dark" ? "border-white/10" : "border-black/10"} rounded-2xl p-8 transition-all duration-300 hover:border-accent/50 shadow-xl hover:shadow-2xl`}
            >
                {/* Header */}
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border/20">
                    <span className="text-3xl">{icon}</span>
                    <h3 className="text-xl font-bold">{title}</h3>
                </div>

                {/* Tech Icons Grid */}
                <div className="grid grid-cols-3 gap-6">
                    {skills.map((skill, idx) => {
                        const IconComponent = TechIcons[skill];

                        return (
                            <div
                                key={skill}
                                className={`flex flex-col items-center gap-3 group/item cursor-pointer transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: visible ? `${delay + (idx * 100)}ms` : '0ms' }}
                            >
                                <div
                                    className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-300 group-hover/item:scale-110 group-hover/item:shadow-lg ${theme === "dark"
                                        ? "bg-black/40 hover:bg-black/60"
                                        : "bg-white/60 hover:bg-white/80"
                                        }`}
                                >
                                    {IconComponent ? (
                                        <IconComponent className="w-8 h-8 drop-shadow-lg" />
                                    ) : (
                                        <span className="text-2xl">💡</span>
                                    )}
                                </div>
                                <span className="text-xs font-medium text-center text-muted-foreground group-hover/item:text-foreground transition-colors">
                                    {skill}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
