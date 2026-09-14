import React, { useState, useRef } from 'react';

export const Magnet = ({
  children,
  magnetStrength = 0.35,
  activeRadius = 100,
  className = ''
}) => {
  const magnetRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!magnetRef.current) return;
    const rect = magnetRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    if (dist < activeRadius) {
      const offsetX = (e.clientX - centerX) * magnetStrength;
      const offsetY = (e.clientY - centerY) * magnetStrength;
      setOffset({ x: offsetX, y: offsetY });
      setIsHovering(true);
    } else if (isHovering) {
      setOffset({ x: 0, y: 0 });
      setIsHovering(false);
    }
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
    setIsHovering(false);
  };

  return (
    <div
      ref={magnetRef}
      className={`magnet-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-block',
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: isHovering ? 'transform 0.12s ease-out' : 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      {children}
    </div>
  );
};

export default Magnet;
