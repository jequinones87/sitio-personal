import styles from './Button.module.css';

export default function Button({
  variant = 'primary',
  as: Component = 'button',
  className = '',
  children,
  ...props
}) {
  const variantClass = variant === 'secondary' ? styles.secondary : styles.primary;
  return (
    <Component className={`${styles.btn} ${variantClass} ${className}`} {...props}>
      {children}
    </Component>
  );
}
