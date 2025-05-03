
import React, { createContext, useContext, useState } from "react";

type modalType = "create" | "edit" | null;

type ModalContextType = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalType: modalType;
    setModalType: React.Dispatch<React.SetStateAction<modalType>>;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState<modalType>(null);

    return (
        <ModalContext.Provider value={{ isOpen, setIsOpen, modalType, setModalType }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};