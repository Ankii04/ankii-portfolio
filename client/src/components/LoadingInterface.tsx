import { useEffect, useState } from "react";

export default function LoadingInterface() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      if (progress < 35) {
        setProgress(35);
      } else if (progress < 70) {
        setProgress(70);
      } else if (progress < 100) {
        setProgress(100);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [progress]);

  // Complete loading when page is fully loaded
  useEffect(() => {
    const handleLoad = () => {
      setProgress(100);
    };

    window.addEventListener("load", handleLoad);
    // Set to 100 after a delay if not loaded
    const timer = setTimeout(() => {
      setProgress(100);
    }, 5000);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
      {/* Loading text */}
      <div className="text-center mb-8">
        <p className="text-muted-foreground uppercase tracking-widest text-sm mb-4">Loading</p>
        <p className="text-4xl md:text-5xl font-bold text-foreground">{Math.round(progress)}%</p>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-card/50 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading message */}
      <p className="text-muted-foreground mt-8 text-sm">Crafting Digital Excellence...</p>
    </div>
  );
}
