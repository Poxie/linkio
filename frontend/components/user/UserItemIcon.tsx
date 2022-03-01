import React from 'react';
import Image from 'next/image';
import styles from '../../styles/User.module.scss';

export const UserItemIcon: React.FC<{iconURL?: string}> = ({ iconURL }) => {
    return(
        <>
        {iconURL && (
            <div className={styles['item-icon']}>
                <div className={styles['item-icon-container']}>
                    <Image 
                        src={iconURL}
                        layout={'fill'}
                        objectFit={'contain'}
                    />
                </div>
            </div>
        )}
        </>
    )
}