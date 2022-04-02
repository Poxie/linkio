import React from 'react';
import styles from '../../../styles/Admin.module.scss';
import { AppearanceCustomizing } from './AppearanceCustomizing';
import { AppearancePreview } from './AppearancePreview';

export const AdminAppearancePage = () => {
    return(
        <div className={styles['appearance']}>
            <AppearanceCustomizing />
            <AppearancePreview />
        </div>
    )
}