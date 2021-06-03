import { useState } from 'react';
import axios from 'axios';

import styles from './styles.module.scss';
import { useHistory } from 'react-router';


const initialValue = {
  title: '',
  url: '',
  imageUrl: '',
  price: 0,
};


export function PromotionForm() {
  const [values, setValues] = useState(initialValue);

  const history = useHistory();


  function handleChange(e) {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();

    (async () => {
      const response = await axios.post('http://localhost:5000/promotions', values);
      history.push('/')
    })()

    
  }
  
  return (
    <div>
      <h1>Promo Show</h1>
      <h2>Nova Promoção</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.promotionFormGroup}>
          <label htmlFor="title">Título</label>
          <input id="title" name="title" type="text" onChange={handleChange}/>
        </div>

        <div className={styles.promotionFormGroup}>
          <label htmlFor="url">Link</label>
          <input id="url" name="url" type="text" onChange={handleChange}/>
        </div>

        <div className={styles.promotionFormGroup}>
          <label htmlFor="imageUrl">Imagem (URL)</label>
          <input id="imageUrl" name="imageUrl" type="text" onChange={handleChange}/>
        </div>

        <div className={styles.promotionFormGroup}>
          <label htmlFor="price">Preço</label>
          <input id="price" name="price" type="number" onChange={handleChange}/>
        </div>

        <div>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
};