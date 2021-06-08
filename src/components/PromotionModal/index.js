import { useEffect, useState } from 'react';

import useApi from '../../utils/useApi';

import { Modal } from '../UI/Modal';
import { CommentsTree } from '../PromotionModal/CommentsTree';

import styles from './styles.module.scss';


export function PromotionModal({ promotionId, onCloseModal }) {
  const [comment, setComment] = useState('');
  const [load, setLoad] = useApi({
    url: '/comments',
    params: {
      promotionId,
      _expand: 'user'
    },
  });

  const [sendComment, setSendComment] = useApi({
    url: '/comments',
    method: 'post'
  });

  useEffect(() => {
    load();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    try {
      sendComment({
        data: {
          userId: 1,
          promotionId,
          comment,
        }
      });
      sendComment('');
      load();
    } catch (err) {

    }
  };

  return (
    <Modal isOpen onCloseModal={onCloseModal}>
      <form className={styles.commentForm} onSubmit={handleSubmit}>
        <textarea 
          placeholder="Comentar..."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button type="submit" disabled={setSendComment.loading}>
          {setSendComment.loading ? 'Enviando' : 'Enviar'}
        </button>
      </form>
      <CommentsTree comments={setLoad.data}/>
    </Modal>
  );
};