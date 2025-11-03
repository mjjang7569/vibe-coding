"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";

// Modal Item 타입 정의
interface ModalItem {
  id: string;
  content: React.ReactNode;
}

// Modal Context 타입 정의
interface ModalContextType {
  isOpen: boolean;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  modalContent: React.ReactNode | null;
}

// Modal Context 생성
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Modal Provider Props 타입
interface ModalProviderProps {
  children: React.ReactNode;
}

// Modal Provider 컴포넌트
export function ModalProvider({ children }: ModalProviderProps) {
  const [modalStack, setModalStack] = useState<ModalItem[]>([]);

  // 모달 열기 - 스택에 추가
  const openModal = useCallback((content: React.ReactNode) => {
    const id = `modal-${Date.now()}-${Math.random()}`;
    setModalStack((prev) => [...prev, { id, content }]);
  }, []);

  // 모달 닫기 - 스택에서 제거 (가장 최근 모달)
  const closeModal = useCallback(() => {
    setModalStack((prev) => prev.slice(0, -1));
  }, []);

  // body 스크롤 제어 - 모달이 하나라도 열려있으면 스크롤 제거
  useEffect(() => {
    if (modalStack.length > 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [modalStack.length]);

  return (
    <ModalContext.Provider
      value={{
        isOpen: modalStack.length > 0,
        openModal,
        closeModal,
        modalContent: modalStack.length > 0 ? modalStack[modalStack.length - 1].content : null,
      }}
    >
      {children}
      {modalStack.length > 0 && (
        <ModalPortal>
          {modalStack.map((modal, index) => (
            <ModalOverlay
              key={modal.id}
              zIndex={50 + index}
              onClose={index === modalStack.length - 1 ? closeModal : undefined}
            >
              {modal.content}
            </ModalOverlay>
          ))}
        </ModalPortal>
      )}
    </ModalContext.Provider>
  );
}

// Modal Hook
export function useModal(): ModalContextType {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

// Modal Portal 컴포넌트
function ModalPortal({ children }: { children: React.ReactNode }) {
  if (typeof window === "undefined") return null;
  return createPortal(children, document.body);
}

// Modal Overlay 컴포넌트
function ModalOverlay({
  children,
  zIndex,
  onClose,
}: {
  children: React.ReactNode;
  zIndex: number;
  onClose?: () => void;
}) {
  const handleBackdropClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className={styles.overlay}
      style={{ zIndex }}
      onClick={handleBackdropClick}
      data-testid="modal-overlay"
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
