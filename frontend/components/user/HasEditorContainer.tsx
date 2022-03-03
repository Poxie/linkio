import React, { useState } from 'react';
import styles from '../../styles/User.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { Item } from '../../utils/types';
import { EditorContainer } from './EditorContainer';

type EditorContextType = {
    editing: boolean;
    startEditing: () => void;
    cancel: () => void;
}
const EditorContext = React.createContext({} as EditorContextType);
export const useEditor = () => React.useContext(EditorContext);

type EditorProps = {
    item: Item;
    onChange?: (item: Item) => void;
    onSave?: (item: Item) => void;
    onCancel?: () => void;
    onStartEditing?: () => void;
    creating?: boolean;
}
export const HasEditorContainer: React.FC<EditorProps> = ({ children, item, onChange, onSave, onCancel, onStartEditing, creating }) => {
    const [editing, setEditing] = useState(false);

    const startEditing = () => {
        setEditing(true);
        onStartEditing && onStartEditing();
    }
    const cancel = () => {
        setEditing(false);
        onCancel && onCancel();
    }

    // Editor container handlers
    const handleSave = (item: Item) => {
        setEditing(false);
        onSave && onSave(item);
    }

    const value = { editing, startEditing, cancel };
    return(
        <EditorContext.Provider value={value}>
            <div style={{ position: 'relative', zIndex: editing ? 1000 : '' }}>
                <AnimatePresence>
                    {editing && (
                        <EditorContainer 
                            item={item}
                            onChange={onChange}
                            onSave={handleSave}
                            onCancel={cancel}
                            creating={creating}
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {editing && (
                        <motion.div 
                            className={styles.backdrop} 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: .200 }}
                            style={{ zIndex: -1 }}
                            onClick={cancel}
                        />
                    )}
                </AnimatePresence>

                {children}
            </div>
        </EditorContext.Provider>
    )
}