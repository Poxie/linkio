import React from 'react';
import { Button } from '../../Button';
import styles from '../../../styles/Admin.module.scss';

export const AdminLinksHeader = () => {
    return(
        <div className={styles['links-header']}>
            <span className={styles['links-header-text']}>
                My Links
            </span>
            <div className={styles['links-header-main']}>
                <Button>
                    Add New Link
                </Button>
                <Button>
                    Add With Integration
                </Button>
            </div>
        </div>
    )
}