import { AnimatePresence } from 'framer-motion';
import React, { ReactElement, useState } from 'react';
import styles from '../styles/Tooltip.module.scss';
import { motion } from 'framer-motion';
import { Tooltip } from '../components/tooltip/Tooltip';

type TooltipContextType = {
    setTooltip: ({ tooltip,elementRef,position }: { tooltip: string | ReactElement, elementRef: React.RefObject<any>, position?: 'left' | 'right' | 'bottom' | 'top' }) => void;
    closeTooltip: () => void;
}

const TooltipContext = React.createContext({} as TooltipContextType);

export const useTooltip = () => React.useContext(TooltipContext);

export const TooltipProvider: React.FC = ({ children }) => {
    const [tooltip, setTooltip] = useState<string | ReactElement | null>(null);
    const [position, setPosition] = useState({x: 0, y: 0});

    // Function to close tooltips
    const closeTooltip = React.useCallback(() => setTooltip(null), [setTooltip]);

    // Function to get position
    const getPosition = React.useCallback((ref: React.RefObject<any>) => {
        if(!ref.current) return { x: 0, y: 0 };

        const { left, width, top, height } = ref.current.getBoundingClientRect();

        const x = left + width / 2;
        const y = top - height - 5;

        return { x, y };
    }, []);
    // Function to show tooltip
    const _setTooltip: TooltipContextType['setTooltip'] = React.useCallback(({ tooltip, elementRef, position }) => {
        setTooltip(tooltip);
        setPosition(getPosition(elementRef));
    }, [setTooltip, setPosition]);

    const value = {
        setTooltip: _setTooltip,
        closeTooltip
    }
    return(
        <TooltipContext.Provider value={value}>
            {children}

            <div className={styles['tooltip-container']}>
                <AnimatePresence>
                    {tooltip && (
                        <Tooltip left={position.x} top={position.y} >
                            {tooltip}
                        </Tooltip>
                    )}
                </AnimatePresence>
            </div>
        </TooltipContext.Provider>
    )
}