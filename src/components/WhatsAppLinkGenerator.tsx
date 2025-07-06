import React, { useState, useEffect, useMemo, lazy, Suspense, useRef } from 'react';
import { Box, TextField, Stack, Button, Snackbar, CircularProgress, IconButton, Tooltip, Typography, Paper, Popover } from '@mui/material';
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
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import data from '@emoji-mart/data';
import { useNavigate } from 'react-router-dom';
import { detectUserCountry } from '../services/locationService';
import MessageTemplates from './MessageTemplates';
import InfoSections from './InfoSections';
import { validatePhone, validateMessage, sanitizeInput } from '../utils/validation';
import { analytics } from '../services/analyticsService';
import QuickInstructions from './QuickInstructions';
import { useTranslation } from 'react-i18next';

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
  const [showTutorial, setShowTutorial] = useState(() => {
    return !localStorage.getItem('wa_tutorial_done');
  });
  const [forceShowLinkArea, setForceShowLinkArea] = useState(false);
  const [showAddPhoneMsg, setShowAddPhoneMsg] = useState(false);
  const linkAreaRef = useRef<HTMLDivElement>(null);
  const [showFormatInfo, setShowFormatInfo] = useState(false);
  const { t, i18n } = useTranslation();

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
    
    // Link principal usando wa.me (melhor compatibilidade)
    // Vantagens do wa.me:
    // ✅ Sempre abre o app quando disponível
    // ✅ Fallback inteligente para web.whatsapp.com se app não instalado
    // ✅ Funciona em todos os dispositivos (mobile e desktop)
    // ✅ Formato oficial e suportado pelo WhatsApp
    return `https://wa.me/${cleanPhone}${encodedMessage}`;
  }, [phone, message]);

  // Função para gerar link híbrido (protocolo nativo + fallback)
  const generateHybridLink = useMemo(() => {
    if (!phone || !validatePhone(phone).isValid) {
      return '';
    }
    
    const cleanPhone = phone.replace(/\D/g, '');
    const sanitizedMessage = message ? sanitizeInput(message) : '';
    const encodedMessage = sanitizedMessage ? `&text=${encodeURIComponent(sanitizedMessage)}` : '';
    
    // Link híbrido: tenta protocolo nativo, fallback para wa.me
    return `whatsapp://send?phone=${cleanPhone}${encodedMessage}`;
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

  useEffect(() => {
    if (generatedLink && showTutorial) {
      setShowTutorial(false);
      localStorage.setItem('wa_tutorial_done', '1');
    }
  }, [generatedLink, showTutorial]);

  // Rastrear visualização da página
  useEffect(() => {
    analytics.trackPageView('link_generator');
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
    analytics.trackMessageFormatting(type); // Rastrear formatação
    
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
        analytics.trackLinkCopy(); // Rastrear cópia do link
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err: any) {
        console.error('Erro ao copiar:', err);
        analytics.trackError('copy_error', err?.message || 'Erro desconhecido');
      }
    }
  };

  const handleTestWhatsApp = () => {
    if (generatedLink) {
      window.open(generatedLink, '_blank');
      analytics.trackLinkClick(); // Rastrear clique no link
    }
  };

  // Função para testar com fallback inteligente
  const handleTestWhatsAppWithFallback = () => {
    if (!phone || !validatePhone(phone).isValid) return;
    
    const cleanPhone = phone.replace(/\D/g, '');
    const sanitizedMessage = message ? sanitizeInput(message) : '';
    const encodedMessage = sanitizedMessage ? `&text=${encodeURIComponent(sanitizedMessage)}` : '';
    
    // Tenta primeiro o protocolo nativo
    const nativeLink = `whatsapp://send?phone=${cleanPhone}${encodedMessage}`;
    
    // Fallback para wa.me se o protocolo nativo falhar
    const fallbackLink = `https://wa.me/${cleanPhone}${sanitizedMessage ? `?text=${encodeURIComponent(sanitizedMessage)}` : ''}`;
    
    // Tenta abrir o protocolo nativo
    const link = document.createElement('a');
    link.href = nativeLink;
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Timeout para detectar se o protocolo nativo falhou
    const timeout = setTimeout(() => {
      document.body.removeChild(link);
      // Se falhou, abre o fallback
      window.open(fallbackLink, '_blank');
    }, 1000);
    
    // Se o protocolo nativo funcionou, remove o timeout
    link.addEventListener('click', () => {
      clearTimeout(timeout);
      document.body.removeChild(link);
    });
    
    link.click();
    analytics.trackLinkClick(); // Rastrear clique no link
  };

  const handleGenerateQRCode = () => {
    if (generatedLink) {
      onLinkGenerated(generatedLink);
      analytics.trackQRCodeGeneration(); // Rastrear geração de QR Code
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
    
    if (value && !validation.error) {
      analytics.trackLinkGeneration(value); // Rastrear geração de link com número válido
    }
  };

  const handleTemplateSelected = (templateMessage: string) => {
    onMessageChange(templateMessage);
    setSnackbarMessage('Template selecionado! ✨');
    setOpenSnackbar(true);
    analytics.trackTemplateSelection(templateMessage.substring(0, 30)); // Rastrear seleção de template
    
    // Scroll e foco para o campo de mensagem
    setTimeout(() => {
      if (messageInputRef.current) {
        messageInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        messageInputRef.current.focus();
      }
    }, 100);
  };

  const scrollToTemplates = () => {
    if (messageTemplatesRef.current) {
      messageTemplatesRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleGenerateLinkBtn = () => {
    if (!phone || phone.trim() === '' || phone === '+55') {
      setShowAddPhoneMsg(true);
      setForceShowLinkArea(false);
      // Foco automático no campo telefone
      setTimeout(() => {
        const input = document.querySelector('.PhoneInputInput') as HTMLInputElement | null;
        if (input) input.focus();
      }, 100);
      return;
    }
    setShowAddPhoneMsg(false);
    setForceShowLinkArea(true);
    // Scroll suave para a área do link gerado
    setTimeout(() => {
      if (linkAreaRef.current) {
        linkAreaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);
  };

  const handleFormatMessageBtn = () => {
    if (messageInputRef.current) {
      messageInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      messageInputRef.current.focus();
      // Exibir tooltip nativo do navegador
      messageInputRef.current.setSelectionRange(0, 0);
      // Opcional: pode exibir uma mensagem temporária ou highlight visual
    }
  };

  const handleGenerateQRCodeAndScroll = () => {
    handleGenerateQRCode();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  return (
    <Box sx={{ width: '100%', p: { xs: 2, sm: 3 }, position: 'relative' }}>
      {/* Seletor de idioma */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <label htmlFor="lang-select" style={{ marginRight: 8 }}>{t('Idioma')}:</label>
        <select
          id="lang-select"
          value={i18n.language}
          onChange={e => i18n.changeLanguage(e.target.value)}
          style={{ padding: '4px 8px', borderRadius: 4 }}
        >
          <option value="pt">{t('Português')}</option>
          <option value="en">{t('Inglês')}</option>
        </select>
      </Box>

      {/* Tutorial passo a passo */}
      {showTutorial && (
        <Paper elevation={3} sx={{ mb: 3, p: 2, bgcolor: 'primary.light', color: 'primary.contrastText', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>{t('Como gerar seu link do WhatsApp:')}</Typography>
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>1</Typography>
              <Typography variant="body2">{t('Digite seu número')}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>2</Typography>
              <Typography variant="body2">{t('(Opcional) Escreva uma mensagem')}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>3</Typography>
              <Typography variant="body2" dangerouslySetInnerHTML={{ __html: t('Toque em <b>Gerar Link</b>') }} />
            </Box>
          </Stack>
        </Paper>
      )}

      <Typography 
        variant="h1" 
        sx={{ 
          fontSize: { xs: '1.5rem', sm: '2rem' },
          mb: 3,
          textAlign: 'center',
          color: 'primary.main'
        }}
      >
        {t('Crie seu Link para WhatsApp Grátis')}
      </Typography>

      <Typography 
        variant="subtitle1" 
        sx={{ 
          mb: 4,
          textAlign: 'center',
          color: 'text.secondary'
        }}
      >
        {t('Cole seu número e gere seu link do WhatsApp em segundos!')}
      </Typography>

      <Box sx={{ maxWidth: '600px', mx: 'auto', position: 'relative' }}>
        <Paper 
          elevation={2} 
          sx={{ 
            p: { xs: 2, sm: 3 },
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            maxHeight: { xs: 'auto', sm: '800px' },
            overflow: 'auto'
          }}
        >
          <Box>
            <Typography variant="h6" component="h6" sx={{ color: 'text.primary', mb: 2 }}>
              {t('Número de telefone')}
            </Typography>
            <PhoneInput
              international
              defaultCountry={defaultCountry}
              value={phone}
              onChange={handlePhoneChange}
              disabled={isLoadingCountry}
              error={phoneError}
              aria-label="Número do WhatsApp"
              placeholder={t('Ex: 11999999999')}
              sx={{
                '& .PhoneInputInput': {
                  width: '100%',
                  p: 1.5,
                  borderRadius: 1,
                  border: '2px solid',
                  borderColor: phone && !phoneError ? 'success.main' : 'divider',
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                  transition: 'border-color 0.2s',
                  '::placeholder': {
                    color: '#bdbdbd',
                    opacity: 1,
                  }
                }
              }}
            />
            {showAddPhoneMsg && (
              <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                {t('Campo obrigatório')}
              </Typography>
            )}
            {!showAddPhoneMsg && phoneError && (
              <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                {t(phoneError)}
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
                {t('Mensagem (opcional)')}
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
                {t('Ver mensagens prontas ↓')}
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
              placeholder={t('Digite sua mensagem')}
              error={!!messageError}
              helperText={messageError ? t(messageError) : ''}
              aria-label="Mensagem"
              sx={{
                '& .MuiInputBase-input': {
                  color: 'text.primary',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: message && !messageError ? 'success.main' : undefined,
                    borderWidth: message && !messageError ? 2 : undefined,
                    transition: 'border-color 0.2s',
                  }
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
        </Paper>

        {/* Botão de gerar link destacado e fixo no mobile */}
        <Box sx={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1200,
          px: 2,
          py: 2,
          background: 'rgba(255,255,255,0.95)',
          boxShadow: 3,
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Button
            variant="contained"
            color="success"
            size="large"
            fullWidth
            startIcon={<WhatsAppIcon />}
            sx={{
              maxWidth: 600,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              py: 2,
              borderRadius: 2,
              boxShadow: 4,
              textTransform: 'none',
              letterSpacing: 1,
            }}
            onClick={handleGenerateLinkBtn}
            aria-label={t('Gerar Link WhatsApp')}
          >
            {t('Gerar Link WhatsApp')}
          </Button>
        </Box>

        {/* Área de link gerado e opções */}
        {(forceShowLinkArea || generatedLink) && (
          <div ref={linkAreaRef}>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 3,
                mt: 3,
                bgcolor: 'success.light',
                color: 'success.contrastText',
                borderRadius: 1,
                width: '100%'
              }}
            >
              <Typography 
                variant="subtitle2" 
                gutterBottom
                sx={{
                  color: 'success.contrastText',
                  fontWeight: 'bold'
                }}
              >
                {generatedLink ? t('Link gerado com sucesso:') : t('Preencha corretamente para gerar o link')}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  wordBreak: 'break-all',
                  fontFamily: 'monospace',
                  mb: 2,
                  fontSize: '1rem',
                  color: 'success.contrastText',
                  opacity: 0.9
                }}
              >
                {generatedLink || 'O link aparecerá aqui assim que os dados estiverem corretos.'}
              </Typography>
              {/* Botões de ação principais */}
              <Stack 
                spacing={2} 
                sx={{ 
                  mt: 3,
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'center',
                  alignItems: 'stretch',
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleTestWhatsAppWithFallback}
                  startIcon={<WhatsAppIcon />}
                  aria-label={t('Testar no WhatsApp')}
                  fullWidth
                  sx={{ 
                    minWidth: { sm: 200 },
                    padding: '12px 16px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    bgcolor: '#25D366',
                    color: '#FFFFFF',
                    minHeight: 56,
                    height: 56,
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  disabled={!generatedLink}
                >
                  {t('Testar no WhatsApp')}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCopyLink}
                  startIcon={copySuccess ? <CheckCircleIcon /> : <ContentCopyIcon />}
                  aria-label={t('Copiar Link')}
                  fullWidth
                  sx={{ 
                    minWidth: { sm: 200 },
                    padding: '12px 16px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    minHeight: 56,
                    height: 56,
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: '#FFFFFF',
                    borderWidth: 2,
                    color: '#FFFFFF',
                    boxShadow: 'none',
                    '&.MuiButton-root': {
                      marginTop: '0 !important',
                    },
                    '&:hover': {
                      borderColor: '#FFFFFF',
                      bgcolor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                  disabled={!generatedLink}
                >
                  {copySuccess ? t('Link copiado!') : t('Copiar Link')}
                </Button>
              </Stack>
            </Paper>
            {/* Banner de recursos avançados */}
            {generatedLink && (
              <Paper elevation={0} sx={{ mt: 2, p: 2, bgcolor: 'primary.50', color: 'primary.main', borderRadius: 2, border: '1px solid #b2dfdb' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>{t('Aproveite recursos avançados')}</Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="center" mb={1}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<FormatListBulletedIcon />}
                    onClick={scrollToTemplates}
                    sx={{ minWidth: 150, fontWeight: 'bold' }}
                  >
                    {t('Mensagens Prontas')}
                  </Button>
                  <Button
                    variant="outlined"
                    color="success"
                    startIcon={<QrCodeIcon />}
                    onClick={handleGenerateQRCodeAndScroll}
                    sx={{ minWidth: 150, fontWeight: 'bold' }}
                  >
                    {t('Criar QR Code')}
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<FormatBoldIcon />}
                    onClick={handleFormatMessageBtn}
                    sx={{ minWidth: 150, fontWeight: 'bold', bgcolor: 'background.paper' }}
                  >
                    {t('Formatar Mensagem')}
                  </Button>
                </Stack>
                <Stack direction="column" spacing={1} mt={1}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <FormatListBulletedIcon fontSize="small" />
                    <Typography variant="body2" sx={{ color: '#222' }}>{t('Use uma mensagem pronta para agilizar o atendimento.')}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <QrCodeIcon fontSize="small" />
                    <Typography variant="body2" sx={{ color: '#222' }}>{t('Gere um QR Code para divulgar seu WhatsApp.')}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <FormatBoldIcon fontSize="small" />
                    <Typography variant="body2" sx={{ color: '#222' }}>{t('Formate sua mensagem com negrito, itálico ou emojis.')}</Typography>
                  </Stack>
                </Stack>
              </Paper>
            )}
          </div>
        )}

        {/* Botão de limpar campos */}
        <Button
          variant="text"
          onClick={onReset}
          startIcon={<RestartAltIcon />}
          aria-label="Limpar campos"
          sx={{ 
            alignSelf: 'center',
            py: { xs: 1.5, sm: 1 },
            mt: 2
          }}
        >
          Limpar campos
        </Button>
      </Box>

      <Box sx={{ mt: 6 }}>
        <QuickInstructions />
      </Box>

      <InfoSections />
      
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