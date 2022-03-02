import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { createRef, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditIcon } from '../../icons/EditIcon';
import { useAppSelector } from '../../redux/store';
import { setUserItem } from '../../redux/user/userActions';
import { selectUserIsMe } from '../../redux/user/userSelectors';
import styles from '../../styles/User.module.scss';
import { updateUserItem } from '../../utils';
import { Item, User } from '../../utils/types';
import { useSortable } from '../SortableItems';
import { EditorContainer } from './EditorContainer';
import { UserItemIcon } from './UserItemIcon';

export const UserItem: React.FC<User['items'][0]> = React.memo((item) => {
    const dispatch = useDispatch();
    const { disableDragging, enableDragging } = useSortable();
    const [isEditing, setIsEditing] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const editorRef = createRef<HTMLDivElement>();
    const isMe = useAppSelector(selectUserIsMe);

    const stopEditing = () => {
        setTimeout(() => {
            if(!ref.current) return;
            ref.current.style.zIndex = "unset";
        }, 200);

        setIsEditing(false);
        enableDragging();

        if(!ref.current) return;
        ref.current.style.transform = 'translateY(0)';
    }
    const edit = () => {
        if(!ref.current) return;

        ref.current.style.zIndex = "1000";

        setIsEditing(true);
        disableDragging();
        
        // Checking if edit container exceeds height
        setTimeout(() => {
            if(!ref.current || !ref.current.firstChild) return;

            // @ts-ignore
            const { top } = ref.current.firstChild.getBoundingClientRect();
            if(top < 30) {
                ref.current.style.transition = 'transform .3s';
                ref.current.style.transform = `translateY(${Math.abs(top) + 35}px)`;
                console.log(ref.current)
            }
        }, 0);
    }
    const toggleIsEditing = () => {
        isEditing ? stopEditing() : edit();
    }
    const onSave = async (item: Item) => {
        await updateUserItem(item);
        stopEditing();
    }

    const className = [styles['item'], isMe && styles['my-item']].join(' ');
    return(
        <a href={!isMe ? item.url : undefined} target="_blank">
            <div className={className} ref={ref}>
                {isMe && (
                    <AnimatePresence>
                        {isEditing && (
                            <EditorContainer 
                                item={item}
                                onChange={newItem => dispatch(setUserItem(newItem))}
                                onSave={onSave}
                                onCancel={stopEditing}
                                ref={editorRef}
                            />
                        )}
                    </AnimatePresence>
                )}

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
            {isMe && (
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
            )}
        </a>
    )
});