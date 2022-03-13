import React from 'react';
import styles from './IconPopup.module.scss';
import { MEDIA_COLORS, MEDIA_DESCRIPTIONS, MEDIA_NAMES } from '../../utils/constants';

export const IconPopup: React.FC<{
    media: string;
    icon: any;
}> = (props) => {
    const media = props.media as keyof typeof MEDIA_COLORS;
    const color = MEDIA_COLORS[media];
    const title = MEDIA_NAMES[media];
    const description = MEDIA_DESCRIPTIONS[media];
    return(
        <div className={styles.container}>
            <div 
                className={styles.banner}
                style={{ backgroundColor: color }}
            >
                {<props.icon />}
            </div>
            <span className={styles['title']}>
                {title}
            </span>
            <span className={styles['description']}>
                {description}
            </span>
        </div>
    )
}