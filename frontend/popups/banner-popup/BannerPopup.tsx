import React from 'react';
import { EditIcon } from '../../icons/EditIcon';
import styles from './BannerPopup.module.scss';

export const BannerPopup: React.FC<{showColorPicker: () => void}> = ({ showColorPicker }) => {
    return(
        <div className={styles.container}>
            <div className={styles.item} onClick={showColorPicker}>
                <EditIcon />
                Banner Color
            </div>
            <div className={styles.item}>
                <EditIcon />
            </div>
        </div>
    )
}