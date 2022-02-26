import Image from 'next/image';
import React from 'react';
import styles from '../../styles/User.module.scss';

export const UserAvatar: React.FC<{avatarURL?: string}> = ({ avatarURL }) => {
    if(!avatarURL) return null;

    return(
        <div className={styles.avatar}>
            <div className={styles['avatar-container']}>
                <Image 
                    src={avatarURL}
                    layout={'fill'}
                    objectFit={'cover'}
                />
            </div>
        </div>
    )
}