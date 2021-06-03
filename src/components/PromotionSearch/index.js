import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

import axios from 'axios';
import { PromotionList } from '../PromotionList'

import styles from './styles.module.scss';


export function PromotionSearch() {
  const [promotions, setPromotions] = useState([]);
  const[search, setSearch] = useState('');

  useEffect(() => {
    const params = {};
    if (search) {
      params.title_like = search;
    }

    (async () => {
      const response = await axios.get('http://localhost:5000/promotions?_embed=comments', { params });
      setPromotions(response.data);
    })()
  }, [search]);

  return (
    <div className={styles.promotionSearch}>
      <header>
        <h1>Promo Show</h1>
        <Link to="/create">Nova Promoção</Link>
      </header>

      <input 
      type="search" 
      placeholder="Pesquisar"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      />

      <PromotionList promotions={promotions} loading={!promotions.length}/>
    </div>
  );
};