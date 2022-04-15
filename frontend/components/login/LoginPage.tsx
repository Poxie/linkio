import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMe } from '../../redux/me/meActions';
import { selectMe } from '../../redux/me/meSelectors';
import { useAppSelector } from '../../redux/store';
import styles from '../../styles/Login.module.scss';
import { createUser, login } from '../../utils';
import { capitalizeFirstLetter } from '../../utils/functions';
import { Button } from '../Button';
import { Input } from '../Input';
import { LoadingSpinner } from '../loading-spinner/LoadingSpinner';

type QueryParams = {
    type?: string;
    username?: string;
    redirect_uri: string;
}
export const LoginPage = () => {
    const dispatch = useDispatch();

    const router = useRouter();
    let { redirect_uri, type, username: _username } = router.query as QueryParams;
    if(!type) type = 'login';
    if(!redirect_uri) redirect_uri = '/admin';
    
    const [username, setUsername] = useState(_username || '');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Removing error notice on input change
    useEffect(() => setError(''), [username, password]);

    // Checking if user is already logged in
    const me = useAppSelector(selectMe);
    if(me) {
        router.replace(redirect_uri);
        return <></>;
    }

    // Handling submit action
    const onSubmit = async () => {
        if(!username || !password) return setError('Fields may not be empty.')

        // Updating loading state
        setLoading(true);

        // Handling login
        if(type === 'login') {
            const user = await login(username, password);
            
            if(!user) {
                setLoading(false);
                return setError('Invalid credentials.');
            }

            return window.location.replace(redirect_uri);
        }

        // Handling creation of account
        if(password.length < 5) return setError('Password must include 5 or more characters.');

        const user = await createUser(username, password);

        if(!user) {
            setLoading(false);
            setError('Username is unavailable.');
            return;
        }

        dispatch(setMe(user));
        return router.replace(redirect_uri);
    }
    // Swapping between creata account and login
    const swap = () => {
        // Swapping type, if create set as login, etc
        type = type === 'create' ? 'login' : 'create';
        
        const path = `/login?type=${type}` + (username ? `&username=${username}` : '');
        router.replace(path);

        setError('');
    }

    const valid = username && password;
    const header = capitalizeFirstLetter(type) + ' ' + (type === 'create' ? 'Account' : 'to Account');
    const footer = type === 'create' ? 'Already have an account?' : 'Don\'t have an account?';
    return(
        <div className={styles['container']}>
            <div className={styles['content']}>
                <h2 className={styles['header']}>
                    {header}
                </h2>

                <Input 
                    value={username}
                    placeholder={'Username'}
                    onChange={setUsername}
                    label={'Username'}
                    className={styles['input-container']}
                />
                <Input 
                    value={password}
                    placeholder={'Password'}
                    onChange={setPassword}
                    label={'Password'}
                    className={styles['input-container']}
                    onSubmit={!loading ? onSubmit : undefined}
                />

                {error && (
                    <div className={styles['error']}>
                        {error}
                    </div>
                )}
                
                <Button
                    onClick={!loading ? onSubmit : undefined}
                    type={valid ? 'primary' : 'secondary'}
                >
                    {loading ? (
                        <LoadingSpinner className={styles['spinner']} />
                    ) : (
                        header
                    )}
                </Button>

                <div className={styles['footer']} onClick={swap}>
                    {footer}
                </div>
            </div>
        </div>
    )
}