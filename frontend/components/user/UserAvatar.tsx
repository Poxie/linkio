import Image from 'next/image';
import React from 'react';
import styles from '../../styles/User.module.scss';

export const UserAvatar: React.FC<{avatarURL?: string}> = ({ avatarURL }) => {
    return(
        <div className={styles.avatar}>
            <div className={styles['avatar-container']}>
                {avatarURL ? (
                    <Image 
                        src={avatarURL}
                        layout={'fill'}
                        objectFit={'cover'}
                    />
                ) : (
                    <span>
                        ?
                    </span>
                )}
            </div>
        </div>
    )
}