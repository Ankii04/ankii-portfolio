import Particles from "@tsparticles/react";
import { useEffect, useRef } from "react";
import { loadSlim } from "@tsparticles/slim";

export default function ConstellationBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initParticles = async () => {
      if (!containerRef.current) return;
      
      const { tsParticles } = await import("@tsparticles/engine");
      await loadSlim(tsParticles);
      
      await tsParticles.load({
        id: "tsparticles-background",
        options: {
          background: { color: "#000000" },
          particles: {
            number: { value: 60, density: { enable: true } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.7 },
            size: { value: { min: 0.5, max: 1.5 } },
            links: {
              enable: true,
              distance: 80,
              opacity: 0.3,
              color: "#ffffff",
              width: 0.8,
              triangles: { enable: true, opacity: 0 },
            },
            move: {
              enable: true,
              speed: 0.3,
              random: true,
              direction: "none",
              straight: false,
              outModes: { default: "bounce" },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: false },
            },
          },
          detectRetina: true,
        },
      });
    };

    initParticles();
  }, []);

  return (
    <div
      ref={containerRef}
      id="tsparticles-background"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
