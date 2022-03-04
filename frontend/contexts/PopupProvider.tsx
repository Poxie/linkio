import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDimensions } from '../hooks/useDimensions';
import { Popup } from '../popups/Popup';

type Component = JSX.Element | React.FC<any>;
type Ref = React.RefObject<HTMLDivElement>;
type Element = HTMLDivElement | null;
type Popup = {
    id: number;
    element: Element;
    component: Component;
    position: {
        left: number,
        top: number
    };
}
type PopupContextType = {
    setPopup: (component: Component, ref: Ref ) => void;
    closePopups: () => void;
}
const PopupContext = React.createContext({} as PopupContextType);

export const usePopup = () => React.useContext(PopupContext);

export const PopupProvider: React.FC = ({ children }) => {
    const [popups, setPopups] = useState<Popup[]>([]);

    // Get popup position relative to element
    const getPopupPosition = (ref: Element) => {
        if(!ref) return { left: 0, top: 0 };
        const { left: _left, top: _top, height, width } = ref.getBoundingClientRect();
        
        const top = _top + height;
        const left = _left + width;

        return { left, top };
    }

    // Updates popup position on resize
    useEffect(() => {
        const handleResize = () => {
            setPopups(popups => {
                const newPopups = popups.map(popup => {
                    popup.position = getPopupPosition(popup.element);
                    return popup;
                })
                return newPopups;
            })
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /**
     * Sets a popup
     * @param component required, the popup component to display
     * @param ref required, the ref of the element the popup should be relative to
     */
    const setPopup = (component: Component, ref: Ref) => {
        closePopups();
        const popup: Popup = {
            id: Math.random(),
            element: ref.current,
            component,
            position: getPopupPosition(ref.current)
        }
        setPopups(prev => [...prev, popup]);
    }
    /**
     * Closes the popups
     */
    const closePopups = () => {
        setPopups([]);
    }

    const value = {
        setPopup,
        closePopups
    }
    return(
        <PopupContext.Provider value={value}>
            {children}

            <AnimatePresence>
                {popups.map(popup => {
                    const { left, top } = popup.position;

                    return(
                        <Popup top={top} left={left} key={popup.id}>
                            {typeof popup.component !== 'function' ? popup.component : <popup.component />}
                        </Popup>
                    )
                })}
            </AnimatePresence>
        </PopupContext.Provider>
    )
}