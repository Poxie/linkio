import React, { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.scss';

const PLACEHOLDER_TEXT = 'yournamehere';
export const HomeInputPlaceholder = () => {
    const [letters, setLetters] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLetters(prev => {
                const newAmount = prev + 1;
                if(newAmount >= PLACEHOLDER_TEXT.length) clearInterval(interval);
                return newAmount;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return(
        <div className={styles['input-placeholder']}>
            {PLACEHOLDER_TEXT.slice(0, letters)}
            <span className={styles['pivot']}>
                |
            </span>
        </div>
    )
}