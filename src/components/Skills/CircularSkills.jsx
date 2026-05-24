import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '../../context/LangContext';
import styles from './CircularSkills.module.css';

function calculateGap(width) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export default function CircularSkills({ skills, autoplay = true }) {
  const { t } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(600);
  const imageContainerRef = useRef(null);
  const autoplayRef = useRef(null);
  const count = useMemo(() => skills.length, [skills]);
  const active = useMemo(() => skills[activeIndex], [skills, activeIndex]);

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, 5000);
    return () => clearInterval(autoplayRef.current);
  }, [autoplay, count]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, count]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
    clearInterval(autoplayRef.current);
  }, [count]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
    clearInterval(autoplayRef.current);
  }, [count]);

  function getImageStyle(index) {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + count) % count === index;
    const isRight = (activeIndex + 1) % count === index;

    if (isActive) return {
      zIndex: 3, opacity: 1, pointerEvents: 'auto',
      transform: 'translateX(0px) translateY(0px) scale(1) rotateY(0deg)',
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
    };
    if (isLeft) return {
      zIndex: 2, opacity: 1, pointerEvents: 'auto',
      transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
    };
    if (isRight) return {
      zIndex: 2, opacity: 1, pointerEvents: 'auto',
      transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
    };
    return { zIndex: 1, opacity: 0, pointerEvents: 'none', transition: 'all 0.8s cubic-bezier(.4,2,.3,1)' };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -20 },
  };

  return (
    <div className={styles.grid}>
      {/* Image carousel */}
      <div className={styles.imageContainer} ref={imageContainerRef}>
        {skills.map((skill, index) => (
          <img
            key={skill.src}
            src={skill.src}
            alt={skill.name}
            className={styles.image}
            style={getImageStyle(index)}
          />
        ))}
      </div>

      {/* Text content */}
      <div className={styles.content}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className={styles.textBlock}
            variants={quoteVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className={styles.name}>{active.name}</p>
            <p className={styles.designation}>{active.designation}</p>
            <p className={styles.quote}>
              {active.quote.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ filter: 'blur(8px)', opacity: 0, y: 4 }}
                  animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut', delay: 0.02 * i }}
                  style={{ display: 'inline-block' }}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className={styles.arrows}>
          <button className={styles.arrowBtn} onClick={handlePrev} aria-label={t('skills.prev')}>
            <ChevronLeft size={20} />
          </button>
          <button className={styles.arrowBtn} onClick={handleNext} aria-label={t('skills.next')}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
