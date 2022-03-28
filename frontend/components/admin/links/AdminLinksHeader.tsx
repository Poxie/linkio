import React from 'react';
import { Button } from '../../Button';
import styles from '../../../styles/Admin.module.scss';
import { useDispatch } from 'react-redux';
import { setMeItems } from '../../../redux/me/meActions';
import { useAppSelector } from '../../../redux/store';
import { selectMeId, selectMeItems } from '../../../redux/me/meSelectors';
import { createUserItem } from '../../../utils';

export const AdminLinksHeader = () => {
    const dispatch = useDispatch();
    const myItems = useAppSelector(selectMeItems);
    const myId = useAppSelector(selectMeId);

    const addNewLink = async () => {
        if(!myItems || !myId) return;

        // Creating an empty item for the user to update
        const item = await createUserItem({ content: '', url: '', userId: myId });

        // Pushing new item to redux
        dispatch(setMeItems([...myItems, ...[item]]));
    }

    return(
        <div className={styles['links-header']}>
            <span className={styles['links-header-text']}>
                My Links
            </span>
            <div className={styles['links-header-main']}>
                <Button onClick={addNewLink}>
                    Add New Link
                </Button>
            </div>
        </div>
    )
}