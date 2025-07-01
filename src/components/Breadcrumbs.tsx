import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Box } from '@mui/material';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { mode } = useTheme();
  const isDarkMode = mode === 'dark';

  const getPathName = (path: string): string => {
    switch (path) {
      case 'gerar-link-whatsapp':
        return 'Gerar Link';
      case 'gerar-qr-code':
        return 'Gerar QR Code';
      case 'politica-de-privacidade':
        return 'Política de Privacidade';
      case 'termos-de-uso':
        return 'Termos de Uso';
      default:
        return path;
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
        mb: 2
      }}
    >
      <ol className="flex items-center whitespace-nowrap overflow-x-auto no-scrollbar py-2 px-4">
        <li className="flex items-center min-w-fit">
          <Link 
            to="/"
            className={`text-xs ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-200`}
          >
            Início
          </Link>
        </li>
        {paths.map((path, index) => (
          <React.Fragment key={path}>
            <li className="flex items-center min-w-fit">
              <span className="mx-1 text-xs opacity-50">/</span>
              {index === paths.length - 1 ? (
                <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {getPathName(path)}
                </span>
              ) : (
                <Link 
                  to={`/${paths.slice(0, index + 1).join('/')}`}
                  className={`text-xs ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-200`}
                >
                  {getPathName(path)}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
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