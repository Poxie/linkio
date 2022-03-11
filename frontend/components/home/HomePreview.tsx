import React, { useState } from 'react';
import { HomeInput } from './HomeInput';
import { HomePreviewConnector } from './HomePreviewConnector';
import { HomePreviewScreen } from './HomePreviewScreen';

type Context = { username: string, setUsername: (username: string) => void };
const PreviewContext = React.createContext({} as Context);
export const usePreview = () => React.useContext(PreviewContext);

const PreviewProvider: React.FC = ({ children }) => {
    const [username, setUsername] = useState('');

    const value = { username, setUsername };
    return(
        <PreviewContext.Provider value={value}>
            {children}
        </PreviewContext.Provider>
    )
}

export const HomePreview = () => {
    return(
        <PreviewProvider>
            <HomeInput />
            <HomePreviewConnector />
            <HomePreviewScreen />
        </PreviewProvider>
    )
}