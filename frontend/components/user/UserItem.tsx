import Image from 'next/image';
import React from 'react';
import { EditIcon } from '../../icons/EditIcon';
import { useAppSelector } from '../../redux/store';
import { selectUserIsMe } from '../../redux/user/userSelectors';
import styles from '../../styles/User.module.scss';
import { User } from '../../utils/types';

export const UserItem: React.FC<User['items'][0]> = (item) => {
    const isMe = useAppSelector(selectUserIsMe);

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
                {isMe && (
                    <div className={styles['edit-icon']}>
                        <EditIcon />
                    </div>
                )}
            </div>
        </a>
    )
}