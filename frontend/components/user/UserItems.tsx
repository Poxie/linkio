import React from 'react';
import styles from '../../styles/User.module.scss';
import { useAppSelector } from '../../redux/store';
import { selectUserIsMe, selectUserItems } from '../../redux/user/userSelectors';
import { UserItem } from './UserItem';
import { CreateItemButton } from './CreateItemButton';
import { SortableItems } from '../SortableItems';
import { Item } from '../../utils/types';
import { updateUserItem } from '../../utils';

export const UserItems = () => {
    const items = useAppSelector(selectUserItems);
    const isMe = useAppSelector(selectUserIsMe);

    const onOrderChange = (newItems: Item[]) => {
        if(!items) return;

        newItems.forEach(item => {
            updateUserItem({ id: item.id, order: item.order });
        })
    }

    return(
        <>
            {isMe ? (
                <>
                <div className={styles['item-container']}> 
                    <SortableItems 
                        data={items || []}
                        renderComponent={UserItem}
                        onDrop={onOrderChange}
                    />
                </div>
                <CreateItemButton />
                </>
            ) : (
                <div className={styles['item-container']}> 
                    {items?.map(item => <UserItem {...item} key={item.id} />)}
                </div>
            )}
        </>
    )
}