import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { KeyboardArrowUp } from "@mui/icons-material";

const ScrollButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text_primary};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(133, 76, 230, 0.4);
  z-index: 1000;
  transition: all 0.3s ease-in-out;
  opacity: ${({ visible }) => (visible ? "1" : "0")};
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  transform: ${({ visible }) => (visible ? "translateY(0)" : "translateY(20px)")};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(133, 76, 230, 0.6);
    background: ${({ theme }) => theme.primary + "dd"};
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    bottom: 90px;
    right: 20px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    bottom: 80px;
    right: 15px;
  }
`;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ScrollButton visible={isVisible} onClick={scrollToTop} aria-label="Scroll to top">
      <KeyboardArrowUp style={{ fontSize: "28px" }} />
    </ScrollButton>
  );
};

export default ScrollToTop;

