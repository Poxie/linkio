import React, { createRef, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditIcon } from '../../icons/EditIcon';
import { setMeItem } from '../../redux/me/meActions';
import { useAppSelector } from '../../redux/store';
import { setUserItem } from '../../redux/user/userActions';
import { selectUserIsMe } from '../../redux/user/userSelectors';
import styles from '../../styles/User.module.scss';
import { updateUserItem } from '../../utils';
import { Item, User } from '../../utils/types';
import { useSortable } from '../SortableItems';
import { EditButton } from './EditIcon';
import { HasEditorContainer, useEditor } from './HasEditorContainer';
import { UserItemIcon } from './UserItemIcon';

export const UserItem: React.FC<User['items'][0]> = React.memo((item) => {
    const dispatch = useDispatch();
    const isMe = useAppSelector(selectUserIsMe);
    const { disableDragging, enableDragging } = useSortable();
    const itemBeforeChange = useRef(item);

    // Enabling dragging if component unmount
    useEffect(() => {
        return enableDragging;
    }, []);

    // Updating itemBeforeChange ref on item order change
    useEffect(() => {
        itemBeforeChange.current = item;
    }, [item.order]);
    
    const onChange = (item: Item) => {
        dispatch(setUserItem(item));
        
        if(isMe) {
            dispatch(setMeItem(item));
        }
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
        <a href={!isMe ? item.url : undefined} target="_blank" rel="noreferrer">
            <div className={className} ref={ref}>
                <UserItemIcon iconURL={item.iconURL} />

                <span className={styles['item-text']}>
                    {item.content}
                    {!item.content && (
                        <i style={{ opacity: .8 }}>
                            Enter text...
                        </i>
                    )}
                </span>

                {isMe && (
                    <EditButton 
                        onClick={editing ? cancel : startEditing}
                    />
                )}
            </div>
        </a>
    )
}