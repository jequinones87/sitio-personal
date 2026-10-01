import styles from './MetricValue.module.css';

// Cifra de resultado. Separa el signo "+" para pintarlo con el acento
// sin alterar el valor (las cifras se muestran tal cual se reciben).
export default function MetricValue({ value, className = '' }) {
  const sign = value.startsWith('+') ? '+' : '';
  return (
    <span className={`${styles.value} ${className}`}>
      {sign && <span className={styles.sign}>{sign}</span>}
      {value.slice(sign.length)}
    </span>
  );
}
