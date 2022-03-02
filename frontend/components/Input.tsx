import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Input.module.scss';

type Props = {
    label?: string;
    placeholder?: string;
    value: string;
    onChange?: (text: string) => void;
    onSubmit?: (text: string) => void;
    className?: string;
}
export const Input: React.FC<Props> = ({ label, placeholder, value, onChange, onSubmit, className }) => {
    const ref = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if(onChange) {
            onChange(val);
        }
    }
    const handleSubmit = (e: React.FormEvent) => {
        if(!ref.current) return;

        e.preventDefault();
        if(onSubmit) {
            onSubmit(value);
        }
    }

    className = [styles.form, className].join(' ');
    return(
        <form onSubmit={handleSubmit} className={className}>
            {label && (
                <label htmlFor={label} className={styles.label}>
                    {label}
                </label>
            )}
            <input 
                id={label}
                type="text"
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
                ref={ref}
            />
        </form>
    )
}