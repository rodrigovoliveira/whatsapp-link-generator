import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import DOMPurify from 'dompurify';

// Constantes de validação
export const MAX_MESSAGE_LENGTH = 4096; // Limite máximo do WhatsApp
export const MIN_PHONE_LENGTH = 8;

// Interface para resultado de validação
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Validação de número de telefone
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone) {
    return { isValid: false, error: 'O número de telefone é obrigatório' };
  }

  try {
    // Remove caracteres não numéricos para validação
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length < MIN_PHONE_LENGTH) {
      return { isValid: false, error: 'Número de telefone muito curto' };
    }

    // Usa libphonenumber-js para validação completa
    if (!isValidPhoneNumber(phone)) {
      return { isValid: false, error: 'Número de telefone inválido' };
    }

    const phoneNumber = parsePhoneNumber(phone);
    if (!phoneNumber?.isValid()) {
      return { isValid: false, error: 'Formato de número inválido' };
    }

    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: 'Erro ao validar número de telefone' };
  }
};

// Validação de mensagem
export const validateMessage = (message: string): ValidationResult => {
  if (!message) {
    return { isValid: true }; // Mensagem é opcional
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return { 
      isValid: false, 
      error: `A mensagem não pode ter mais que ${MAX_MESSAGE_LENGTH} caracteres` 
    };
  }

  return { isValid: true };
};

// Sanitização de input contra XSS
export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // Remove todas as tags HTML
    ALLOWED_ATTR: [] // Remove todos os atributos
  });
};

// Validação de arquivo de imagem para logo
export const validateImageFile = (file: File): ValidationResult => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return { 
      isValid: false, 
      error: 'Formato de arquivo inválido. Use JPG, PNG, GIF ou WebP' 
    };
  }

  if (file.size > maxSize) {
    return { 
      isValid: false, 
      error: 'Arquivo muito grande. O tamanho máximo é 5MB' 
    };
  }

  return { isValid: true };
}; 