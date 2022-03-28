import React from 'react';
import styles from '../../../styles/Admin.module.scss';
import { Item } from '../../../utils/types';
import { Input } from '../../Input';
import { AdminLinkBlur, AdminLinkChange } from './AdminLinks';

export const AdminLink: React.FC<Item & {onChange: AdminLinkChange, onBlur: AdminLinkBlur}> = ({ content, url, onChange, onBlur, id }) => {
    return(
        <div className={styles['link']}>
            <div className={styles['link-content']}>
                <Input 
                    value={content}
                    className={styles['link-input']}
                    onChange={value => onChange(id, 'content', value)}
                    onBlur={() => onBlur(id)}
                />
            </div>
            
            <div className={styles['link-url']}>
                <Input 
                    value={url}
                    className={styles['link-input']}
                    onChange={value => onChange(id, 'url', value)}
                    onBlur={() => onBlur(id)}
                />
            </div>
        </div>
    )
}