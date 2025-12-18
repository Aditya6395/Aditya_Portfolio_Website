import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  z-index: 9999;
  background: transparent;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.primary} 100%
  );
  width: ${({ progress }) => progress}%;
  transition: width 0.3s ease-out;
  box-shadow: 0 0 10px ${({ theme }) => theme.primary};
`;

const PageProgress = () => {
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Reset progress on route change
    setProgress(0);

    // Simulate page loading progress
    const timer1 = setTimeout(() => setProgress(30), 100);
    const timer2 = setTimeout(() => setProgress(60), 300);
    const timer3 = setTimeout(() => setProgress(90), 500);
    const timer4 = setTimeout(() => setProgress(100), 700);
    const timer5 = setTimeout(() => setProgress(0), 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [location]);

  return (
    <ProgressBar role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
      <ProgressFill progress={progress} />
    </ProgressBar>
  );
};

export default PageProgress;

