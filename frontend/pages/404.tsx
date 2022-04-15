import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SpecialInput } from '../components/SpecialInput';
import styles from '../styles/NotFound.module.scss';

export default function index() {
    const router = useRouter();
    const [search, setSearch] = useState('');

    const onSubmit = () => {
        router.push(`/${search}`);
    }

    return(
        <div className={styles['container']}>
            <h1>
                404 - Not Found
            </h1>

            <span className={styles['description']}>
                Ouch, that's an error. Perhaps you entered it incorrectly?
            </span>
            
            <SpecialInput 
                onChange={setSearch}
                onSubmit={onSubmit}
            />
        </div>
    )
}