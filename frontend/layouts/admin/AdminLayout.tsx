import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import { selectMeId, selectMeLoading } from '../../redux/me/meSelectors';
import { useAppSelector } from '../../redux/store';
import { WEBSITE_NAME } from '../../utils/constants';
import styles from './AdminLayout.module.scss';
import { AdminLoadingPage } from './AdminLoadingPage';
import { AdminNavbar } from './AdminNavbar';

export const AdminLayout: React.FC = ({ children }) => {
    const loading = useAppSelector(selectMeLoading);
    const [isFirstLoad, setisFirstLoad] = useState(loading);

    useEffect(() => {
        if(!loading) setisFirstLoad(false);
    }, [loading])

    return(
        <>
        <Head>
            <title>
                {WEBSITE_NAME} Admin
            </title>
        </Head>
        <div className={styles['container']}>
            <AnimatePresence>
                {loading && (
                    <AdminLoadingPage />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {!loading && (
                    <>
                    <motion.div 
                        initial={{ opacity: isFirstLoad ? 0 : 1 }}
                        animate={{ opacity: isFirstLoad ? 0 : 1 }}
                        transition={{ delay: .5, duration: 1 }}
                    >
                        <AdminNavbar />
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: isFirstLoad ? 0 : 1, scale: isFirstLoad ? .8 : 1 }}
                        animate={{ opacity: isFirstLoad ? 0 : 1, scale: 1 }}
                        transition={{ delay: .5, duration: 1 }}
                    >
                        <div className={styles['main']}>
                            {children}
                        </div>
                    </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
        </>
    )
}