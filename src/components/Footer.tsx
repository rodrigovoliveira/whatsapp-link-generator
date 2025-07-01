import React from 'react';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            <strong>Aviso:</strong> Este site não é afiliado, endossado ou patrocinado pelo WhatsApp Inc. "WhatsApp" é uma marca registrada da Meta Platforms, Inc.
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            Esta ferramenta é gratuita e não requer cadastro. Nenhuma informação é armazenada nos servidores deste site.
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          gap: 2,
          borderTop: 1,
          borderColor: 'divider',
          pt: 2
        }}>
          <MuiLink
            component={Link}
            to="/termos-de-uso"
            color="inherit"
            underline="hover"
          >
            Termos de Uso
          </MuiLink>
          <MuiLink
            component={Link}
            to="/politica-de-privacidade"
            color="inherit"
            underline="hover"
          >
            Política de Privacidade
          </MuiLink>
        </Box>
        
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
          © {new Date().getFullYear()} Gerador de Link WhatsApp. Todos os direitos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 