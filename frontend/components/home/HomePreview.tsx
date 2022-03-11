import React from 'react';
import { HomeInput } from './HomeInput';
import { HomePreviewConnector } from './HomePreviewConnector';

export const HomePreview = () => {
    return(
        <>
            <HomeInput />
            <HomePreviewConnector />
        </>
    )
}