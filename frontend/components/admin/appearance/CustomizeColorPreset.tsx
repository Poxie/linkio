import React from 'react';
import styles from '../../../styles/Admin.module.scss';

const COLORS = ['#3498db', '#9457ad', '#e91e63', '#f1c40f', '#e67e22', '#2ecc71']
export const CustomizeColorPreset: React.FC<{
    onClick: (color: string) => void;
}> = ({ onClick }) => {
    return(
        <>
            {COLORS.map(color => (
                <div 
                    onClick={() => onClick(color)}
                    style={{ backgroundColor: color }} 
                    className={styles['color-preset']} 
                    key={color} 
                />
            ))}
        </>
    )
}