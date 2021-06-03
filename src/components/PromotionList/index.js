import PromotionCard from "../PromotionCard";

import styles from './styles.module.scss';


export function PromotionList({ loading, promotions }) {
  if (loading) {
    return <div>Carregando</div>
  } else {
    return (
      <div className={styles.promotionList}>
        {promotions.map((promotion) => (
          <PromotionCard promotion={promotion} />
        ))}
      </div>
    );
  }
};