import React from 'react';

export const ShinyText = ({
  text,
  children,
  disabled = false,
  speed = 4,
  className = '',
  shimmerColor = '#d97706'
}) => {
  const content = children || text;

  return (
    <span
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      style={{
        display: 'inline-block',
        background: `linear-gradient(120deg, #92400e 0%, ${shimmerColor} 25%, #f59e0b 50%, ${shimmerColor} 75%, #92400e 100%)`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: disabled ? 'none' : `shineSweep ${speed}s linear infinite`
      }}
    >
      {content}
    </span>
  );
};

export default ShinyText;
