import React from 'react';
import Image from 'next/image';
import { useAppSelector } from '../../redux/store';
import { selectUserColors, selectUserIsMe } from '../../redux/user/userSelectors';
import styles from '../../styles/User.module.scss';
import { UserImageCustomize } from './UserImageCustomize';

export const UserAvatar: React.FC<{avatarURL?: string}> = ({ avatarURL }) => {
    const isMe = useAppSelector(selectUserIsMe);
    const { avatar } = useAppSelector(selectUserColors)?.background || {};

    return(
        <div className={styles.avatar}>
            <div className={styles['avatar-container']} style={{ backgroundColor: avatar ? avatar : 'var(--user-avatar-background)' }}>
                {avatarURL ? (
                    <Image 
                        src={avatarURL}
                        layout={'fill'}
                        objectFit={'cover'}
                    />
                ) : (
                    <span>
                        ?
                    </span>
                )}
            </div>
            
            {isMe && (
                <UserImageCustomize type={'Avatar'} />
            )}
        </div>
    )
}