import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, Theme } from '@mui/material';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

interface ThemeContextType {
  mode: PaletteMode;
  toggleMode: () => void;
  isHighContrast: boolean;
  toggleHighContrast: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleMode: () => {},
  isHighContrast: false,
  toggleHighContrast: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const getDesignTokens = (mode: PaletteMode, isHighContrast: boolean) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: isHighContrast ? '#000000' : '#128C7E',
            contrastText: '#FFFFFF',
          },
          secondary: {
            main: isHighContrast ? '#000000' : '#34B7F1',
            contrastText: '#FFFFFF',
          },
          error: {
            main: isHighContrast ? '#FF0000' : '#FF4B4B',
            contrastText: '#FFFFFF',
          },
          background: {
            default: isHighContrast ? '#FFFFFF' : '#F5F5F5',
            paper: isHighContrast ? '#FFFFFF' : '#FFFFFF',
          },
          text: {
            primary: isHighContrast ? '#000000' : '#333333',
            secondary: isHighContrast ? '#000000' : '#666666',
          },
          action: {
            active: isHighContrast ? '#000000' : '#128C7E',
            hover: 'rgba(0, 0, 0, 0.04)',
            selected: 'rgba(0, 0, 0, 0.08)',
            disabled: 'rgba(0, 0, 0, 0.26)',
            disabledBackground: 'rgba(0, 0, 0, 0.12)',
          }
        }
      : {
          primary: {
            main: isHighContrast ? '#FFFFFF' : '#25D366',
            contrastText: isHighContrast ? '#000000' : '#FFFFFF',
          },
          secondary: {
            main: isHighContrast ? '#FFFFFF' : '#34B7F1',
            contrastText: isHighContrast ? '#000000' : '#FFFFFF',
          },
          error: {
            main: isHighContrast ? '#FFFFFF' : '#FF4B4B',
            contrastText: isHighContrast ? '#000000' : '#FFFFFF',
          },
          background: {
            default: isHighContrast ? '#000000' : '#121212',
            paper: isHighContrast ? '#000000' : '#1E1E1E',
          },
          text: {
            primary: isHighContrast ? '#FFFFFF' : '#FFFFFF',
            secondary: isHighContrast ? '#FFFFFF' : '#B3B3B3',
          },
          action: {
            active: isHighContrast ? '#FFFFFF' : '#25D366',
            hover: 'rgba(255, 255, 255, 0.08)',
            selected: 'rgba(255, 255, 255, 0.16)',
            disabled: 'rgba(255, 255, 255, 0.3)',
            disabledBackground: 'rgba(255, 255, 255, 0.12)',
          }
        }),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
          ...(isHighContrast && {
            border: `3px solid ${mode === 'light' ? '#000000' : '#FFFFFF'}`,
          }),
        },
        contained: {
          color: isHighContrast ? (mode === 'light' ? '#FFFFFF' : '#000000') : '#FFFFFF',
        },
        outlined: {
          borderWidth: isHighContrast ? '3px' : '1px',
        }
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: mode === 'light' ? 'rgba(0, 0, 0, 0.26)' : 'rgba(255, 255, 255, 0.3)',
          },
          ...(isHighContrast && {
            '&:focus': {
              outline: `2px solid ${mode === 'light' ? '#000000' : '#FFFFFF'}`,
              outlineOffset: 2,
            },
          }),
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
          ...(isHighContrast && {
            stroke: mode === 'light' ? '#000000' : '#FFFFFF',
            strokeWidth: 0.5,
          }),
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderWidth: isHighContrast ? '3px' : '1px',
              borderColor: mode === 'light' 
                ? (isHighContrast ? '#000000' : '#128C7E')
                : (isHighContrast ? '#FFFFFF' : '#25D366'),
            },
            '&:hover fieldset': {
              borderColor: mode === 'light'
                ? (isHighContrast ? '#000000' : '#0F7A6C')
                : (isHighContrast ? '#FFFFFF' : '#1FA855'),
            },
            '&.Mui-focused fieldset': {
              borderColor: mode === 'light'
                ? (isHighContrast ? '#000000' : '#128C7E')
                : (isHighContrast ? '#FFFFFF' : '#25D366'),
            },
          },
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      ...(isHighContrast && {
        textShadow: 'none',
      }),
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      ...(isHighContrast && {
        fontWeight: 500,
      }),
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
      ...(isHighContrast && {
        fontWeight: 500,
      }),
    },
  },
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('light');
  const [isHighContrast, setIsHighContrast] = useState(false);

  const toggleMode = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setIsHighContrast((prev) => !prev);
  }, []);

  const theme = useMemo(() => createTheme(getDesignTokens(mode, isHighContrast)), [mode, isHighContrast]);

  const contextValue = useMemo(
    () => ({
      mode,
      toggleMode,
      isHighContrast,
      toggleHighContrast,
    }),
    [mode, toggleMode, isHighContrast, toggleHighContrast]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 