import React from 'react';
import styles from '../styles/Button.module.scss';

type Props = {
    type?: 'primary' | 'secondary' | 'danger';
    className?: string;
    style?: React.CSSProperties;
}
export const Button: React.FC<Props> = ({ children, type='primary', className, style }) => {
    const buttonClassName = [
        styles['container'],
        className,
        styles[type]
    ].join(' ');
    return(
        <div className={buttonClassName} style={style}>
            {children}
        </div>
    )
}