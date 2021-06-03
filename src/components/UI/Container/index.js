import styles from './styles.module.scss';


export function UIContainer({ children }) {
  return (
    <div className={styles.Container}>
      { children }
    </div>
  );
};