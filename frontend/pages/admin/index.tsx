import { useRouter } from 'next/router';
import React from 'react';
import { ReactElement } from 'react';
import { AdminLinksPage } from '../../components/admin/links/AdminLinksPage';
import { AdminLayout } from '../../layouts/admin/AdminLayout';
import { selectMe, selectMeLoading } from '../../redux/me/meSelectors';
import { useAppSelector } from '../../redux/store';

export default function index() {
    const router = useRouter();
    const me = useAppSelector(selectMe);
    const meIsLoading = useAppSelector(selectMeLoading);
    console.log(me);

    // If user is not logged in, redirect to login
    if(!me && !meIsLoading) {
        if(typeof window === 'undefined') return null;

        router.replace(`/login?redirect_uri=${encodeURIComponent(window.location.href)}`);
        return null;
    }

    return <AdminLinksPage />;
}

index.getLayout = (page: ReactElement) => (
    <AdminLayout>
        {page}
    </AdminLayout>
)