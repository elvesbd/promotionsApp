import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom'

import useApi from '../../utils/useApi';
import { PromotionList } from '../PromotionList'
import { InfiniteScroll } from '../UI/InfiniteScroll';

import styles from './styles.module.scss';

const baseParams = {
  _embed: 'comments',
  _order: 'desc',
  _sort: 'id',
  _limit: 5,
};


export function PromotionSearch() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [load, setLoad] = useApi({
    debounceDelay: 300,
    url: '/promotions',
    method: 'get',
  });
  const mountRef = useRef(null);

  useEffect(() => {
    load({
      debounced: mountRef.current,
      params: {
        ...baseParams,
        _page: 1,
        title_like: search || undefined,
      },
    });

    if (!mountRef.current) {
      mountRef.current = true;
    }
  }, [search]);

  function fetchMore() {
    const newPage = page + 1;
    load({
      isFetchMore: true,
      params: {
        ...baseParams,
        _page: newPage,
        title_like: search || undefined,
      },

      updateRequestInfo: (newRequestInfo, prevRequestInfo) => ({
        ...newRequestInfo,
        data: [
          ...prevRequestInfo.data,
          ...newRequestInfo.data
        ]
      })
    });

    setPage(newPage);
  };

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
        refetch={() => {
          load({
            params: baseParams,
          })
        }}
      />
      {setLoad.data &&
        !setLoad.loading &&
        setLoad.data?.length < setLoad.total && (
        <InfiniteScroll fetchMore={fetchMore}/>
      )}
    </div>
  );
};