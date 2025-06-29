import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QrCodeIcon from '@mui/icons-material/QrCode';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const InfoSections = () => {
  return (
    <Box sx={{ mt: 4 }}>
      {/* Instruções Rápidas */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Como usar o gerador de link do WhatsApp grátis:
        </Typography>
        <List>
          {[
            'Digite o número com DDD e DDI (ex: +55 11 99999-0000)',
            'Escreva a mensagem que será enviada automaticamente',
            'Clique em Gerar link gratuitamente',
            'Copie o link ou leia o QR Code',
            'Use onde quiser — sem custo'
          ].map((text, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: '#25D366' }} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Exemplos Prontos */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Modelos gratuitos de link do WhatsApp:
        </Typography>
        <List>
          {[
            {
              title: 'Atendimento:',
              link: 'https://wa.me/5511999999999?text=Olá,+gostaria+de+atendimento'
            },
            {
              title: 'Vendas:',
              link: 'https://wa.me/5511999999999?text=Oi,+tenho+interesse+no+produto'
            },
            {
              title: 'Orçamento:',
              link: 'https://wa.me/5511999999999?text=Olá,+gostaria+de+um+orçamento'
            }
          ].map((item, index) => (
            <ListItem key={index}>
              <Box>
                <Typography variant="subtitle1">{item.title}</Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    wordBreak: 'break-all',
                    color: 'text.secondary',
                    fontFamily: 'monospace'
                  }}
                >
                  {item.link}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* QR Code Info */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <QrCodeIcon sx={{ fontSize: 40, color: '#25D366' }} />
          <Typography variant="h6">
            Crie QR Code do WhatsApp grátis
          </Typography>
        </Box>
        <Typography variant="body1">
          Ao gerar o link, criamos também um QR Code gratuitamente. Ele pode ser usado em cartões de visita, 
          vitrines, materiais promocionais, panfletos ou catálogos físicos. O usuário escaneia e é direcionado 
          direto para o WhatsApp, com a mensagem pronta.
        </Typography>
      </Paper>

      {/* FAQs */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <HelpOutlineIcon sx={{ fontSize: 40, color: '#25D366' }} />
          <Typography variant="h6">
            Perguntas frequentes
          </Typography>
        </Box>
        {[
          {
            question: 'Preciso pagar para usar?',
            answer: 'Não. O gerador é 100% gratuito e sem limite de uso.'
          },
          {
            question: 'Preciso fazer login ou me cadastrar?',
            answer: 'Não. Você pode usar livremente, sem conta, login ou e-mail.'
          },
          {
            question: 'Funciona com WhatsApp Business?',
            answer: 'Sim, com qualquer conta do WhatsApp.'
          },
          {
            question: 'O link ou QR Code expira?',
            answer: 'Não. São permanentes e gratuitos.'
          },
          {
            question: 'Esse serviço é mesmo grátis?',
            answer: 'Sim. Você pode gerar quantos links e QR Codes quiser, sem custo.'
          }
        ].map((faq, index) => (
          <Accordion 
            key={index} 
            sx={{ 
              '&:before': { display: 'none' },
              boxShadow: 'none',
              backgroundColor: 'transparent'
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                px: 1,
                '&:hover': { backgroundColor: 'rgba(37, 211, 102, 0.04)' }
              }}
            >
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 1 }}>
              <Typography color="text.secondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      {/* Call-to-action final */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 3, 
          textAlign: 'center',
          backgroundColor: 'rgba(37, 211, 102, 0.04)'
        }}
      >
        <Typography variant="h6" gutterBottom>
          Comece agora! Gere seu link do WhatsApp 100% grátis, copie o QR Code e compartilhe com seus clientes.
        </Typography>
      </Paper>
    </Box>
  );
};

export default InfoSections; 