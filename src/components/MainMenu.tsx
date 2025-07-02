import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  Typography
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import QrCodeIcon from '@mui/icons-material/QrCode';
import BookIcon from '@mui/icons-material/Book';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeToggle from './ThemeToggle';

interface MenuItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  isSelected: boolean;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ to, icon, text, isSelected, onClick }) => (
  <Link 
    to={to} 
    style={{ 
      textDecoration: 'none',
      color: 'inherit',
      display: 'flex',
      alignItems: 'center',
    }}
    onClick={onClick}
  >
    <Stack 
      direction="row" 
      spacing={1} 
      alignItems="center"
      sx={{
        padding: '12px 16px',
        opacity: isSelected ? 1 : 0.7,
        transition: 'all 0.2s',
        borderBottom: isSelected ? '2px solid currentColor' : '2px solid transparent',
        '&:hover': {
          opacity: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }
      }}
    >
      {icon}
      <Typography variant="subtitle1">{text}</Typography>
    </Stack>
  </Link>
);

const MainMenu: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { to: '/gerar-link-whatsapp', icon: <WhatsAppIcon />, text: 'GERAR LINK' },
    { to: '/gerar-qr-code', icon: <QrCodeIcon />, text: 'GERAR QR CODE' },
    { to: '/blog', icon: <BookIcon />, text: 'BLOG' }
  ];

  const renderMenuItems = (onClick?: () => void) => (
    menuItems.map((item) => (
      <MenuItem
        key={item.to}
        to={item.to}
        icon={item.icon}
        text={item.text}
        isSelected={location.pathname === item.to}
        onClick={onClick}
      />
    ))
  );

  return (
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

          {/* Menu Desktop */}
          {!isMobile && (
            <Stack direction="row">
              {renderMenuItems()}
            </Stack>
          )}
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <ThemeToggle />
          
          {/* Botão do Menu Mobile */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="abrir menu"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Stack>
      </Toolbar>

      {/* Drawer Mobile */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Melhor performance em mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
          },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ mt: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem 
                key={item.to} 
                component={Link} 
                to={item.to}
                sx={{
                  color: 'inherit',
                  textDecoration: 'none',
                  opacity: location.pathname === item.to ? 1 : 0.7,
                  '&:hover': {
                    opacity: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default MainMenu; 