import React from 'react';
import { Box, Container, Typography, Paper, Grid, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import SEOHead from './SEOHead';
import { useTheme } from '../contexts/ThemeContext';

const Blog: React.FC = () => {
  const { mode } = useTheme();
  const isDarkMode = mode === 'dark';

  const posts = [
    {
      slug: 'como-criar-link-whatsapp-mensagem-personalizada',
      title: 'Como Criar um Link para WhatsApp com Mensagem Personalizada',
      description: 'Descubra o passo a passo para criar um link direto com texto pronto para iniciar conversas no WhatsApp. Ideal para pequenas empresas, lojas e atendimento automatizado.',
      date: '2024-03-26',
      readTime: '5 min',
      image: '/logo.webp'
    },
    {
      slug: 'o-que-e-qr-code-como-criar-whatsapp',
      title: 'O que é um QR Code e como criar um para seu WhatsApp',
      description: 'Aprenda como funciona o QR Code e como gerar um para seu número do WhatsApp, permitindo que clientes escaneiem e iniciem conversas de forma prática.',
      date: '2024-03-25',
      readTime: '6 min',
      image: '/logo.webp'
    },
    {
      slug: 'whatsapp-web-para-pequenas-empresas',
      title: 'WhatsApp Web para Pequenos Negócios: Como Usar e Vantagens',
      description: 'Entenda como utilizar o WhatsApp Web para melhorar seu atendimento, especialmente para micro e pequenas empresas.',
      date: '2024-03-24',
      readTime: '8 min',
      image: '/logo.webp'
    },
    {
      slug: 'como-adicionar-link-whatsapp-instagram-site',
      title: 'Como Adicionar o Link do WhatsApp em seu Instagram e Site',
      description: 'Veja como divulgar seu link do WhatsApp em perfis de redes sociais, como Instagram e Facebook, além de sites e páginas de vendas.',
      date: '2024-03-23',
      readTime: '5 min',
      image: '/logo.webp'
    },
    {
      slug: 'link-whatsapp-vendas-mensagens-prontas',
      title: 'Link do WhatsApp para Vendas: 5 Mensagens Prontas para Usar com Clientes',
      description: 'Sugestões de mensagens de vendas que você pode colocar no seu link do WhatsApp. Personalize cada uma e envie rapidamente ao cliente.',
      date: '2024-03-22',
      readTime: '7 min',
      image: '/logo.webp'
    }
  ];

  return (
    <>
      <SEOHead
        title="Blog - Gerador de Link WhatsApp"
        description="Artigos e dicas sobre WhatsApp, marketing digital e comunicação com clientes."
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