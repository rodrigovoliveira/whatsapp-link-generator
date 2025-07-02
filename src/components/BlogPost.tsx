import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Link } from '@mui/material';
import SEOHead from './SEOHead';

interface Post {
  title: string;
  date: string;
  readTime: string;
  content: React.ReactNode;
  description: string;
  image: string;
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const posts: Record<string, Post> = {
    'como-criar-link-whatsapp-mensagem-personalizada': {
      title: 'Como Criar um Link para WhatsApp com Mensagem Personalizada',
      date: '2024-03-26',
      readTime: '5 min',
      description: 'Descubra o passo a passo para criar um link direto com texto pronto para iniciar conversas no WhatsApp.',
      image: '/logo.webp',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Descubra o passo a passo para criar um link direto com texto pronto para iniciar conversas no WhatsApp. 
            Ideal para pequenas empresas, lojas e atendimento automatizado. Ferramentas como o{' '}
            <Link href="https://www.gerarlinkzap.com.br/gerar-link-whatsapp" target="_blank" rel="noopener">
              gerador de link para WhatsApp
            </Link>{' '}
            facilitam esse processo.
          </Typography>
          <Typography variant="body1" paragraph>
            Dica adicional: o próprio{' '}
            <Link href="https://faq.whatsapp.com/588683725848460" target="_blank" rel="noopener">
              site oficial do WhatsApp
            </Link>{' '}
            ensina como funciona o wa.me.
          </Typography>
        </>
      )
    },
    'o-que-e-qr-code-como-criar-whatsapp': {
      title: 'O que é um QR Code e como criar um para seu WhatsApp',
      date: '2024-03-25',
      readTime: '6 min',
      description: 'Aprenda como funciona o QR Code e como gerar um para seu número do WhatsApp.',
      image: '/logo.webp',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Aprenda como funciona o QR Code e como gerar um para seu número do WhatsApp, permitindo que clientes 
            escaneiem e iniciem conversas de forma prática. Use ferramentas como o{' '}
            <Link href="https://www.gerarlinkzap.com.br/gerar-qr-code" target="_blank" rel="noopener">
              gerador de QR Code
            </Link>
            .
          </Typography>
          <Typography variant="body1" paragraph>
            Saiba mais sobre QR Codes no artigo da{' '}
            <Link href="https://www.kaspersky.com.br/resource-center/definitions/what-is-a-qr-code" target="_blank" rel="noopener">
              Kaspersky
            </Link>
            .
          </Typography>
        </>
      )
    },
    'whatsapp-web-para-pequenas-empresas': {
      title: 'WhatsApp Web para Pequenos Negócios: Como Usar e Vantagens',
      date: '2024-03-24',
      readTime: '8 min',
      description: 'Entenda como utilizar o WhatsApp Web para melhorar seu atendimento.',
      image: '/logo.webp',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Entenda como utilizar o WhatsApp Web para melhorar seu atendimento, especialmente para micro e pequenas empresas. 
            Acesse a versão web oficial do app{' '}
            <Link href="https://web.whatsapp.com/" target="_blank" rel="noopener">
              WhatsApp Web
            </Link>{' '}
            ou saiba mais com dicas no{' '}
            <Link href="https://www.techtudo.com.br/noticias/2020/04/whatsapp-web-o-que-e-e-como-usar.ghtml" target="_blank" rel="noopener">
              TechTudo
            </Link>
            .
          </Typography>
        </>
      )
    },
    'como-adicionar-link-whatsapp-instagram-site': {
      title: 'Como Adicionar o Link do WhatsApp em seu Instagram e Site',
      date: '2024-03-23',
      readTime: '5 min',
      description: 'Veja como divulgar seu link do WhatsApp em perfis de redes sociais.',
      image: '/logo.webp',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Veja como divulgar seu link do WhatsApp em perfis de redes sociais, como Instagram e Facebook, além de sites e páginas de vendas. 
            O próprio{' '}
            <Link href="https://www.facebook.com/business/help/2058515294227817" target="_blank" rel="noopener">
              Meta for Business
            </Link>{' '}
            explica como integrar essas plataformas.
          </Typography>
        </>
      )
    },
    'link-whatsapp-vendas-mensagens-prontas': {
      title: 'Link do WhatsApp para Vendas: 5 Mensagens Prontas para Usar com Clientes',
      date: '2024-03-22',
      readTime: '7 min',
      description: 'Sugestões de mensagens de vendas que você pode colocar no seu link do WhatsApp.',
      image: '/logo.webp',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Sugestões de mensagens de vendas que você pode colocar no seu link do WhatsApp. Personalize cada uma com o{' '}
            <Link href="https://www.gerarlinkzap.com.br/gerar-link-whatsapp" target="_blank" rel="noopener">
              gerador de links com mensagem
            </Link>{' '}
            e envie rapidamente ao cliente.
          </Typography>
          <Typography variant="body1" paragraph>
            Mais ideias de abordagem estão neste guia da{' '}
            <Link href="https://resultadosdigitais.com.br/blog/whatsapp-para-vendas/" target="_blank" rel="noopener">
              RD Station
            </Link>
            .
          </Typography>
        </>
      )
    }
  };

  const post = posts[slug as keyof typeof posts];

  if (!post) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h1">
            Artigo não encontrado
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <>
      <SEOHead
        title={`${post.title} - Gerador de Link WhatsApp`}
        description={post.description}
      />
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '2rem', mb: 2 }}>
            {post.title}
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mb: 4 }}
          >
            {post.date} • {post.readTime} de leitura
          </Typography>

          <Box sx={{ 
            '& a': { 
              color: theme => theme.palette.mode === 'dark' ? '#25D366' : '#128C7E',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }
          }}>
            {post.content}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default BlogPost; 