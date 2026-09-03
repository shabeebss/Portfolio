import { useState, useEffect } from 'react';

export const useTypingEffect = (
  strings = [],
  typeSpeed = 70,
  backSpeed = 40,
  backDelay = 1800
) => {
  const [text, setText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!strings || strings.length === 0) return;

    const currentFullText = strings[stringIndex % strings.length];

    let timer;

    if (!isDeleting) {
      if (text.length < currentFullText.length) {
        timer = setTimeout(() => {
          setText(currentFullText.substring(0, text.length + 1));
        }, typeSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, backDelay);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(currentFullText.substring(0, text.length - 1));
        }, backSpeed);
      } else {
        setIsDeleting(false);
        setStringIndex((prev) => (prev + 1) % strings.length);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, stringIndex, strings, typeSpeed, backSpeed, backDelay]);

  return text;
};
