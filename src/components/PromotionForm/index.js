import styles from './styles.module.scss';


export function PromotionForm() {
  return (
    <div>
      <h1>Promo Show</h1>
      <h2>Nova Promoção</h2>

      <form>
        <div className={styles.promotionForm}>
          <label>Título</label>
          <input name=""/>
        </div>
      </form>
    </div>
  );
};