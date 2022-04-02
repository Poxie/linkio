import React from 'react';
import styles from './DeleteModal.module.scss';
import { Button } from '../../components/Button';
import { ModalHeader } from '../ModalHeader';

export const DeleteModal: React.FC<{
    onCancel?: () => void;
    onSubmit?: () => void;
}> = ({ onCancel, onSubmit }) => {
    return(
        <div className={styles['container']}>
            <div className={styles['header']}>
                Are you sure you want to delete this? This action cannot be undone.
            </div>

            <div className={styles['button-container']}>
                <Button type={'secondary'} onClick={onCancel}>
                    No, I'm not.
                </Button>
                <Button type={'danger'} onClick={onSubmit}>
                    I'm certain.
                </Button>
            </div>
        </div>
    )
}