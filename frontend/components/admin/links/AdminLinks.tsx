import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMeItems } from '../../../redux/me/meActions';
import { selectMeItems } from '../../../redux/me/meSelectors';
import { useAppSelector } from '../../../redux/store';
import { updateUserItem } from '../../../utils';
import { Item } from '../../../utils/types';
import { AdminLink } from './AdminLink';

export type AdminLinkChange = (id: string, type: keyof Item, value: any) => void;
export type AdminLinkBlur = (id: string) => void;
export const AdminLinks = () => {
    const dispatch = useDispatch();
    const _links = useAppSelector(selectMeItems) || [];
    const [links, setLinks] = useState(_links);

    useEffect(() => setLinks(_links), [_links]);

    // Comparing new item with previous item
    const hasChanged = useCallback((id: string) => {
        const _link = _links.find(l => l.id === id);
        const link = links.find(l => l.id === id);
        return JSON.stringify(_link) !== JSON.stringify(link);
    }, [_links, links])

    // Updating local changes
    const onChange: AdminLinkChange = (id, type, value) => {
        setLinks(prev => {
            const newLinks = prev.map(link => {
                if(link.id === id) {
                    link = {...link};
                    link[type] = value as never;
                }
                return link;
            })
            return newLinks;
        })
    }

    // Updating database with local changes on input blur
    const onBlur: AdminLinkBlur = useCallback((id) => {
        const link = links.find(l => l.id === id);
        console.log(hasChanged(id));
        if(!link || !hasChanged(id)) return;

        updateUserItem(link);
        dispatch(setMeItems(links))
    }, [links, _links]);

    return(
        <AnimatePresence>
            {links.map(link => {
                return(
                    <AdminLink 
                        {...link}
                        onChange={onChange}
                        onBlur={onBlur}
                        key={link.id}
                    />
                )
            })}
        </AnimatePresence>
    )
}