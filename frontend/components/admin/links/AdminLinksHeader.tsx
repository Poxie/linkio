import React from 'react';
import { Button } from '../../Button';
import styles from '../../../styles/Admin.module.scss';
import { useDispatch } from 'react-redux';
import { setMeItems } from '../../../redux/me/meActions';
import { useAppSelector } from '../../../redux/store';
import { selectMeId, selectMeItems } from '../../../redux/me/meSelectors';
import { createUserItem } from '../../../utils';
import { useState } from 'react';
import { LoadingSpinner } from '../../loading-spinner/LoadingSpinner';

export const AdminLinksHeader = () => {
    const dispatch = useDispatch();
    const myItems = useAppSelector(selectMeItems);
    const myId = useAppSelector(selectMeId);
    const [loading, setLoading] = useState(false);

    const addNewLink = async () => {
        if(!myItems || !myId || loading) return;
        
        setLoading(true);

        // Creating an empty item for the user to update
        const item = await createUserItem({ content: '', url: '', userId: myId });

        setLoading(false);
        
        // Pushing new item to redux
        dispatch(setMeItems([...myItems, ...[item]]));
    }

    return(
        <div className={styles['links-header']}>
            <span className={styles['links-header-text']}>
                My Links
            </span>
            <div className={styles['links-header-main']}>
                <Button onClick={addNewLink} className={styles['add-item-button']}>
                    {!loading ? ('Add New Link') : (<LoadingSpinner />)}
                </Button>
            </div>
        </div>
    )
}