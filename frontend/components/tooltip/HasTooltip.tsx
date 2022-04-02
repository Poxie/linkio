import React, { ReactElement, useRef } from 'react';
import { useTooltip } from '../../contexts/TooltipProvider';

export const HasTooltip: React.FC<{
    children: any;
    tooltip: string | ReactElement;
    closeOnClick?: boolean;
    delay?: number;
}> = ({ children, tooltip, closeOnClick, delay=0 }) => {
    const { setTooltip, closeTooltip } = useTooltip();
    const ref = useRef<HTMLDivElement>(null);

    const open = () => setTooltip({ tooltip, elementRef: ref });
    const close = closeTooltip;

    return(
        <div onMouseEnter={open} onMouseLeave={close} ref={ref}>
            {children}
        </div>
    )
}