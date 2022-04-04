import React from 'react';
import Link from 'next/link';
import styles from './AdminLayout.module.scss';

type Props = {
    text: string;
    path: string;
    active: boolean;
    ref: React.Ref<HTMLDivElement>
    comingSoon?: boolean;
}
export const AdminNavbarItem = React.forwardRef<HTMLDivElement, Props>(({ text, path, active, comingSoon }, ref) => {
    const className = [
        styles['navbar-item'],
        active && styles['active']
    ].join(' ');
    const content = (
        <div className={className} ref={ref}>
            {text}
            {comingSoon && (
                <div className={styles['coming-soon']}>
                    Soon™
                </div>
            )}
        </div>
    )

    return comingSoon ? content : <Link href={path}>{content}</Link>
});