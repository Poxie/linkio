import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../contexts/ModalProvider';
import { usePopup } from '../../contexts/PopupProvider';
import { FileModal } from '../../modals/file-modal/FileModal';
import { HeaderPopup } from '../../popups/header-popup/HeaderPopup';
import { ColorPopup } from '../../popups/color-popup/ColorPopup';
import { useAppSelector } from '../../redux/store';
import { setUser, updateUser as updateUserStore } from '../../redux/user/userActions';
import { selectUserColors, selectUserDisplay } from '../../redux/user/userSelectors';
import { updateUser } from '../../utils';
import { User } from '../../utils/types';
import { EditButton } from './EditIcon';
import { selectMeId } from '../../redux/me/meSelectors';

export const UserImageCustomize: React.FC<{type: 'Avatar' | 'Banner'}> = ({ type }) => {
    const typeId = type.toLowerCase() as 'avatar' | 'banner';
    const dispatch = useDispatch();
    const { bannerURL, avatarURL } = useAppSelector(selectUserDisplay);
    const hasImage = type === 'Avatar' ? (avatarURL !== null) : (bannerURL !== null);
    const myId = useAppSelector(selectMeId);
    const colors = useAppSelector(selectUserColors);
    const { avatar: avatarColor, banner: bannerColor } = colors?.background || {};
    const button = createRef<HTMLDivElement>();
    const input = useRef<HTMLInputElement>(null);
    const currentButton = useRef<null | HTMLDivElement>(null);
    const { setPopup, pushPopup, closePopups } = usePopup();
    const { setModal, closeModals } = useModal();

    useEffect(() => {
        currentButton.current = button.current;
    }, []);

    const setColor = (color: string) => {
        if(!colors) return;

        // Setting new background color
        const colorScheme: User['colorScheme'] = {
            background: {
                ...colors?.background,
                [typeId]: color
            }
        }

        // Updating local store
        dispatch(updateUserStore({ colorScheme }));
        return colorScheme;
    }
    const updateColor = async (color: string) => {
        if(!myId) return;

        // Updating user background color
        await updateUser(myId, { [`${typeId}Color`]: color });
    }

    // On image upload
    const updateImage = async (file: File | null) => {
        if(!myId) return;
        const user = await updateUser(myId, { [typeId]: file });
        dispatch(setUser(user));
        closeModals();
        closePopups();
    }
    // On image picker change
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files || !e.target.files[0] || !input.current) return;

        const file = e.target.files[0];
        input.current.value = '';
        
        setModal(
            <FileModal 
                file={file} 
                onDone={updateImage} 
                onCancel={closeModals}
            />
        );
    }
    // Setting image picker
    const showImagePicker = () => {
        closePopups();
        input.current?.click();
    } 
    // Setting color picker popup
    const showColorPicker = () => {
        pushPopup(
            <ColorPopup 
                defaultColor={colors?.background[typeId]} 
                onChange={setColor} 
                onChangeComplete={updateColor} 
            />, 
            currentButton
        );
    };
    // Setting image customization options popup
    const edit = () => {
        setPopup(
            <HeaderPopup 
                showImagePicker={showImagePicker} 
                showColorPicker={showColorPicker} 
                onRemove={() => updateImage(null)}
                hasImage={hasImage}
                type={type} 
            />, 
            currentButton
        );
    };

    return(
        <>
            <EditButton 
                onClick={edit}
                ref={button}
            />
            <input type="file" style={{ display: 'none' }} onChange={onFileChange} ref={input} />
        </>
    )
}