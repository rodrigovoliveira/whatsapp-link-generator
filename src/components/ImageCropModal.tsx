import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import AvatarEditor from 'react-avatar-editor';

export interface ImageCropModalProps {
  imageFile: File;
  onComplete: (croppedImage: string) => void;
  onClose: () => void;
}

const MAX_IMAGE_SIZE = 800; // Tamanho máximo em pixels
const JPEG_QUALITY = 0.8; // Qualidade da compressão JPEG (0-1)

const ImageCropModal: React.FC<ImageCropModalProps> = ({ imageFile, onComplete, onClose }) => {
  const [scale, setScale] = useState(1);
  const [imageUrl, setImageUrl] = useState<string>('');
  const editorRef = useRef<AvatarEditor>(null);

  useEffect(() => {
    const url = URL.createObjectURL(imageFile);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const optimizeImage = (canvas: HTMLCanvasElement): Promise<string> => {
    return new Promise((resolve) => {
      // Redimensionar se necessário
      let finalCanvas = canvas;
      if (canvas.width > MAX_IMAGE_SIZE || canvas.height > MAX_IMAGE_SIZE) {
        finalCanvas = document.createElement('canvas');
        const scale = MAX_IMAGE_SIZE / Math.max(canvas.width, canvas.height);
        finalCanvas.width = canvas.width * scale;
        finalCanvas.height = canvas.height * scale;
        const ctx = finalCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(canvas, 0, 0, finalCanvas.width, finalCanvas.height);
        }
      }

      // Comprimir como JPEG
      resolve(finalCanvas.toDataURL('image/jpeg', JPEG_QUALITY));
    });
  };

  const handleSave = async () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();
      const optimizedImage = await optimizeImage(canvas);
      onComplete(optimizedImage);
    }
  };

  if (!imageUrl) return null;

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Ajustar Logo</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <AvatarEditor
            ref={editorRef}
            image={imageUrl}
            width={200}
            height={200}
            border={50}
            borderRadius={100}
            color={[255, 255, 255, 0.6]}
            scale={scale}
            rotate={0}
          />
          <input
            type="range"
            min="1"
            max="2"
            step="0.01"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            style={{ width: '80%' }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropModal; 