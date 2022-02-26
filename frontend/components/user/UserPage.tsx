import React from "react";
import { useAppSelector } from "../../redux/store"
import { selectUserDisplay } from "../../redux/user/userSelectors"
import { UserHeader } from "./UserHeader";
import styles from '../../styles/User.module.scss';
import { UserItems } from "./UserItems";

export const UserPage = () => {
    const user = useAppSelector(selectUserDisplay);

    return(
        <div className={`${styles.container} ${!user.bannerURL && styles['no-banner']}`}>
            <UserHeader />
            <UserItems />
        </div>
    )
}