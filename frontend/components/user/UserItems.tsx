import React from 'react';
import styles from '../../styles/User.module.scss';
import { useAppSelector } from '../../redux/store';
import { selectUserIsMe, selectUserItems } from '../../redux/user/userSelectors';
import { UserItem } from './UserItem';
import { CreateItemButton } from './CreateItemButton';
import { SortableItems } from '../SortableItems';
import { Item } from '../../utils/types';
import { updateUserItem, updateUserItems } from '../../utils';
import { useDispatch } from 'react-redux';
import { setUserItem, setUserItems } from '../../redux/user/userActions';
import { selectMeId } from '../../redux/me/userSelectors';

export const UserItems = () => {
    const dispatch = useDispatch();
    const items = useAppSelector(selectUserItems);
    const isMe = useAppSelector(selectUserIsMe);
    const myId = useAppSelector(selectMeId);

    const onDragEnd = async (items: Item[]) => {
        if(!items || !myId) return;

        console.log(items);
        const newItems = await updateUserItems(myId, items);
        console.log(newItems);
        // dispatch(setUserItems(itemsToUpdate));
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