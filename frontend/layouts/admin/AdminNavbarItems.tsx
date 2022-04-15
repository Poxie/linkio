import React, { useEffect, useRef, useState } from 'react';
import styles from './AdminLayout.module.scss';
import { useRouter } from 'next/router';
import { useDimensions } from '../../hooks/useDimensions';
import { AdminNavbarItem } from './AdminNavbarItem';
import { useIsMobile } from '../../hooks/useIsMobile';
import { HamIcon } from '../../icons/HamIcon';

const PATH_PREFIX = '/admin';
const getFullPath = (path: string) => `${PATH_PREFIX}${path}`;
export const AdminNavabarItems = () => {
    const { width } = useDimensions();
    const isMobile = useIsMobile();
    const { asPath } = useRouter();
    const stripe = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const items = [
        { text: 'Links', path: getFullPath('') },
        { text: 'Appearance', path: getFullPath('/appearance') },
        { text: 'Analytics', path: getFullPath('/analytics'), comingSoon: true }
    ]
    const refs = useRef(items.map(() => React.createRef<HTMLDivElement>())).current;

    // On path change, update stripe position
    useEffect(() => {
        if(isMobile) return;

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
    }, [asPath, width, isMobile]);

    // Resetting state on device width change from mobile
    useEffect(() => {
        return () => setMobileNavOpen(false);
    }, [isMobile]);

    return(
        <div className={styles['navbar-options']} ref={container}>
            {isMobile && (
                <div className={styles['mobile-navbar-items']}>
                    <div className={styles['ham-button']} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
                        <HamIcon />
                    </div>

                    <div className={styles['mobile-navbar-item-container'] + (mobileNavOpen ? ` ${styles['active']}` : '')}>
                        {items.map(item => (
                            <AdminNavbarItem 
                                {...item}
                                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                                active={asPath === item.path}
                                key={item.path}
                            />
                        ))}
                    </div>
                </div>
            )}
            
            {!isMobile && (
                <>
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
                </>
            )}
        </div>
    )
}