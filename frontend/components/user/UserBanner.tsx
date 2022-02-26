import Image from "next/image"
import styles from '../../styles/User.module.scss';

export const UserBanner: React.FC<{bannerURL?: string}> = ({ bannerURL }) => {
    if(!bannerURL) return null;
    
    return(
        <div className={styles['banner']}>
            <Image 
                src={bannerURL}
                layout={'fill'}
                objectFit={'cover'}
            />
        </div>
    )
}