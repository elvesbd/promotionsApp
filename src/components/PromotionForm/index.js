import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Formik, Form } from 'formik';

import { Field } from '../PromotionField';
import useApi from '../../utils/useApi';
import schema from './schema';

import styles from './styles.module.scss';

const initialValue = {
  title: '',
  url: '',
  imageUrl: '',
  price: 0,
};


export function PromotionForm({ id }) {
  const history = useHistory();
  const [load, setLoad] = useApi({
    url: `/promotions/${id}`,
    method: 'get',
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

  useEffect(() => {
    if (id) {
      load();
    }
  }, [id]);

  function handleSubmit(formValues) {
    save({
      data: formValues,
    });
  };

  const values = id ? setLoad.data : initialValue

  return (
    <div>
      <h1>Promo Show</h1>
      <h2>Nova Promoção</h2>

      {!values ? (
        <div>Carregando...</div>
      ) : (
        <Formik
          initialValues={values}
          onSubmit={handleSubmit}
          validationSchema={schema}
          render={() => (
            <Form>
              {setSave.loading && <span>Salvando dados...</span>}
              <div className={styles.promotionFormGroup}>
                <Field name="title" type="text" label="Título" />
              </div>

              <div className={styles.promotionFormGroup}>
                <Field name="url" type="text" label="Link" />  
              </div>

              <div className={styles.promotionFormGroup}>
                <Field name="imageUrl" type="text" label="Imagem (URL)" />   
              </div>

              <div className={styles.promotionFormGroup}>
                <Field name="price" type="number" label="Preço" />
              </div>

              <div>
                <button type="submit">Salvar</button>
              </div>
            </Form>
          )}
        />
      )}
    </div>
  );
};