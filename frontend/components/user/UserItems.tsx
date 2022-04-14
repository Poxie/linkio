import React from 'react';
import styles from '../../styles/User.module.scss';
import { useAppSelector } from '../../redux/store';
import { selectUserIsMe, selectUserItems } from '../../redux/user/userSelectors';
import { UserItem } from './UserItem';
import { CreateItemButton } from './CreateItemButton';
import { Item } from '../../utils/types';
import { updateUserItem, updateUserItems } from '../../utils';
import { useDispatch } from 'react-redux';
import { selectMeId } from '../../redux/me/meSelectors';
import { SortableItems } from '../SortableItems';
import { setUserItems } from '../../redux/user/userActions';
import { setMeItems } from '../../redux/me/meActions';

export const UserItems = () => {
    const dispatch = useDispatch();
    const items = (useAppSelector(selectUserItems) || []).sort((a,b) => a.order - b.order);
    const isMe = useAppSelector(selectUserIsMe);
    const myId = useAppSelector(selectMeId);

    const onDragEnd = async (items: Item[]) => {
        if(!items || !myId) return;

        const newItems = await updateUserItems(myId, items);
        dispatch(setUserItems(newItems));
        if(isMe) {
            dispatch(setMeItems(newItems));
        }
    }

    return(
        <>
            {isMe ? (
                <>
                <div className={styles['item-container']}> 
                    <SortableItems 
                        items={items || []}
                        component={UserItem}
                        onDragEnd={onDragEnd}
                        spacing={'var(--spacing-primary) / 1.5'}
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