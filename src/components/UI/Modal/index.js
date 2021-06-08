import React from 'react';
import ReactDOM from 'react-dom';

import styles from './styles.module.scss';

const portalRoot = document.getElementById("portal-root");

export function Modal({ children, isOpen, onCloseModal }) {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles.uiModalOverlay}>
      <div className={styles.uiModal}>
        <button type="button" onClick={onCloseModal}>x</button>
        { children }
      </div>  
    </div>,
    portalRoot,
  );
};