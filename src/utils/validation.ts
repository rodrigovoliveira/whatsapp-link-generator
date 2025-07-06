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
    return { isValid: false, error: 'Campo obrigatório' };
  }

  try {
    // Remove caracteres não numéricos para validação
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length < MIN_PHONE_LENGTH) {
      return { isValid: false, error: 'Número inválido' };
    }

    // Usa libphonenumber-js para validação completa
    if (!isValidPhoneNumber(phone)) {
      return { isValid: false, error: 'Número inválido' };
    }

    const phoneNumber = parsePhoneNumber(phone);
    if (!phoneNumber?.isValid()) {
      return { isValid: false, error: 'Telefone em formato incorreto' };
    }

    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: 'Telefone em formato incorreto' };
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
      error: 'Mensagem muito longa'
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
      error: 'Formato de arquivo inválido'
    };
  }

  if (file.size > maxSize) {
    return { 
      isValid: false, 
      error: 'Arquivo muito grande'
    };
  }

  return { isValid: true };
}; 