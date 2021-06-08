import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import useApi from '../../utils/useApi';

import styles from './styles.module.scss';


const initialValue = {
  title: '',
  url: '',
  imageUrl: '',
  price: 0,
};


export function PromotionForm({ id }) {
  const [values, setValues] = useState(id ? null : initialValue);
  const [load] = useApi({
    url: `/promotions/${id}`,
    method: 'get',
    onCompleted: (response) => {
      setValues(response.data);
    }
  });

  const [save, setSave] = useApi({
    url: id ? `/promotions/${id}` : '/promotions',
    method: id ? 'put' : 'post',
    onCompleted: (response) => {
      if (!response.err) {
        history.push('/')
      };
    }
  });

  const history = useHistory();

  useEffect(() => {
    if (id) {
      load();
    }
  }, [id]);
  

  function handleChange(e) {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    save({
      data: values,
    });
  };

  return (
    <div>
      <h1>Promo Show</h1>
      <h2>Nova Promoção</h2>

      {!values ? (
        <div>Carregando...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          {setSave.loading && <span>Salvando dados...</span>}
          <div className={styles.promotionFormGroup}>
            <label htmlFor="title">Título</label>
            <input 
              id="title" 
              name="title" 
              type="text" 
              onChange={handleChange} 
              value={values.title}
            />
          </div>

          <div className={styles.promotionFormGroup}>
            <label htmlFor="url">Link</label>
            <input 
              id="url" 
              name="url" 
              type="text" 
              onChange={handleChange} 
              value={values.url}
            />
          </div>

          <div className={styles.promotionFormGroup}>
            <label htmlFor="imageUrl">Imagem (URL)</label>
            <input 
              id="imageUrl" 
              name="imageUrl" 
              type="text" 
              onChange={handleChange} 
              value={values.imageUrl}
            />
          </div>

          <div className={styles.promotionFormGroup}>
            <label htmlFor="price">Preço</label>
            <input 
              id="price" 
              name="price" 
              type="number" 
              onChange={handleChange} 
              value={values.price}
            />
          </div>

          <div>
            <button type="submit">Salvar</button>
          </div>
        </form>
      )}
    </div>
  );
};