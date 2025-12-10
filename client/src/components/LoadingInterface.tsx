import { useEffect, useState } from "react";
import LoadingConstellationBackground from "./LoadingConstellationBackground";

export default function LoadingInterface() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [loadingText, setLoadingText] = useState("Initializing");

  const loadingStages = [
    "Initializing",
    "Loading Assets",
    "Building Interface",
    "Almost Ready",
    "Welcome"
  ];

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      if (progress < 25) {
        setProgress(25);
        setLoadingText(loadingStages[0]);
      } else if (progress < 50) {
        setProgress(50);
        setLoadingText(loadingStages[1]);
      } else if (progress < 75) {
        setProgress(75);
        setLoadingText(loadingStages[2]);
      } else if (progress < 95) {
        setProgress(95);
        setLoadingText(loadingStages[3]);
      } else if (progress < 100) {
        setProgress(100);
        setLoadingText(loadingStages[4]);
      }
    }, 1800);

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
    }, 10000);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
      {/* Constellation Background with connected particles */}
      <div className="absolute inset-0 z-0">
        <LoadingConstellationBackground />
      </div>

      {/* Loading content with higher z-index */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
        {/* Loading text with animated dots */}
        <div className="text-center mb-8">
          <p className="text-2xl md:text-3xl font-bold text-white mb-2">
            {loadingText}
            <span className="inline-flex ml-1">
              <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
            </span>
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-80 h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
          </div>
        </div>

        {/* Loading message */}
        <p className="text-gray-400 mt-6 text-sm animate-pulse">Crafting Your Experience...</p>
      </div>


    </div>
  );
}
