import React from 'react';
import styles from '../../../styles/Admin.module.scss';
import { AnimatePresence } from 'framer-motion';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMeItem, setMeItems } from '../../../redux/me/meActions';
import { selectMeId, selectMeItems } from '../../../redux/me/meSelectors';
import { useAppSelector } from '../../../redux/store';
import { setUserItem, setUserItems } from '../../../redux/user/userActions';
import { selectUserIsMe } from '../../../redux/user/userSelectors';
import { updateUserItem, updateUserItems } from '../../../utils';
import { Item } from '../../../utils/types';
import { SortableItems } from '../../SortableItems';
import { AdminLink } from './AdminLink';
import { Button } from '../../Button';

export type AdminLinkChange = (id: string, type: keyof Item, value: any, update?: boolean) => void;
export type AdminLinkBlur = (id: string) => void;
export const AdminLinks = () => {
    const dispatch = useDispatch();
    const myId = useAppSelector(selectMeId);
    const isMe = useAppSelector(selectUserIsMe);
    const links = (useAppSelector(selectMeItems) || []).sort((a,b) => a.order - b.order);

    // Updating local changes
    const onChange: AdminLinkChange = (id, type, value, update) => {
        const newLinks = links.map(link => {
            if(link.id === id) {
                link = {...link};
                link[type] = value as never;
                if(update) {
                    updateUserItem(link);
                }
            }
            return link;
        })
        dispatch(setMeItems(newLinks));

        // If user stored in redux store is me, update store
        if(isMe) {
            dispatch(setUserItems(newLinks));
        }
    }

    // Updating database with local changes on input blur
    const onBlur: AdminLinkBlur = useCallback(async (id) => {
        const link = links.find(l => l.id === id);
        if(!link) return;

        const newLink = await updateUserItem(link);
        dispatch(setMeItem(newLink));
        
        // If user stored in redux store is me, update store
        if(isMe) {
            dispatch(setUserItem(newLink));
        }
    }, [links]);

    // Updating link order
    const onDragEnd = async (items: Item[]) => {
        if(!myId) return;

        // Updating database
        const newItems = await updateUserItems(myId, items);

        // Updating interface
        dispatch(setMeItems(newItems));

        // If user stored in redux store is me, update store
        if(isMe) {
            dispatch(setUserItems(newItems));
        }
    }

    const newLinks: (Item & {onChange: AdminLinkChange, onBlur: AdminLinkBlur})[] = links.map(link => ({
        ...link,
        onChange,
        onBlur
    }));
    return(
        <AnimatePresence>
            {newLinks.length === 0 && (
                <div className={styles['empty-links']}>
                    Looks like you don't have any items yet.
                </div>
            )}
            <SortableItems 
                items={newLinks}
                component={AdminLink}
                onDragEnd={onDragEnd}
            />
        </AnimatePresence>
    )
}