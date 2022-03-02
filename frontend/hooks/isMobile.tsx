import React, { useEffect, useRef, useState } from 'react';
import { MOBILE_SCREEN_SIZE } from '../utils/constants';

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    const isMobileRef = useRef(isMobile);

    useEffect(() => {
        const resize = () => {
            const width = window.innerWidth;
            if(width < MOBILE_SCREEN_SIZE && !isMobileRef.current) {
                setIsMobile(true);
                isMobileRef.current = true;
            }
            if(width >= MOBILE_SCREEN_SIZE && isMobileRef.current) {
                setIsMobile(false);
                isMobileRef.current = false;
            }
        }
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return isMobile;
}