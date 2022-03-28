import React from "react";
import { useAppSelector } from "../../redux/store"
import { selectUserDisplay, selectUserIsMe } from "../../redux/user/userSelectors"
import { UserHeader } from "./UserHeader";
import styles from '../../styles/User.module.scss';
import { UserItems } from "./UserItems";
import { DrawnArrowIcon } from "../../icons/DrawnArrowIcon";
import { UserPanel } from "./UserPanel";

export const UserPage = () => {
    const isMe = useAppSelector(selectUserIsMe);

    return(
        <div className={styles['user']}>
            <div className={styles.container}>
                <UserHeader />
                <UserItems />
            </div>
            
            {isMe && (
                <UserPanel />
            )}
        </div>
    )
}