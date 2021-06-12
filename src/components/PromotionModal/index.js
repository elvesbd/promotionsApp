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

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await sendComment({
        data: {
          userId: 1,
          promotionId,
          comment,
        }
      });
      sendComment('');
      load({ quietly: true });
    } catch (err) {

    }
  };

  async function sendAnswer(textComment, parentId) {
    await sendComment({
      data: {
        userId: 1,
        promotionId,
        comment: textComment,
        parentId
      }
    });
    load({ quietly: true });
  };

  return (
    <Modal isOpen onCloseModal={onCloseModal}>
      <form className={styles.commentForm} onSubmit={handleSubmit}>
        <textarea 
          placeholder="Comentar..."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          disabled={setSendComment.loading}
        />
        <button type="submit" disabled={setSendComment.loading}>
          {setSendComment.loading ? 'Enviando' : 'Enviar'}
        </button>
      </form>
      <CommentsTree comments={setLoad.data} sendComment={sendAnswer}/>
    </Modal>
  );
};