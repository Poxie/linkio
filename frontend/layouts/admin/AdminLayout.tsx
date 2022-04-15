import Head from 'next/head';
import React from 'react';
import { WEBSITE_NAME } from '../../utils/constants';
import styles from './AdminLayout.module.scss';
import { AdminNavbar } from './AdminNavbar';

export const AdminLayout: React.FC = ({ children }) => {
    return(
        <>
        <Head>
            <title>
                {WEBSITE_NAME} Admin
            </title>
        </Head>
        <div className={styles['container']}>
            <AdminNavbar />
            <div className={styles['main']}>
                {children}
            </div>
        </div>
        </>
    )
}