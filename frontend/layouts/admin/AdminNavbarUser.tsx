import Image from 'next/image';
import React from 'react';
import { selectMeDisplay } from '../../redux/me/meSelectors';
import { useAppSelector } from '../../redux/store';
import styles from './AdminLayout.module.scss';

export const AdminNavbarUser = () => {
    const { name, username, avatarURL } = useAppSelector(selectMeDisplay);
    return(
        <div className={styles['user-dropdown']}>
            <div className={styles['avatar']}>
                {avatarURL && (
                    <Image 
                        src={avatarURL}
                        layout={'fill'}
                        objectFit={'contain'}
                    />
                )}
            </div>
            <span>
                {name || username}
            </span>
        </div>
    )
}