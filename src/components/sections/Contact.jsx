import React, { useRef, useState } from "react";
import styled from "styled-components";
import EarthCanvas from "../canvas/Earth";
import { sendEmail } from "../../utils/emailService";
import { toast } from "../../utils/toast";

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  z-index: 1;
  align-items: center;
  padding: 40px 16px;
  margin-top: 100px;
  
  @media (max-width: 960px) {
    padding: 20px 16px;
    margin-top: 60px;
    flex-direction: column;
  }
  
  @media (max-width: 640px) {
    padding: 20px 12px;
    margin-top: 40px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 40px;
  
  @media (max-width: 960px) {
    flex-direction: column;
    padding: 0px 0px 40px 0px;
    gap: 30px;
  }
  
  @media (max-width: 640px) {
    padding: 0px 0px 30px 0px;
    gap: 24px;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;
const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(255, 255, 255, 0.95)" 
    : "rgba(17, 25, 40, 0.83)"};
  border: 1px solid ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(0, 0, 0, 0.1)" 
    : "rgba(255, 255, 255, 0.125)"};
  padding: 32px;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "0px 4px 24px rgba(0, 0, 0, 0.1)" 
    : "rgba(23, 92, 230, 0.1) 0px 4px 24px"};
  margin-top: 28px;
  gap: 16px;
  
  @media (max-width: 640px) {
    padding: 24px;
    gap: 14px;
    margin-top: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
    gap: 12px;
    width: 100%;
  }
`;
const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;
const ContactInput = styled.input`
  flex: 1;
  background-color: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(255, 255, 255, 0.9)" 
    : "transparent"};
  border: 1px solid ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(0, 0, 0, 0.2)" 
    : theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  transition: all 0.3s ease-in-out;
  
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary + 20};
    background-color: ${({ theme }) => theme.bg === "#FFFFFF" 
      ? "rgba(255, 255, 255, 1)" 
      : "transparent"};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.text_secondary + 80};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 640px) {
    font-size: 16px;
    padding: 10px 14px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 12px;
  }
`;
const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(255, 255, 255, 0.9)" 
    : "transparent"};
  border: 1px solid ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(0, 0, 0, 0.2)" 
    : theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: all 0.3s ease-in-out;
  
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary + 20};
    background-color: ${({ theme }) => theme.bg === "#FFFFFF" 
      ? "rgba(255, 255, 255, 1)" 
      : "transparent"};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.text_secondary + 80};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 640px) {
    font-size: 16px;
    padding: 10px 14px;
    min-height: 100px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 12px;
    min-height: 90px;
  }
`;
const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -moz-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -webkit-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(133, 76, 230, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  margin-top: 12px;
  font-size: 14px;
  text-align: center;
  white-space: pre-line;
  background-color: ${({ type }) => 
    type === 'success' 
      ? 'rgba(76, 175, 80, 0.2)' 
      : 'rgba(244, 67, 54, 0.2)'};
  color: ${({ type }) => 
    type === 'success' 
      ? '#4caf50' 
      : '#f44336'};
  border: 1px solid ${({ type }) => 
    type === 'success' 
      ? 'rgba(76, 175, 80, 0.5)' 
      : 'rgba(244, 67, 54, 0.5)'};
  
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 10px 12px;
  }
`;

const EarthWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  height: 400px;
  
  @media (max-width: 960px) {
    display: none;
  }
`;

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitButton = e.target.querySelector('input[type="submit"]');
    const originalValue = submitButton.value;
    
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    submitButton.value = "Sending...";
    submitButton.disabled = true;

    // Get form data
    const formData = {
      from_name: form.current.from_name.value,
      from_email: form.current.from_email.value,
      from_mobile: form.current.from_mobile.value,
      subject: form.current.subject.value,
      message: form.current.message.value,
    };

    // Validate form
    if (!formData.from_email || !formData.from_name || !formData.message) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please fill in all required fields (Name, Email, and Message)' 
      });
      submitButton.value = originalValue;
      submitButton.disabled = false;
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.from_email)) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please enter a valid email address' 
      });
      submitButton.value = originalValue;
      submitButton.disabled = false;
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await sendEmail(formData);
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Message Successfully Sent ✅\nI will get back to you soon!' 
      });
      toast.success('Message sent successfully! I will get back to you soon.');
      form.current.reset();
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
      
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error.message || 'Failed to send message. Please try again later or contact me directly.';
      setSubmitStatus({ 
        type: 'error', 
        message: errorMessage
      });
      toast.error(errorMessage);
    } finally {
      submitButton.value = originalValue;
      submitButton.disabled = false;
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <EarthWrapper>
          <EarthCanvas />
        </EarthWrapper>
        <Title>Contact</Title>
        <Desc>
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput 
            placeholder="Your Email *" 
            name="from_email" 
            type="email"
            required
            disabled={isSubmitting}
          />
          <ContactInput 
            placeholder="Your Name *" 
            name="from_name" 
            required
            disabled={isSubmitting}
          />
          <ContactInput 
            placeholder="Your Mobile Number" 
            name="from_mobile" 
            type="tel"
            disabled={isSubmitting}
          />
          <ContactInput 
            placeholder="Subject" 
            name="subject" 
            disabled={isSubmitting}
          />
          <ContactInputMessage 
            placeholder="Message *" 
            name="message" 
            rows={4} 
            required
            disabled={isSubmitting}
          />
          <ContactButton 
            type="submit" 
            value={isSubmitting ? "Sending..." : "Send"} 
            disabled={isSubmitting}
          />
          {submitStatus.message && (
            <StatusMessage type={submitStatus.type}>
              {submitStatus.message}
            </StatusMessage>
          )}
        </ContactForm>

      </Wrapper>
    </Container>
  );
};

export default Contact;
