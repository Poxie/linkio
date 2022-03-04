import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePopup } from '../contexts/PopupProvider';
import styles from '../styles/Popup.module.scss';

export const Popup: React.FC<{left: number, top: number}> = ({ children, left, top }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { closePopups } = usePopup();

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
            initial={{ opacity: 0, scale: .8 }}
            exit={{ opacity: 0, scale: .8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .200 }}
            ref={ref}
        >
            {children}
        </motion.div>
    )
}