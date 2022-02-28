import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { EditIcon } from '../../icons/EditIcon';
import { useAppSelector } from '../../redux/store';
import { selectUserIsMe } from '../../redux/user/userSelectors';
import styles from '../../styles/User.module.scss';
import { User } from '../../utils/types';
import { EditorContainer } from './EditingContainer';

export const UserItem: React.FC<User['items'][0]> = (item) => {
    const [isEditing, setIsEditing] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const isMe = useAppSelector(selectUserIsMe);

    const edit = () => {
        if(!ref.current) return;

        ref.current.style.zIndex = "1000";

        setIsEditing(true);
    }

    return(
        <a href={!isMe ? item.url : undefined} className={isMe ? styles['is-my-item'] : ''} target="_blank">
            <div className={styles.item} ref={ref}>
                {isEditing && (
                    <EditorContainer itemId={item.id} />
                )}

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
                    <div className={styles['edit-icon']} onClick={edit}>
                        <EditIcon />
                    </div>
                )}
            </div>
            {isEditing && (
                <div className={styles.backdrop} />
            )}
        </a>
    )
}