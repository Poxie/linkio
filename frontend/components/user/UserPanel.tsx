import React from 'react';
import Link from 'next/link';
import { DrawnArrowIcon } from '../../icons/DrawnArrowIcon';
import styles from '../../styles/User.module.scss';
import { Button } from '../Button';

export const UserPanel = () => {
    return(
        <div className={styles['user-panel']}>
            <Button style={{ height: '45px', width: '128px', padding: 0 }}>
                <Link href={'/admin'}>
                    Admin Panel
                </Link>
            </Button>
            <DrawnArrowIcon />
            <span>
                Open the admin panel for more customization and analytics.
            </span>
        </div>
    )
}