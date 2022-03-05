import { motion } from 'framer-motion';
import React from 'react';
import styles from '../styles/Modal.module.scss';

export const Modal: React.FC<{
    canGoBack: boolean;
}> = ({ children }) => {
    return(
        <motion.div 
            className={styles.modal}
            initial={{ opacity: 0, scale: .8, translateX: '-50%', translateY: '-50%' }}
            exit={{ opacity: 0, scale: .8, translateX: '-50%', translateY: '-50%' }}
            animate={{ opacity: 1, scale: 1, translateX: '-50%', translateY: '-50%' }}
            transition={{ duration: .180 }}
        >
            {children}
        </motion.div>
    )
}