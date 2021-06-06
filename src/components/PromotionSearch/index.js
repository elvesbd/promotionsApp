import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

import axios from 'axios';
import useApi from '../../utils/useApi';
import { PromotionList } from '../PromotionList'

import styles from './styles.module.scss';


export function PromotionSearch() {
  const [search, setSearch] = useState('');
  const [load, setLoad] = useApi({
    url: '/promotions',
    method: 'get',
    params: {
      _embed: 'comments',
      _order: 'desc',
      _sort: 'id',
      title_like: search || undefined,
    },
  });
  console.log(setLoad.data);

  useEffect(() => {
    load();
    /* const params = {};
    if (search) {
      params.title_like = search;
    }

    (async () => {
      const response = await axios.get('http://localhost:5000/promotions?_embed=comments&_order=desc&_sort=id', { params });
      setPromotions(response.data);
    })() */
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