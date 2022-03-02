import React from 'react';
import styles from '../../styles/User.module.scss';
import { Button } from '../Button';

type Props = {
    onCancel: () => void;
    onDelete: () => void;
}
export const EditorContainerFooter: React.FC<Props> = ({ onCancel, onDelete }) => {
    return(
        <div className={styles['editor-footer']}>
            <Button type={'secondary'} className={styles['editor-footer-button']} style={{ animationDelay: '240ms' }}>
                Cancel Editing
            </Button>
            <Button type={'danger'} className={styles['editor-footer-button']} style={{ animationDelay: '280ms' }}>
                Delete Item
            </Button>
        </div>
    )
}