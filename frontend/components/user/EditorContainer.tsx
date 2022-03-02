import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/store';
import { removeUserItem, setUser, setUserItem } from '../../redux/user/userActions';
import { selectUserItemById } from '../../redux/user/userSelectors';
import styles from '../../styles/User.module.scss';
import { destroyUserItem, updateUserItem } from '../../utils';
import { IMAGE_ENDPOINT } from '../../utils/constants';
import { Item } from '../../utils/types';
import { Input } from '../Input';
import { EditorContainerFooter } from './EditorContainerFooter';
import { EditorContainerHeader } from './EditorContainerHeader';
import { EditorContainerPresets } from './EditorContainerPresets';

type Props = {
    item: Item;
    onCancel?: () => void;
    onChange?: (item: Item) => void;
    onSave?: (item: Item) => void;
    creating?: boolean;
}
export const EditorContainer: React.FC<Props> = ({ item, onChange, onCancel: _onCancel, onSave: _onSave, creating }) => {
    const dispatch = useDispatch();
    const itemRef = useRef(item);
    const initialItem = useRef(item);
    const [deleting, setDeleting] = useState(false);

    // Updating reference on item change
    useEffect(() => {
        itemRef.current = item;
    }, [item]);

    // Handling save changes
    const onSave = () => {
        // Updating initial item with new changes
        initialItem.current = itemRef.current;

        // Updating user
        if(_onSave) {
            _onSave(itemRef.current);
        }
    }
    // Handling cancel click
    const onCancel = () => {
        // Restoring redux store with previous item
        dispatch(setUserItem(initialItem.current));

        if(_onCancel) {
            _onCancel();
        }
    }
    // Handling delete click
    const onDelete = async () => {
        setDeleting(true);
        
        // Making request to destroy item
        await destroyUserItem(item.id);

        // Updating UI
        dispatch(removeUserItem(item.id));

        setDeleting(false);
    }

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

        if(onChange) {
            onChange(newItem);
        }
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
            {!creating && (
                <EditorContainerFooter 
                    onCancel={onCancel}
                    onDelete={onDelete}
                    onSave={onSave}
                    deleting={deleting}
                />
            )}
        </motion.div>
    )
}