import React from 'react';
import styles from '../../styles/User.module.scss';
import { InstagramIcon } from '../../icons/InstagramIcon';
import { TwitchIcon } from '../../icons/TwitchIcon';
import { TwitterIcon } from '../../icons/TwitterIcon';
import { YouTubeArrowIcon } from '../../icons/YouTubeArrowIcon';
import { CheckIcon } from '../../icons/CheckIcon';

const presets = [
    { id: 'youtube', background: '#FF4745', icon: <YouTubeArrowIcon /> },
    { id: 'twitch', background: '#9147FF', icon: <TwitchIcon /> },
    { id: 'twitter', background: '#1B9BF0', icon: <TwitterIcon /> },
    { id: 'instagram', background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', icon: <InstagramIcon /> },
]
export const EditorContainerPresets: React.FC<{active?: string, onClick: (type: string | null) => void}> = ({ active, onClick }) => {
    return(
        <div className={styles['preset-container']}>
            {presets.map((item, key) => {
                const { id, background, icon } = item;

                const isActive = id === active;
                const className = [styles['preset-item'], isActive && styles['active-preset']].join(' ');
                return(
                    <div 
                        className={styles['preset-item-container']} 
                        style={{ animationDelay: `${key * 80 + 100}ms` }}
                        key={id}
                    >
                        <div 
                            className={className} 
                            style={{ background }} 
                            onClick={() => onClick(isActive ? null : id)}
                        >
                            {icon}

                            {isActive && (
                                <div className={styles['preset-check']}>
                                    <CheckIcon />
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}