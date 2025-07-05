import React from 'react';
import { Box, Container, Typography, Paper, Grid, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import SEOHead from './SEOHead';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const Blog: React.FC = () => {
  const { mode } = useTheme();
  const { t } = useTranslation();
  const isDarkMode = mode === 'dark';

  const posts = [
    {
      slug: 'whatsapp-web-pequena-empresa',
      title: 'WhatsApp Web: O que é e Como Pode Ajudar Sua Pequena Empresa',
      description: 'Descubra como o WhatsApp Web pode ajudar sua pequena empresa a atender clientes de forma mais ágil e profissional usando o computador.',
      date: '2024-03-29',
      readTime: '6 min',
      image: '/logo.webp'
    },
    {
      slug: 'whatsapp-business-recursos-vantagens',
      title: 'WhatsApp Business: Recursos e Vantagens para Pequenos Negócios',
      description: 'Descubra como o WhatsApp Business pode ajudar seu pequeno negócio com recursos especiais para empresas.',
      date: '2024-03-28',
      readTime: '5 min',
      image: '/logo.webp'
    },
    {
      slug: 'como-criar-link-whatsapp',
      title: 'Como Criar um Link do WhatsApp para seu Negócio',
      description: 'Aprenda a criar links personalizados do WhatsApp para seu negócio e facilite o contato com seus clientes.',
      date: '2024-03-27',
      readTime: '7 min',
      image: '/logo.webp'
    },
    {
      slug: 'dicas-melhorar-atendimento-whatsapp',
      title: '5 Dicas para Melhorar o Atendimento pelo WhatsApp na Sua Empresa',
      description: 'Descubra como melhorar o atendimento da sua empresa pelo WhatsApp com 5 dicas práticas e fáceis de implementar.',
      date: '2024-03-26',
      readTime: '6 min',
      image: '/logo.webp'
    }
  ];

  return (
    <>
      <SEOHead
        title={t('Blog - Gerador de Link WhatsApp')}
        description={t('Artigos e dicas sobre WhatsApp, marketing digital e comunicação com clientes.')}
        canonical="https://www.gerarlinkzap.com.br/blog"
      />
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '2rem', mb: 4 }}>
            Blog
          </Typography>

          <Grid container spacing={3}>
            {posts.map((post) => (
              <Grid item xs={12} md={6} key={post.slug}>
                <MuiLink
                  component={Link}
                  to={`/blog/${post.slug}`}
                  color="inherit"
                  underline="none"
                  sx={{ 
                    display: 'block',
                    height: '100%',
                    '&:hover': {
                      textDecoration: 'none'
                    }
                  }}
                >
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      p: 3,
                      height: '100%',
                      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <Typography variant="h2" component="h2" gutterBottom sx={{ fontSize: '1.5rem' }}>
                      {post.title}
                    </Typography>

                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ mb: 2 }}
                    >
                      {post.date} • {post.readTime} de leitura
                    </Typography>

                    <Typography variant="body1" paragraph>
                      {post.description}
                    </Typography>

                    <Box
                      sx={{
                        color: isDarkMode ? '#25D366' : '#128C7E',
                      }}
                    >
                      Ler mais →
                    </Box>
                  </Paper>
                </MuiLink>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Blog; 