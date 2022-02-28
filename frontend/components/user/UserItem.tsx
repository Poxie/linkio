import { AnimatePresence, motion } from 'framer-motion';
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

    const stopEditing = () => {
        setTimeout(() => {
            if(!ref.current) return;
            ref.current.style.zIndex = "unset";
        }, 200);

        setIsEditing(false);
    }
    const edit = () => {
        if(!ref.current) return;

        ref.current.style.zIndex = "1000";

        setIsEditing(true);
    }
    const toggleIsEditing = () => {
        isEditing ? stopEditing() : edit();
    }

    return(
        <a href={!isMe ? item.url : undefined} className={isMe ? styles['is-my-item'] : ''} target="_blank">
            <div className={styles.item} ref={ref}>
                <AnimatePresence>
                    {isEditing && (
                        <EditorContainer itemId={item.id} />
                    )}
                </AnimatePresence>

                {item.iconURL && (
                    <div className={styles['item-icon']}>
                        <div className={styles['item-icon-container']}>
                            <Image 
                                src={item.iconURL}
                                layout={'fill'}
                                objectFit={'contain'}
                            />
                        </div>
                    </div>
                )}
                <span className={styles['item-text']}>
                    {item.content}
                </span>
                {isMe && (
                    <div className={styles['edit-icon']} onClick={toggleIsEditing}>
                        <EditIcon />
                    </div>
                )}
            </div>
            <motion.div 
                className={styles.backdrop} 
                animate={{ opacity: isEditing ? 1 : 0 }}
                transition={{ duration: .200 }}
                style={{ pointerEvents: isEditing ? 'all' : 'none' }}
                onClick={stopEditing} 
            />
        </a>
    )
}