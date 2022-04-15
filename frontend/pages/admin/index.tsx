import React from 'react';
import { ReactElement } from 'react';
import { AdminLinksPage } from '../../components/admin/links/AdminLinksPage';
import { AdminLayout } from '../../layouts/admin/AdminLayout';

export default function index() {
    return <AdminLinksPage />;
}

index.getLayout = (page: ReactElement) => (
    <AdminLayout>
        {page}
    </AdminLayout>
)