import React from 'react';
import Link from 'next/link';
import styles from './AdminLayout.module.scss';

type Props = {
    text: string;
    path: string;
    active: boolean;
    ref: React.Ref<HTMLDivElement>
    comingSoon?: boolean;
    onClick?: (path: string) => void;
}
export const AdminNavbarItem = React.forwardRef<HTMLDivElement, Props>(({ text, path, active, comingSoon, onClick }, ref) => {
    const handleClick = () => {
        onClick && onClick(path);
    }
    
    const className = [
        styles['navbar-item'],
        active && styles['active']
    ].join(' ');
    const content = (
        <div className={className} ref={ref} onClick={handleClick}>
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