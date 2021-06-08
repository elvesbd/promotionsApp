import { useState } from "react";
import { PromotionCard } from "../PromotionCard";
import { PromotionModal } from '../PromotionModal';

import styles from './styles.module.scss';


export function PromotionList({ loading, err, promotions }) {
  const [promotionId, setPromotionId] = useState(null);

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
          <PromotionCard 
            promotion={promotion} 
            onClickComments={() => setPromotionId(promotion.id)}
          />
        ))}
        {promotionId && (
          <PromotionModal 
            promotionId={promotionId} 
            onCloseModal={() => setPromotionId(null)}
          />
        )}
      </div>
    );
  }
};