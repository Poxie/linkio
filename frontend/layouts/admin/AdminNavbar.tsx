import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDimensions } from '../../hooks/useDimensions';
import { selectMeDisplay } from '../../redux/me/meSelectors';
import { useAppSelector } from '../../redux/store';
import styles from './AdminLayout.module.scss';
import { AdminNavbarItem } from './AdminNavbarItem';
import { AdminNavabarItems } from './AdminNavbarItems';

export const AdminNavbar = () => {
    return(
        <div className={styles.navbar}>
            <div className={styles['navbar-content']}>
                <AdminNavabarItems />
            </div>
        </div>
    )
}