import React from 'react';
import { EditIcon } from '../../icons/EditIcon';
import styles from '../../styles/User.module.scss';

type Props = {className?: string, onClick?: () => void, ref?: React.RefObject<HTMLDivElement>};
export const EditButton = React.forwardRef<HTMLDivElement, Props>(({ className, onClick }, ref) => {
    className = [
        styles['edit-icon'],
        className && className,
    ].join(' ');
    return(
        <div 
            className={className} 
            onClick={onClick}
            ref={ref}
        >
            <EditIcon />
        </div>
    )
});
EditButton.displayName = 'EditButton';