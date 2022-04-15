import Image from 'next/image';
import React, { useRef } from 'react';
import { usePopup } from '../../contexts/PopupProvider';
import { AdminUserPopup } from '../../popups/admin-user-popup/AdminUserPopup';
import { selectMeDisplay } from '../../redux/me/meSelectors';
import { useAppSelector } from '../../redux/store';
import styles from './AdminLayout.module.scss';

export const AdminNavbarUser = () => {
    const { setPopup } = usePopup();
    const { name, username, avatarURL } = useAppSelector(selectMeDisplay);
    const ref = useRef<HTMLDivElement>(null);
    
    const openPopup = () => {
        setPopup(
            <AdminUserPopup />,
            ref
        )
    }

    return(
        <div 
            className={styles['user-dropdown']} 
            onClick={openPopup} 
            ref={ref}
        >
            {avatarURL && (
                <div className={styles['avatar']}>
                        <Image 
                            src={avatarURL}
                            layout={'fill'}
                            objectFit={'contain'}
                        />
                </div>
            )}
            <span>
                {name || username}
            </span>
        </div>
    )
}