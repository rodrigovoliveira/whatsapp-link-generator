import React from 'react';
import { Box, Typography, Paper, Grid, List, ListItem, ListItemIcon, ListItemText, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ShareIcon from '@mui/icons-material/Share';
import CodeIcon from '@mui/icons-material/Code';
import AdUnit from './AdUnit';

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

  return (
    <Box sx={{ 
      mt: 6, 
      mb: 4, 
      overflow: 'hidden',
      minHeight: '100%',
      position: 'relative',
      maxWidth: '100vw',
      boxSizing: 'border-box'
    }}>
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
                textAlign: 'center',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch'
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

      {/* Guia Rápido de Boas Práticas */}
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Guia Rápido de Boas Práticas
        </Typography>
        <Typography paragraph>
          Para garantir o melhor funcionamento dos seus links e QR Codes do WhatsApp, siga estas recomendações:
        </Typography>
            <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={<Typography variant="body1" component="span" fontWeight="bold">Inclua o código do país</Typography>}
              secondary="(ex: +55 para Brasil) antes do número do WhatsApp."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={<Typography variant="body1" component="span" fontWeight="bold">Evite espaços, parênteses ou traços</Typography>}
              secondary="no número — use o formato internacional."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={<Typography variant="body1" component="span" fontWeight="bold">Escreva mensagens claras e diretas</Typography>}
              secondary="que ajudem o usuário a entender o motivo do contato."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={<Typography variant="body1" component="span" fontWeight="bold">Use emojis com moderação</Typography>}
              secondary="para tornar a mensagem mais simpática sem exagero."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={<Typography variant="body1" component="span" fontWeight="bold">Teste o link gerado</Typography>}
              secondary="em mais de um dispositivo antes de divulgá-lo."
            />
          </ListItem>
          <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
            <ListItemText 
              primary={<Typography variant="body1" component="span" fontWeight="bold">Use QR Code em materiais impressos</Typography>}
              secondary="para facilitar o acesso direto ao WhatsApp."
            />
                </ListItem>
            </List>
        <Typography paragraph sx={{ mt: 2 }}>
          Seguindo essas práticas, você melhora a taxa de resposta e evita erros no redirecionamento do link.
        </Typography>
      </Paper>

      {/* Como Usar com Exemplos Práticos */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mt: 4,
          maxWidth: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          '&::after': {
            content: '""',
            display: { xs: 'block', sm: 'none' },
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '20px',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.1))',
            pointerEvents: 'none',
            opacity: 1,
            transition: 'opacity 0.3s'
          }
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Como Usar o Gerador de Link e QR Code do WhatsApp
        </Typography>
        <Typography paragraph>
          Veja exemplos reais de uso da nossa ferramenta gratuita:
        </Typography>

        <Stack 
          spacing={3} 
          sx={{ 
            height: { xs: '400px', sm: 'auto' },
            overflowY: { xs: 'auto', sm: 'visible' },
            WebkitOverflowScrolling: 'touch',
            '-webkit-overflow-scrolling': 'touch',
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': {
              width: '4px'
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0,0,0,0.1)',
              borderRadius: '4px'
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '4px'
            },
            pb: { xs: 3, sm: 0 },
            '& > *': {
              maxWidth: '100%',
              boxSizing: 'border-box'
            }
          }}
        >
          <Box>
            <Typography variant="h6" gutterBottom>
              Exemplo 1 – Vendas Online
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Mensagem personalizada:
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontFamily: 'monospace',
                  bgcolor: 'action.hover',
                  p: 1,
                  borderRadius: 1
                }}
              >
                Olá! Tenho interesse no produto [Nome]. Pode me dar mais informações?
              </Typography>
            </Paper>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Exemplo 2 – Agendamento de Serviços
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontFamily: 'monospace',
                  bgcolor: 'action.hover',
                  p: 1,
                  borderRadius: 1
                }}
              >
                Olá, gostaria de agendar um horário para [serviço]. Quais são os dias disponíveis?
              </Typography>
            </Paper>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Exemplo 3 – Atendimento Pós-venda
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontFamily: 'monospace',
                  bgcolor: 'action.hover',
                  p: 1,
                  borderRadius: 1
                }}
              >
                Oi! Comprei com vocês recentemente e preciso de ajuda com meu pedido.
              </Typography>
            </Paper>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Exemplo 4 – Suporte técnico
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontFamily: 'monospace',
                  bgcolor: 'action.hover',
                  p: 1,
                  borderRadius: 1
                }}
              >
                Olá, estou com dificuldades para acessar minha conta. Podem me ajudar?
              </Typography>
            </Paper>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Como adicionar o QR Code em um cartão de visita:
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <QrCodeIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Use o botão 'Gerar QR Code'" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ShareIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Baixe o PNG gerado" />
              </ListItem>
              <ListItem>
                  <ListItemIcon>
                  <CodeIcon color="primary" />
                  </ListItemIcon>
                <ListItemText primary="Insira no seu material gráfico com espaço para o celular escanear" />
                </ListItem>
            </List>
          </Box>
        </Stack>
      </Paper>

      {/* Perguntas Frequentes */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mt: 4,
          maxWidth: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          '&::after': {
            content: '""',
            display: { xs: 'block', sm: 'none' },
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '20px',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.1))',
            pointerEvents: 'none',
            opacity: 1,
            transition: 'opacity 0.3s'
          }
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Perguntas Frequentes (FAQ)
        </Typography>

        <Stack 
          spacing={3} 
          sx={{ 
            height: { xs: '400px', sm: 'auto' },
            overflowY: { xs: 'auto', sm: 'visible' },
            WebkitOverflowScrolling: 'touch',
            '-webkit-overflow-scrolling': 'touch',
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': {
              width: '4px'
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0,0,0,0.1)',
              borderRadius: '4px'
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '4px'
            },
            pb: { xs: 3, sm: 0 },
            '& > *': {
              maxWidth: '100%',
              boxSizing: 'border-box'
            }
          }}
        >
          <Box>
            <Typography variant="h6" component="h3" gutterBottom>
              1. Preciso instalar algo para usar o gerador?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Não. O gerador funciona direto no navegador. Basta preencher os campos e gerar o link ou QR Code gratuitamente.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" component="h3" gutterBottom>
              2. O link gerado funciona com WhatsApp Business?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sim, o link funciona tanto com contas normais quanto com contas Business do WhatsApp.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" component="h3" gutterBottom>
              3. O QR Code gerado tem validade?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Não. O QR Code funciona enquanto o link estiver ativo e o número de WhatsApp existir.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" component="h3" gutterBottom>
              4. O link pode ser usado em redes sociais e sites?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sim. Ele pode ser incluído em páginas de vendas, Instagram, Linktree, blogs, etc.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" component="h3" gutterBottom>
              5. O que acontece se o número estiver incorreto?
          </Typography>
            <Typography variant="body1" color="text.secondary">
              O link não funcionará. Verifique sempre o número antes de compartilhar.
          </Typography>
          </Box>

          <Box>
            <Typography variant="h6" component="h3" gutterBottom>
              6. O site guarda meus dados?
          </Typography>
            <Typography variant="body1" color="text.secondary">
              Não. Nenhuma informação preenchida é armazenada. O processo é 100% local e seguro.
          </Typography>
          </Box>

          <Box>
            <Typography variant="h6" component="h3" gutterBottom>
              7. Posso personalizar a mensagem do link?
          </Typography>
            <Typography variant="body1" color="text.secondary">
              Sim! É possível escrever uma mensagem automática que será carregada ao abrir o WhatsApp.
          </Typography>
        </Box>
        </Stack>
      </Paper>

      {/* Anúncio antes da chamada para ação */}
      <AdUnit 
        slot="7894251366"
        format="auto"
        style={{ 
          margin: '2rem auto',
          maxWidth: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      />

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