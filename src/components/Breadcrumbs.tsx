import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArticleIcon from '@mui/icons-material/Article';
import QrCodeIcon from '@mui/icons-material/QrCode';
import SecurityIcon from '@mui/icons-material/Security';
import GavelIcon from '@mui/icons-material/Gavel';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import BookIcon from '@mui/icons-material/Book';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { mode } = useTheme();
  const isDarkMode = mode === 'dark';

  const getPathInfo = (path: string): { name: string; icon: React.ReactNode } => {
    switch (path) {
      case 'gerar-link-whatsapp':
        return { name: 'Gerar Link', icon: <WhatsAppIcon sx={{ fontSize: '1rem' }} /> };
      case 'gerar-qr-code':
        return { name: 'Gerar QR Code', icon: <QrCodeIcon sx={{ fontSize: '1rem' }} /> };
      case 'politica-de-privacidade':
        return { name: 'Política de Privacidade', icon: <SecurityIcon sx={{ fontSize: '1rem' }} /> };
      case 'termos-de-uso':
        return { name: 'Termos de Uso', icon: <GavelIcon sx={{ fontSize: '1rem' }} /> };
      case 'blog':
        return { name: 'Blog', icon: <BookIcon sx={{ fontSize: '1rem' }} /> };
      case 'whatsapp-web-para-pequenas-empresas':
        return { name: 'WhatsApp Web para Empresas', icon: <ArticleIcon sx={{ fontSize: '1rem' }} /> };
      default:
        return { name: path, icon: <ArticleIcon sx={{ fontSize: '1rem' }} /> };
    }
  };

  const paths = location.pathname.split('/').filter(Boolean);
  
  if (paths.length === 0) return null;

  return (
    <Box 
      component="nav"
      aria-label="breadcrumb"
      sx={{
        width: '100%',
        backgroundColor: theme => theme.palette.background.default,
        borderBottom: theme => `1px solid ${theme.palette.divider}`,
        mb: 2,
        py: { xs: 1.5, sm: 2 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Box 
        component="ol" 
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          '-ms-overflow-style': 'none'
        }}
      >
        <Box component="li" sx={{ display: 'flex', alignItems: 'center', minWidth: 'fit-content' }}>
          <Link 
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: isDarkMode ? '#9CA3AF' : '#6B7280',
              transition: 'all 0.2s ease-in-out',
            }}
            className="hover-effect"
          >
            <HomeIcon sx={{ 
              fontSize: '1.1rem',
              mr: 0.5,
              opacity: 0.9,
            }} />
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                fontWeight: 500,
              }}
            >
              Início
            </Typography>
          </Link>
        </Box>

        {paths.map((path, index) => {
          const { name, icon } = getPathInfo(path);
          const isLast = index === paths.length - 1;

          return (
            <React.Fragment key={path}>
              <ChevronRightIcon 
                sx={{ 
                  mx: 1,
                  fontSize: '1.1rem',
                  color: isDarkMode ? '#4B5563' : '#9CA3AF',
                  opacity: 0.8,
                }} 
              />
              <Box component="li" sx={{ display: 'flex', alignItems: 'center', minWidth: 'fit-content' }}>
                {isLast ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: isDarkMode ? '#E5E7EB' : '#374151',
                    }}
                  >
                    {icon}
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        ml: 0.5,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        fontWeight: 600,
                      }}
                    >
                      {name}
                    </Typography>
                  </Box>
                ) : (
                  <Link 
                    to={`/${paths.slice(0, index + 1).join('/')}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      textDecoration: 'none',
                      color: isDarkMode ? '#9CA3AF' : '#6B7280',
                      transition: 'all 0.2s ease-in-out',
                    }}
                    className="hover-effect"
                  >
                    {icon}
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        ml: 0.5,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        fontWeight: 500,
                      }}
                    >
                      {name}
                    </Typography>
                  </Link>
                )}
              </Box>
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
};

export default Breadcrumbs;

// Adicione ao seu CSS global (index.css):
/*
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*/ 