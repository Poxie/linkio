import React from 'react';
import styles from '../../../styles/Admin.module.scss'
import { PhoneScreenIcon } from '../../../icons/PhoneScreenIcon';
import { selectMeColors, selectMeDisplay, selectMeItems } from '../../../redux/me/meSelectors';
import { useAppSelector } from '../../../redux/store';

export const AppearancePreview = () => {
    const user = useAppSelector(selectMeDisplay);
    const items = useAppSelector(selectMeItems);
    const colors = useAppSelector(selectMeColors);
    
    return(
        <div className={styles['preview']}>
            <PhoneScreenIcon />
            
            <div className={styles['preview-container']}>
                <div className={styles['preview-banner']} style={{ backgroundColor: colors?.background?.banner }}>
                    {user.bannerURL && (
                        <img src={user.bannerURL} />
                    )}
                </div>
                <div className={styles['preview-header']} style={{ backgroundColor: colors?.background?.primary || 'var(--background-primary)' }}>
                    <div className={styles['preview-avatar']}>
                        {user.avatarURL && (
                            <img src={user.avatarURL} />
                        )}
                    </div>
                    <div>
                        {user.name}
                    </div>
                </div>

                {items?.map(item => {
                    return(
                        <div className={styles['preview-item']}>
                            {item.iconURL && <img src={item.iconURL} />}
                            
                            <div className={styles['preview-item-content']}>
                                {item.content}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}