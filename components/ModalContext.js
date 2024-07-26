import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    const toggleModal = () => setModalVisible(prev => !prev);

    return (
        <ModalContext.Provider value={{ isModalVisible, showModal, hideModal, toggleModal }}>
            {children}
        </ModalContext.Provider>
    );
};
