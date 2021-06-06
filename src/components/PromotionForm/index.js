import { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './styles.module.scss';
import { useHistory } from 'react-router';


const initialValue = {
  title: '',
  url: '',
  imageUrl: '',
  price: 0,
};


export function PromotionForm({ id }) {
  const [values, setValues] = useState(id ? null : initialValue);
  const history = useHistory();

  useEffect(() => {
    if (id) {
      (async () => {
        const response = await axios.get(`http://localhost:5000/promotions/${id}`);
        setValues(response.data);
      })()
    }
  }, []);
  

  function handleChange(e) {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const method = id ? 'put' : 'post';
    const url = id 
      ? `http://localhost:5000/promotions/${id}` 
      : 'http://localhost:5000/promotions'

    axios[method](url, values).then((response) => {
      history.push('/')
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