import React, { useState, useEffect, useMemo, lazy, Suspense, useRef } from 'react';
import { Box, TextField, Stack, Button, Snackbar, CircularProgress, IconButton, Tooltip, Typography, Paper, Alert, Popover } from '@mui/material';
import PhoneInput, { Country } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QrCodeIcon from '@mui/icons-material/QrCode';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import CodeIcon from '@mui/icons-material/Code';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import data from '@emoji-mart/data';
import { useNavigate } from 'react-router-dom';
import { detectUserCountry } from '../services/locationService';
import MessageTemplates from './MessageTemplates';
import InfoSections from './InfoSections';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { validatePhone, validateMessage, sanitizeInput } from '../utils/validation';

// Lazy load do Emoji Picker
const Picker = lazy(() => import('@emoji-mart/react'));

interface WhatsAppLinkGeneratorProps {
  onLinkGenerated: (link: string) => void;
  phone: string;
  message: string;
  onPhoneChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onReset: () => void;
}

type FormatType = 'bold' | 'italic' | 'strikethrough' | 'monospace';

interface FormatButton {
  type: FormatType;
  tooltip: string;
  prefix: string;
  suffix: string;
  icon: React.ReactElement;
}

const formatButtons: FormatButton[] = [
  {
    type: 'bold',
    tooltip: 'Negrito (*texto*)',
    prefix: '*',
    suffix: '*',
    icon: <FormatBoldIcon />
  },
  {
    type: 'italic',
    tooltip: 'Itálico (_texto_)',
    prefix: '_',
    suffix: '_',
    icon: <FormatItalicIcon />
  },
  {
    type: 'strikethrough',
    tooltip: 'Riscado (~texto~)',
    prefix: '~',
    suffix: '~',
    icon: <StrikethroughSIcon />
  },
  {
    type: 'monospace',
    tooltip: 'Monospace (```texto```)',
    prefix: '```',
    suffix: '```',
    icon: <CodeIcon />
  }
];

const WhatsAppLinkGenerator: React.FC<WhatsAppLinkGeneratorProps> = ({ 
  onLinkGenerated, 
  phone, 
  message, 
  onPhoneChange, 
  onMessageChange,
  onReset 
}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [defaultCountry, setDefaultCountry] = useState<Country>('BR');
  const [isLoadingCountry, setIsLoadingCountry] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [emojiAnchorEl, setEmojiAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [messageError, setMessageError] = useState<string | undefined>();
  const navigate = useNavigate();
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const messageTemplatesRef = useRef<HTMLDivElement>(null);

  const generatedLink = useMemo(() => {
    // Validar telefone
    const phoneValidation = validatePhone(phone);
    setPhoneError(phoneValidation.error);
    
    if (!phoneValidation.isValid) {
      return '';
    }
    
    // Validar e sanitizar mensagem
    const sanitizedMessage = message ? sanitizeInput(message) : '';
    const messageValidation = validateMessage(sanitizedMessage);
    setMessageError(messageValidation.error);
    
    if (!messageValidation.isValid) {
      return '';
    }
    
    // Gerar link apenas se ambas validações passarem
    const cleanPhone = phone.replace(/\D/g, '');
    const encodedMessage = sanitizedMessage ? `?text=${encodeURIComponent(sanitizedMessage)}` : '';
    
    return `https://wa.me/${cleanPhone}${encodedMessage}`;
  }, [phone, message]);

  useEffect(() => {
    if (generatedLink) {
      onLinkGenerated(generatedLink);
    }
  }, [generatedLink, onLinkGenerated]);

  useEffect(() => {
    const loadUserCountry = async () => {
      try {
        const country = await detectUserCountry();
        setDefaultCountry(country);
      } catch (error) {
        console.error('Erro ao detectar país:', error);
        setDefaultCountry('BR');
      } finally {
        setIsLoadingCountry(false);
      }
    };

    loadUserCountry();
  }, []);

  const handleFormat = (type: FormatType) => {
    const button = formatButtons.find(btn => btn.type === type);
    if (!button) return;

    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = message.substring(start, end);
    const newText = message.substring(0, start) + 
                   button.prefix + selectedText + button.suffix + 
                   message.substring(end);
    
    onMessageChange(newText);
    
    // Restore cursor position after React updates the textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + button.prefix.length,
        end + button.prefix.length
      );
    }, 0);
  };

  const handleEmojiSelect = (emoji: any) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = message.substring(0, start) + emoji.native + message.substring(end);
    
    onMessageChange(newText);
    setEmojiAnchorEl(null);
    
    // Restore cursor position after emoji
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + emoji.native.length,
        start + emoji.native.length
      );
    }, 0);
  };

  const handleCopyLink = async () => {
    if (generatedLink) {
      try {
        await navigator.clipboard.writeText(generatedLink);
        setCopySuccess(true);
        setOpenSnackbar(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error('Erro ao copiar:', err);
      }
    }
  };

  const handleTestWhatsApp = () => {
    if (generatedLink) {
      window.open(generatedLink, '_blank');
    }
  };

  const handleGenerateQRCode = () => {
    if (generatedLink) {
      onLinkGenerated(generatedLink);
      navigate('/gerar-qr-code');
    }
  };

  const handleMessageChange = (value: string) => {
    const sanitizedValue = sanitizeInput(value);
    const validation = validateMessage(sanitizedValue);
    setMessageError(validation.error);
    onMessageChange(sanitizedValue);
  };

  const handlePhoneChange = (value: string | undefined) => {
    const validation = validatePhone(value || '');
    setPhoneError(validation.error);
    onPhoneChange(value || '');
  };

  const handleTemplateSelected = (templateMessage: string) => {
    onMessageChange(templateMessage);
    setSnackbarMessage('Template selecionado! ✨');
    setOpenSnackbar(true);
    
    // Scroll e foco para o campo de mensagem
    setTimeout(() => {
      if (messageInputRef.current) {
        messageInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        messageInputRef.current.focus();
      }
    }, 100);
  };

  // Função para lidar com navegação por teclado
  const handleKeyboardNavigation = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  const scrollToTemplates = () => {
    if (messageTemplatesRef.current) {
      messageTemplatesRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Box component="main" sx={{ 
      p: { xs: 2, sm: 3 }, 
      width: '100%', 
      maxWidth: '1200px', 
      mx: 'auto',
      pt: { xs: '70px', sm: 3 }
    }}>
      <Typography 
        variant="h6" 
        component="h6" 
        gutterBottom 
        align="center"
        sx={{ color: 'text.secondary' }}
      >
        GERAR LINK WHATSAPP
      </Typography>

      <Typography 
        variant="h6" 
        component="h6" 
        gutterBottom 
        align="center"
        sx={{ color: 'text.secondary' }}
      >
        GERAR QR CODE
      </Typography>

      <Typography 
        variant="h1" 
        component="h1" 
        gutterBottom 
        align="center" 
        sx={{ 
          mb: 4, 
          color: 'text.primary',
          fontSize: { xs: '1.5rem', sm: '2.5rem' },
          mt: { xs: 1, sm: 0 }
        }}
      >
        Gerador de Link do WhatsApp
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', textAlign: 'center' }}>
        Crie links personalizados para iniciar conversas no WhatsApp sem precisar adicionar o contato.
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3,
        mb: 4
      }}>
        {/* Coluna principal - Formulário */}
        <Box sx={{ flex: 1 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box>
              <Typography variant="h6" component="h6" sx={{ color: 'text.primary', mb: 2 }}>
                Número do WhatsApp
              </Typography>
              <PhoneInput
                international
                defaultCountry={defaultCountry}
                value={phone}
                onChange={handlePhoneChange}
                disabled={isLoadingCountry}
                error={phoneError}
                aria-label="Número do WhatsApp"
                sx={{
                  '& .PhoneInputInput': {
                    width: '100%',
                    p: 1.5,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                  }
                }}
              />
              {phoneError && (
                <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                  {phoneError}
                </Typography>
              )}
            </Box>

            <Box>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 1
              }}>
                <Typography variant="h6" component="h6" sx={{ color: 'text.primary' }}>
                  Mensagem (opcional)
                </Typography>
                <Button
                  variant="text"
                  color="secondary"
                  size="small"
                  onClick={scrollToTemplates}
                  sx={{
                    textTransform: 'none',
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  Ver mensagens prontas ↓
                </Button>
              </Box>

              {/* Barra de formatação móvel */}
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 1, 
                  mb: 2,
                  display: { xs: 'block', sm: 'none' },
                  bgcolor: 'background.default'
                }}
              >
                <Stack 
                  direction="row" 
                  spacing={1} 
                  sx={{ 
                    flexWrap: 'wrap',
                    gap: 1,
                    justifyContent: 'center'
                  }}
                >
                  {formatButtons.map((btn) => (
                    <Tooltip key={btn.type} title={btn.tooltip}>
                      <IconButton
                        onClick={() => handleFormat(btn.type)}
                        size="small"
                        aria-label={btn.tooltip}
                        sx={{
                          bgcolor: 'background.paper',
                          '&:hover': { bgcolor: 'action.hover' }
                        }}
                      >
                        {btn.icon}
                      </IconButton>
                    </Tooltip>
                  ))}
                  
                  <Tooltip title="Adicionar emoji">
                    <IconButton
                      onClick={(e) => setEmojiAnchorEl(e.currentTarget)}
                      size="small"
                      aria-label="Adicionar emoji"
                      sx={{ 
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'action.hover' }
                      }}
                    >
                      <EmojiEmotionsIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Paper>

              {/* Barra de formatação desktop */}
              <Stack 
                direction="row" 
                spacing={1} 
                sx={{ 
                  mb: 2,
                  display: { xs: 'none', sm: 'flex' }
                }}
              >
                {formatButtons.map((btn) => (
                  <Tooltip key={btn.type} title={btn.tooltip}>
                    <IconButton
                      onClick={() => handleFormat(btn.type)}
                      size="small"
                      aria-label={btn.tooltip}
                    >
                      {btn.icon}
                    </IconButton>
                  </Tooltip>
                ))}
                
                <Tooltip title="Adicionar emoji">
                  <IconButton
                    onClick={(e) => setEmojiAnchorEl(e.currentTarget)}
                    size="small"
                    aria-label="Adicionar emoji"
                  >
                    <EmojiEmotionsIcon />
                  </IconButton>
                </Tooltip>
              </Stack>

              <TextField
                multiline
                rows={4}
                fullWidth
                value={message}
                onChange={(e) => handleMessageChange(e.target.value)}
                placeholder="Digite sua mensagem aqui..."
                error={!!messageError}
                helperText={messageError}
                aria-label="Mensagem"
                sx={{
                  '& .MuiInputBase-input': {
                    color: 'text.primary',
                  }
                }}
                inputRef={messageInputRef}
              />
            </Box>

            <Box ref={messageTemplatesRef}>
              <Paper elevation={0} sx={{ p: 0, bgcolor: 'background.default' }}>
                <MessageTemplates onSelectTemplate={handleTemplateSelected} />
              </Paper>
            </Box>

            {/* Link gerado */}
            {generatedLink && (
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 2, 
                  bgcolor: 'success.light',
                  color: 'success.contrastText',
                  borderRadius: 1
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  Link gerado com sucesso:
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    wordBreak: 'break-all',
                    fontFamily: 'monospace',
                    mb: 2
                  }}
                >
                  {generatedLink}
                </Typography>
              </Paper>
            )}

            {/* Botões de ação responsivos */}
            <Stack 
              spacing={2} 
              sx={{ 
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center'
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleTestWhatsApp}
                disabled={!generatedLink}
                startIcon={<WhatsAppIcon />}
                aria-label="Testar no WhatsApp"
                fullWidth
                sx={{ 
                  minWidth: { sm: 200 },
                  py: { xs: 1.5, sm: 1 }
                }}
              >
                Testar no WhatsApp
              </Button>

              <Button
                variant="outlined"
                onClick={handleCopyLink}
                disabled={!generatedLink}
                startIcon={copySuccess ? <CheckCircleIcon /> : <ContentCopyIcon />}
                aria-label="Copiar link"
                fullWidth
                sx={{ 
                  minWidth: { sm: 160 },
                  py: { xs: 1.5, sm: 1 }
                }}
              >
                {copySuccess ? 'Copiado!' : 'Copiar link'}
              </Button>

              <Button
                variant="outlined"
                onClick={handleGenerateQRCode}
                disabled={!generatedLink}
                startIcon={<QrCodeIcon />}
                aria-label="Gerar QR Code"
                fullWidth
                sx={{ 
                  minWidth: { sm: 160 },
                  py: { xs: 1.5, sm: 1 }
                }}
              >
                QR Code
              </Button>
            </Stack>

            <Button
              variant="text"
              onClick={onReset}
              startIcon={<RestartAltIcon />}
              aria-label="Limpar campos"
              sx={{ 
                alignSelf: 'center',
                py: { xs: 1.5, sm: 1 }
              }}
            >
              Limpar campos
            </Button>
          </Paper>
        </Box>
      </Box>

      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
        <InfoSections />
      </Paper>
      
      <Popover
        open={Boolean(emojiAnchorEl)}
        anchorEl={emojiAnchorEl}
        onClose={() => setEmojiAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          '& .EmojiPickerReact': {
            '--epr-hover-bg-color': 'rgba(0, 0, 0, 0.1)',
            '--epr-focus-bg-color': 'rgba(0, 0, 0, 0.15)',
            maxWidth: { xs: '100vw', sm: 'auto' }
          }
        }}
      >
        <Suspense fallback={<CircularProgress />}>
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </Suspense>
      </Popover>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage || (copySuccess ? 'Link copiado com sucesso! 🔗' : '')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default WhatsAppLinkGenerator; 