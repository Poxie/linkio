import React from 'react';
import styles from '../../../styles/Admin.module.scss';
import { useDispatch } from 'react-redux';
import { setMeColor } from '../../../redux/me/meActions';
import { selectMeColors } from '../../../redux/me/meSelectors';
import { useAppSelector } from '../../../redux/store';
import { CutsomizeColorInput } from './CustomizeColorInput';

export const AppearanceCustomizing = () => {
    const dispatch = useDispatch();
    const colors = useAppSelector(selectMeColors);

    return(
        <div className={styles['customize-container']}>
            <CutsomizeColorInput 
                value={colors?.background?.banner || 'var(--background-secondary)'}
                header={'Banner Color'}
                onChange={value => dispatch(setMeColor('background', 'banner', value))}
            />
            <CutsomizeColorInput 
                value={colors?.background?.primary || 'var(--background-primary)'}
                header={'Header Color'}
                onChange={value => dispatch(setMeColor('background', 'primary', value))}
            />
        </div>
    )
}