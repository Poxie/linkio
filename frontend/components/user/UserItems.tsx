import React from 'react';
import styles from '../../styles/User.module.scss';
import { useAppSelector } from '../../redux/store';
import { selectUserIsMe, selectUserItems } from '../../redux/user/userSelectors';
import { UserItem } from './UserItem';
import { CreateItemButton } from './CreateItemButton';
import { SortableItems } from '../SortableItems';
import { Item } from '../../utils/types';
import { updateUserItem } from '../../utils';
import { useDispatch } from 'react-redux';
import { setUserItem, setUserItems } from '../../redux/user/userActions';

export const UserItems = () => {
    const dispatch = useDispatch();
    const items = useAppSelector(selectUserItems);
    const isMe = useAppSelector(selectUserIsMe);

    const onDragEnd = async (newItems: Item[]) => {
        if(!items) return;

        const itemsToUpdate = [];
        for(const item of newItems) {
            const newItem = await updateUserItem({ id: item.id, order: item.order });
            itemsToUpdate.push(newItem);
        }
        
        dispatch(setUserItems(itemsToUpdate));
    }

    return(
        <>
            {isMe ? (
                <>
                <div className={styles['item-container']}> 
                    <SortableItems 
                        data={items || []}
                        renderComponent={UserItem}
                        onDragEnd={onDragEnd}
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