import axios from 'axios';
import { useEffect, useState } from 'react';

import PromotionCard from '../../components/PromotionCard';


const PromotionSearch = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get('http://localhost:5000/promotions?_embed=comments');
      setPromotions(response.data);
    })()
  }, [])

  return (
    <div 
      style={{
        maxWidth: 800,
        margin: '30px auto'
      }}  
    >
      {promotions.map((promotion) => (
        <PromotionCard promotion={promotion} />
      ))}
    </div>
  );
};

export default PromotionSearch;