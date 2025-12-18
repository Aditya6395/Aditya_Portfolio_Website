import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Bio } from "../../data/constants";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FooterContainer = styled.div`
  width: 100%;
  padding: 3rem 0 2rem;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
  background: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(204, 0, 187, 0.05) 100%)"
    : "linear-gradient(180deg, rgba(9, 9, 23, 0) 0%, rgba(204, 0, 187, 0.1) 100%)"};
  border-top: 1px solid ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(0, 0, 0, 0.1)" 
    : "rgba(255, 255, 255, 0.1)"};
`;

const FooterWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  padding: 1rem 2rem;
  color: ${({ theme }) => theme.text_primary};
  
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1.5rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  max-width: 900px;
  animation: ${fadeInUp} 0.6s ease-out;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
`;

const ContactItem = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(255, 255, 255, 0.8)" 
    : "rgba(17, 25, 40, 0.6)"};
  border: 1px solid ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(0, 0, 0, 0.1)" 
    : "rgba(255, 255, 255, 0.1)"};
  transition: all 0.3s ease-in-out;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-5px);
    background: ${({ theme }) => theme.bg === "#FFFFFF" 
      ? "rgba(255, 255, 255, 1)" 
      : "rgba(17, 25, 40, 0.9)"};
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 8px 24px ${({ theme }) => theme.primary + "40"};
    color: ${({ theme }) => theme.primary};
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    justify-content: center;
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
  }
`;

const ContactIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
  font-size: 1.25rem;
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const ContactText = styled.span`
  font-weight: 500;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const Logo = styled(motion.div)`
  font-weight: 700;
  font-size: 24px;
  color: ${({ theme }) => theme.primary};
  animation: ${fadeInUp} 0.4s ease-out;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const Nav = styled(motion.nav)`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  animation: ${fadeInUp} 0.5s ease-out;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    text-align: center;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
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
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const SocialMediaIcons = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  animation: ${fadeInUp} 0.6s ease-out;
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const SocialMediaIcon = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(255, 255, 255, 0.8)" 
    : "rgba(17, 25, 40, 0.6)"};
  border: 1px solid ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(0, 0, 0, 0.1)" 
    : "rgba(255, 255, 255, 0.1)"};
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
  backdrop-filter: blur(10px);
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary + "20"};
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 8px 24px ${({ theme }) => theme.primary + "40"};
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 1.3rem;
  }
`;

const Copyright = styled(motion.p)`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  animation: ${fadeInUp} 0.7s ease-out;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Footer = () => {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const contactVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <FooterContainer>
      <FooterWrapper>
        <Logo
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Aditya Chauhan
        </Logo>

        <ContactInfo>
          <ContactItem
            href="mailto:aadityachauhan6395@gmail.com"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={contactVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ContactIcon>
              <EmailIcon />
            </ContactIcon>
            <ContactText>aadityachauhan6395@gmail.com</ContactText>
          </ContactItem>

          <ContactItem
            href={`tel:+${Bio.whatsapp}`}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={contactVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ContactIcon>
              <PhoneIcon />
            </ContactIcon>
            <ContactText>+{Bio.whatsapp.slice(0, 2)} {Bio.whatsapp.slice(2)}</ContactText>
          </ContactItem>

          <ContactItem
            href="https://maps.google.com/?q=Amroha,UP,India"
            target="_blank"
            rel="noopener noreferrer"
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={contactVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ContactIcon>
              <LocationOnIcon />
            </ContactIcon>
            <ContactText>District Amroha, UP, India 244221</ContactText>
          </ContactItem>
        </ContactInfo>

        <Nav
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <NavLink href="#About" onClick={(e) => handleNavClick(e, "About")}>About</NavLink>
          <NavLink href="#Skills" onClick={(e) => handleNavClick(e, "Skills")}>Skills</NavLink>
          <NavLink href="#Experience" onClick={(e) => handleNavClick(e, "Experience")}>Experience</NavLink>
          <NavLink href="#Projects" onClick={(e) => handleNavClick(e, "Projects")}>Projects</NavLink>
          <NavLink href="#Education" onClick={(e) => handleNavClick(e, "Education")}>Education</NavLink>
          <NavLink href="#Certificates" onClick={(e) => handleNavClick(e, "Certificates")}>Certificates</NavLink>
        </Nav>

        <SocialMediaIcons
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {Bio.twitter && (
            <SocialMediaIcon 
              href={Bio.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <TwitterIcon />
            </SocialMediaIcon>
          )}
          <SocialMediaIcon 
            href={Bio.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <LinkedInIcon />
          </SocialMediaIcon>
          <SocialMediaIcon 
            href={Bio.insta} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <InstagramIcon />
          </SocialMediaIcon>
        </SocialMediaIcons>

        <Copyright
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          &copy; 2024 Aditya Chauhan. All rights reserved.
        </Copyright>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;
