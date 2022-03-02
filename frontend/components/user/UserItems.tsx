import React from 'react';
import styles from '../../styles/User.module.scss';
import { useAppSelector } from '../../redux/store';
import { selectUserIsMe, selectUserItems } from '../../redux/user/userSelectors';
import { UserItem } from './UserItem';
import { CreateItemButton } from './CreateItemButton';
import { SortableItems } from '../SortableItems';

export const UserItems = () => {
    const items = useAppSelector(selectUserItems);
    const isMe = useAppSelector(selectUserIsMe);

    return(
        <>
            {isMe ? (
                <>
                <div className={styles['item-container']}> 
                    <SortableItems 
                        data={items || []}
                        renderComponent={UserItem}
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