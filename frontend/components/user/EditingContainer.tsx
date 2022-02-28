import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/store';
import { setUserItem } from '../../redux/user/userActions';
import { selectUserItemById } from '../../redux/user/userSelectors';
import styles from '../../styles/User.module.scss';
import { Item } from '../../utils/types';
import { Input } from '../Input';
import { EditorContainerHeader } from './EditorContainerHeader';
import { EditorContainerPresets } from './EditorContainerPresets';

export const EditorContainer: React.FC<{itemId: string}> = ({ itemId }) => {
    const dispatch = useDispatch();
    const item = useAppSelector(state => selectUserItemById(state, itemId));
    const [tempItem, setTempItem] = useState(item);

    const updateProperty = (property: keyof Item, value: any) => {
        setTempItem(prev => {
            const newItem = {
                ...prev,
                [property]: value
            } as Item;

            dispatch(setUserItem(newItem));
            
            return newItem;
        })
    }

    return(
        <div className={styles['editor-container']}>
            <EditorContainerHeader />
            <Input 
                placeholder={'Item description...'}
                className={styles['editor-input']}
                value={item?.content}
                onChange={value => updateProperty('content', value)}
            />
            <EditorContainerPresets active={item?.icon} />
        </div>
    )
}