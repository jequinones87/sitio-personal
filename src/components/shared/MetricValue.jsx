import { useCountUp } from '../../hooks/useCountUp';
import styles from './MetricValue.module.css';

// Cifra de resultado. Separa el signo "+" para pintarlo con el acento
// sin alterar el valor (las cifras se muestran tal cual se reciben).
// Con `animate` ({ armed, active }) el número pasa a 0 justo antes de entrar en
// pantalla y cuenta al verse; los lectores de pantalla leen siempre el valor
// final y, sin scroll (buscadores), se muestra el valor final.
export default function MetricValue({ value, className = '', animate }) {
  const sign = value.startsWith('+') ? '+' : '';
  const rest = value.slice(sign.length);
  const match = rest.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const enabled = animate !== undefined && Boolean(match);
  const counted = useCountUp(target, {
    enabled,
    armed: Boolean(animate?.armed),
    active: Boolean(animate?.active),
  });

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
