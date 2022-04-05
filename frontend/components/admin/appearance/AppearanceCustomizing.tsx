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
import { SortableItems } from '../../SortableItems';

export const AppearanceCustomizing = () => {
    const dispatch = useDispatch();
    const id = useAppSelector(selectMeId);
    const colors = useAppSelector(selectMeColors);
    const { avatar, header, banner, item, primary } = colors?.background || {} as User['colorScheme']['background'];
    const display = useAppSelector(selectMeDisplay);

    const updateLocalColor = useCallback(async (type: keyof User['colorScheme']['background'], color: string | null) => {
        dispatch(setMeColor('background', type, color));
    }, [dispatch]);
    const updateDatabaseColor = useCallback(async (type: keyof User['colorScheme']['background'], color: string | null) => {
        if(!id) return;

        dispatch(setMeColor('background', type, color));
        await updateUser(id, { [`${type}Color`]: color });
    }, [dispatch, id]);

    const updateImage = async (type: 'banner' | 'avatar', file: File | null) => {
        if(!id) return;
        const { bannerURL, avatarURL } = await updateUser(id, { [type]: file });
        dispatch(type === 'banner' ? setMeBanner(bannerURL) : setMeAvatar(avatarURL));
    }

    const items = [
        { background: avatar || 'var(--user-avatar-background)', header: 'Avatar Color', id: 'avatar' },
        { background: banner || 'var(--user-banner-background)', header: 'Banner Background', id: 'banner' },
        { background: header || 'var(--user-header-background)', header: 'Header Background', id: 'header' },
        { background: item || 'var(--user-item-background)', item: 'Item Background', id: 'item' },
        { background: primary || 'var(--user-background-primary)', item: 'Background Color', id: 'primary' },
    ] as {background: string, header: string, id: keyof User['colorScheme']['background']}[];
    return(
        <div className={styles['customize-container']}>
            <div className={styles['customize-images']}>
                <CustomizeFileInput 
                    header={'Avatar'}
                    image={display.avatarURL}
                    onSubmit={file => updateImage('avatar', file)}
                    placeholder={'Change Avatar'}
                />
                <CustomizeFileInput 
                    header={'Banner'}
                    image={display.bannerURL}
                    onSubmit={file => updateImage('banner', file)}
                    aspectRatio={3.5/1}
                    placeholder={'Change Banner'}
                />
            </div>

            {items.map(item => {
                const { background, header, id } = item;
                return(
                    <CustomizeColorInput 
                        onChange={value => updateLocalColor(id, value)}
                        onChangeComplete={value => updateDatabaseColor(id, value)}
                        value={background}
                        header={header}
                        key={header}
                    />
                )
            })}
        </div>
    )
}