import React, { ReactElement, useCallback, useRef } from 'react';
import { useTooltip } from '../../contexts/TooltipProvider';

export const HasTooltip: React.FC<{
    children: any;
    tooltip: string | ReactElement;
    closeOnClick?: boolean;
    delay?: number;
}> = ({ children, tooltip, closeOnClick, delay=0 }) => {
    const { setTooltip, closeTooltip } = useTooltip();
    const hoveringNow = useRef(false);
    const ref = useRef<HTMLDivElement>(null);
    const timeout = useRef<NodeJS.Timeout | null>(null);

    const open = () => setTooltip({ tooltip, elementRef: ref });
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

    return(
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={ref}>
            {children}
        </div>
    )
}