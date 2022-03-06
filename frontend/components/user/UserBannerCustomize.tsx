import React, { createRef, useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { usePopup } from '../../contexts/PopupProvider';
import { BannerPopup } from '../../popups/banner-popup/BannerPopup';
import { ColorPopup } from '../../popups/color-popup/ColorPopup';
import { selectMeId } from '../../redux/me/userSelectors';
import { useAppSelector } from '../../redux/store';
import { updateUser as updateUserStore } from '../../redux/user/userActions';
import { selectUser, selectUserColors } from '../../redux/user/userSelectors';
import { updateUser } from '../../utils';
import { User } from '../../utils/types';
import { EditButton } from './EditIcon';

export const UserBannerCustomize = () => {
    const dispatch = useDispatch();
    const myId = useAppSelector(selectMeId);
    const colors = useAppSelector(selectUserColors);
    const button = createRef<HTMLDivElement>();
    const currentButton = useRef<null | HTMLDivElement>(null);
    const { setPopup, pushPopup, closePopups } = usePopup();

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

    // Setting color picker popup
    const showColorPicker = () => {
        pushPopup(<ColorPopup defaultColor={colors?.background.banner} onChange={setColor} onChangeComplete={updateColor} />, currentButton);
    };
    // Setting banner customization options popup
    const edit = () => {
        setPopup(<BannerPopup showColorPicker={showColorPicker} />, currentButton);
    };

    return(
        <div>
            <EditButton 
                onClick={edit}
                ref={button}
            />
        </div>
    )
}