import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { Item } from '../../utils/types';
import styles from '../../styles/User.module.scss';
import { UserItemIcon } from './UserItemIcon';
import { useDispatch } from 'react-redux';
import { createUserItem } from '../../utils';
import { setUserItem } from '../../redux/user/userActions';
import { useAppSelector } from '../../redux/store';
import { selectMeId } from '../../redux/me/userSelectors';
import { EditorContainer } from './EditorContainer';

const TEMP_ITEM = {
    id: 'temp-item',
    content: '',
    url: '',
    icon: '',
    iconURL: ''
};
export const CreateItemButton = () => {
    const dispatch = useDispatch();
    const myId = useAppSelector(selectMeId);
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState<Item>(TEMP_ITEM);
    const ref = useRef<HTMLDivElement>(null);

    const toggleOpen = () => {
        setOpen(prev => {
            if(prev) {
                setTimeout(() => {
                    if(!ref.current) return;
                    ref.current.style.zIndex = "unset";
                }, 200);
            } else {
                if(ref.current) {                   
                    ref.current.style.zIndex = "2000";
                }
            }

            return !prev;
        })
    };

    const onSave = async (item: Item) => {
        console.log('saving');
        if(!myId) return;

        // Creating new item
        const newItem: Item = await createUserItem({...item, userId: myId});
        
        // Displaying new item
        dispatch(setUserItem(newItem));

        // Resetting item state
        setItem(TEMP_ITEM);
    }

    const className = [
        styles['add-item'],
        open ? styles['editing'] : ''
    ].join(' ');
    return(
        <div style={{ position: 'relative' }} ref={ref}>
            {open && (
                <EditorContainer 
                    item={item}
                    onChange={setItem}
                    onSave={onSave}
                    onCancel={toggleOpen}
                    creating={true}
                />
            )}

            <div className={className} onClick={toggleOpen}>
                {open ? (
                    <>
                    <UserItemIcon iconURL={item.iconURL} />
                    
                    {item.content}
                    </>
                ) : (
                    'Add Item'
                )}
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div 
                        className={styles.backdrop} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: open ? 1 : 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: .200 }}
                        style={{ pointerEvents: open ? 'all' : 'none', zIndex: -1 }}
                        onClick={toggleOpen} 
                        layout
                    />
                )}
            </AnimatePresence>
        </div>
    )
}