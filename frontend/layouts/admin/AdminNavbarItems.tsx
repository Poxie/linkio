import React, { useEffect, useRef } from 'react';
import styles from './AdminLayout.module.scss';
import { useRouter } from 'next/router';
import { useDimensions } from '../../hooks/useDimensions';
import { AdminNavbarItem } from './AdminNavbarItem';

const PATH_PREFIX = '/admin';
const getFullPath = (path: string) => `${PATH_PREFIX}${path}`;
export const AdminNavabarItems = () => {
    const { width } = useDimensions();
    const { asPath } = useRouter();
    const stripe = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);

    const items = [
        { text: 'Links', path: getFullPath('') },
        { text: 'Appearance', path: getFullPath('/appearance') },
        { text: 'Analytics', path: getFullPath('/analytics'), comingSoon: true }
    ]
    const refs = useRef(items.map(() => React.createRef<HTMLDivElement>())).current;

    // On path change, update stripe position
    useEffect(() => {
        // Getting the new active navbar item
        const activeIndex = items.map(item => item.path).indexOf(asPath);
        const activeItem = refs[activeIndex];

        if(!stripe.current || !container.current || !activeItem.current) return;

        // Getting the active item's position
        const { left, top, width, height } = activeItem.current.getBoundingClientRect();
        const { left: containerLeft } = container.current.getBoundingClientRect();

        // Updating stripe position to match active item's position
        stripe.current.style.width = `${width}px`;
        stripe.current.style.left = `${left - containerLeft}px`;
        stripe.current.style.top = `${top + height}px`;
    }, [asPath, width]);

    return(
        <div className={styles['navbar-options']} ref={container}>
            {items.map((item, key) => {
                const { path } = item;

                return(
                    <AdminNavbarItem
                        {...item}
                        active={asPath === path}
                        ref={refs[key]}
                        key={path}
                    />
                )
            })}
            <div className={styles['stripe']} ref={stripe} />
        </div>
    )
}