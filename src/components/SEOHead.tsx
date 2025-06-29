import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  page: 'link' | 'qr';
}

const SEOHead: React.FC<SEOHeadProps> = ({ page }) => {
  const location = useLocation();
  const baseUrl = 'https://www.gerarlinkzap.com.br';
  const currentUrl = `${baseUrl}${location.pathname}`;

  const titles = {
    link: 'Gerar Link WhatsApp Grátis | Crie Links Personalizados para WhatsApp',
    qr: 'Gerar QR Code WhatsApp Grátis | Crie QR Codes Personalizados'
  };

  const descriptions = {
    link: 'Crie links personalizados do WhatsApp com mensagem automática. Ferramenta gratuita para gerar links do WhatsApp Business. Sem cadastro, rápido e prático.',
    qr: 'Gere QR Codes profissionais para WhatsApp gratuitamente. Personalize com sua logo e cores. Ideal para materiais impressos e marketing.'
  };

  const schemas = {
    link: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "GerarLinkZap - Gerador de Link WhatsApp",
      "url": currentUrl,
      "description": descriptions.link,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "BRL"
      }
    },
    qr: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "GerarLinkZap - Gerador de QR Code WhatsApp",
      "url": currentUrl,
      "description": descriptions.qr,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "BRL"
      }
    }
  };

  return (
    <Helmet>
      {/* Títulos e Meta Tags Básicas */}
      <title>{titles[page]}</title>
      <meta name="description" content={descriptions[page]} />
      <meta name="robots" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={titles[page]} />
      <meta property="og:description" content={descriptions[page]} />
      <meta property="og:image" content={`${baseUrl}/logo512.png`} />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={titles[page]} />
      <meta name="twitter:description" content={descriptions[page]} />
      <meta name="twitter:image" content={`${baseUrl}/logo512.png`} />
      
      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(schemas[page])}
      </script>
    </Helmet>
  );
};

export default SEOHead; 