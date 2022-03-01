import React from 'react';
import styles from '../../styles/User.module.scss';
import { useAppSelector } from '../../redux/store';
import { selectUserItems } from '../../redux/user/userSelectors';
import { UserItem } from './UserItem';
import { CreateItemButton } from './CreateItemButton';

export const UserItems = () => {
    const items = useAppSelector(selectUserItems);
    if(!items?.length) return null;

    return(
        <div className={styles['item-container']}> 
            {items.map((item, key) => <UserItem {...item} key={key} />)}
            <CreateItemButton />
        </div>
    )
}