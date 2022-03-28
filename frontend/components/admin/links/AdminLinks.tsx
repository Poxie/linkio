import React from 'react';
import { selectMeItems } from '../../../redux/me/meSelectors';
import { useAppSelector } from '../../../redux/store';
import { AdminLink } from './AdminLink';

export const AdminLinks = () => {
    const links = useAppSelector(selectMeItems) || [];

    return(
        <>
            {links.map(link => {
                return(
                    <AdminLink 
                        {...link}
                        key={link.id}
                    />
                )
            })}
        </>
    )
}