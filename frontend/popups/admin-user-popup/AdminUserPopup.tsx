import React from 'react';
import { logout } from '../../utils';
import styles from './AdminUserPopup.module.scss';

export const AdminUserPopup = () => {
    const onLogout = async () => {
        logout();
        window.location.href = '/';
    }

    const items = [
        { text: 'Log out', type: 'danger', onClick: onLogout }
    ];
    return(
        <>
        {items.map(item => {
            const { text, type, onClick } = item;

            const className = [
                styles['item'],
                styles[type]
            ].join(' ');
            return(
                <div 
                    className={className} 
                    onClick={onClick}
                    key={text}
                >
                    {text}
                </div>
            )
        })}
        </>
    )
}