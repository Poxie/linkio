import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Item } from '../../utils/types';
import styles from '../../styles/User.module.scss';
import { UserItemIcon } from './UserItemIcon';
import { useDispatch } from 'react-redux';
import { createUserItem } from '../../utils';
import { setUserItem } from '../../redux/user/userActions';
import { useAppSelector } from '../../redux/store';
import { selectMeId } from '../../redux/me/userSelectors';
import { EditorContainer } from './EditorContainer';
import { useIsMobile } from '../../hooks/isMobile';
import { HasEditorContainer, useEditor } from './HasEditorContainer';
import { selectUserItemById } from '../../redux/user/userSelectors';

const TEMP_ITEM = {
    id: 'temp-item',
    content: '',
    url: '',
    icon: '',
    iconURL: '',
    order: Infinity
};
export const CreateItemButton = () => {
    const dispatch = useDispatch();
    const myId = useAppSelector(selectMeId);
    const [item, setItem] = useState<Item>(TEMP_ITEM);

    const onCancel = () => {
        
    }
    const onChange = (item: Item) => {
        setItem(item);
    }
    const onSave = async (item: Item) => {
        if(!myId) return;

        // Creating and displaying new item
        const newItem = await createUserItem({...item, userId: myId });
        dispatch(setUserItem(newItem));

        // Restoring temp item state
        setItem(TEMP_ITEM);
    }

    return(
        <HasEditorContainer 
            item={item}
            onCancel={onCancel}
            onChange={onChange}
            onSave={onSave}
            creating={true}
        >
            <Item {...item} />
        </HasEditorContainer>
    )
}
const Item: React.FC<Item> = (item) => {
    const { editing, cancel, startEditing } = useEditor();

    const className = [
        styles['add-item'],
        editing ? styles['editing'] : ''
    ].join(' ');
    return(
        <div className={className} onClick={editing ? cancel : startEditing}>
            {editing ? (
                <>
                <UserItemIcon iconURL={item.iconURL} />
                
                {item.content}
                </>
            ) : (
                'Add Item'
            )}
        </div>
    )
}