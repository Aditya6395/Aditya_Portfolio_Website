import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { CheckCircle, Error, Close } from "@mui/icons-material";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  @media (max-width: 768px) {
    right: 10px;
    top: 80px;
    left: 10px;
  }
`;

const Toast = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.primary + 40};
  border-left: 4px solid ${({ type, theme }) => 
    type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : theme.primary};
  color: ${({ theme }) => theme.text_primary};
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 300px;
  max-width: 400px;
  animation: ${slideIn} 0.3s ease-out;
  
  &.closing {
    animation: ${slideOut} 0.3s ease-out;
  }
  
  @media (max-width: 768px) {
    min-width: auto;
    max-width: 100%;
    padding: 14px 16px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const Message = styled.div`
  flex: 1;
  font-size: 14px;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s;
  
  &:hover {
    color: ${({ theme }) => theme.text_primary};
  }
`;

const ToastComponent = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast.autoClose) {
      const timer = setTimeout(() => {
        onClose(toast.id);
      }, toast.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle style={{ color: '#4caf50', fontSize: 24 }} />;
      case 'error':
        return <Error style={{ color: '#f44336', fontSize: 24 }} />;
      default:
        return null;
    }
  };

  return (
    <Toast type={toast.type} className={toast.closing ? 'closing' : ''}>
      <IconWrapper>{getIcon()}</IconWrapper>
      <Message>{toast.message}</Message>
      <CloseButton onClick={() => onClose(toast.id)} aria-label="Close toast">
        <Close style={{ fontSize: 20 }} />
      </CloseButton>
    </Toast>
  );
};

export const ToastProvider = ({ toasts, onClose }) => {
  return (
    <ToastContainer role="region" aria-label="Notifications">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </ToastContainer>
  );
};

export default ToastComponent;

