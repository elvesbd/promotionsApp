import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom'

import useApi from '../../utils/useApi';
import { PromotionList } from '../PromotionList'

import styles from './styles.module.scss';


export function PromotionSearch() {
  const [search, setSearch] = useState('');
  const [load, setLoad] = useApi({
    debounceDelay: 300,
    url: '/promotions',
    method: 'get',
    params: {
      _embed: 'comments',
      _order: 'desc',
      _sort: 'id',
      title_like: search || undefined,
    },
  });
  const mountRef = useRef(null);

  useEffect(() => {
    load({
      debounced: mountRef.current,
    });

    if (!mountRef.current) {
      mountRef.current = true;
    }
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

      <PromotionList 
        promotions={setLoad.data} 
        loading={setLoad.loading}
        err={setLoad.err}  
      />
    </div>
  );
};