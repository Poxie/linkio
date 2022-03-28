import React from 'react';
import styles from './AdminLayout.module.scss';
import { AdminNavbar } from './AdminNavbar';

export const AdminLayout: React.FC = ({ children }) => {
    return(
        <div className={styles['container']}>
            <AdminNavbar />
            <div className={styles['main']}>
                {children}
            </div>
        </div>
    )
}