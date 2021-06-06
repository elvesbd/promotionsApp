import PromotionCard from "../PromotionCard";

import styles from './styles.module.scss';


export function PromotionList({ loading, err, promotions }) {
  if (err) {
    return <div>Algo Errado</div>

  } else if (loading || !promotions) {
    return <div>Carregando</div>

  } else if (promotions.length === 0) {
    return <div>Nenhum resultado encontrado</div>

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