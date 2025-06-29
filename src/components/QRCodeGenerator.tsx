import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, Stack, Alert, Accordion, AccordionSummary, AccordionDetails, Snackbar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QrCodeIcon from '@mui/icons-material/QrCode';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import ImageCropModal from './ImageCropModal';
import { validateImageFile } from '../utils/validation';

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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setError(validation.error || 'Erro ao validar imagem');
      setShowError(true);
      return;
    }

    setSelectedFile(file);
    setShowCropModal(true);
  };

  const handleCropComplete = (croppedImage: string) => {
    setLogoImage(croppedImage);
    setShowCropModal(false);
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
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
      setError('Erro ao gerar o QR Code. Tente novamente.');
      setShowError(true);
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
            <Typography variant="h6" component="h6" sx={{ 
              fontSize: { xs: '1rem', md: '1.2rem' },
              fontWeight: 'bold',
              mb: 2,
              color: '#128C7E'
            }}>
              GERAR QR CODE
            </Typography>
            <Typography variant="h1" component="h1" sx={{ 
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 'bold',
              mb: 2,
              color: '#128C7E'
            }}>
              Crie um QR Code do seu link do WhatsApp — Grátis e sem login
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              Gere gratuitamente um QR Code para o link do WhatsApp com sua mensagem pronta. 
              Ideal para imprimir em materiais de divulgação, usar em embalagens, vitrines ou enviar digitalmente.
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
            <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 'bold', mb: 2 }}>
              Como usar este QR Code?
            </Typography>
            <Typography variant="body1" gutterBottom>
              Basta imprimir ou compartilhar este código para que qualquer pessoa possa escanear com a câmera do celular 
              e iniciar a conversa com a mensagem automática no seu WhatsApp.
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              Ideal para usar em:
            </Typography>
            <List>
              {[
                'Cartões de visita',
                'Etiquetas e embalagens',
                'Cartazes e vitrines',
                'Materiais promocionais',
                'Campanhas digitais'
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon sx={{ color: '#25D366' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
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
    </Box>
  );
};

export default QRCodeGenerator; 