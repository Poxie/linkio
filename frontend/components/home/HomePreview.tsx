import React from 'react';
import { HomeInput } from './HomeInput';
import { HomePreviewConnector } from './HomePreviewConnector';
import { HomePreviewScreen } from './HomePreviewScreen';

export const HomePreview = () => {
    return(
        <>
            <HomeInput />
            <HomePreviewConnector />
            <HomePreviewScreen />
        </>
    )
}