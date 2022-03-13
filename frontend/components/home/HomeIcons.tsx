import React, { useState } from 'react';
import styles from '../../styles/Home.module.scss';
import { FacebookIcon } from '../../icons/FacebookIcon';
import { InstagramIcon } from '../../icons/InstagramIcon';
import { TwitchIcon } from '../../icons/TwitchIcon';
import { TwitterIcon } from '../../icons/TwitterIcon';
import { YouTubeIcon } from '../../icons/YouTubeIcon';
import { SnapchatIcon } from '../../icons/SnapchatIcon';
import { DiscordIcon } from '../../icons/DiscordIcon';
import { PinterestIcon } from '../../icons/PinterestIcon';
import { MEDIA_COLORS } from '../../utils/constants';
import { usePopup } from '../../contexts/PopupProvider';
import { IconPopup } from '../../popups/icon-popup/IconPopup';

const ICONS = [
    { media: 'facebook', component: FacebookIcon, top: 0 },
    { media: 'twitter', component: TwitterIcon, top: 90 },
    { media: 'twitch', component: TwitchIcon, top: 130 },
    { media: 'youtube', component: YouTubeIcon, top: 80 },
    { media: 'instagram', component: InstagramIcon, top: 140 },
    { media: 'snapchat', component: SnapchatIcon, top: 100 },
    { media: 'discord', component: DiscordIcon, top: 130 },
    { media: 'pinterest', component: PinterestIcon, top: 0 }
].map(item => ({
    ...item,
    color: MEDIA_COLORS[item.media as keyof typeof MEDIA_COLORS],
}));
export const HomeIcons = () => {
    const { setPopup } = usePopup();
    const [refs] = useState(ICONS.map(() => React.createRef<HTMLDivElement>()));

    return(
        <div className={styles['home-icons']}>
            {ICONS.map((icon, key) => {
                return(
                    <div 
                        className={styles['home-icon']}
                        style={{ transform: `translateY(${icon.top}px)` }}
                        onClick={() => setPopup(<IconPopup media={icon.media} icon={icon.component} />, refs[key], { centered: true })}
                        ref={refs[key]}
                        key={icon.media}
                    >
                        <icon.component 
                            style={{ fill: icon.color }}
                        />
                    </div>
                )
            })}
        </div>
    )
}