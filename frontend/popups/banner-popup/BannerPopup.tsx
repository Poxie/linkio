import React from 'react';
import { EditIcon } from '../../icons/EditIcon';
import { UploadIcon } from '../../icons/UploadIcon';
import styles from './BannerPopup.module.scss';

export const BannerPopup: React.FC<{
    showColorPicker: () => void;
    showImagePicker: () => void;
}> = ({ showColorPicker, showImagePicker }) => {
    return(
        <div className={styles.container}>
            <div className={styles.item} onClick={showColorPicker}>
                <EditIcon />
                Banner Color
            </div>
            <div className={styles.item} onClick={showImagePicker}>
                <UploadIcon />
                Banner Image
            </div>
        </div>
    )
}