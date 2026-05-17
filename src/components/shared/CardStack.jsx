import { Children, cloneElement, isValidElement } from 'react';
import styles from './CardStack.module.css';

// Stack de tarjetas con efecto sticky. Cada hijo recibe un `top` incremental
// para que se apilen al hacer scroll. Inspirado en chetanverma16/cards-stack
// (motion/react + Tailwind), reescrito en CSS Modules sin librería de animación.
export function CardStack({
  children,
  className = '',
  incrementY = 16,
  startOffset = 96,
  incrementZ = 8,
}) {
  return (
    <div className={`${styles.container} ${className}`}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;
        const top = startOffset + index * incrementY;
        const z = index * incrementZ;
        return cloneElement(child, {
          style: {
            ...(child.props.style || {}),
            '--stack-top': `${top}px`,
            '--stack-z': `${z}px`,
          },
          className: `${styles.card} ${child.props.className || ''}`.trim(),
        });
      })}
    </div>
  );
}

export default CardStack;
