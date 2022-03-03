import { motion } from 'framer-motion';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeUserItem, setUser, setUserItem } from '../../redux/user/userActions';
import styles from '../../styles/User.module.scss';
import { destroyUserItem, updateUserItem } from '../../utils';
import { IMAGE_ENDPOINT } from '../../utils/constants';
import { Item } from '../../utils/types';
import { Input } from '../Input';
import { EditorContainerFooter } from './EditorContainerFooter';
import { EditorContainerHeader } from './EditorContainerHeader';
import { EditorContainerPresets } from './EditorContainerPresets';

const PRESET_URLS = ['youtube', 'twitch', 'twitter', 'instagram'];

type Props = {
    item: Item;
    onCancel?: () => void;
    onChange?: (item: Item) => void;
    onSave?: (item: Item) => void;
    creating?: boolean;
    ref?: React.Ref<HTMLDivElement>;
}
export const EditorContainer: React.FC<Props> = React.forwardRef<HTMLDivElement, Props>(({ item, onChange, onCancel: _onCancel, onSave: _onSave, creating }, forwardRef) => {
    const dispatch = useDispatch();
    const initialItem = useRef(item);
    const [deleting, setDeleting] = useState(false);
    const [hasContentError, setHasContentError] = useState(false);
    const [hasURLError, setHasURLError] = useState(false);

    // Handling save changes
    const onSave = () => {
        // Checking if fields are valid
        const { content, url } = item;
        if(!content) setHasContentError(true);
        if(!url) setHasURLError(true);
        if(!content || !url) return;

        // Updating initial item with new changes
        initialItem.current = item;

        // Updating user
        _onSave && _onSave(item);
    }
    // Handling cancel click
    const onCancel = () => {
        // Restoring redux store with previous item
        if(!creating) dispatch(setUserItem(initialItem.current));

        _onCancel && _onCancel();
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
        let newItem = {...item};
        if(Array.isArray(property)) {
            property.forEach((prop, key) => (newItem[prop] as keyof Item) = value[key]);
        } else {
            (newItem[property] as keyof Item) = value;
        }

        onChange && onChange(newItem);
    }

    const descriptionClassName = [styles['editor-input'], hasContentError && styles['error']].join(' ');
    const URLClassName = [styles['editor-input'], hasURLError && styles['error']].join(' ');
    return(
        <motion.div 
            className={styles['editor-container']} 
            animate={{ opacity: 1, translateY: 0 }} 
            initial={{ opacity: 0, translateY: 20 }}
            exit={{ opacity: 0, translateY: 20 }}
            ref={forwardRef}
        >
            <EditorContainerHeader header={creating ? 'Create' : 'Customize'} />
            <Input 
                label={!hasContentError ? 'Description' : 'Description - THIS FIELD IS REQUIRED'}
                placeholder={'Item description...'}
                className={descriptionClassName}
                value={item?.content}
                onChange={value => updateProperty('content', value)}
            />
            <Input 
                label={!hasURLError ? 'URL' : 'URL - THIS FIELD IS REQUIRED'}
                placeholder={`https://example.com/myusername`}
                className={URLClassName}
                value={item?.url}
                onChange={value => updateProperty('url', value)}
            />
            <EditorContainerPresets 
                active={item?.icon}
                onClick={value => updateProperty(['iconURL', 'icon'], [`${IMAGE_ENDPOINT}/icons/${value}.png`, value])}
            />
            <EditorContainerFooter 
                onCancel={onCancel}
                onDelete={onDelete}
                onSave={onSave}
                deleting={deleting}
                creating={creating}
            />
        </motion.div>
    )
});