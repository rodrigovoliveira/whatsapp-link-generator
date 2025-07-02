import React, { useState } from 'react';
import { Box, Link as MuiLink } from '@mui/material';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import WhatsAppLinkGenerator from './components/WhatsAppLinkGenerator';
import QRCodeGenerator from './components/QRCodeGenerator';
import SEOHead from './components/SEOHead';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import Footer from './components/Footer';
import Breadcrumbs from './components/Breadcrumbs';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import MainMenu from './components/MainMenu';

function App() {
  const [generatedLink, setGeneratedLink] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();

  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  const handleMessageChange = (value: string) => {
    setMessage(value);
  };

  const handleReset = () => {
    setPhone('');
    setMessage('');
    setGeneratedLink('');
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <MuiLink
        href="#main-content"
        className="skip-link"
        sx={{
          position: 'absolute',
          top: '-40px',
          left: 0,
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          padding: '8px 16px',
          zIndex: 2000,
          textDecoration: 'none',
          '&:focus': {
            top: 0,
          },
        }}
      >
        Pular para o conteúdo principal
      </MuiLink>

      <MainMenu />

      <Box
        component="main"
        id="main-content"
        tabIndex={-1}
        sx={{
          mt: { xs: '56px', sm: '64px' },
          flexGrow: 1,
          outline: 'none',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Breadcrumbs />
        <Box sx={{ px: { xs: 2, sm: 3 } }}>
          <Routes>
            <Route path="/" element={<Navigate to="/gerar-link-whatsapp" replace />} />
            <Route 
              path="/gerar-link-whatsapp" 
              element={
                <>
                  <SEOHead page="link" />
                  <WhatsAppLinkGenerator 
                    onLinkGenerated={setGeneratedLink}
                    phone={phone}
                    message={message}
                    onPhoneChange={handlePhoneChange}
                    onMessageChange={handleMessageChange}
                    onReset={handleReset}
                  />
                </>
              } 
            />
            <Route 
              path="/gerar-qr-code" 
              element={
                <>
                  <SEOHead page="qr" />
                  <QRCodeGenerator 
                    whatsappLink={generatedLink}
                  />
                </>
              } 
            />
            <Route 
              path="/politica-de-privacidade" 
              element={<PrivacyPolicy />} 
            />
            <Route 
              path="/termos-de-uso" 
              element={<TermsOfUse />} 
            />
            <Route 
              path="/blog" 
              element={<Blog />} 
            />
            <Route 
              path="/blog/:slug" 
              element={<BlogPost />} 
            />
          </Routes>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
