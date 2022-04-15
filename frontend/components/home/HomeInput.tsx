import React, { useState } from 'react';
import { usePreview } from './HomePreview';
import { useRouter } from 'next/router';
import { WEBSITE_ORIGIN } from '../../utils/constants';
import { SpecialInput } from '../SpecialInput';

export const HomeInput = () => {
    const router = useRouter();
    const { username, setUsername } = usePreview();

    const create = () => {
        router.push(`${WEBSITE_ORIGIN}/login?type=create&username=${username}`);
    }

    return(
        <SpecialInput 
            onSubmit={create}
            onChange={setUsername}
        />
    )
}