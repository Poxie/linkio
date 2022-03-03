import React, { createRef, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditIcon } from '../../icons/EditIcon';
import { useAppSelector } from '../../redux/store';
import { setUserItem } from '../../redux/user/userActions';
import { selectUserIsMe } from '../../redux/user/userSelectors';
import styles from '../../styles/User.module.scss';
import { updateUserItem } from '../../utils';
import { Item, User } from '../../utils/types';
import { useSortable } from '../SortableItems';
import { HasEditorContainer, useEditor } from './HasEditorContainer';
import { UserItemIcon } from './UserItemIcon';

export const UserItem: React.FC<User['items'][0]> = React.memo((item) => {
    const dispatch = useDispatch();
    const { disableDragging, enableDragging } = useSortable();
    const itemBeforeChange = useRef(item);

    const onChange = (item: Item) => {
        dispatch(setUserItem(item));
    }
    const onSave = async (item: Item) => {
        await updateUserItem(item);
        itemBeforeChange.current = item;
    }
    const onCancel = async () => {
        dispatch(setUserItem(itemBeforeChange.current));
        enableDragging();
    }
    const onStartEditing = () => {
        disableDragging();
    }

    return(
        <HasEditorContainer 
            item={item}
            onChange={onChange}
            onSave={onSave}
            onCancel={onCancel}
            onStartEditing={onStartEditing}
        >
            <Item {...item} />
        </HasEditorContainer>
    )
});
const Item: React.FC<Item> = (item) => {
    const isMe = useAppSelector(selectUserIsMe);
    const { startEditing, cancel, editing } = useEditor();
    const ref = useRef<HTMLDivElement>(null);

    const className = [styles['item'], isMe && styles['my-item']].join(' ');
    return(
        <a href={!isMe ? item.url : undefined} target="_blank">
            <div className={className} ref={ref}>
                <UserItemIcon iconURL={item.iconURL} />

                <span className={styles['item-text']}>
                    {item.content}
                </span>

                {isMe && (
                    <div className={styles['edit-icon']} onClick={editing ? cancel : startEditing}>
                        <EditIcon />
                    </div>
                )}
            </div>
        </a>
    )
}