import Image from 'next/image';
import React from 'react';
import styles from '../../styles/User.module.scss';
import { User } from '../../utils/types';

export const UserItem: React.FC<User['items'][0]> = (item) => {
    return(
        <div className={styles.item}>
            {item.icon && (
                <div className={styles['item-icon']}>
                    <Image 
                        src={item.icon}
                        layout={'fill'}
                        objectFit={'contain'}
                    />
                </div>
            )}
            <span className={styles['item-text']}>
                {item.content}
            </span>
        </div>
    )
}