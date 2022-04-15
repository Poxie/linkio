import React, { useState } from 'react';
import styles from '../../styles/NotFound.module.scss';
import { useRouter } from 'next/router';
import { WEBSITE_NAME } from '../../utils/constants';
import { SpecialInput } from '../SpecialInput';
import Head from 'next/head';

export const NotFoundPage = () => {
    const router = useRouter();
    const [search, setSearch] = useState('');

    const onSubmit = () => {
        router.push(`/${search}`);
    }

    return(
        <>
        <Head>
            <title>
                {WEBSITE_NAME} | Page not found
            </title>
        </Head>
        <div className={styles['container']}>
            <h1>
                404 - Not Found
            </h1>

            <span className={styles['description']}>
                Ouch, that&apos;s an error. Perhaps you entered it incorrectly?
            </span>
            
            <SpecialInput 
                onChange={setSearch}
                onSubmit={onSubmit}
                placeholder={'namehere'}
            />
        </div>
        </>
    )
}