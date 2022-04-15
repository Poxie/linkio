import React from 'react';
import { ReactElement } from 'react';
import { AdminAppearancePage } from '../../components/admin/appearance/AdminAppearancePage';
import { AdminLayout } from '../../layouts/admin/AdminLayout';

export default function Appearance() {
    return <AdminAppearancePage />;
}

Appearance.getLayout = (page: ReactElement) => (
    <AdminLayout>
        {page}
    </AdminLayout>
)