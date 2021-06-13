import { useField } from 'formik';

import styles from './styles.module.scss';


export function Field({ name, id, label, ...restProps }) {
  const [field, meta] = useField({ name, id, ...restProps });

  return (
    <>
      {label && (
        <label htmlFor={id ?? name}>{label}</label>
      )}
      <input 
        className={meta.error && styles.errorInput} {...field} 
        name={name} id={id ?? name}
      />
      {meta.error && (
        <span className={styles.errorMessage}>{meta.error}</span>
      )}
    </>
  );
};