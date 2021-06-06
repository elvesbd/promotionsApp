import { Link } from 'react-router-dom';

import styles from './styles.module.scss';


const PromotionCard = ({ promotion }) => {
  return (
    <div key={promotion.id} className={styles.promotionCard}>
      <img src={promotion.imageUrl} alt={promotion.title}/>
        <div>
          <h1>{promotion.title}</h1>
          <span>R$ {promotion.price}</span>
        
          <footer>
            <div className={styles.promotionCardComments}>
              "{promotion.comments.length > 0 ? promotion.comments[0].comment : ''}"
            </div>
        
            <div 
            className={styles.promotionCardCommentsCount}>
              {promotion.comments.length}{' '} 
              {promotion.comments.length > 1 ? 'Comentários' : 'Comentário'}
            </div>
            <a 
              href={promotion.url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              IR PARA O SITE
            </a>
            <Link to={`/edit/${promotion.id}`}>Editar</Link>
          </footer>
        </div>
    </div>
  );
}
  
export default PromotionCard;