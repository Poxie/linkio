import React from 'react';
import { motion } from 'framer-motion';
import styles from './AdminLayout.module.scss';

export const AdminLoadingPage = () => {
    return(
        <motion.div 
            className={styles['loading']}
            initial={{ scale: 1, opacity: 1 }}
            exit={{ scale: .8, opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <span>
                Initializing admin structure...
            </span>
        </motion.div>
    )
}