import React from 'react';
import styles from '../../styles/User.module.scss';

export const UserText: React.FC<{username: string, name?: string, bio?: string}> = ({ username, name, bio }) => {
    return(
        <>
            <div>
                <span className={styles['header-name']}>
                    {name || `@${username}`}
                </span>
            </div>

            {bio && (
                <span className={styles['header-bio']}>
                    {bio}
                </span>
            )}
        </>
    )
}