import React from 'react';
import styles from '../../styles/User.module.scss';
import { Button } from '../Button';

type Props = {
    onCancel: () => void;
    onDelete: () => void;
    onSave: () => void;
}
export const EditorContainerFooter: React.FC<Props> = ({ onCancel, onDelete, onSave }) => {
    return(
        <div className={styles['editor-footer']}>
            <Button 
                type={'secondary'} 
                className={styles['editor-footer-button']} 
                style={{ animationDelay: '240ms' }}
                onClick={onCancel}
            >
                Cancel Editing
            </Button>
            <Button 
                className={styles['editor-footer-button']} 
                style={{ animationDelay: '280ms' }}
                onClick={onSave}
            >
                Save Changes
            </Button>
            <Button 
                type={'danger'} 
                className={styles['editor-footer-button']} 
                style={{ animationDelay: '320ms' }}
                onClick={onDelete}
            >
                Delete Item
            </Button>
        </div>
    )
}