import React from 'react';
import { ReactElement } from 'react';
import { AdminLayout } from '../../layouts/admin/AdminLayout';

export default function Analytics() {
    return(
        <div>
            analytics
        </div>
    )
}

Analytics.getLayout = (page: ReactElement) => (
    <AdminLayout>
        {page}
    </AdminLayout>
)