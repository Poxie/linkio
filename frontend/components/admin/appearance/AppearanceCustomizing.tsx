import React, { useCallback } from 'react';
import styles from '../../../styles/Admin.module.scss';
import { useDispatch } from 'react-redux';
import { setMeColor } from '../../../redux/me/meActions';
import { selectMeColors, selectMeId } from '../../../redux/me/meSelectors';
import { useAppSelector } from '../../../redux/store';
import { CutsomizeColorInput } from './CustomizeColorInput';
import { User } from '../../../utils/types';
import { updateUser } from '../../../utils';

export const AppearanceCustomizing = () => {
    const dispatch = useDispatch();
    const id = useAppSelector(selectMeId);
    const colors = useAppSelector(selectMeColors);

    const updateColor = useCallback(async (type: keyof User['colorScheme']['background'], color: string | null) => {
        if(!id) return;

        dispatch(setMeColor('background', type, color));
        await updateUser(id, { [`${type}Color`]: color });
    }, [dispatch, id]);

    return(
        <div className={styles['customize-container']}>
            <CutsomizeColorInput 
                value={colors?.background?.banner || 'var(--background-secondary)'}
                header={'Banner Color'}
                onChange={value => updateColor('banner', value)}
            />
            <CutsomizeColorInput 
                value={colors?.background?.header || 'var(--background-primary)'}
                header={'Header Color'}
                onChange={value => updateColor('header', value)}
            />
            <CutsomizeColorInput 
                value={colors?.background?.item || 'var(--background-primary)'}
                header={'Item Color'}
                onChange={value => updateColor('item', value)}
            />
            <CutsomizeColorInput 
                value={colors?.background?.primary || 'var(--background-secondary)'}
                header={'Background Color'}
                onChange={value => updateColor('primary', value)}
            />
        </div>
    )
}