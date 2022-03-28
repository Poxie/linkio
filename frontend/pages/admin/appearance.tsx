import React from 'react';
import { ReactElement } from 'react';
import { AdminLayout } from '../../layouts/admin/AdminLayout';

export default function Appearance() {
    return(
        <div>
            appearance
        </div>
    )
}

Appearance.getLayout = (page: ReactElement) => (
    <AdminLayout>
        {page}
    </AdminLayout>
)