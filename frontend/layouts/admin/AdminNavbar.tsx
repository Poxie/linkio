import React from 'react';
import styles from './AdminLayout.module.scss';
import { AdminNavabarItems } from './AdminNavbarItems';
import { AdminNavbarUser } from './AdminNavbarUser';

export const AdminNavbar = () => {
    return(
        <div className={styles.navbar}>
            <div className={styles['navbar-content']}>
                <AdminNavabarItems />
                <AdminNavbarUser />
            </div>
        </div>
    )
}