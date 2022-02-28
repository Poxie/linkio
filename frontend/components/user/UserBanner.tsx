import Image from "next/image"
import styles from '../../styles/User.module.scss';

export const UserBanner: React.FC<{bannerURL?: string}> = ({ bannerURL }) => {
    return(
        <div className={styles['banner']}>
            {bannerURL && (
                <Image 
                    src={bannerURL}
                    layout={'fill'}
                    objectFit={'cover'}
                />
            )}
        </div>
    )
}