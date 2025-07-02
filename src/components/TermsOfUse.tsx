import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import SEOHead from './SEOHead';

const TermsOfUse: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Termos de Uso - Gerador de Link WhatsApp"
        description="Termos de uso do Gerador de Link WhatsApp. Entenda as regras e condições de uso da nossa ferramenta gratuita."
        canonical="https://www.gerarlinkzap.com.br/termos-de-uso"
      />
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '2rem' }}>
              Termos de Uso
            </Typography>
            
            <Typography paragraph>
              Ao utilizar o site <strong>gerarlinkzap.com.br</strong>, você concorda com os termos abaixo:
            </Typography>

            <Typography variant="h2" component="h2" gutterBottom sx={{ fontSize: '1.5rem', mt: 4 }}>
              1. Uso da ferramenta
            </Typography>
            <Typography paragraph>
              A ferramenta é gratuita e permite criar links personalizados e QR Codes do WhatsApp. O uso é de responsabilidade do usuário.
            </Typography>

            <Typography variant="h2" component="h2" gutterBottom sx={{ fontSize: '1.5rem', mt: 4 }}>
              2. Propriedade intelectual
            </Typography>
            <Typography paragraph>
              Todo o conteúdo deste site é protegido por direitos autorais. O uso indevido do código, layout ou marca pode resultar em sanções legais.
            </Typography>

            <Typography variant="h2" component="h2" gutterBottom sx={{ fontSize: '1.5rem', mt: 4 }}>
              3. Limitação de responsabilidade
            </Typography>
            <Typography paragraph>
              O site é fornecido "como está". Não nos responsabilizamos por falhas no funcionamento do link, eventuais indisponibilidades do WhatsApp ou uso incorreto por terceiros.
            </Typography>

            <Typography variant="h2" component="h2" gutterBottom sx={{ fontSize: '1.5rem', mt: 4 }}>
              4. Atualizações
            </Typography>
            <Typography paragraph>
              Estes termos podem ser alterados sem aviso prévio. Recomendamos que o usuário consulte esta página periodicamente.
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

export default TermsOfUse; 