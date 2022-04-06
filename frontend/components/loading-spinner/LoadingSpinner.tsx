import React from 'react';
import styles from './LoadingSpinner.module.scss';

export const LoadingSpinner: React.FC<{
    className?: string
}> = ({ className='' }) => {
    className = [styles['svg'], className].join(' ');
    return(
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className={className}>
            <circle strokeLinecap={'round'} cx="60" cy="60" r="46" className={styles['circle']} />
        </svg>
    )
}