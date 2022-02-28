import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/store';
import { setUserItem } from '../../redux/user/userActions';
import { selectUserItemById } from '../../redux/user/userSelectors';
import styles from '../../styles/User.module.scss';
import { IMAGE_ENDPOINT } from '../../utils/constants';
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
        <motion.div 
            className={styles['editor-container']} 
            animate={{ opacity: 1, translateY: 0 }} 
            initial={{ opacity: 0, translateY: 20 }}
            exit={{ opacity: 0, translateY: 20 }}
        >
            <EditorContainerHeader />
            <Input 
                label={'Description'}
                placeholder={'Item description...'}
                className={styles['editor-input']}
                value={item?.content}
                onChange={value => updateProperty('content', value)}
            />
            <Input 
                label={'URL'}
                placeholder={`https://example.com/myusername`}
                className={styles['editor-input']}
                value={item?.url}
                onChange={value => updateProperty('url', value)}
            />
            <EditorContainerPresets 
                active={item?.icon}
                onClick={value => {
                    updateProperty('icon', value);
                    updateProperty('iconURL', `${IMAGE_ENDPOINT}/icons/${value}.png`);
                }}
            />
        </motion.div>
    )
}