import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Input.module.scss';

type Props = {
    label?: string;
    placeholder?: string;
    value: string;
    onChange?: (text: string) => void;
    onSubmit?: (text: string) => void;
    onFocus?: (text: string) => void;
    onBlur?: (text: string) => void;
    methodsOnlyOnChange?: boolean;
    className?: string;
    textarea?: boolean;
    resize?: 'horizontal' | 'vertical' | 'none';
}
export const Input: React.FC<Props> = ({ label, placeholder, value: _value, onChange, onSubmit, onBlur, onFocus, methodsOnlyOnChange=true, className, textarea=false, resize='vertical' }) => {
    const ref = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState(_value);
    const hasChanged = useRef(false);

    useEffect(() => setValue(_value), [_value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        hasChanged.current = true;
        const val = e.target.value;
        setValue(val);

        if(onChange) {
            onChange(val);
        }
    }
    const handleSubmit = (e: React.FormEvent) => {
        if(!ref.current) return;
        hasChanged.current = false;

        e.preventDefault();
        if(onSubmit) {
            onSubmit(value);
        }
    }
    const handleBlur = () => {
        if(!hasChanged.current && methodsOnlyOnChange) return;
        onBlur && onBlur(ref.current?.value || '');
        hasChanged.current = false;
    }
    const handleFocus = () => {
        if(!hasChanged.current && methodsOnlyOnChange) return;
        onFocus && onFocus(ref.current?.value || '');
        hasChanged.current = false;
    }

    const options = {
        id: label,
        placeholder: placeholder,
        onChange: handleChange,
        onBlur: handleBlur,
        onFocus: handleFocus,
        value: value,
        ref: ref
    } as any;
    className = [styles.form, className].join(' ');
    return(
        <form onSubmit={handleSubmit} className={className}>
            {label && (
                <label htmlFor={label} className={styles.label}>
                    {label}
                </label>
            )}
            {textarea ? (
                <textarea 
                    {...options}
                    style={{ resize }}
                />
            ) : (
                <input
                    {...options} 
                />
            )}
        </form>
    )
}