import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
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
    iconURL: '',
    order: Infinity
};
export const CreateItemButton = () => {
    const dispatch = useDispatch();
    const myId = useAppSelector(selectMeId);
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState<Item>(TEMP_ITEM);
    const ref = useRef<HTMLDivElement>(null);
    const indexRef = useRef<HTMLDivElement>(null)

    // If editor container exceeds height, escape into viewport
    useEffect(() => {
        if(!ref.current) return;
        if(!open) {
            ref.current.style.transform = 'translateY(0)';
            return;
        };

        // Checking if edit container exceeds height
        setTimeout(() => {
            if(!ref.current || !ref.current.firstChild) return;

            // @ts-ignore
            const { top } = ref.current.firstChild.getBoundingClientRect();
            if(top < 30) {
                ref.current.style.transition = 'transform .3s';
                ref.current.style.transform = `translateY(${Math.abs(top) + 35}px)`;
            }
        }, 0);
    }, [open]);

    const toggleOpen = () => {
        setOpen(prev => {
            if(prev) {
                setTimeout(() => {
                    if(!indexRef.current) return;
                    indexRef.current.style.zIndex = "unset";
                }, 200);
            } else {
                if(indexRef.current) {                   
                    indexRef.current.style.zIndex = "2000";
                }
            }

            return !prev;
        })
    };

    const onSave = async (item: Item) => {
        if(!myId) return;

        // Creating new item
        const newItem: Item = await createUserItem({...item, userId: myId});
        
        // Displaying new item
        dispatch(setUserItem(newItem));

        // Resetting item state
        setItem(TEMP_ITEM);

        // Toggling editor container
        toggleOpen();
    }

    const className = [
        styles['add-item'],
        open ? styles['editing'] : ''
    ].join(' ');
    return(
        <div style={{ position: 'relative' }} ref={indexRef}>
            <div ref={ref}>
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