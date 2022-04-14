import Image from "next/image"
import { useAppSelector } from "../../redux/store";
import { selectUserColors, selectUserIsMe } from "../../redux/user/userSelectors";
import styles from '../../styles/User.module.scss';
import { UserImageCustomize } from "./UserImageCustomize";

export const UserBanner: React.FC<{bannerURL?: string}> = ({ bannerURL }) => {
    const isMe = useAppSelector(selectUserIsMe);
    const colors = useAppSelector(selectUserColors);

    return(
        <div className={styles['banner']} style={{ backgroundColor: colors?.background.banner || 'var(--user-banner-background)' }}>
            {bannerURL && (
                <Image 
                    src={bannerURL}
                    layout={'fill'}
                    objectFit={'cover'}
                    priority
                />
            )}
            {isMe && (
                <UserImageCustomize type={'Banner'} />
            )}
        </div>
    )
}