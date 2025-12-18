import React, { useState } from "react";
import { Link as LinkR } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { Bio } from "../data/constants";
import { MenuRounded } from "@mui/icons-material";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(255, 255, 255, 0.95)" 
    : "rgba(9, 9, 23, 0.95)"};
  backdrop-filter: blur(10px);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  color: ${({ theme }) => theme.text_primary};
  border-bottom: 1px solid ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(0, 0, 0, 0.1)" 
    : "rgba(255, 255, 255, 0.1)"};
  box-shadow: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "0 2px 10px rgba(0, 0, 0, 0.05)" 
    : "0 2px 10px rgba(0, 0, 0, 0.3)"};
  
  @media (max-width: 768px) {
    height: 70px;
  }
`;
const ColorText = styled.span`
  color: ${({ theme }) => theme.primary};
  font-size: 24px;
  font-weight: 700;
  display: inline-block;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const NameText = styled.span`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 700;
  font-size: 22px;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const SlashText = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
  font-size: 22px;
  margin: 0 2px;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;
const NavLogo = styled(LinkR)`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 6px;
  font-weight: 700;
  font-size: 22px;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  transition: all 0.3s ease-in-out;
  white-space: nowrap;
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.primary};
    transition: width 0.3s ease-in-out;
  }
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    
    &::after {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    padding: 8px 0;
    font-size: 16px;
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 12px;
  padding: 0 6px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GithubButton = styled.a`
  border: 1.5px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  white-space: nowrap;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.primary + 40};
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 16px;
  }
`;

const MobileIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 0 6px;
  list-style: none;
  width: 100%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light + 99};
  backdrop-filter: blur(10px);
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;

  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.3);
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
  
  @media (max-width: 480px) {
    padding: 12px 20px 24px 20px;
    gap: 12px;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/" onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}>
          <ColorText>&lt;</ColorText>
          <NameText>Aditya</NameText>
          <SlashText>/</SlashText>
          <NameText>Chauhan</NameText>
          <ColorText>&gt;</ColorText>
        </NavLogo>

        <MobileIcon 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsOpen(!isOpen);
            }
          }}
        >
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>

        <NavItems role="navigation" aria-label="Main navigation">
          <NavLink href="#About" onClick={(e) => handleNavClick(e, "About")} aria-label="Go to About section">About</NavLink>
          <NavLink href="#Skills" onClick={(e) => handleNavClick(e, "Skills")} aria-label="Go to Skills section">Skills</NavLink>
          <NavLink href="#Experience" onClick={(e) => handleNavClick(e, "Experience")} aria-label="Go to Experience section">Experience</NavLink>
          <NavLink href="#Projects" onClick={(e) => handleNavClick(e, "Projects")} aria-label="Go to Projects section">Projects</NavLink>
          <NavLink href="#Education" onClick={(e) => handleNavClick(e, "Education")} aria-label="Go to Education section">Education</NavLink>
        </NavItems>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <NavLink onClick={(e) => handleNavClick(e, "About")} href="#About">
              About
            </NavLink>
            <NavLink onClick={(e) => handleNavClick(e, "Skills")} href="#Skills">
              Skills
            </NavLink>
            <NavLink onClick={(e) => handleNavClick(e, "Experience")} href="#Experience">
              Experience
            </NavLink>
            <NavLink onClick={(e) => handleNavClick(e, "Projects")} href="#Projects">
              Projects
            </NavLink>
            <NavLink onClick={(e) => handleNavClick(e, "Education")} href="#Education">
              Education
            </NavLink>
            <GithubButton
              href={Bio.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: theme.primary,
                color: theme.text_primary,
              }}
            >
              Github Profile
            </GithubButton>
          </MobileMenu>
        )}

        <ButtonContainer>
          <GithubButton href={Bio.github} target="_blank" rel="noopener noreferrer">
            Github Profile
          </GithubButton>
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
