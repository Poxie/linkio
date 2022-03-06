import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../contexts/ModalProvider';
import { usePopup } from '../../contexts/PopupProvider';
import { FileModal } from '../../modals/file-modal/FileModal';
import { HeaderPopup } from '../../popups/header-popup/HeaderPopup';
import { selectMeId } from '../../redux/me/userSelectors';
import { useAppSelector } from '../../redux/store';
import { setUser } from '../../redux/user/userActions';
import { selectUserDisplay } from '../../redux/user/userSelectors';
import { updateUser } from '../../utils';
import { EditButton } from './EditIcon';

export const UserAvatarCustomize = () => {
    const dispatch = useDispatch();
    const myId = useAppSelector(selectMeId);
    const { avatarURL } = useAppSelector(selectUserDisplay);
    const { setPopup, closePopups } = usePopup();
    const { setModal, closeModals } = useModal();
    const button = useRef<HTMLDivElement>(null);
    const input = useRef<HTMLInputElement>(null);

    const updateAvatar = async (file: File | null) => {
        if(!myId) return;
        const user = await updateUser(myId, { avatar: file });
        dispatch(setUser(user));
        closeModals();
        closePopups();
    }
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files || !e.target.files[0] || !input.current) return;

        const file = e.target.files[0];
        input.current.value = '';

        setModal(
            <FileModal 
                file={file}
                onDone={updateAvatar}
                onCancel={closeModals}
                aspectRatio={1}
            />
        )
    }
    const showImagePicker = () => {
        closePopups();
        input.current?.click();
    }
    const openPopup = () => {
        setPopup(
            <HeaderPopup 
                showImagePicker={showImagePicker}
                hasImage={avatarURL !== null}
                onRemove={() => updateAvatar(null)}
                type={'Avatar'}
            />,
            button
        )
    }
    return(
        <>
        <EditButton
            onClick={openPopup}
            ref={button}
        />
        <input type="file" style={{ display: 'none' }} onChange={onFileChange} ref={input} />
        </>
    )
}