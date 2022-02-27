import Image from 'next/image';
import React from 'react';
import styles from '../../styles/User.module.scss';
import { User } from '../../utils/types';

export const UserItem: React.FC<User['items'][0]> = (item) => {
    return(
        <a href={item.url} target="_blank">
            <div className={styles.item}>
                {item.iconURL && (
                    <div className={styles['item-icon']}>
                        <Image 
                            src={item.iconURL}
                            layout={'fill'}
                            objectFit={'contain'}
                        />
                    </div>
                )}
                <span className={styles['item-text']}>
                    {item.content}
                </span>
            </div>
        </a>
    )
}