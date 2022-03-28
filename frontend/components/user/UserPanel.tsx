import React from 'react';
import Link from 'next/link';
import { DrawnArrowIcon } from '../../icons/DrawnArrowIcon';
import styles from '../../styles/User.module.scss';
import { Button } from '../Button';

export const UserPanel = () => {
    return(
        <div className={styles['user-panel']}>
            <Link href={'/admin'}>
                <Button>
                    Admin Panel
                </Button>
            </Link>
            <DrawnArrowIcon />
            <span>
                Open the admin panel for more customization and analytics.
            </span>
        </div>
    )
}