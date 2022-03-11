import React, { useState } from 'react';
import styles from '../../styles/Home.module.scss';
import { HomeInputPlaceholder } from './HomeInputPlaceholder';

export const HomeInput = () => {
    const [username, setUsername] = useState('');
    const [isFocusing, setIsFocusing] = useState(false);

    return(
        <div className={styles['input-container']}>
            <span className={styles['input-suffix']}>
                {process.env.NEXT_PUBLIC_WEBSITE_NAME.toLowerCase()}.com/
            </span>
            <div className={styles['placeholder-container']}>
                <input 
                    className={styles.input} 
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    onFocus={() => setIsFocusing(true)}
                    onBlur={() => setIsFocusing(false)}
                />
                {!username && !isFocusing && (
                    <HomeInputPlaceholder />
                )}
            </div>
        </div>
    )
}