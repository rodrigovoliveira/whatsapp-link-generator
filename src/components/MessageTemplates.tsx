import React from 'react';
import { Box, Typography, List, ListItem, useTheme, useMediaQuery, Chip } from '@mui/material';
import { messageTemplates, MessageTemplate } from '../data/messageTemplates';

interface MessageTemplatesProps {
  onSelectTemplate: (message: string) => void;
}

const MessageTemplates: React.FC<MessageTemplatesProps> = ({ onSelectTemplate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTemplateClick = (template: MessageTemplate) => {
    onSelectTemplate(template.message);
  };

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      maxHeight: isMobile ? '300px' : '400px', // Altura menor no mobile
      bgcolor: 'background.paper',
      borderRadius: theme.shape.borderRadius,
      border: '1px solid',
      borderColor: 'divider',
      overflow: 'hidden', // Evita que a borda seja cortada pelo overflow
      position: 'relative', // Adicionado para posicionamento do feedback
      zIndex: 1 // Garante que o componente fique acima do campo de texto
    }}>
      <Box sx={{ 
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.default',
        flexShrink: 0 // Impede que o cabeçalho encolha
      }}>
        <Typography variant="h3" component="h3" sx={{ 
          fontSize: isMobile ? '1.1rem' : '1.25rem',
          mb: 1
        }}>
          Exemplos de mensagens prontas
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{
          fontSize: isMobile ? '0.8rem' : '0.875rem'
        }}>
          Escolha uma mensagem abaixo para preencher rapidamente o campo acima
        </Typography>
      </Box>

      <List sx={{ 
        overflowY: 'auto',
        flex: 1,
        p: 2,
        '& > li': {
          mb: 3,
          '&:last-child': {
            mb: 0
          }
        }
      }}>
        {messageTemplates.map((template) => (
          <ListItem 
            key={template.id}
            onClick={() => handleTemplateClick(template)}
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              cursor: 'pointer',
              p: 2,
              borderRadius: 1,
              transition: 'background-color 0.2s',
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            <Box sx={{ 
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1
            }}>
              <Typography 
                variant="h6"
                component="h6"
                sx={{ 
                  fontWeight: 500,
                  fontSize: isMobile ? '0.9rem' : '1rem'
                }}
              >
                {template.title}
              </Typography>
              <Chip 
                label={template.category || 'Geral'} 
                size={isMobile ? 'small' : 'medium'}
                sx={{ 
                  ml: 1,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  fontSize: isMobile ? '0.7rem' : '0.75rem',
                  height: isMobile ? '20px' : '24px'
                }}
              />
            </Box>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
                fontSize: isMobile ? '0.75rem' : '0.8rem',
                lineHeight: 1.4,
                width: '100%',
                bgcolor: 'action.hover',
                p: 1.5,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              {template.message}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MessageTemplates; 