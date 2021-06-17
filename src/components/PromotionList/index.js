import { useState } from "react";
import { PromotionCard } from "../PromotionCard";
import { PromotionModal } from '../PromotionModal';

import useApi from '../../utils/useApi';

import styles from './styles.module.scss';


export function PromotionList({ loading, err, promotions, refetch }) {
  const [promotionId, setPromotionId] = useState(null);
  const [deletedPromotion, setDeletedPromotion] = useApi({
    method: 'DELETE'
  });

  if (err) {
    return <div>Algo Errado</div>

  } if (promotions === null || setDeletedPromotion.loading) {
    return <div>Carregando</div>

  } if (promotions.length === 0) {
    return <div>Nenhum resultado encontrado</div>
  }


  return (
    <div className={styles.promotionList}>
      {promotions.map((promotion) => (
        <PromotionCard 
          promotion={promotion} 
          onClickComments={() => setPromotionId(promotion.id)}
          onClickDelete={async () => {
            await deletedPromotion({
              url: `/promotions/${promotion.id}`
            });
            refetch();
          }}
        />
      ))}
      {loading && (
        <div>Carregando mais promoções...</div>
      )}
      {promotionId && (
        <PromotionModal 
          promotionId={promotionId} 
          onCloseModal={() => setPromotionId(null)}
        />
      )}
    </div>
  );
};