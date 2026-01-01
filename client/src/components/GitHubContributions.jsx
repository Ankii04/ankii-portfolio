import { useEffect, useState, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function GitHubContributions({ username }) {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalContributions, setTotalContributions] = useState(0);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [allContributions, setAllContributions] = useState([]);
    const dropdownRef = useRef(null);
    const { theme } = useTheme();

    // Available years for the dropdown
    const availableYears = [2026, 2025, 2024, 2023];

    useEffect(() => {
        fetchContributions();
    }, [username]);

    useEffect(() => {
        // Filter contributions when year changes
        if (allContributions.length > 0) {
            filterContributionsByYear(selectedYear);
        }
    }, [selectedYear, allContributions]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchContributions = async () => {
        try {
            setLoading(true);
            // Using GitHub's contribution API via a public endpoint
            const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);

            if (!response.ok) {
                throw new Error("Failed to fetch contributions");
            }

            const data = await response.json();

            // Store all contributions
            setAllContributions(data.contributions);

            // Filter for selected year
            filterContributionsByYear(selectedYear, data.contributions);

            setError(null);
        } catch (err) {
            setError("Unable to load GitHub contributions");
            console.error("Error fetching contributions:", err);
        } finally {
            setLoading(false);
        }
    };

    const filterContributionsByYear = (year, contributionsData = allContributions) => {
        const yearContributions = contributionsData.filter((day) => {
            const dayYear = new Date(day.date).getFullYear();
            return dayYear === year;
        });

        // Calculate total for selected year
        const total = yearContributions.reduce((sum, day) => sum + day.count, 0);

        setContributions(yearContributions);
        setTotalContributions(total);
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
                    {totalContributions} contributions in {selectedYear}
                </h3>

                {/* Year Dropdown Button */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-md
                            border transition-all duration-200
                            ${theme === 'dark'
                                ? 'bg-[#21262d] border-[#30363d] hover:bg-[#30363d] text-white'
                                : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-900'
                            }
                            font-semibold text-sm
                        `}
                    >
                        <span>{selectedYear}</span>
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div
                            className={`
                                absolute right-0 mt-2 w-40 rounded-md shadow-lg z-50
                                border overflow-hidden
                                ${theme === 'dark'
                                    ? 'bg-[#161b22] border-[#30363d]'
                                    : 'bg-white border-gray-200'
                                }
                                animate-in fade-in slide-in-from-top-2 duration-200
                            `}
                        >
                            {availableYears.map((year) => (
                                <button
                                    key={year}
                                    onClick={() => {
                                        setSelectedYear(year);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`
                                        w-full px-4 py-2.5 text-left text-sm font-medium
                                        transition-colors duration-150
                                        flex items-center justify-between
                                        ${theme === 'dark'
                                            ? 'hover:bg-[#21262d] text-white'
                                            : 'hover:bg-gray-100 text-gray-900'
                                        }
                                        ${selectedYear === year
                                            ? theme === 'dark'
                                                ? 'bg-[#21262d]'
                                                : 'bg-gray-50'
                                            : ''
                                        }
                                    `}
                                >
                                    <span>{year}</span>
                                    {selectedYear === year && (
                                        <svg
                                            className="w-4 h-4 text-green-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
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
