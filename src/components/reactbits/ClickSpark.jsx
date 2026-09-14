import React, { useRef, useEffect } from 'react';

export const ClickSpark = ({
  children,
  sparkColor = '#fbbf24',
  sparkSize = 10,
  sparkRadius = 18,
  sparkCount = 8,
  duration = 400
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now();

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = now - spark.startTime;
        if (elapsed > duration) return false;

        const progress = elapsed / duration;
        const currentDist = spark.radius * Math.sin((progress * Math.PI) / 2);
        const currentLength = spark.size * (1 - progress);

        const x1 = spark.x + Math.cos(spark.angle) * currentDist;
        const y1 = spark.y + Math.sin(spark.angle) * currentDist;
        const x2 = spark.x + Math.cos(spark.angle) * (currentDist + currentLength);
        const y2 = spark.y + Math.sin(spark.angle) * (currentDist + currentLength);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2 * (1 - progress);
        ctx.globalAlpha = 1 - progress;
        ctx.shadowColor = sparkColor;
        ctx.shadowBlur = 8;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        return true;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleClick = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const now = performance.now();

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.4;
        sparksRef.current.push({
          x,
          y,
          angle,
          startTime: now,
          size: sparkSize * (0.8 + Math.random() * 0.4),
          radius: sparkRadius * (0.8 + Math.random() * 0.4)
        });
      }
    };

    window.addEventListener('pointerdown', handleClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointerdown', handleClick);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 99999
        }}
      />
      {children}
    </>
  );
};

export default ClickSpark;
