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
      maxHeight: isMobile ? '300px' : '350px',
      bgcolor: 'background.default',
      borderRadius: theme.shape.borderRadius,
      overflow: 'hidden',
      position: 'relative',
      zIndex: 1,
      mt: 3
    }}>
      <Box sx={{ 
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.default',
        flexShrink: 0
      }}>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 1
      }}>
        <Typography variant="h3" component="h3" sx={{ 
            fontSize: isMobile ? '1.1rem' : '1.25rem'
        }}>
          Exemplos de mensagens prontas
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{
          fontSize: isMobile ? '0.8rem' : '0.875rem'
        }}>
          Escolha uma mensagem abaixo para preencher rapidamente o campo acima
        </Typography>
        </Box>
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