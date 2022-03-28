import React from 'react';
import styles from './AdminLayout.module.scss';
import { AdminNavbar } from './AdminNavbar';

export const AdminLayout: React.FC = ({ children }) => {
    return(
        <div className={styles['container']}>
            <AdminNavbar />
            {children}
        </div>
    )
}