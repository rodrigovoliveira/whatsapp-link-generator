import React from 'react';
import { Box, Typography, Paper, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ShareIcon from '@mui/icons-material/Share';

const InfoSections: React.FC = () => {
  const benefits = [
    {
      title: "Link do WhatsApp Profissional",
      description: "Crie links personalizados para WhatsApp Business com mensagem pré-definida. Ideal para atendimento, vendas e marketing digital.",
      icon: <WhatsAppIcon color="primary" />
    },
    {
      title: "QR Code Personalizado",
      description: "Gere QR Codes profissionais para seu WhatsApp. Perfeito para materiais impressos, cartões de visita e divulgação offline.",
      icon: <QrCodeIcon color="primary" />
    },
    {
      title: "Mensagens Automáticas",
      description: "Configure mensagens prontas para seus clientes. Otimize seu atendimento com templates personalizados para cada situação.",
      icon: <ShareIcon color="primary" />
    }
  ];

  const features = [
    "Geração instantânea de links para WhatsApp",
    "Criação de QR Code personalizado grátis",
    "Mensagens pré-definidas para marketing",
    "Formatação de texto com negrito e itálico",
    "Compatível com WhatsApp Business",
    "Ideal para divulgação em redes sociais",
    "Perfeito para materiais impressos",
    "Otimizado para atendimento ao cliente",
    "Suporte a emojis e caracteres especiais",
    "Integração com campanhas de marketing"
  ];

  return (
    <Box sx={{ mt: 6, mb: 4 }}>
      {/* Seção Principal de Benefícios */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {benefits.map((benefit, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper 
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <Box sx={{ mb: 2 }}>
                {benefit.icon}
              </Box>
              <Typography variant="h6" component="h2" gutterBottom>
                {benefit.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {benefit.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Seção de Recursos */}
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Recursos do Gerador de Link WhatsApp
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <List>
              {features.slice(0, 5).map((feature, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              {features.slice(5).map((feature, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Paper>

      {/* Seção FAQ para SEO */}
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Perguntas Frequentes
        </Typography>
        <Box component="article">
          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
            Como criar um link para WhatsApp com mensagem?
          </Typography>
          <Typography variant="body1" paragraph>
            Para criar um link do WhatsApp com mensagem automática, basta inserir seu número de telefone e a mensagem desejada em nossa ferramenta. O link será gerado instantaneamente, pronto para ser compartilhado em suas redes sociais, site ou materiais de marketing.
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
            Como gerar QR Code para WhatsApp?
          </Typography>
          <Typography variant="body1" paragraph>
            Após criar seu link personalizado, clique no botão "Gerar QR Code". Nossa ferramenta irá gerar um QR Code profissional que, quando escaneado, abre diretamente a conversa no WhatsApp com sua mensagem pré-definida.
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
            O gerador de link para WhatsApp é gratuito?
          </Typography>
          <Typography variant="body1" paragraph>
            Sim! Nossa ferramenta é 100% gratuita e não requer cadastro. Você pode criar quantos links e QR Codes desejar, sem custos ou limitações. Ideal para empresas, profissionais e empreendedores que desejam otimizar sua comunicação no WhatsApp.
          </Typography>
        </Box>
      </Paper>

      {/* Seção de Chamada para Ação */}
      <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Comece a Usar Agora!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Crie seus links personalizados para WhatsApp gratuitamente e otimize sua comunicação com clientes.
          Gere QR Codes profissionais e aumente sua presença online e offline.
        </Typography>
      </Paper>
    </Box>
  );
};

export default InfoSections; 