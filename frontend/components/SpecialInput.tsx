import React, { useState } from 'react';
import { ArrowIcon } from '../icons/ArrowIcon';
import { Input } from './Input';
import styles from '../styles/SpecialInput.module.scss';
import { HomeInputPlaceholder } from './home/HomeInputPlaceholder';
import { AnimatedInputPlaceholder } from './AnimatedInputPlaceholder';

export const SpecialInput: React.FC<{
    value?: string;
    onSubmit?: (text: string) => void;
    onChange?: (text: string) => void;
}> = ({ onSubmit, onChange, value: _value }) => {
    const [value, setValue] = useState(_value || '');
    const [isFocusing, setIsFocusing] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
        e.preventDefault();
        onSubmit && onSubmit(value);
    }
    const handleChange = (text: string) => {
        setValue(text);
        onChange && onChange(text);
    }
    
    return(
        <div className={styles['input-container']}>
            <span className={styles['input-prefix']}>
                {process.env.NEXT_PUBLIC_WEBSITE_NAME.toLowerCase()}.com/
            </span>
            <div className={styles['placeholder-container']}>
                <Input 
                    className={styles['input']}
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setIsFocusing(true)}
                    onBlur={() => setIsFocusing(false)}
                    methodsOnlyOnChange={false}
                    onSubmit={onSubmit}
                />
                {!value && !isFocusing && (
                    <AnimatedInputPlaceholder placeholder={'namehere'} />
                )}
                <div 
                    className={styles['submit-button'] + (value ? ` ${styles['active']}` : '')}
                    onClick={handleSubmit}
                >
                    <ArrowIcon />
                </div>
            </div>
        </div>
    )
}