import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/store"
import { selectUser, selectUserDisplay, selectUserIsMe } from "../../redux/user/userSelectors"
import { UserHeader } from "./UserHeader";
import styles from '../../styles/User.module.scss';
import { UserItems } from "./UserItems";
import { DrawnArrowIcon } from "../../icons/DrawnArrowIcon";
import { UserPanel } from "./UserPanel";
import { User } from "../../utils/types";
import { useDispatch } from "react-redux";
import { selectMe } from "../../redux/me/meSelectors";
import { setUser, setUserIsMe } from "../../redux/user/userActions";
import { getMe } from "../../utils";

export const UserPage: React.FC<{
    user: User;
}> = ({ user }) => {
    const dispatch = useDispatch();
    const _user = useAppSelector(selectUser);
    const me = useAppSelector(selectMe);
    const isMe = useAppSelector(selectUserIsMe);

    // Checking if user is owner
    useEffect(() => {
        // If user or me is undefined, return
        if(!_user || !me) return;

        // Determining if user is me
        const isMe = _user?.id === me?.id;

        // Updating isMe property based on conditions
        if(isMe && !_user?.isMe) {
            dispatch(setUserIsMe(true));
            getMe().then(user => dispatch(setUser({...user, ...{ isMe: true }})));
        } else if(!isMe && _user?.isMe) {
            dispatch(setUserIsMe(false));
        }
    }, [_user, me]);
    
    // On user update, update redux store
    if(user && _user?.username !== user.username) {
        dispatch(setUser(user));
    }

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