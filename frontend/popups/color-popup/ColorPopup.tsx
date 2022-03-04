import React, { useState } from 'react';
import styles from './ColorPopup.module.scss';
import { ChromePicker, ColorResult } from 'react-color';

type Props = {
    onChange?: (color: string) => void;
    onChangeComplete?: (color: string) => void;
    defaultColor?: string;
}
export const ColorPopup: React.FC<Props> = ({ onChange, onChangeComplete, defaultColor }) => {
    const [color, setColor] = useState(defaultColor || '#ff0');

    const handleChange = (color: ColorResult) => {
        const hex = color.hex;
        setColor(hex);
        onChange && onChange(hex);
    }
    const handleChangeComplete = (color: ColorResult) => {
        const hex = color.hex;
        onChangeComplete && onChangeComplete(hex);
    }

    return(
        <ChromePicker 
            onChange={handleChange}
            onChangeComplete={handleChangeComplete}
            className={styles.picker}
            color={color}
        />
    )
}