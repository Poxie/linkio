import React from 'react';
import styles from '../../styles/User.module.scss';

export const EditorContainerHeader: React.FC<{header: string}> = ({ header }) => {
    return(
        <div className={styles['editor-header']}>
            {header}
        </div>
    )
}