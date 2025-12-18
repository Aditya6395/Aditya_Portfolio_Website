import { useState, useEffect, Suspense, lazy } from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { darkTheme, lightTheme } from "./utils/Themes";
import { toast } from "./utils/toast";
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import StarCanvas from "./components/canvas/Stars";
import Education from "./components/sections/Education";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Certificates from "./components/sections/Certificates";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppFloat from "./components/WhatsAppFloat";
import ContactPopup from "./components/ContactPopup";
import PageProgress from "./components/PageProgress";
import ThemeToggleFixed from "./components/ThemeToggleFixed";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";
import { ToastProvider } from "./components/Toast";

// Lazy load heavy components for better performance
const ProjectDetails = lazy(() => import("./components/Dialog/ProjectDetails"));


const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
  padding-top: 80px;
  
  @media (max-width: 768px) {
    padding-top: 70px;
  }
`;

const Wrapper = styled.div`
  padding-bottom: 100px;
  background: ${({ theme }) => 
    theme.bg === "#FFFFFF" 
      ? `linear-gradient(
          38.73deg,
          rgba(204, 0, 187, 0.08) 0%,
          rgba(201, 32, 184, 0) 50%
        ),
        linear-gradient(
          141.27deg,
          rgba(0, 70, 209, 0) 50%,
          rgba(0, 70, 209, 0.08) 100%
        )`
      : `linear-gradient(
          38.73deg,
          rgba(204, 0, 187, 0.15) 0%,
          rgba(201, 32, 184, 0) 50%
        ),
        linear-gradient(
          141.27deg,
          rgba(0, 70, 209, 0) 50%,
          rgba(0, 70, 209, 0.15) 100%
        )`};
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
  
  @media (max-width: 768px) {
    padding-bottom: 60px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 20% 99%, 0 100%);
  }
  
  @media (max-width: 480px) {
    padding-bottom: 40px;
  }
`;

function App() {
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [toasts, setToasts] = useState([]);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Toast notification system
  useEffect(() => {
    const unsubscribe = toast.subscribe((action) => {
      if (action.type === 'add') {
        setToasts(prev => [...prev, action.toast]);
      }
    });
    return unsubscribe;
  }, []);

  const handleCloseToast = (id) => {
    setToasts(prev => prev.map(toast => 
      toast.id === id ? { ...toast, closing: true } : toast
    ));
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 300);
  };

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setCurrentTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Auto-open popup after 10-12 seconds (using 11 seconds)
  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem("contactPopupShown");
    
    if (!popupShown) {
      const timer = setTimeout(() => {
        setShowContactPopup(true);
        sessionStorage.setItem("contactPopupShown", "true");
      }, 11000); // 11 seconds (middle of 10-12 seconds range)

      return () => clearTimeout(timer);
    }
  }, []);

  const theme = currentTheme === "dark" ? darkTheme : lightTheme;

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <PageProgress />
          <Navbar />
          <Body>
            <StarCanvas />
            <AnimatePresence>
              <div>
                <Hero />
                <Wrapper>
                  <Skills />
                  <Experience />
                </Wrapper>
                <Projects openModal={openModal} setOpenModal={setOpenModal} />
                <Wrapper>
                  <Education />
                  <Certificates />
                  <Contact />
                </Wrapper>
                <Footer />

                {openModal.state && (
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProjectDetails
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                    />
                  </Suspense>
                )}
              </div>
            </AnimatePresence>
            <ScrollToTop />
            <WhatsAppFloat />
            <ThemeToggleFixed theme={currentTheme} toggleTheme={toggleTheme} />
            <ToastProvider toasts={toasts} onClose={handleCloseToast} />
            <ContactPopup 
              isOpen={showContactPopup} 
              onClose={() => setShowContactPopup(false)} 
            />
          </Body>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
