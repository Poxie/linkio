import { useRouter } from 'next/router';
import React from 'react';
import { selectMe, selectMeLoading } from '../../../redux/me/meSelectors';
import { useAppSelector } from '../../../redux/store';
import styles from '../../../styles/Admin.module.scss';
import { AppearanceCustomizing } from './AppearanceCustomizing';
import { AppearancePreview } from './AppearancePreview';

export const AdminAppearancePage = () => {
    const router = useRouter();
    const me = useAppSelector(selectMe);
    const meIsLoading = useAppSelector(selectMeLoading);

    // If user is not logged in, redirect to login
    if(!me && !meIsLoading) {
        if(typeof window === 'undefined') return null;

        router.replace(`/login?redirect_uri=${encodeURIComponent(window.location.href)}`);
        return null;
    }

    return(
        <div className={styles['appearance']}>
            <AppearanceCustomizing />
            <AppearancePreview />
        </div>
    )
}