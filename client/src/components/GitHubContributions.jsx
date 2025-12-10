import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function GitHubContributions({ username }) {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalContributions, setTotalContributions] = useState(0);
    const { theme } = useTheme();

    useEffect(() => {
        fetchContributions();
    }, [username]);

    const fetchContributions = async () => {
        try {
            setLoading(true);
            // Using GitHub's contribution API via a public endpoint
            const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);

            if (!response.ok) {
                throw new Error("Failed to fetch contributions");
            }

            const data = await response.json();

            // Get current year's contributions
            const currentYear = new Date().getFullYear();
            const yearContributions = data.contributions.filter((day) => {
                const year = new Date(day.date).getFullYear();
                return year === currentYear;
            });

            // Calculate total for current year
            const total = yearContributions.reduce((sum, day) => sum + day.count, 0);

            setContributions(yearContributions);
            setTotalContributions(total);
            setError(null);
        } catch (err) {
            setError("Unable to load GitHub contributions");
            console.error("Error fetching contributions:", err);
        } finally {
            setLoading(false);
        }
    };

    const getContributionColor = (level) => {
        if (theme === "dark") {
            const colors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
            return colors[level] || colors[0];
        } else {
            const colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
            return colors[level] || colors[0];
        }
    };

    const groupByWeeks = (days) => {
        const weeks = [];
        let currentWeek = [];

        days.forEach((day, index) => {
            currentWeek.push(day);
            if (currentWeek.length === 7 || index === days.length - 1) {
                weeks.push([...currentWeek]);
                currentWeek = [];
            }
        });

        return weeks;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 text-muted-foreground">
                <p>{error}</p>
            </div>
        );
    }

    const weeks = groupByWeeks(contributions);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">
                    {totalContributions} contributions this year
                </h3>
            </div>

            <div className="overflow-x-auto pb-4">
                <div className="inline-flex gap-1">
                    {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-1">
                            {week.map((day, dayIndex) => (
                                <div
                                    key={`${weekIndex}-${dayIndex}`}
                                    className="w-3 h-3 rounded-sm transition-all hover:ring-2 hover:ring-accent"
                                    style={{ backgroundColor: getContributionColor(day.level) }}
                                    title={`${day.count} contributions on ${new Date(day.date).toLocaleDateString()}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((level) => (
                        <div
                            key={level}
                            className="w-3 h-3 rounded-sm"
                            style={{ backgroundColor: getContributionColor(level) }}
                        />
                    ))}
                </div>
                <span>More</span>
            </div>
        </div>
    );
}
