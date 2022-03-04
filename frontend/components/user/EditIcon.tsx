import React from 'react';
import { EditIcon } from '../../icons/EditIcon';
import styles from '../../styles/User.module.scss';

export const EditButton: React.FC<{className?: string, onClick?: () => void}> = ({ className, onClick }) => {
    className = [
        styles['edit-icon'],
        className && className,
    ].join(' ');
    return(
        <div 
            className={className} 
            onClick={onClick}
        >
            <EditIcon />
        </div>
    )
}