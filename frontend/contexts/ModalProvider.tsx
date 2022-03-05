import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Modal } from '../modals/Modal';
import styles from '../styles/Modal.module.scss';

type Component = JSX.Element | React.FC<any>;
type Ref = React.RefObject<HTMLDivElement>;
type Element = HTMLDivElement | null;
type Modal = {
    id: number;
    component: Component;
}
type ModalContextType = {
    setModal: (component: Component ) => void;
    pushModal: (component: Component ) => void;
    closeModals: () => void;
    goBack: () => void;
    canGoBack: boolean;
}
const ModalContext = React.createContext({} as ModalContextType);

export const useModal = () => React.useContext(ModalContext);

export const ModalProvider: React.FC = ({ children }) => {
    const [modals, setModals] = useState<Modal[]>([]);
    const [activePopup, setActiveModal] = useState(0);

    /**
     * Creates a modal object
     * @param component required, the modal component to display
     * @returns a modal object
    */
    const createtModal = (component: Component) => {
        const modal: Modal = {
            id: Math.random(),
            component,
        }
        return modal;
    }
    /**
     * Sets a modal
     * @param component required, the modal component to display
     */
    const setModal = (component: Component) => {
        closeModals();
        const modal = createtModal(component);
        setModals(prev => [...prev, modal]);
    }
    /**
     * Pushs a modal to the array
     * @param component required, the modal component to display
    */
    const pushModal = (component: Component) => {
        const modal = createtModal(component);
        setModals(prev => [...prev, modal]);
        setActiveModal(prev => prev + 1);
    }
    /**
     * Goes to previous modal, if there is one
    */
    const goBack = () => {
        if(modals.length < 2) return;

        setModals(prev => {
            const newPopups = [...prev];
            newPopups.pop();
            return newPopups;
        });
        setActiveModal(prev => prev - 1);
    }
    /**
     * Closes the modals
    */
    const closeModals = () => {
        setModals([]);
        setActiveModal(0);
    }

    const modal = modals[activePopup];
    const canGoBack = modals.length > 1;
    const value = {
        setModal,
        pushModal,
        closeModals,
        canGoBack,
        goBack
    }
    return(
        <ModalContext.Provider value={value}>
            {children}

            <div className={styles.container}>
                <AnimatePresence>
                    {modal && (
                        <>
                        <Modal
                            canGoBack={canGoBack}
                            key={modal.id}
                        >
                            {typeof modal.component !== 'function' ? modal.component : <modal.component />}
                        </Modal>
                        <motion.div 
                            className={styles['backdrop']}
                            onClick={canGoBack ? goBack : closeModals}
                            initial={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: .180 }}
                        />
                        </>
                    )}
                </AnimatePresence>
            </div>
        </ModalContext.Provider>
    )
}