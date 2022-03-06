import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../contexts/ModalProvider';
import { usePopup } from '../../contexts/PopupProvider';
import { FileModal } from '../../modals/file-modal/FileModal';
import { BannerPopup } from '../../popups/banner-popup/BannerPopup';
import { ColorPopup } from '../../popups/color-popup/ColorPopup';
import { selectMeId } from '../../redux/me/userSelectors';
import { useAppSelector } from '../../redux/store';
import { setUser, updateUser as updateUserStore } from '../../redux/user/userActions';
import { selectUser, selectUserColors } from '../../redux/user/userSelectors';
import { updateUser } from '../../utils';
import { User } from '../../utils/types';
import { EditButton } from './EditIcon';

export const UserBannerCustomize = () => {
    const dispatch = useDispatch();
    const myId = useAppSelector(selectMeId);
    const colors = useAppSelector(selectUserColors);
    const button = createRef<HTMLDivElement>();
    const input = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const currentButton = useRef<null | HTMLDivElement>(null);
    const { setPopup, pushPopup, closePopups } = usePopup();
    const { setModal, closeModals } = useModal();

    useEffect(() => {
        currentButton.current = button.current;
    }, []);

    const setColor = (color: string) => {
        if(!colors) return;

        // Setting new banner color
        const colorScheme: User['colorScheme'] = {
            background: {
                ...colors?.background,
                banner: color
            }
        }

        // Updating local store
        dispatch(updateUserStore({ colorScheme }));
        return colorScheme;
    }
    const updateColor = async (color: string) => {
        if(!myId) return;

        // Updating user banner color
        await updateUser(myId, { bannerColor: color });
    }

    // On image upload
    const onImageDone = async (file: File) => {
        if(!myId) return;
        const user = await updateUser(myId, { banner: file });
        dispatch(setUser(user));
        closeModals();
    }
    // On image picker change
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;

        const file = e.target.files[0];
        if(!file) return;
        
        setModal(<FileModal file={file} onDone={onImageDone} onCancel={closeModals} />);
    }
    // Setting image picker
    const showImagePicker = () => {
        closePopups();
        input.current?.click();
    } 
    // Setting color picker popup
    const showColorPicker = () => {
        pushPopup(<ColorPopup defaultColor={colors?.background.banner} onChange={setColor} onChangeComplete={updateColor} />, currentButton);
    };
    // Setting banner customization options popup
    const edit = () => {
        setPopup(<BannerPopup showImagePicker={showImagePicker} showColorPicker={showColorPicker} />, currentButton);
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