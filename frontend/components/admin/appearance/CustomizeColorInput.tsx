import React, { useRef } from 'react';
import styles from '../../../styles/Admin.module.scss';
import { usePopup } from '../../../contexts/PopupProvider';
import { ColorPopup } from '../../../popups/color-popup/ColorPopup';
import { CustomizeColorPreset } from './CustomizeColorPreset';

export const CutsomizeColorInput: React.FC<{
    header: string;
    value: string;
    onChange: (color: string) => void;
}> = ({ header, value, onChange }) => {
    const { setPopup } = usePopup();
    const ref = useRef<HTMLDivElement>(null);

    const open = () => setPopup(
        <ColorPopup 
            defaultColor={value}
            onChange={onChange}
            onChangeComplete={onChange}
        />,
        ref,
        { centered: true }
    );

    return(
        <div>
            <div className={styles['input-header']}>
                {header}
            </div>

            <div className={styles['color-options']}>
                <div 
                    ref={ref}
                    onClick={open}
                    style={{ backgroundColor: value, width: 45, height: 45 }}
                    className={styles['color-preview']}
                />

                <CustomizeColorPreset onClick={onChange} />
            </div>
        </div>
    )
}