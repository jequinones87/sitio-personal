import styles from './ImagePlaceholder.module.css';

export default function ImagePlaceholder({ text = 'foto', height = 200, style }) {
  return (
    <div
      className={styles.placeholder}
      style={{ height, ...style }}
      role="img"
      aria-label={text}
    >
      {text}
    </div>
  );
}
