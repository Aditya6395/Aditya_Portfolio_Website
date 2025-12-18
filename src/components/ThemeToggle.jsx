import React from "react";
import styled from "styled-components";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const ToggleButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  border: none;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(133, 76, 230, 0.4);
  transition: all 0.3s ease-in-out;
  z-index: 1000;
  
  &:hover {
    transform: scale(1.1) rotate(15deg);
    box-shadow: 0 6px 20px rgba(133, 76, 230, 0.6);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    bottom: 20px;
    right: 20px;
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    bottom: 15px;
    right: 15px;
  }
`;

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <ToggleButton onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "dark" ? (
        <Brightness7 style={{ fontSize: 28 }} />
      ) : (
        <Brightness4 style={{ fontSize: 28 }} />
      )}
    </ToggleButton>
  );
};

export default ThemeToggle;

