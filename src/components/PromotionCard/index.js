import { Link } from 'react-router-dom';

import styles from './styles.module.scss';


export function PromotionCard({ promotion, onClickComments }) {
  return (
    <div key={promotion.id} className={styles.promotionCard}>
      <img src={promotion.imageUrl} alt={promotion.title}/>
        <div className={styles.promotionCardInfo}>
          <h1>{promotion.title}</h1>
          <span>R$ {promotion.price}</span>
        
          <footer>
            <div className={styles.promotionCardComments}>
              "{promotion.comments.length > 0 ? promotion.comments[0].comment : ''}"
            </div>
        
            <div>
              <a onClick={onClickComments}>
                {promotion.comments.length}{' '} 
                {promotion.comments.length > 1 ? 'Comentários' : 'Comentário'}
              </a>

              <button
                href={promotion.url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                IR PARA O SITE
              </button>

              <Link className={styles.linkEdit} to={`/edit/${promotion.id}`}>
                Editar
              </Link>
            </div>
          </footer>
        </div>
    </div>
  );
}