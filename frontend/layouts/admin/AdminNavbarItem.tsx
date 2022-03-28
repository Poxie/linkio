import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './AdminLayout.module.scss';

type Props = {
    text: string;
    path: string;
    ref: React.Ref<HTMLDivElement>
}
export const AdminNavbarItem = React.forwardRef<HTMLDivElement, Props>(({ text, path }, ref) => {
    const { asPath } = useRouter();

    const active = asPath === path;
    const className = [
        styles['navbar-item'],
        active && styles['active']
    ].join(' ');
    return(
        <Link href={path}>
            <div className={className} ref={ref}>
                {text}
            </div>
        </Link>
    )
});