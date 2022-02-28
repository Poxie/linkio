import React from 'react';
import styles from '../../styles/User.module.scss';
import { EditorContainerHeader } from './EditorContainerHeader';
import { EditorContainerPresets } from './EditorContainerPresets';

export const EditorContainer = () => {
    return(
        <div className={styles['editor-container']}>
            <EditorContainerHeader />
            <EditorContainerPresets />
        </div>
    )
}