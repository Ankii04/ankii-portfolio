import { Button } from "@/components/ui/button";
import { ExternalLink, Award } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function CertificationCard({
    title,
    issuer,
    date,
    description,
    image,
    link,
}) {
    const { theme } = useTheme();

    return (
        <div className="group relative h-[380px] w-full">
            <div
                className={`h-full w-full ${theme === "dark" ? "bg-[#1e293b]/80 border-border/50" : "bg-white border-black"
                    } backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-500 hover:border-accent/50 shadow-xl hover:shadow-accent/10 flex flex-col`}
            >
                {/* Image Section — kept to h-36 so text section always has room */}
                {image ? (
                    <div className="h-36 flex-shrink-0 overflow-hidden relative">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                            <span className="text-white text-xs font-medium flex items-center gap-1">
                                <ExternalLink className="w-3 h-3" /> Click to view certificate
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="h-36 flex-shrink-0 bg-accent/5 flex items-center justify-center relative overflow-hidden">
                        <Award className="w-16 h-16 text-accent/20 group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                )}

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">{issuer}</span>
                        <span className="text-[10px] text-muted-foreground font-medium">{date}</span>
                    </div>

                    <h3 className="text-lg font-bold line-clamp-2 group-hover:text-accent transition-colors leading-tight">
                        {title}
                    </h3>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                        {description}
                    </p>

                    <div className="mt-auto pt-4">
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full"
                        >
                            <Button
                                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl transition-all duration-300 h-10 text-xs font-semibold"
                            >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Certificate PDF
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
