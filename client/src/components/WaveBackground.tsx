import { useEffect, useRef } from "react";

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationId: number;
    let time = 0;

    const drawWaves = () => {
      // Clear canvas with light background
      ctx.fillStyle = "#f5f5f5";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw multiple wave layers
      const waveHeight = 80;
      const frequency = 0.01;
      const amplitude = 30;

      // Wave 1 - Light blue
      ctx.fillStyle = "rgba(200, 230, 255, 0.4)";
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 150);
      for (let x = 0; x <= canvas.width; x += 5) {
        const y =
          canvas.height -
          150 +
          Math.sin(x * frequency + time * 0.02) * amplitude;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fill();

      // Wave 2 - Lighter blue
      ctx.fillStyle = "rgba(180, 220, 255, 0.3)";
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 100);
      for (let x = 0; x <= canvas.width; x += 5) {
        const y =
          canvas.height -
          100 +
          Math.sin(x * frequency + time * 0.015 + 2) * (amplitude * 0.7);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fill();

      // Wave 3 - Very light blue
      ctx.fillStyle = "rgba(160, 210, 255, 0.2)";
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 50);
      for (let x = 0; x <= canvas.width; x += 5) {
        const y =
          canvas.height -
          50 +
          Math.sin(x * frequency + time * 0.01 + 4) * (amplitude * 0.5);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fill();

      // Draw clouds
      drawClouds(ctx, time);

      time++;
      animationId = requestAnimationFrame(drawWaves);
    };

    drawWaves();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
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

function drawClouds(
  ctx: CanvasRenderingContext2D,
  time: number
) {
  const clouds = [
    { x: 100, y: 100, size: 1.2, speed: 0.02 },
    { x: 400, y: 150, size: 0.8, speed: 0.015 },
    { x: 800, y: 80, size: 1, speed: 0.025 },
    { x: 1200, y: 120, size: 0.9, speed: 0.018 },
  ];

  clouds.forEach((cloud) => {
    const x = (cloud.x + time * cloud.speed) % (ctx.canvas.width + 200);
    drawCloud(ctx, x, cloud.y, cloud.size);
  });
}

function drawCloud(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
) {
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.beginPath();

  // Draw cloud shape using circles
  ctx.arc(x, y, 25 * size, 0, Math.PI * 2);
  ctx.arc(x + 30 * size, y, 35 * size, 0, Math.PI * 2);
  ctx.arc(x + 60 * size, y, 25 * size, 0, Math.PI * 2);

  ctx.fill();
}
