import React, { useEffect, useState } from 'react';
import styles from '../styles/AnimatedInputPlaceholder.module.scss';

export const AnimatedInputPlaceholder: React.FC<{
    placeholder: string
}> = ({ placeholder}) => {
    const [letters, setLetters] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLetters(prev => {
                const newAmount = prev + 1;
                if(newAmount >= placeholder.length) clearInterval(interval);
                return newAmount;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [placeholder]);

    return(
        <div className={styles['input-placeholder']}>
            {placeholder.slice(0, letters)}
            <span className={styles['pivot']}>
                |
            </span>
        </div>
    )
}