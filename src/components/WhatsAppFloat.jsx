import React from "react";
import styled from "styled-components";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Bio } from "../data/constants";

const WhatsAppButton = styled.a`
  position: fixed;
  bottom: 30px;
  right: 90px;
  width: 60px;
  height: 60px;
  background: #25d366;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
  z-index: 999;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  cursor: pointer;
  animation: pulse 2s infinite;

  &:hover {
    transform: scale(1.15);
    box-shadow: 0 6px 24px rgba(37, 211, 102, 0.7);
    background: #20ba5a;
  }

  &:active {
    transform: scale(0.95);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
    }
    50% {
      box-shadow: 0 4px 24px rgba(37, 211, 102, 0.7);
    }
    100% {
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
    }
  }

  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
    bottom: 20px;
    right: 80px;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    bottom: 15px;
    right: 70px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    font-size: 32px;
    
    @media (max-width: 768px) {
      font-size: 28px;
    }
    
    @media (max-width: 480px) {
      font-size: 24px;
    }
  }
`;

const WhatsAppFloat = () => {
  const phoneNumber = Bio.whatsapp;
  const message = encodeURIComponent("Hello! I'm interested in connecting with you.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <WhatsAppButton
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact on WhatsApp"
    >
      <IconWrapper>
        <WhatsAppIcon />
      </IconWrapper>
    </WhatsAppButton>
  );
};

export default WhatsAppFloat;

