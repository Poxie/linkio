import React from 'react';
import styles from '../../styles/User.module.scss';
import { InstagramIcon } from '../../icons/InstagramIcon';
import { TwitchIcon } from '../../icons/TwitchIcon';
import { TwitterIcon } from '../../icons/TwitterIcon';
import { YouTubeArrowIcon } from '../../icons/YouTubeArrowIcon';

const presets = [
    { id: 'youtube', background: '#FF4745', icon: <YouTubeArrowIcon /> },
    { id: 'twitch', background: '#9147FF', icon: <TwitchIcon /> },
    { id: 'twitter', background: '#1B9BF0', icon: <TwitterIcon /> },
    { id: 'instagram', background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', icon: <InstagramIcon /> },
]
export const EditorContainerPresets = () => {
    return(
        <div className={styles['preset-container']}>
            {presets.map(item => {
                const { id, background, icon } = item;

                return(
                    <div className={styles['preset-item']} style={{ background }} key={id}>
                        {icon}
                    </div>
                )
            })}
        </div>
    )
}