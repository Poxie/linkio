import React, { ReactElement, useCallback, useEffect, useRef } from 'react';
import { Position, useTooltip } from '../../contexts/TooltipProvider';

export const HasTooltip: React.FC<{
    children: any;
    tooltip: string | ReactElement;
    className?: string;
    closeOnClick?: boolean;
    delay?: number;
    position?: Position;
}> = ({ children, tooltip, className, closeOnClick, delay=0, position='top' }) => {
    const { setTooltip, closeTooltip } = useTooltip();
    const hoveringNow = useRef(false);
    const ref = useRef<HTMLDivElement>(null);
    const timeout = useRef<NodeJS.Timeout | null>(null);

    const open = () => setTooltip({ tooltip, position, elementRef: ref });
    const close = closeTooltip;

    const handleMouseEnter = useCallback(() => {
        hoveringNow.current = true;
        if(!delay) return open();
        
        timeout.current = setTimeout(() => {
            if(hoveringNow.current) open();
        }, delay);
    }, [open, delay]);
    const handleMouseLeave = useCallback(() => {
        hoveringNow.current = false;
        timeout.current && clearTimeout(timeout.current);
        close();
    }, [close]);
    const handleClick = useCallback(() => {
        closeOnClick && closeTooltip();
    }, [closeOnClick, closeTooltip]);

    // Closing tooltip on unmount
    useEffect(() => {
        return close;
    }, []);

    return(
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={className} onClick={handleClick} ref={ref}>
            {children}
        </div>
    )
}