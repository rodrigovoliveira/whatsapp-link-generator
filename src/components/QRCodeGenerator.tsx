import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, Stack, Alert, Accordion, AccordionSummary, AccordionDetails, Snackbar } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useNavigate } from 'react-router-dom';
import ImageCropModal from './ImageCropModal';
import { validateImageFile } from '../utils/validation';
import { analytics } from '../services/analyticsService';
import InfoSections from './InfoSections';

interface QRCodeGeneratorProps {
  whatsappLink: string;
}

const QR_CODE_CACHE_KEY = 'qrcode_cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

interface CacheItem {
  link: string;
  logo: string;
  timestamp: number;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ whatsappLink }) => {
  const [logoImage, setLogoImage] = useState<string>('');
  const [showCropModal, setShowCropModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [showError, setShowError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Carregar do cache ao montar
  useEffect(() => {
    const loadFromCache = () => {
      const cached = localStorage.getItem(QR_CODE_CACHE_KEY);
      if (cached) {
        const cacheData: CacheItem[] = JSON.parse(cached);
        const now = Date.now();
        
        // Limpar itens expirados
        const validItems = cacheData.filter(item => now - item.timestamp < CACHE_EXPIRY);
        if (validItems.length !== cacheData.length) {
          localStorage.setItem(QR_CODE_CACHE_KEY, JSON.stringify(validItems));
        }
        
        // Procurar item correspondente
        const cachedItem = validItems.find(item => item.link === whatsappLink);
        if (cachedItem) {
          setLogoImage(cachedItem.logo);
        }
      }
    };

    loadFromCache();
  }, [whatsappLink]);

  // Salvar no cache quando o logo mudar
  useEffect(() => {
    if (logoImage && whatsappLink) {
      const cached = localStorage.getItem(QR_CODE_CACHE_KEY);
      const cacheData: CacheItem[] = cached ? JSON.parse(cached) : [];
      
      // Remover item antigo se existir
      const filteredCache = cacheData.filter(item => item.link !== whatsappLink);
      
      // Adicionar novo item
      const newCache = [...filteredCache, {
        link: whatsappLink,
        logo: logoImage,
        timestamp: Date.now()
      }];
      
      // Limitar o cache a 10 itens
      if (newCache.length > 10) {
        newCache.shift();
      }
      
      localStorage.setItem(QR_CODE_CACHE_KEY, JSON.stringify(newCache));
    }
  }, [logoImage, whatsappLink]);

  // Rastrear visualização da página
  useEffect(() => {
    analytics.trackPageView('qr_code_generator');
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setError(validation.error || 'Erro ao validar imagem');
      setShowError(true);
      analytics.trackError('image_validation', validation.error || 'Erro ao validar imagem');
      return;
    }

    setSelectedFile(file);
    setShowCropModal(true);
    analytics.trackQRCodeCustomization('logo');
  };

  const handleCropComplete = (croppedImage: string) => {
    setLogoImage(croppedImage);
    setShowCropModal(false);
    analytics.trackQRCodeCustomization('style');
  };

  const handleDownload = () => {
    if (!qrCodeRef.current) return;

    try {
      // Encontra o elemento SVG dentro do container
      const svg = qrCodeRef.current.querySelector('svg');
      if (!svg) {
        throw new Error('QR Code SVG não encontrado');
      }

      // Cria um canvas com o dobro do tamanho para melhor qualidade
      const canvas = document.createElement('canvas');
      const scale = 2;
      canvas.width = svg.clientWidth * scale;
      canvas.height = svg.clientHeight * scale;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Contexto do canvas não disponível');
      }

      // Converte SVG para string
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      // Cria imagem a partir do SVG
      const img = new Image();
      img.onload = () => {
        // Desenha fundo branco
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Desenha o QR Code
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Se houver logo, adiciona ela
        if (logoImage) {
          const logoImg = new Image();
          logoImg.onload = () => {
            const logoSize = canvas.width * 0.2;
            const x = (canvas.width - logoSize) / 2;
            const y = (canvas.height - logoSize) / 2;

            // Cria máscara circular para a logo
            ctx.save();
            ctx.beginPath();
            ctx.arc(x + logoSize/2, y + logoSize/2, logoSize/2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();

            // Desenha a logo
            ctx.drawImage(logoImg, x, y, logoSize, logoSize);
            ctx.restore();

            // Faz o download
            downloadCanvas(canvas);
          };
          logoImg.src = logoImage;
        } else {
          // Se não houver logo, faz o download direto
          downloadCanvas(canvas);
        }
      };
      img.src = svgUrl;
      analytics.trackQRCodeDownload();
    } catch (error: any) {
      console.error('Erro ao gerar QR Code:', error);
      setError('Erro ao gerar o QR Code. Tente novamente.');
      setShowError(true);
      analytics.trackError('qr_generation', error?.message || 'Erro ao gerar QR Code');
    }
  };

  const downloadCanvas = (canvas: HTMLCanvasElement) => {
    try {
      // Converte canvas para PNG
      const pngData = canvas.toDataURL('image/png');
      
      // Cria link de download
      const downloadLink = document.createElement('a');
      downloadLink.href = pngData;
      downloadLink.download = 'whatsapp-qrcode.png';
      
      // Adiciona ao documento, clica e remove
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Erro ao baixar QR Code:', error);
      setError('Erro ao baixar o QR Code. Tente novamente.');
      setShowError(true);
    }
  };

  const handleBack = () => {
    navigate('/gerar-link-whatsapp');
    analytics.trackPageView('return_to_link_generator');
  };

  const handleEditLogo = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box sx={{ 
      maxWidth: '800px', 
      margin: '0 auto',
      p: { xs: 2, md: 3 }
    }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Stack spacing={3}>
          {/* Título e Subtítulo */}
          <Box sx={{ textAlign: 'center', mb: 2 }}>
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
              Crie seu QR Code para WhatsApp Grátis
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', textAlign: 'center' }}>
              Gere o QR Code do seu link com mensagem personalizada. Sem login e sem custo – basta colar o link e baixar o QR em segundos.
            </Typography>
          </Box>

          {whatsappLink ? (
            <>
              {/* Bloco do Link */}
              <Box>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WhatsAppIcon sx={{ color: '#25D366' }} />
                  Link do WhatsApp gerado com a mensagem
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Este é o link personalizado que será codificado no QR Code abaixo.
                  Você pode copiá-lo ou testar direto no WhatsApp Web.
                </Typography>
                <Alert 
                  severity="info" 
                  sx={{ 
                    backgroundColor: 'rgba(37, 211, 102, 0.1)',
                    '& .MuiAlert-icon': {
                      color: '#25D366'
                    }
                  }}
                >
                  <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
                    {whatsappLink}
                  </Typography>
                </Alert>
              </Box>

              {/* Botão de Editar */}
              <Button
                variant="outlined"
                fullWidth
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
                sx={{
                  borderColor: '#34B7F1',
                  color: '#34B7F1',
                  '&:hover': {
                    borderColor: '#0088CC',
                    backgroundColor: 'rgba(52, 183, 241, 0.04)',
                  },
                  height: '56px',
                  fontSize: '1.1rem',
                }}
              >
                Editar link ou mensagem
              </Button>

              {/* QR Code */}
              <Box 
                ref={qrCodeRef}
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  p: 3,
                  borderRadius: 2
                }}
              >
                <QRCodeSVG
                  value={whatsappLink}
                  size={256}
                  level="H"
                  imageSettings={logoImage ? {
                    src: logoImage,
                    height: 48,
                    width: 48,
                    excavate: true,
                  } : undefined}
                />
              </Box>

              {/* Botões de Ação */}
              <Stack spacing={2}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<DownloadIcon />}
                  onClick={handleDownload}
                  sx={{
                    backgroundColor: '#25D366',
                    '&:hover': {
                      backgroundColor: '#128C7E',
                    },
                    height: '56px',
                    fontSize: '1.1rem',
                  }}
                >
                  Baixar QR Code (PNG)
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<EditIcon />}
                  onClick={handleEditLogo}
                  sx={{
                    borderColor: '#25D366',
                    color: '#25D366',
                    '&:hover': {
                      borderColor: '#128C7E',
                      backgroundColor: 'rgba(37, 211, 102, 0.04)',
                    },
                    height: '56px',
                    fontSize: '1.1rem',
                  }}
                >
                  {logoImage ? 'Alterar logomarca no centro do QR Code' : 'Adicionar logomarca no centro do QR Code (opcional)'}
                </Button>
              </Stack>
            </>
          ) : (
            // Estado vazio - Quando não há link
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              py: 4
            }}>
              <QrCodeIcon sx={{ fontSize: 80, color: '#25D366' }} />
              <Typography variant="h5" component="h2" align="center">
                Nenhum QR Code Gerado Ainda
              </Typography>
              <Typography variant="body1" align="center" color="text.secondary">
                Para gerar seu QR Code gratuitamente, primeiro crie um link do WhatsApp com sua mensagem personalizada.
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<WhatsAppIcon />}
                onClick={handleBack}
                sx={{
                  backgroundColor: '#25D366',
                  '&:hover': {
                    backgroundColor: '#128C7E',
                  },
                  height: '56px',
                  fontSize: '1.1rem',
                  minWidth: '250px'
                }}
              >
                Criar Link do WhatsApp
              </Button>
            </Box>
          )}

          {/* Instruções de Uso */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h2" sx={{ mb: 3, fontSize: '1.5rem' }}>
              Instruções rápidas:
            </Typography>

            <Stack spacing={2} sx={{ mb: 4 }}>
              <Typography variant="body1">1. Cole o link do WhatsApp com mensagem</Typography>
              <Typography variant="body1">2. Clique em "Gerar QR Code"</Typography>
              <Typography variant="body1">3. Visualize o código</Typography>
              <Typography variant="body1">4. Clique em "Baixar PNG"</Typography>
            </Stack>

            <Typography variant="h2" sx={{ mb: 3, fontSize: '1.5rem' }}>
              Por que usar QR Code para WhatsApp?
            </Typography>

            <Stack spacing={2} sx={{ mb: 4 }}>
              <Typography variant="body1">• Ideal para impressão e digital</Typography>
              <Typography variant="body1">• Permite acesso imediato com celular</Typography>
              <Typography variant="body1">• Totalmente grátis e ilimitado</Typography>
            </Stack>

            <Typography variant="h2" sx={{ mb: 3, fontSize: '1.5rem' }}>
              Exemplos de uso:
            </Typography>

            <Stack spacing={2} sx={{ mb: 4 }}>
              <Typography variant="body1">• Cartões de visita</Typography>
              <Typography variant="body1">• Embalagens de produto</Typography>
              <Typography variant="body1">• Vitrines e pontos de venda</Typography>
              <Typography variant="body1">• Stories e posts patrocinados</Typography>
            </Stack>
          </Box>

          {/* FAQs */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Perguntas Frequentes
            </Typography>
            {[
              {
                question: 'Este QR Code expira?',
                answer: 'Não. Ele é permanente e gratuito.'
              },
              {
                question: 'Funciona com qualquer celular?',
                answer: 'Sim. Basta escanear com a câmera ou app de leitura de QR Code.'
              },
              {
                question: 'É possível editar a mensagem depois?',
                answer: 'Não. Para mudar a mensagem, volte e gere um novo link.'
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
                <AccordionDetails>
                  <Typography color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          {/* Call-to-action final */}
          <Box sx={{ 
            textAlign: 'center', 
            mt: 4, 
            p: 3, 
            bgcolor: 'rgba(37, 211, 102, 0.04)',
            borderRadius: 2
          }}>
            <Typography variant="h6">
              👇 Baixe seu QR Code agora e use onde quiser. Tudo 100% gratuito, sem login, sem limites.
            </Typography>
          </Box>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileSelect}
            accept="image/jpeg,image/png,image/gif,image/webp"
          />

          {showCropModal && selectedFile && (
            <ImageCropModal
              imageFile={selectedFile}
              onComplete={handleCropComplete}
              onClose={() => setShowCropModal(false)}
            />
          )}

          <Snackbar
            open={showError}
            autoHideDuration={6000}
            onClose={() => setShowError(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={() => setShowError(false)} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        </Stack>
      </Paper>

      <InfoSections />

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowError(false)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QRCodeGenerator; 