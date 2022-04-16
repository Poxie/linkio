import React from 'react';
import { useAppSelector } from "../../redux/store"
import { selectUserDisplay } from "../../redux/user/userSelectors"
import { UserAvatar } from "./UserAvatar";
import { UserBanner } from "./UserBanner";
import { UserText } from "./UserText";
import styles from '../../styles/User.module.scss';

export const UserHeader = () => {
    const user = useAppSelector(selectUserDisplay);
    if(!user || !user.username) return null;

    const { name, username, bio, avatarURL, bannerURL } = user;

    return(
        <>
            <UserBanner bannerURL={bannerURL} />
            <div className={styles['header-content']}>
                <UserAvatar avatarURL={avatarURL} />
                <UserText 
                    username={username}
                    name={name} 
                    bio={bio}
                />
            </div>
        </>
    )
}