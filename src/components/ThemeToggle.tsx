import React from 'react';
import { IconButton, Tooltip, Stack, Typography } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ContrastIcon from '@mui/icons-material/Contrast';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { mode, toggleMode, isHighContrast, toggleHighContrast } = useTheme();

  return (
    <Stack 
      direction="row" 
      spacing={1} 
      alignItems="center"
      role="group"
      aria-label="Controles de tema"
    >
      <Tooltip title={`Mudar para tema ${mode === 'light' ? 'escuro' : 'claro'}`}>
        <IconButton 
          onClick={toggleMode}
          aria-label={`Ativar tema ${mode === 'light' ? 'escuro' : 'claro'}`}
          aria-pressed={mode === 'dark'}
          sx={{ 
            color: 'inherit',
            '&:hover': {
              bgcolor: 'action.hover'
            }
          }}
        >
          {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Tooltip>

      <Tooltip title={`${isHighContrast ? 'Desativar' : 'Ativar'} alto contraste`}>
        <IconButton 
          onClick={toggleHighContrast}
          aria-label={`${isHighContrast ? 'Desativar' : 'Ativar'} modo de alto contraste`}
          aria-pressed={isHighContrast}
          sx={{ 
            color: 'inherit',
            '&:hover': {
              bgcolor: 'action.hover'
            },
            ...(isHighContrast && {
              bgcolor: 'action.selected'
            })
          }}
        >
          <ContrastIcon />
        </IconButton>
      </Tooltip>

      <Typography 
        variant="body2" 
        component="span"
        sx={{ 
          display: { xs: 'none', sm: 'inline' },
          color: 'inherit',
          fontWeight: isHighContrast ? 600 : 400
        }}
      >
        {isHighContrast ? 'Alto Contraste Ativado' : 'Alto Contraste'}
      </Typography>
    </Stack>
  );
};

export default ThemeToggle; 