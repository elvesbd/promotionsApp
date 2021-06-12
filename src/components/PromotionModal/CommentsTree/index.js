import { useMemo, useState } from 'react';
import styles from './styles.module.scss';

function getTree(list) {
  if (!list) {
    return [];
  }

  const roots = [];
  const childrenByParentId = {};

  list.forEach((item) => {
    if (!item.parentId) {
      roots.push(item);
      return;

    } if (!childrenByParentId[item.parentId]) {
      childrenByParentId[item.parentId] = [];
    } 
    childrenByParentId[item.parentId].push(item);
  });

  function buildNodes(nodes) {
    if (!nodes) {
      return null;
    }

    return nodes.map((node) => ({
      ...node,
      children: buildNodes(childrenByParentId[node.id])
    }));
  };
  return buildNodes(roots);
};


export function CommentsTree({ comments, sendComment }) {
  const tree = useMemo(() => getTree(comments), [comments]);
  const [comment, setComment] = useState('');
  const [activeCommentBox, setActiveCommentBox] = useState(null);

  if (!comments) {
    return <div>Carregando</div>
  }

  function renderItem(item) {
    return (
      <li>
        <img src={item.user.avatarUrl} alt={`Foto de ${item.user.name}`}/>
        
        <div className={styles.commentsTreeInfo}>
          <span>{item.user.name}</span>
          <p>{item.comment}</p>

          <button 
            type="submit"
            onClick={() => {
              setComment('');
              setActiveCommentBox(activeCommentBox === item.id 
                ? null 
                : item.id
              )}
            }
          >
            Responder
          </button>

          {activeCommentBox === item.id && (
            <div className={styles.commentsTreeBox}>
              <textarea 
                value={comment} 
                onChange={(e) => setComment(e.target.value)}
              />

              <button 
                type="button"
                onClick={() => {
                  sendComment(comment, item.id);
                  setComment('');
                  setActiveCommentBox(null);
                }}
              >
                Enviar
              </button>
            </div>
          )}

          {item.children && renderList(item.children)}
        </div>
      </li>
    );
  };

  function renderList(list) {
    return (
      <ul className={styles.commentsTree}>
        {list.map(renderItem)}
      </ul>
    );
  };

  return renderList(tree);
};

CommentsTree.defaultProps = {
  sendComment: () => {}
};