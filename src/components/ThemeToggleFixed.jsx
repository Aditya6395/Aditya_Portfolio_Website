import React from "react";
import styled from "styled-components";

const ToggleSwitch = styled.button`
  position: fixed;
  top: 100px;
  right: 30px;
  width: 60px;
  height: 32px;
  border-radius: 16px;
  background: ${({ currentTheme }) => currentTheme === "dark" 
    ? "#4CAF50" 
    : "#CCCCCC"};
  border: none;
  cursor: pointer;
  padding: 2px;
  transition: all 0.3s ease-in-out;
  z-index: 999;
  display: flex;
  align-items: center;
  box-shadow: ${({ currentTheme }) => currentTheme === "dark" 
    ? "0 2px 8px rgba(76, 175, 80, 0.4)" 
    : "0 2px 8px rgba(0, 0, 0, 0.15)"};
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 768px) {
    width: 56px;
    height: 30px;
    top: 90px;
    right: 20px;
  }
  
  @media (max-width: 480px) {
    width: 52px;
    height: 28px;
    top: 85px;
    right: 15px;
  }
`;

const ToggleHandle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
  transform: ${({ currentTheme }) => currentTheme === "dark" 
    ? "translateX(28px)" 
    : "translateX(0)"};
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 26px;
    height: 26px;
    transform: ${({ currentTheme }) => currentTheme === "dark" 
      ? "translateX(26px)" 
      : "translateX(0)"};
  }
  
  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
    transform: ${({ currentTheme }) => currentTheme === "dark" 
      ? "translateX(24px)" 
      : "translateX(0)"};
  }
`;

const ThemeToggleFixed = ({ theme, toggleTheme }) => {
  return (
    <ToggleSwitch 
      currentTheme={theme} 
      onClick={toggleTheme} 
      aria-label="Toggle theme"
      role="switch"
      aria-checked={theme === "dark"}
    >
      <ToggleHandle currentTheme={theme} />
    </ToggleSwitch>
  );
};

export default ThemeToggleFixed;

