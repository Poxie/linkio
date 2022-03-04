import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePopup } from '../contexts/PopupProvider';
import styles from '../styles/Popup.module.scss';

export const Popup: React.FC<{left: number, top: number}> = ({ children, left: _left, top }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { closePopups } = usePopup();
    const [left, setLeft] = useState(_left);

    useEffect(() => {
        const newLeft = _left - (ref.current?.getBoundingClientRect().width || 0);
        setLeft(newLeft);
    }, [_left])

    useEffect(() => {
        // Detecting click outside of popup
        const handleClickOutside = (e: MouseEvent) => {
            if(ref.current && !ref.current.contains(e.target as HTMLDivElement)) {
                closePopups();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);

    return(
        <motion.div 
            className={styles.container}
            style={{ left, top }}
            initial={{ opacity: 0, translateY: 20 }}
            exit={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: .200 }}
            ref={ref}
        >
            {children}
        </motion.div>
    )
}