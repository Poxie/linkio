import React from 'react';
import styles from '../../styles/Home.module.scss';
import { HomeIcons } from './HomeIcons';
import { HomePreview } from './HomePreview';

export const HomeMain = () => {
    return(
        <div className={styles.main}>
            <h1 className={styles.header}>
                Your links unified in one place.
            </h1>
            <HomeIcons />
            <HomePreview />
        </div>
    )
}