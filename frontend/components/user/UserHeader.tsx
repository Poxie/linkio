import { useAppSelector } from "../../redux/store"
import { selectUserDisplay } from "../../redux/user/userSelectors"
import { UserBanner } from "./UserBanner";
import { UserText } from "./UserText";

export const UserHeader = () => {
    const user = useAppSelector(selectUserDisplay);
    if(!user || !user.username) return null;

    const { name, username, bio, avatarURL, bannerURL } = user;

    return(
        <>
            <UserBanner bannerURL={bannerURL} />
            <UserText 
                username={username}
                name={name} 
                bio={bio}
            />
        </>
    )
}