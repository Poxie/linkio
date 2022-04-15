import { useRouter } from 'next/router';
import React from 'react';
import { selectMeId, selectMeLoading } from '../../../redux/me/meSelectors';
import { useAppSelector } from '../../../redux/store';
import { AdminLinks } from './AdminLinks';
import { AdminLinksHeader } from './AdminLinksHeader';

export const AdminLinksPage = () => {
    const router = useRouter();
    const meId = useAppSelector(selectMeId);
    const meIsLoading = useAppSelector(selectMeLoading);

    // If user is not logged in, redirect to login
    if(!meId && !meIsLoading) {
        if(typeof window === 'undefined') return null;

        router.replace(`/login?redirect_uri=${encodeURIComponent(window.location.href)}`);
        return null;
    }

    return(
        <>
        <AdminLinksHeader />
        <AdminLinks />
        </>
    )
}