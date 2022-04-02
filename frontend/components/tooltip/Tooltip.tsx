import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Tooltip.module.scss';
import { motion } from 'framer-motion';

export const Tooltip: React.FC<{
    top: number;
    left: number;
}> = ({ children, top, left: _left }) => {
    const [left, setLeft] = useState(_left);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        const left = _left - width / 2;

        setLeft(left);
    }, [_left]);

    return(
        <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .2 }}
            className={styles['tooltip']} 
            style={{ left, top }}
            ref={ref}
        >
            {children}
        </motion.div>
    )
}