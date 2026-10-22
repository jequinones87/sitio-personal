import { useCountUp } from '../../hooks/useCountUp';
import styles from './MetricValue.module.css';

// Cifra de resultado. Separa el signo "+" para pintarlo con el acento
// sin alterar el valor (las cifras se muestran tal cual se reciben).
// Con `animate`, el número cuenta desde 0 cuando pasa a true; los lectores
// de pantalla leen siempre el valor final.
export default function MetricValue({ value, className = '', animate }) {
  const sign = value.startsWith('+') ? '+' : '';
  const rest = value.slice(sign.length);
  const match = rest.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const enabled = animate !== undefined && Boolean(match);
  const counted = useCountUp(target, { enabled, active: Boolean(animate) });

  if (!enabled) {
    return (
      <span className={`${styles.value} ${className}`}>
        {sign && <span className={styles.sign}>{sign}</span>}
        {rest}
      </span>
    );
  }

  return (
    <span className={`${styles.value} ${className}`}>
      <span aria-hidden="true">
        {sign && <span className={styles.sign}>{sign}</span>}
        {counted}
        {match[2]}
      </span>
      <span className={styles.srOnly}>{value}</span>
    </span>
  );
}
