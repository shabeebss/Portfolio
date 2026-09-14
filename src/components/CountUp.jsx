import React, { useState, useEffect, useRef } from 'react';

export const CountUp = ({ end, duration = 1800, suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;
          const startValue = 0;
          const targetValue = Number(end);

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Ease out cubic: 1 - pow(1 - progress, 3)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = startValue + (targetValue - startValue) * easeOut;
            
            setCount(decimals > 0 ? Number(currentVal.toFixed(decimals)) : Math.floor(currentVal));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(targetValue);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    const currentElem = elementRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, [end, duration, decimals]);

  return (
    <span ref={elementRef} className="countup-wrapper">
      {count}
      {suffix && <span className="countup-suffix">{suffix}</span>}
    </span>
  );
};

export default CountUp;
