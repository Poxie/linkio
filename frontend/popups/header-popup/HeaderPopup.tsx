import React from 'react';
import { EditIcon } from '../../icons/EditIcon';
import { UploadIcon } from '../../icons/UploadIcon';
import styles from './HeaderPopup.module.scss';

export const HeaderPopup: React.FC<{
    showColorPicker?: () => void;
    showImagePicker: () => void;
    type: 'Banner' | 'Avatar';
}> = ({ showColorPicker, showImagePicker, type }) => {
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
        </div>
    )
}