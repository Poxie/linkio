import React, { useCallback } from 'react';
import styles from '../../../styles/Admin.module.scss';
import { useDispatch } from 'react-redux';
import { setMeAvatar, setMeBanner, setMeColor } from '../../../redux/me/meActions';
import { selectMeColors, selectMeDisplay, selectMeId } from '../../../redux/me/meSelectors';
import { useAppSelector } from '../../../redux/store';
import { CustomizeColorInput } from './CustomizeColorInput';
import { User } from '../../../utils/types';
import { updateUser } from '../../../utils';
import { CustomizeFileInput } from './CustomizeFileInput';

export const AppearanceCustomizing = () => {
    const dispatch = useDispatch();
    const id = useAppSelector(selectMeId);
    const colors = useAppSelector(selectMeColors);
    const display = useAppSelector(selectMeDisplay);

    const updateLocalColor = useCallback(async (type: keyof User['colorScheme']['background'], color: string | null) => {
        dispatch(setMeColor('background', type, color));
    }, [dispatch]);
    const updateDatabaseColor = useCallback(async (type: keyof User['colorScheme']['background'], color: string | null) => {
        if(!id) return;

        dispatch(setMeColor('background', type, color));
        await updateUser(id, { [`${type}Color`]: color });
    }, [dispatch, id]);

    const updateImage = async (type: 'banner' | 'avatar', file: File) => {
        if(!id) return;
        const { bannerURL, avatarURL } = await updateUser(id, { [type]: file });
        dispatch(type === 'banner' ? setMeBanner(bannerURL) : setMeAvatar(avatarURL));
    }

    return(
        <div className={styles['customize-container']}>
            <div className={styles['customize-images']}>
                <CustomizeFileInput 
                    header={'Avatar'}
                    image={display.avatarURL}
                    onSubmit={file => updateImage('avatar', file)}
                />
                <CustomizeFileInput 
                    header={'Banner'}
                    image={display.bannerURL}
                    onSubmit={file => updateImage('banner', file)}
                    aspectRatio={3.5/1}
                />
            </div>

            <CustomizeColorInput 
                value={colors?.background?.banner || 'var(--background-secondary)'}
                header={'Banner Color'}
                onChange={value => updateLocalColor('banner', value)}
                onChangeComplete={value => updateDatabaseColor('banner', value)}
            />
            <CustomizeColorInput 
                value={colors?.background?.header || 'var(--background-primary)'}
                header={'Header Color'}
                onChange={value => updateLocalColor('header', value)}
                onChangeComplete={value => updateDatabaseColor('header', value)}
            />
            <CustomizeColorInput 
                value={colors?.background?.item || 'var(--background-primary)'}
                header={'Item Color'}
                onChange={value => updateLocalColor('item', value)}
                onChangeComplete={value => updateDatabaseColor('item', value)}
            />
            <CustomizeColorInput 
                value={colors?.background?.primary || 'var(--background-secondary)'}
                header={'Background Color'}
                onChange={value => updateLocalColor('primary', value)}
                onChangeComplete={value => updateDatabaseColor('primary', value)}
            />
        </div>
    )
}