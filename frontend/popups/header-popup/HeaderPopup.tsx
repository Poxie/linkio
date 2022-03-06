import React from 'react';
import { Button } from '../../components/Button';
import { EditIcon } from '../../icons/EditIcon';
import { UploadIcon } from '../../icons/UploadIcon';
import styles from './HeaderPopup.module.scss';

export const HeaderPopup: React.FC<{
    hasImage?: boolean;
    onRemove?: () => void;
    showColorPicker?: () => void;
    showImagePicker: () => void;
    type: 'Banner' | 'Avatar';
}> = ({ showColorPicker, showImagePicker, type, hasImage, onRemove }) => {
    return(
        <div>
            <div className={styles.container}>
                {showColorPicker && (
                    <div className={styles.item} onClick={showColorPicker}>
                        <EditIcon />
                        {type} Color
                    </div>
                )}
                <div className={styles.item} onClick={showImagePicker}>
                    <UploadIcon />
                    {type} Image
                </div>
            </div>
            {hasImage && (
                <Button 
                    className={styles['remove-button']}
                    type={'secondary'}
                    onClick={onRemove}
                >
                    Remove {type}
                </Button>
            )}
        </div>
    )
}