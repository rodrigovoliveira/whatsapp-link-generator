import React from 'react';
import { IconButton, Stack, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title={`Mudar para tema ${mode === 'light' ? 'escuro' : 'claro'}`}>
        <IconButton 
          onClick={toggleTheme}
          color="inherit"
          aria-label={`Mudar para tema ${mode === 'light' ? 'escuro' : 'claro'}`}
        >
          {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default ThemeToggle; 