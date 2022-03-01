import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/store';
import { setUser, setUserItem } from '../../redux/user/userActions';
import { selectUserItemById } from '../../redux/user/userSelectors';
import styles from '../../styles/User.module.scss';
import { updateUserItem } from '../../utils';
import { IMAGE_ENDPOINT } from '../../utils/constants';
import { Item } from '../../utils/types';
import { Input } from '../Input';
import { EditorContainerHeader } from './EditorContainerHeader';
import { EditorContainerPresets } from './EditorContainerPresets';

type Props = {
    item: Item;
    onChange: (item: Item) => void;
    onUpdate: (item: Item) => void;
    creating?: boolean;
}
export const EditorContainer: React.FC<Props> = ({ item, onChange, onUpdate, creating }) => {
    const dispatch = useDispatch();
    const itemRef = useRef(item);

    // Updating reference on item change
    useEffect(() => {
        itemRef.current = item;
    }, [item]);

    // Updating user on unmount
    useEffect(() => {
        return () => {
            if(!itemRef.current) return;
            
            // If no changes have been made
            if(JSON.stringify(itemRef.current) === JSON.stringify(item)) return;

            // Updating user
            onUpdate(itemRef.current);
        }
    }, []);

    const updateProperty = (property: keyof Item | (keyof Item)[], value: any | any[]) => {
        let newItem: Item;

        if(Array.isArray(property)) {
            newItem = {...itemRef.current};
            property.forEach((prop, key) => {
                newItem[prop] = value[key];
            })
        } else {
            newItem = {
                ...itemRef.current,
                [property]: value
            } as Item;
        }

        onChange(newItem);
    }

    return(
        <motion.div 
            className={styles['editor-container']} 
            animate={{ opacity: 1, translateY: 0 }} 
            initial={{ opacity: 0, translateY: 20 }}
            exit={{ opacity: 0, translateY: 20 }}
        >
            <EditorContainerHeader header={creating ? 'Create' : 'Customize'} />
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
                    updateProperty(['iconURL', 'icon'], [`${IMAGE_ENDPOINT}/icons/${value}.png`, value]);
                }}
            />
        </motion.div>
    )
}