import React from 'react';
import Image from 'next/image';
import { useAppSelector } from '../../redux/store';
import { selectUserIsMe } from '../../redux/user/userSelectors';
import styles from '../../styles/User.module.scss';
import { EditButton } from './EditIcon';
import { usePopup } from '../../contexts/PopupProvider';
import { HeaderPopup } from '../../popups/header-popup/HeaderPopup';
import { useModal } from '../../contexts/ModalProvider';
import { FileModal } from '../../modals/file-modal/FileModal';
import { UserAvatarCustomize } from './UserAvatarCustomize';

export const UserAvatar: React.FC<{avatarURL?: string}> = ({ avatarURL }) => {
    const isMe = useAppSelector(selectUserIsMe);

    return(
        <div className={styles.avatar}>
            <div className={styles['avatar-container']}>
                {avatarURL ? (
                    <Image 
                        src={avatarURL}
                        layout={'fill'}
                        objectFit={'cover'}
                    />
                ) : (
                    <span>
                        ?
                    </span>
                )}
            </div>
            
            {isMe && (
                <UserAvatarCustomize />
            )}
        </div>
    )
}