import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useDimensions } from '../hooks/useDimensions';
import { Popup } from '../popups/Popup';

type Component = JSX.Element | React.FC<any>;
type Ref = React.RefObject<HTMLDivElement>;
export type Options = {
    centered?: boolean;
}
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
    setPopup: (component: Component, ref: Ref, options?: Options ) => void;
    pushPopup: (component: Component, ref: Ref ) => void;
    closePopups: () => void;
    goBack: () => void;
    canGoBack: boolean;
}
const PopupContext = React.createContext({} as PopupContextType);

export const usePopup = () => React.useContext(PopupContext);

export const PopupProvider: React.FC = ({ children }) => {
    const [popups, setPopups] = useState<Popup[]>([]);
    const [activePopup, setActivePopup] = useState(0);
    const [options, setOptions] = useState({} as Options | undefined);
    const isCentered = useRef<boolean | undefined>(false);

    // Get popup position relative to element
    const getPopupPosition = (ref: Element) => {
        if(!ref) return { left: 0, top: 0 };
        const { left: _left, top: _top, height, width } = ref.getBoundingClientRect();
        
        const top = _top + height;
        
        const additionalLeft = isCentered.current ? width / 2 : width;
        let left = _left + additionalLeft;

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
     * Creates a popup object
     * @param component required, the popup component to display
     * @param ref required, the ref of the element the popup should be relative to
     * @returns a popup object
    */
    const createPopup = (component: Component, ref: Ref) => {
        const popup: Popup = {
            id: Math.random(),
            element: ref.current,
            component,
            position: getPopupPosition(ref.current)
        }
        return popup;
    }
    /**
     * Sets a popup
     * @param component required, the popup component to display
     * @param ref required, the ref of the element the popup should be relative to
     */
    const setPopup = (component: Component, ref: Ref, options?: Options) => {
        isCentered.current = options?.centered;
        closePopups();
        setOptions(options)
        const popup = createPopup(component, ref);
        setPopups(prev => [...prev, popup]);
    }
    /**
     * Pushs a popup to the array
     * @param component required, the popup component to display
     * @param ref required, the ref of the element the popup should be relative to
    */
    const pushPopup = (component: Component, ref: Ref, options?: Options) => {
        isCentered.current = options?.centered;
        setOptions(options)
        const popup = createPopup(component, ref);
        setPopups(prev => [...prev, popup]);
        setActivePopup(prev => prev + 1);
    }
    /**
     * Goes to previous popup, if there is one
    */
    const goBack = () => {
        if(popups.length < 2) return;

        setPopups(prev => {
            const newPopups = [...prev];
            newPopups.pop();
            return newPopups;
        });
        setActivePopup(prev => prev - 1);
    }
    /**
     * Closes the popups
    */
    const closePopups = () => {
        setPopups([]);
        setActivePopup(0);
    }

    const popup = popups[activePopup];
    const canGoBack = popups.length > 1;
    const value = {
        setPopup,
        pushPopup,
        closePopups,
        canGoBack,
        goBack
    }
    return(
        <PopupContext.Provider value={value}>
            {children}

            <AnimatePresence>
                {popup && (
                    <Popup 
                        top={popup.position.top} 
                        left={popup.position.left}
                        canGoBack={canGoBack}
                        options={options}
                        key={popup.id}
                    >
                        {typeof popup.component !== 'function' ? popup.component : <popup.component />}
                    </Popup>
                )}
            </AnimatePresence>
        </PopupContext.Provider>
    )
}