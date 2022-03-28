import React from 'react';
import styles from '../../../styles/Admin.module.scss';
import { Item } from '../../../utils/types';
import { Input } from '../../Input';

export const AdminLink: React.FC<Item> = ({ content, url }) => {
    return(
        <div className={styles['link']}>
            <div className={styles['link-content']}>
                <Input 
                    value={content}
                    className={styles['link-input']}
                />
            </div>
            
            <div className={styles['link-url']}>
                <Input 
                    value={url}
                    className={styles['link-input']}
                />
            </div>
        </div>
    )
}