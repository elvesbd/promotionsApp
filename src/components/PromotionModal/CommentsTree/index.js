import styles from './styles.module.scss';


export function CommentsTree({ comments }) {
  if (!comments) {
    return <div>Carregando</div>
  }

  return (
    <ul className={styles.commentsTree}>
      {comments.map((item) => (
        <li>
          <img src={item.user.avatarUrl} alt={`Foto de ${item.user.name}`}/>
          
          <div className={styles.commentsTreeInfo}>
            <span>{item.user.name}</span>
            <p>{item.comment}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};