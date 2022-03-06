import React from 'react';
import styles from '../styles/Modal.module.scss';

export const ModalHeader: React.FC = ({ children }) => {
    return(
        <div className={styles['header']}>
            {children}
        </div>
    )
}