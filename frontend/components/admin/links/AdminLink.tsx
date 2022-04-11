import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useModal } from '../../../contexts/ModalProvider';
import { TrashIcon } from '../../../icons/TrashIcon';
import { DeleteModal } from '../../../modals/delete-modal/DeleteModal';
import { removeMeItem } from '../../../redux/me/meActions';
import styles from '../../../styles/Admin.module.scss';
import { destroyUserItem } from '../../../utils';
import { Item } from '../../../utils/types';
import { Input } from '../../Input';
import { AdminLinkBlur, AdminLinkChange } from './AdminLinks';
import { HasTooltip } from '../../tooltip/HasTooltip';
import { MEDIA_COLORS } from '../../../utils/constants';
import { YouTubeIcon } from '../../../icons/YouTubeIcon';
import { TwitterIcon } from '../../../icons/TwitterIcon';
import { TwitchIcon } from '../../../icons/TwitchIcon';
import { FacebookIcon } from '../../../icons/FacebookIcon';
import { SnapchatIcon } from '../../../icons/SnapchatIcon';

const ICONS = [
    { icon: <YouTubeIcon />, id: 'youtube' },
    { icon: <TwitterIcon />, id: 'twitter' },
    { icon: <TwitchIcon />, id: 'twitch' },
    { icon: <FacebookIcon />, id: 'facebook' },
    { icon: <SnapchatIcon />, id: 'snapchat' }
]
export const AdminLink: React.FC<Item & {onChange: AdminLinkChange, onBlur: AdminLinkBlur}> = ({ content, url, icon, onChange, onBlur, id }) => {
    const { setModal, closeModals } = useModal();
    const dispatch = useDispatch();

    const cancelDeletion = closeModals;
    const deleteItem = async () => {
        closeModals();
        await destroyUserItem(id);
        dispatch(removeMeItem(id));
    }
    const openDeleteModal = () => {
        setModal(<DeleteModal onSubmit={deleteItem} onCancel={cancelDeletion} />);
    }

    return(
        <motion.div 
            className={styles['link']}
            exit={{ height: 0, paddingTop: 0, paddingBottom: 0, margin: 0, borderWidth: 0, overflow: 'hidden' }}
        >
            <div className={styles['link-main']}>
                <div className={styles['link-content']}>
                    <Input 
                        value={content}
                        placeholder={'Link header...'}
                        className={styles['link-input']}
                        onChange={value => onChange(id, 'content', value)}
                        onBlur={() => onBlur(id)}
                    />
                </div>
                
                <div className={styles['link-url']}>
                    <Input 
                        value={url}
                        placeholder={'Link URL...'}
                        className={styles['link-input']}
                        onChange={value => onChange(id, 'url', value)}
                        onBlur={() => onBlur(id)}
                    />
                </div>

                <div className={styles['link-icons']}>
                    {ICONS.map(_icon => {
                        const { id: iconId, icon: i } = _icon;
                        const active = iconId === icon;
                        const color = MEDIA_COLORS[iconId as keyof typeof MEDIA_COLORS];
                        
                        return(
                            <div
                                className={styles['link-icon'] + (active ? ` ${styles['active']}` : '')}
                                style={{ 
                                    backgroundColor: !active ? '' : color,
                                    fill: active ? '#fff' : color
                                }}
                                onClick={() => onChange(id, 'icon', iconId, true)}
                                key={iconId}
                            >
                                {i}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={styles['link-options']}>
                <HasTooltip tooltip={'Delete Item'}>
                    <div className={styles['delete-button']} onClick={openDeleteModal}>
                        <TrashIcon />
                    </div>
                </HasTooltip>
            </div>
        </motion.div>
    )
}