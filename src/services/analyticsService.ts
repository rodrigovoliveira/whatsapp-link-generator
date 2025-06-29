// Tipagem para o gtag
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js',
      action: string,
      params?: {
        [key: string]: any;
      }
    ) => void;
  }
}

// Tipos de eventos que queremos rastrear
export type EventCategory = 
  | 'link_generation'
  | 'qr_code'
  | 'message_template'
  | 'user_interaction'
  | 'error';

// Interface para os eventos
interface AnalyticsEvent {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
}

// Função principal para enviar eventos
const sendEvent = ({ category, action, label, value }: AnalyticsEvent) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Eventos de geração de link
export const trackLinkGeneration = (phoneNumber: string) => {
  sendEvent({
    category: 'link_generation',
    action: 'generate_link',
    label: `Phone: ${phoneNumber.substring(0, 4)}***` // Anonimiza o número
  });
};

export const trackLinkCopy = () => {
  sendEvent({
    category: 'link_generation',
    action: 'copy_link'
  });
};

export const trackLinkClick = () => {
  sendEvent({
    category: 'link_generation',
    action: 'click_link'
  });
};

// Eventos de QR Code
export const trackQRCodeGeneration = () => {
  sendEvent({
    category: 'qr_code',
    action: 'generate_qr'
  });
};

export const trackQRCodeDownload = () => {
  sendEvent({
    category: 'qr_code',
    action: 'download_qr'
  });
};

export const trackQRCodeCustomization = (type: 'logo' | 'style') => {
  sendEvent({
    category: 'qr_code',
    action: 'customize_qr',
    label: type
  });
};

// Eventos de template de mensagem
export const trackTemplateSelection = (templateName: string) => {
  sendEvent({
    category: 'message_template',
    action: 'select_template',
    label: templateName
  });
};

export const trackMessageFormatting = (formatType: string) => {
  sendEvent({
    category: 'message_template',
    action: 'format_message',
    label: formatType
  });
};

// Eventos de interação do usuário
export const trackPageView = (pageName: string) => {
  sendEvent({
    category: 'user_interaction',
    action: 'page_view',
    label: pageName
  });
};

export const trackThemeToggle = (theme: 'light' | 'dark') => {
  sendEvent({
    category: 'user_interaction',
    action: 'toggle_theme',
    label: theme
  });
};

export const trackLanguageChange = (language: string) => {
  sendEvent({
    category: 'user_interaction',
    action: 'change_language',
    label: language
  });
};

// Eventos de erro
export const trackError = (errorType: string, errorMessage: string) => {
  sendEvent({
    category: 'error',
    action: errorType,
    label: errorMessage
  });
};

// Eventos de conversão
export const trackConversion = (type: string, value?: number) => {
  sendEvent({
    category: 'user_interaction',
    action: 'conversion',
    label: type,
    value: value
  });
};

export const analytics = {
  trackLinkGeneration,
  trackLinkCopy,
  trackLinkClick,
  trackQRCodeGeneration,
  trackQRCodeDownload,
  trackQRCodeCustomization,
  trackTemplateSelection,
  trackMessageFormatting,
  trackPageView,
  trackThemeToggle,
  trackLanguageChange,
  trackError,
  trackConversion
}; 