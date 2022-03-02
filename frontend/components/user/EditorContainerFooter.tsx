import React from 'react';
import styles from '../../styles/User.module.scss';
import { Button } from '../Button';

type Props = {
    onCancel: () => void;
    onDelete: () => void;
    onSave: () => void;
    deleting: boolean;
    creating?: boolean;
}
export const EditorContainerFooter: React.FC<Props> = ({ onCancel, onDelete, onSave, creating, deleting }) => {
    const canClick = !deleting;
    return(
        <div className={styles['editor-footer']}>
            <Button 
                type={'secondary'} 
                className={styles['editor-footer-button']} 
                style={{ animationDelay: '240ms' }}
                onClick={canClick ? onCancel : undefined}
            >
                {creating ? (
                    'Abort'
                ) : (
                    'Cancel Editing'
                )}
            </Button>
            <Button 
                className={styles['editor-footer-button']} 
                style={{ animationDelay: '280ms' }}
                onClick={canClick ? onSave : undefined}
            >
                {creating ? (
                    'Create Item'
                ) : (
                    'Save Changes'
                )}
            </Button>
            {!creating && (
                <Button 
                    type={'danger'} 
                    className={styles['editor-footer-button']} 
                    style={{ animationDelay: '320ms' }}
                    onClick={canClick ? onDelete : undefined}
                >
                    {deleting ? (
                        'Deleting...'
                    ) : (
                        'Delete Item'
                    )}
                </Button>
            )}
        </div>
    )
}