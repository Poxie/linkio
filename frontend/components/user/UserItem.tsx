import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditIcon } from '../../icons/EditIcon';
import { useAppSelector } from '../../redux/store';
import { setUserItem } from '../../redux/user/userActions';
import { selectUserIsMe } from '../../redux/user/userSelectors';
import styles from '../../styles/User.module.scss';
import { updateUserItem } from '../../utils';
import { User } from '../../utils/types';
import { EditorContainer } from './EditorContainer';
import { UserItemIcon } from './UserItemIcon';

export const UserItem: React.FC<User['items'][0]> = React.memo((item) => {
    const dispatch = useDispatch();
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
                        <EditorContainer 
                            item={item}
                            onChange={newItem => dispatch(setUserItem(newItem))}
                            onUpdate={newItem => updateUserItem(newItem)}
                        />
                    )}
                </AnimatePresence>

                <UserItemIcon iconURL={item.iconURL} />

                <span className={styles['item-text']}>
                    {item.content}
                </span>
                {isMe && (
                    <div className={styles['edit-icon']} onClick={toggleIsEditing}>
                        <EditIcon />
                    </div>
                )}
            </div>
            <AnimatePresence>
                {isEditing && (
                    <motion.div 
                        className={styles.backdrop} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isEditing ? 1 : 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: .200 }}
                        style={{ pointerEvents: isEditing ? 'all' : 'none' }}
                        onClick={stopEditing} 
                        layout
                    />
                )}
            </AnimatePresence>
        </a>
    )
});