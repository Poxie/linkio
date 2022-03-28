import React from 'react';
import { DrawnArrowIcon } from '../../icons/DrawnArrowIcon';
import styles from '../../styles/User.module.scss';
import { Button } from '../Button';

export const UserPanel = () => {
    return(
        <div className={styles['user-panel']}>
            <Button>
                Admin Panel
            </Button>
            <DrawnArrowIcon />
            <span>
                Open the admin panel for more customization and analytics.
            </span>
        </div>
    )
}