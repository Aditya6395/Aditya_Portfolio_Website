import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, PlayArrow, Download } from "@mui/icons-material";
import { certificates } from "../../data/constants";

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

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 0 16px;
  
  @media (max-width: 768px) {
    margin-top: 60px;
    padding: 0 12px;
  }
  
  @media (max-width: 480px) {
    margin-top: 40px;
    padding: 0 8px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
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
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 40px;
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 30px;
  }
`;

const CarouselContainer = styled.div`
  width: 100%;
  max-width: 900px;
  position: relative;
  padding: 40px 20px;
  background: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(255, 255, 255, 0.6)" 
    : "rgba(17, 25, 40, 0.6)"};
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(0, 0, 0, 0.1)" 
    : "rgba(255, 255, 255, 0.1)"};
  box-shadow: 0 8px 32px ${({ theme }) => theme.primary + "20"};
  animation: ${fadeInUp} 0.6s ease-out;
  
  @media (max-width: 768px) {
    padding: 30px 15px;
    border-radius: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 20px 10px;
  }
`;

const CarouselHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const CarouselTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  
  @media (max-width: 768px) {
    font-size: 22px;
  }
  
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const CarouselSubtitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 5px;
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ControlButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(255, 255, 255, 0.8)" 
    : "rgba(17, 25, 40, 0.8)"};
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(0, 0, 0, 0.1)" 
    : "rgba(255, 255, 255, 0.1)"};
  
  &:hover {
    background: ${({ theme }) => theme.primary + "20"};
    color: ${({ theme }) => theme.primary};
    transform: scale(1.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
  }
`;

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 400px;
  overflow: hidden;
  border-radius: 16px;
  
  @media (max-width: 768px) {
    min-height: 350px;
  }
  
  @media (max-width: 480px) {
    min-height: 300px;
  }
`;

const Slide = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CertificateCard = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.primary};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  position: relative;
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
  
  @media (max-width: 480px) {
    padding: 20px 15px;
  }
`;

const CertificateImage = styled.div`
  width: 100%;
  height: 100%;
  min-height: 300px;
  background: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(255, 255, 255, 0.2)" 
    : "rgba(0, 0, 0, 0.2)"};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(255, 255, 255, 0.5)" 
    : "rgba(255, 255, 255, 0.3)"};
  position: relative;
  cursor: ${({ clickable }) => clickable ? "pointer" : "default"};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: ${({ clickable }) => clickable ? "scale(1.02)" : "none"};
  }
  
  @media (max-width: 768px) {
    min-height: 250px;
  }
  
  @media (max-width: 480px) {
    min-height: 200px;
  }
`;

const DownloadButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(255, 255, 255, 0.95)" 
    : "rgba(17, 25, 40, 0.95)"};
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 10;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.bg === "#FFFFFF" ? "#FFFFFF" : "#FFFFFF"};
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 6px 20px ${({ theme }) => theme.primary + "60"};
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    top: 10px;
    right: 10px;
  }
`;

const PlaceholderText = styled.div`
  color: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(255, 255, 255, 0.7)" 
    : "rgba(255, 255, 255, 0.7)"};
  font-size: 16px;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const CertificateTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.bg === "#FFFFFF" ? "#FFFFFF" : "#FFFFFF"};
  margin-top: 20px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-top: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
    margin-top: 10px;
  }
`;

const CertificateDesc = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(255, 255, 255, 0.9)" 
    : "rgba(255, 255, 255, 0.9)"};
  margin-top: 10px;
  text-align: center;
  line-height: 1.6;
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(255, 255, 255, 0.3)" 
    : "rgba(255, 255, 255, 0.3)"};
  width: 100%;
  border-radius: 0 0 16px 16px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.bg === "#FFFFFF" ? "#FFFFFF" : "#FFFFFF"};
  width: ${({ progress }) => progress}%;
  transition: width 0.1s linear;
  border-radius: 0 0 16px 16px;
`;

const PaginationDots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${({ active, theme }) => 
    active 
      ? theme.primary 
      : theme.bg === "#FFFFFF" 
        ? "rgba(0, 0, 0, 0.2)" 
        : "rgba(255, 255, 255, 0.2)"};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    transform: scale(1.2);
  }
  
  @media (max-width: 480px) {
    width: 10px;
    height: 10px;
  }
`;

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const Certificates = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressIntervalRef = useRef(null);

  useEffect(() => {
    if (certificates.length === 0) return;

    if (isPlaying) {
      // Auto-play interval
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % certificates.length);
        setDirection(1);
      }, 5000); // Change slide every 5 seconds

      // Progress bar interval
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 2; // Update every 100ms (5000ms / 50 = 2% per 100ms)
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current);
      clearInterval(progressIntervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, certificates.length]);

  const goToSlide = (index) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setProgress(0);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % certificates.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? certificates.length - 1 : prevIndex - 1
    );
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setProgress(0);
  };

  const downloadCertificate = async (certificate) => {
    if (!certificate.image) {
      alert("Certificate image not available for download.");
      return;
    }

    try {
      // Fetch the image
      const response = await fetch(certificate.image);
      const blob = await response.blob();
      
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = `${certificate.title || "certificate"}.${blob.type.split("/")[1] || "png"}`;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading certificate:", error);
      // Fallback: open in new tab
      window.open(certificate.image, "_blank");
    }
  };

  const handleImageClick = (certificate) => {
    if (certificate.image) {
      downloadCertificate(certificate);
    }
  };

  if (certificates.length === 0) {
    return null;
  }

  return (
    <Container id="Certificates">
      <Wrapper>
        <Title>Certificates</Title>
        <Desc>
          My achievements and certifications that showcase my skills and expertise.
        </Desc>
        
        <CarouselContainer>
          <CarouselHeader>
            <div>
              <CarouselTitle>My Certificates</CarouselTitle>
              <CarouselSubtitle>
                The credentials that validate my expertise
              </CarouselSubtitle>
            </div>
            <ControlsContainer>
              <ControlButton onClick={togglePlayPause} aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? <Pause /> : <PlayArrow />}
              </ControlButton>
              <ControlButton 
                onClick={prevSlide} 
                disabled={certificates.length <= 1}
                aria-label="Previous slide"
              >
                <ChevronLeft />
              </ControlButton>
              <ControlButton 
                onClick={nextSlide} 
                disabled={certificates.length <= 1}
                aria-label="Next slide"
              >
                <ChevronRight />
              </ControlButton>
            </ControlsContainer>
          </CarouselHeader>

          <SlideContainer>
            <AnimatePresence initial={false} custom={direction}>
              <Slide
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
              >
                <CertificateCard>
                  {certificates[currentIndex]?.image ? (
                    <>
                      <CertificateImage 
                        clickable={true}
                        onClick={() => handleImageClick(certificates[currentIndex])}
                      >
                        <img 
                          src={certificates[currentIndex].image} 
                          alt={certificates[currentIndex].title || "Certificate"}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            borderRadius: "12px",
                            pointerEvents: "none"
                          }}
                        />
                        <DownloadButton
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadCertificate(certificates[currentIndex]);
                          }}
                          aria-label="Download certificate"
                          title="Download Certificate"
                        >
                          <Download />
                        </DownloadButton>
                      </CertificateImage>
                    </>
                  ) : (
                    <CertificateImage clickable={false}>
                      <PlaceholderText>
                        Certificate Image<br />
                        (Add image URL in constants.js)
                      </PlaceholderText>
                    </CertificateImage>
                  )}
                  {certificates[currentIndex]?.title && (
                    <CertificateTitle>
                      {certificates[currentIndex].title}
                    </CertificateTitle>
                  )}
                  {certificates[currentIndex]?.description && (
                    <CertificateDesc>
                      {certificates[currentIndex].description}
                    </CertificateDesc>
                  )}
                  <ProgressBar>
                    <ProgressFill progress={progress} />
                  </ProgressBar>
                </CertificateCard>
              </Slide>
            </AnimatePresence>
          </SlideContainer>

          <PaginationDots>
            {certificates.map((_, index) => (
              <Dot
                key={index}
                active={index === currentIndex}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </PaginationDots>
        </CarouselContainer>
      </Wrapper>
    </Container>
  );
};

export default Certificates;

