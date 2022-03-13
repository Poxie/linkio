import React, { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.scss';
import { IMAGE_ENDPOINT } from '../../utils/constants';
import { UserAvatar } from '../user/UserAvatar';
import { usePreview } from './HomePreview';

export const HomePreviewScreen = () => {
    return(
        <div className={styles['preview-screen']}>
            <div className={styles['preview-screen-top-buttons']} />

            <div className={styles['preview-background']} style={{  }} />
            
            <div className={styles['preview-header']}>
                <div className={styles['preview-banner']} />
                <HomePreviewAvatar />
                <HomePreviewUsername />
            </div>

            {[0,1,2].map(i => (
                <div 
                    className={styles['preview-item']}
                    style={{ animationDelay: `${60 * i + 400}ms` }}
                    key={i} 
                />
            ))}
        </div>
    )
}

const HomePreviewUsername = () => {
    const { username } = usePreview();

    return(
        <h1 className={styles['preview-username']}>
            {username || 'yourusernamehere'}
        </h1>
    )
}

const AVAILABLE_AVATARS = 3;
const HomePreviewAvatar = () => {
    const [avatar, setAvatar] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setAvatar(prev => {
                let newIndex = prev + 1;
                if(newIndex >= AVAILABLE_AVATARS) {
                    newIndex = 0;
                }
                return newIndex;
            })
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return(
        <div className={styles['preview-avatar']}>
            <div className={styles['preview-avatar-img']} style={{ backgroundImage: `url(${IMAGE_ENDPOINT}/avatars/placeholder${avatar}.png)` }} />
        </div>
    )
}