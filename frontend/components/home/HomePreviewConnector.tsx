import React from 'react';
import styles from '../../styles/Home.module.scss';

export const HomePreviewConnector = () => {
    return(
        <div className={styles['preview-connector']}>
            <div className={styles['connector-top']} />
            <div className={styles['connector-bottom']} />
        </div>
    )
}