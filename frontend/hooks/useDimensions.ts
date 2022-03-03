import { useEffect, useState } from "react"

const getWindowDimensions = () => ({ width: window.innerWidth, height: window.innerHeight });
export const useDimensions = () => {
    const [dimensions, setDimensions] = useState(typeof window !== 'undefined' ? getWindowDimensions() : {width: 0, height: 0});
    
    useEffect(() => {
        const updateDimensions = () => setDimensions(getWindowDimensions());

        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return dimensions;
}