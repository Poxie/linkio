import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from '../../styles/User.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { Item } from '../../utils/types';
import { EditorContainer } from './EditorContainer';

const MIN_FROM_TOP = 30;
const EXTRA_FROM_TOP = 10;

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
    const ref = useRef<HTMLDivElement>(null);
    const indexRef = useRef<HTMLDivElement>(null);
    const editor = React.createRef<HTMLDivElement>();

    useEffect(() => {
        if(editing) {
            if(!indexRef.current) return;
            indexRef.current.style.zIndex = "2000";
        } else {
            setTimeout(() => {
                if(!indexRef.current) return;
                indexRef.current.style.zIndex = "";
            }, 200);
        }


        // If stop editing, make sure to revert any transform style
        if(!ref.current) return;
        if(!editing) {
            ref.current.style.transform = 'translateY(0)';
            return
        }

        // If start editing, check if editor exceeds window height
        // If it does, make sure it avoids it
        if(!editor.current) return;

        // Determining how far editor container is from top
        // -20 is the transform animation value
        const editorTop = editor.current.getBoundingClientRect().top - 20;

        // If exceeds, make sure it avoids
        if(editorTop < 0) {
            ref.current.style.transform = `translateY(${Math.abs(editorTop) + EXTRA_FROM_TOP}px)`
        }
    }, [editing]);

    const startEditing = () => {
        setEditing(true);
        onStartEditing && onStartEditing();
    }
    const cancel = () => {
        setEditing(false);
        onCancel && onCancel();
    }

    const handleSave = (item: Item) => {
        setEditing(false);
        onSave && onSave(item);
    }

    const value = { editing, startEditing, cancel };
    return(
        <EditorContext.Provider value={value}>
            <div style={{ position: 'relative' }} ref={indexRef}>
                <div style={{ transition: `transform .3s` }} ref={ref}>
                    <AnimatePresence>
                        {editing && (
                            <EditorContainer 
                                item={item}
                                onChange={onChange}
                                onSave={handleSave}
                                onCancel={cancel}
                                creating={creating}
                                ref={editor}
                            />
                        )}
                    </AnimatePresence>

                    {children}
                </div>

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
            </div>
        </EditorContext.Provider>
    )
}