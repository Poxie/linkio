import React from 'react';
import { useAppSelector } from '../../redux/store';
import { selectUserItemById } from '../../redux/user/userSelectors';
import styles from '../../styles/User.module.scss';
import { Input } from '../Input';
import { EditorContainerHeader } from './EditorContainerHeader';
import { EditorContainerPresets } from './EditorContainerPresets';

export const EditorContainer: React.FC<{itemId: string}> = ({ itemId }) => {
    const item = useAppSelector(state => selectUserItemById(state, itemId));
    console.log(item);

    return(
        <div className={styles['editor-container']}>
            <EditorContainerHeader />
            <Input 
                placeholder={'Item description...'}
                className={styles['editor-input']}
            />
            <EditorContainerPresets active={item?.icon} />
        </div>
    )
}