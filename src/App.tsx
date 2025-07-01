import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Stack, Link as MuiLink } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import WhatsAppLinkGenerator from './components/WhatsAppLinkGenerator';
import QRCodeGenerator from './components/QRCodeGenerator';
import ThemeToggle from './components/ThemeToggle';
import SEOHead from './components/SEOHead';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import Footer from './components/Footer';
import Breadcrumbs from './components/Breadcrumbs';

const MenuButton = ({ to, icon, text, isSelected }: { to: string; icon: React.ReactNode; text: string; isSelected: boolean }) => (
  <Link 
    to={to} 
    style={{ 
      textDecoration: 'none',
      color: 'inherit',
      opacity: isSelected ? 1 : 0.7,
      transition: 'opacity 0.2s',
    }}
  >
    <Stack 
      direction="row" 
      spacing={1} 
      alignItems="center"
      sx={{
        padding: '12px 16px',
        borderBottom: isSelected ? '2px solid currentColor' : '2px solid transparent',
      }}
    >
      {icon}
      <Typography variant="subtitle1">{text}</Typography>
    </Stack>
  </Link>
);

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

      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          zIndex: 1200
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Link 
              to="/" 
              style={{ 
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center' 
              }}
            >
              <img 
                src={`${process.env.PUBLIC_URL}/logo.png`}
                alt="Gerar Link QR" 
                style={{ 
                  height: '40px',
                  width: 'auto',
                  marginRight: '16px'
                }} 
              />
            </Link>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1, sm: 0 }}
            >
              <MenuButton 
                to="/gerar-link-whatsapp" 
                icon={<WhatsAppIcon />} 
                text="GERAR LINK WHATSAPP"
                isSelected={location.pathname === '/gerar-link-whatsapp'}
              />
              <MenuButton 
                to="/gerar-qr-code" 
                icon={<QrCodeIcon />} 
                text="GERAR QR CODE"
                isSelected={location.pathname === '/gerar-qr-code'}
              />
            </Stack>
          </Stack>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

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
          </Routes>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
