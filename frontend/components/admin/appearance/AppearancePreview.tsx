import React from 'react';
import styles from '../../../styles/Admin.module.scss'
import { PhoneScreenIcon } from '../../../icons/PhoneScreenIcon';
import { selectMeColors, selectMeDisplay, selectMeItems, selectMeUpdating } from '../../../redux/me/meSelectors';
import { useAppSelector } from '../../../redux/store';
import { LoadingSpinner } from '../../loading-spinner/LoadingSpinner';
import { getIconURL } from '../../../utils/functions';
import { ExternalLinkIcon } from '../../../icons/ExternalLinkIcon';
import { useRouter } from 'next/router';

export const AppearancePreview = () => {
    const router = useRouter();
    const updating = useAppSelector(selectMeUpdating);
    const user = useAppSelector(selectMeDisplay);
    let items = useAppSelector(selectMeItems);
    const colors = useAppSelector(selectMeColors);
    
    items = items?.filter(item => item.isValid);
    return(
        <div className={styles['preview']}>
            <PhoneScreenIcon />
            
            <div className={styles['preview-container']} style={{ backgroundColor: colors?.background.primary || 'var(--background-secondary)' }}>
                <div className={styles['preview-banner']} style={{ backgroundColor: colors?.background?.banner || 'var(--user-banner-background)' }}>
                    {user.bannerURL && (
                        <img src={user.bannerURL} />
                    )}
                </div>
                <div className={styles['preview-header']} style={{ backgroundColor: colors?.background?.header || 'var(--background-primary)' }}>
                    <div className={styles['preview-avatar']} style={{ borderColor: colors?.background?.header || 'var(--background-primary)', background: colors?.background?.avatar || 'var(--background-avatar)' }}>
                        {user.avatarURL && (
                            <img src={user.avatarURL} />
                        )}
                        {!user.avatarURL && (
                            '?'
                        )}
                    </div>
                    <div className={styles['preview-name']}>
                        {user.name || `@${user.username}`}
                    </div>
                    {user.bio && (
                        <div className={styles['preview-bio']}>
                            {user.bio}
                        </div>
                    )}
                </div>

                {items?.map(item => {
                    return(
                        <div className={styles['preview-item']} style={{ backgroundColor: colors?.background?.item || 'var(--background-primary)' }} key={item.id}>
                            {item.icon && <img src={getIconURL(item.icon)} alt={item.icon} />}
                            
                            <div className={styles['preview-item-content']}>
                                {item.content}
                            </div>
                        </div>
                    )
                })}

                {updating && (
                    <LoadingSpinner className={styles['spinner']} />
                )}
            </div>
            <a 
                href={`/${user.username}`}
                className={styles['link-to-page']}
                target={'_blank'}
                rel={'noreferrer'}
            >
                <span>
                    To my page
                </span>
                <ExternalLinkIcon />
            </a>
        </div>
    )
}