'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';

// Modal Context 타입 정의
interface ModalContextType {
  isOpen: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  modalContent: ReactNode | null;
}

// Modal Context 생성
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Modal Provider Props 타입
interface ModalProviderProps {
  children: ReactNode;
}

// Modal Provider 컴포넌트
export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = useCallback((content: ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalContent(null);
  }, []);

  const contextValue: ModalContextType = {
    isOpen,
    openModal,
    closeModal,
    modalContent,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {isOpen && modalContent && (
        <ModalPortal>
          <ModalOverlay onClose={closeModal}>
            <ModalWrapper>
              {modalContent}
            </ModalWrapper>
          </ModalOverlay>
        </ModalPortal>
      )}
    </ModalContext.Provider>
  );
};

// Modal Hook
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

// Modal Portal 컴포넌트
const ModalPortal: React.FC<{ children: ReactNode }> = ({ children }) => {
  if (typeof window === 'undefined') return null;
  return createPortal(children, document.body);
};

// Modal Overlay 컴포넌트
const ModalOverlay: React.FC<{ 
  children: ReactNode; 
  onClose: () => void; 
}> = ({ children, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// Modal Wrapper 컴포넌트 (styles_wrapper__ReGTa 클래스 사용)
const ModalWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="styles_wrapper__ReGTa">
      {children}
    </div>
  );
};
