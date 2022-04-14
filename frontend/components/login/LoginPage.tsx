import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMe } from '../../redux/me/meActions';
import styles from '../../styles/Login.module.scss';
import { createUser, login } from '../../utils';
import { capitalizeFirstLetter } from '../../utils/functions';
import { Button } from '../Button';
import { Input } from '../Input';

type QueryParams = {
    type?: string;
    username?: string;
    redirect_uri: string;
}
export const LoginPage = () => {
    const router = useRouter();
    let { redirect_uri, type, username: _username } = router.query as QueryParams;
    if(!type) type = 'login';
    if(!redirect_uri) redirect_uri = '/admin';
    
    const dispatch = useDispatch();
    const [username, setUsername] = useState(_username || '');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Removing error notice on input change
    useEffect(() => setError(''), [username, password]);

    // Handling submit action
    const onSubmit = async () => {
        if(!username || !password) return setError('Fields may not be empty.')

        // Handling login
        if(type === 'login') {
            const user = await login(username, password);
            if(!user) {
                return setError('Invalid credentials.');
            }

            return window.location.replace(redirect_uri);
        }

        // Handling creation of account
        if(password.length < 5) return setError('Password must include 5 or more characters.');

        const user = await createUser(username, password);
        if(!user) return setError('Username is unavailable.');

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
                />

                {error && (
                    <div className={styles['error']}>
                        {error}
                    </div>
                )}
                
                <Button
                    onClick={onSubmit}
                    type={valid ? 'primary' : 'secondary'}
                >
                    {header}
                </Button>

                <div className={styles['footer']} onClick={swap}>
                    {footer}
                </div>
            </div>
        </div>
    )
}