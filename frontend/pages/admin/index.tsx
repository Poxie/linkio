import { useRouter } from 'next/router';
import React from 'react';
import { AdminPage } from '../../components/admin/AdminPage';
import { selectMe, selectMeLoading } from '../../redux/me/userSelectors';
import { useAppSelector } from '../../redux/store';

export default function index() {
    const router = useRouter();
    const me = useAppSelector(selectMe);
    const meIsLoading = useAppSelector(selectMeLoading);

    // If user is not logged in, redirect to login
    if(!me && !meIsLoading) {
        if(typeof window === 'undefined') return null;

        router.replace(`/login?redirect_uri=${encodeURIComponent(window.location.href)}`);
        return null;
    }

    return <AdminPage />;
}