import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import SEOHead from './SEOHead';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Política de Privacidade - Gerador de Link WhatsApp"
        description="Política de privacidade do Gerador de Link WhatsApp. Saiba como suas informações são protegidas ao usar nossa ferramenta gratuita."
      />
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '2rem' }}>
              Política de Privacidade
            </Typography>
            
            <Typography paragraph>
              Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações ao utilizar o site <strong>gerarlinkzap.com.br</strong>.
            </Typography>

            <Typography variant="h2" component="h2" gutterBottom sx={{ fontSize: '1.5rem', mt: 4 }}>
              Coleta de informações
            </Typography>
            <Typography paragraph>
              Este site <strong>não coleta informações pessoais</strong> como nome, e-mail ou número de telefone. As únicas informações utilizadas são aquelas inseridas voluntariamente para gerar links ou QR Codes de WhatsApp.
            </Typography>

            <Typography variant="h2" component="h2" gutterBottom sx={{ fontSize: '1.5rem', mt: 4 }}>
              Cookies
            </Typography>
            <Typography paragraph>
              Utilizamos cookies do Google AdSense para exibir anúncios relevantes. Você pode desativar os cookies no seu navegador.
            </Typography>

            <Typography variant="h2" component="h2" gutterBottom sx={{ fontSize: '1.5rem', mt: 4 }}>
              Links externos
            </Typography>
            <Typography paragraph>
              Nosso site pode conter links para sites externos, como o WhatsApp. Não nos responsabilizamos pelas práticas de privacidade desses sites.
            </Typography>

            <Typography variant="h2" component="h2" gutterBottom sx={{ fontSize: '1.5rem', mt: 4 }}>
              Segurança
            </Typography>
            <Typography paragraph>
              Não armazenamos nenhuma informação inserida por usuários. Todas as mensagens e links são gerados localmente no navegador.
            </Typography>

            <Typography variant="h2" component="h2" gutterBottom sx={{ fontSize: '1.5rem', mt: 4 }}>
              Contato
            </Typography>
            <Typography paragraph>
              Em caso de dúvidas, entre em contato pelo e-mail: contato@gerarlinkzap.com.br
            </Typography>

            <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
              <Typography variant="body2" color="text.secondary" align="center">
                <strong>Aviso:</strong> Este site não é afiliado, endossado ou patrocinado pelo WhatsApp Inc. "WhatsApp" é uma marca registrada da Meta Platforms, Inc.
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                Esta ferramenta é gratuita e não requer cadastro. Nenhuma informação é armazenada nos servidores deste site.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default PrivacyPolicy; 