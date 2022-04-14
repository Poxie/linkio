import React, { useState } from 'react';
import styles from '../../styles/Home.module.scss';
import { ArrowIcon } from '../../icons/ArrowIcon';
import { HomeInputPlaceholder } from './HomeInputPlaceholder';
import { usePreview } from './HomePreview';
import { useRouter } from 'next/router';
import { WEBSITE_ORIGIN } from '../../utils/constants';

export const HomeInput = () => {
    const router = useRouter();
    const { username, setUsername } = usePreview();
    const [isFocusing, setIsFocusing] = useState(false);

    const create = () => {
        router.push(`${WEBSITE_ORIGIN}/create?username=${username}`);
    }

    return(
        <div className={styles['input-container']}>
            <span className={styles['input-suffix']}>
                {process.env.NEXT_PUBLIC_WEBSITE_NAME.toLowerCase()}.com/
            </span>
            <form 
                className={styles['placeholder-container']}
                onSubmit={e => {
                    e.preventDefault();
                    create();
                }}
            >
                <input 
                    className={styles.input} 
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    onFocus={() => setIsFocusing(true)}
                    onBlur={() => setIsFocusing(false)}
                    onSubmit={create}
                />
                {!username && !isFocusing && (
                    <HomeInputPlaceholder />
                )}
                <div 
                    className={styles['create-button'] + (username ? ` ${styles['active']}` : '')}
                    onClick={create}
                >
                    <ArrowIcon />
                </div>
            </form>
        </div>
    )
}