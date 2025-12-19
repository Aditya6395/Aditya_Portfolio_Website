import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { CloseRounded } from "@mui/icons-material";
import { sendEmail } from "../utils/emailService";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`;

const PopupContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(255, 255, 255, 0.98)" 
    : theme.card};
  border-radius: 16px;
  padding: 32px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "0 10px 40px rgba(0, 0, 0, 0.15)" 
    : "0 10px 40px rgba(0, 0, 0, 0.5)"};
  border: 1px solid ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(0, 0, 0, 0.1)" 
    : "rgba(255, 255, 255, 0.1)"};

  @media (max-width: 640px) {
    padding: 24px;
    max-height: 95vh;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
    border-radius: 12px;
  }
`;

const CloseButton = styled(motion.div)`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg) scale(1.1);
  }

  svg {
    color: ${({ theme }) => theme.text_secondary};
    font-size: 24px;
  }

  &:hover svg {
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Title = styled(motion.h2)`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
  text-align: center;

  @media (max-width: 640px) {
    font-size: 24px;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin-bottom: 24px;

  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled(motion.input)`
  width: 100%;
  background-color: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(255, 255, 255, 0.9)" 
    : "rgba(17, 25, 40, 0.83)"};
  border: 1px solid ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(0, 0, 0, 0.2)" 
    : theme.text_secondary + 50};
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  transition: all 0.3s ease-in-out;
  font-family: inherit;

  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary + 20};
    transform: translateY(-2px);
    background-color: ${({ theme }) => theme.bg === "#FFFFFF" 
      ? "rgba(255, 255, 255, 1)" 
      : "rgba(17, 25, 40, 0.95)"};
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary + 80};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    font-size: 14px;
    padding: 10px 14px;
  }
`;

const TextArea = styled(motion.textarea)`
  width: 100%;
  background-color: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(255, 255, 255, 0.9)" 
    : "rgba(17, 25, 40, 0.83)"};
  border: 1px solid ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(0, 0, 0, 0.2)" 
    : theme.text_secondary + 50};
  outline: none;
  font-size: 16px;
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
    transform: translateY(-2px);
    background-color: ${({ theme }) => theme.bg === "#FFFFFF" 
      ? "rgba(255, 255, 255, 1)" 
      : "rgba(17, 25, 40, 0.95)"};
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary + 80};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    font-size: 14px;
    padding: 10px 14px;
    min-height: 100px;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  padding: 14px 24px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-top: 8px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(133, 76, 230, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    font-size: 16px;
    padding: 12px 20px;
  }
`;

const StatusMessage = styled(motion.div)`
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  white-space: pre-line;
  background-color: ${({ type }) =>
    type === "success"
      ? "rgba(76, 175, 80, 0.2)"
      : "rgba(244, 67, 54, 0.2)"};
  color: ${({ type }) => (type === "success" ? "#4caf50" : "#f44336")};
  border: 1px solid
    ${({ type }) =>
      type === "success"
        ? "rgba(76, 175, 80, 0.5)"
        : "rgba(244, 67, 54, 0.5)"};

  @media (max-width: 640px) {
    font-size: 12px;
    padding: 10px 12px;
  }
`;

const ContactPopup = ({ isOpen, onClose }) => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: "" });

  // Debug: Log when popup state changes
  useEffect(() => {
    console.log("ContactPopup - isOpen changed to:", isOpen);
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

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
        type: "error",
        message: "Please fill in all required fields (Name, Email, and Message)",
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.from_email)) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await sendEmail(formData);

      setSubmitStatus({
        type: "success",
        message: "Message Successfully Sent ✅\nI will get back to you soon!",
      });
      form.current.reset();

      // Close popup after 3 seconds on success
      setTimeout(() => {
        onClose();
        setSubmitStatus({ type: null, message: "" });
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      let errorMessage = error.message || "Failed to send message. Please try again later.";
      
      // Provide helpful instructions if server is not running (development only)
      const isDevelopment = process.env.NODE_ENV === 'development';
      if (isDevelopment && (
          errorMessage.includes("Unable to connect to server") || 
          errorMessage.includes("Failed to fetch") ||
          errorMessage.includes("NetworkError"))) {
        errorMessage = "⚠️ Backend server is not running!\n\n" +
          "Please start the server:\n" +
          "1. Open terminal\n" +
          "2. Run: npm run server\n" +
          "OR run both together: npm run dev\n\n" +
          "Then try submitting again.";
      }
      
      setSubmitStatus({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enhanced Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    },
  };

  const popupVariants = {
    hidden: {
      scale: 0.7,
      opacity: 0,
      y: 100,
      rotateX: -15,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
        mass: 0.8,
        duration: 0.6,
        delay: 0.1,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      y: 50,
      rotateX: 10,
      transition: {
        duration: 0.25,
        ease: "easeIn",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
        delay: 0.3,
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
        delay: 0.4,
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200,
      },
    },
  };

  const closeButtonVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300,
        delay: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <PopupContainer
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              variants={closeButtonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <CloseRounded />
            </CloseButton>
            
            <Title
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              Get In Touch! 🚀
            </Title>
            
            <Subtitle
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
            >
              Have a question or want to work together? Send me a message!
            </Subtitle>

            <Form
              ref={form}
              onSubmit={handleSubmit}
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              <Input
                variants={itemVariants}
                placeholder="Your Name *"
                name="from_name"
                required
                disabled={isSubmitting}
                whileFocus={{ scale: 1.02 }}
              />
              <Input
                variants={itemVariants}
                placeholder="Your Email *"
                name="from_email"
                type="email"
                required
                disabled={isSubmitting}
                whileFocus={{ scale: 1.02 }}
              />
              <Input
                variants={itemVariants}
                placeholder="Your Mobile Number"
                name="from_mobile"
                type="tel"
                disabled={isSubmitting}
                whileFocus={{ scale: 1.02 }}
              />
              <Input
                variants={itemVariants}
                placeholder="Subject"
                name="subject"
                disabled={isSubmitting}
                whileFocus={{ scale: 1.02 }}
              />
              <TextArea
                variants={itemVariants}
                placeholder="Your Message *"
                name="message"
                rows={4}
                required
                disabled={isSubmitting}
                whileFocus={{ scale: 1.01 }}
              />

              <SubmitButton
                variants={itemVariants}
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </SubmitButton>

              {submitStatus.message && (
                <StatusMessage
                  type={submitStatus.type}
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 200,
                  }}
                >
                  {submitStatus.message}
                </StatusMessage>
              )}
            </Form>
          </PopupContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default ContactPopup;

