import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SchemaOrg {
  "@context": string;
  "@type": string;
}

interface FAQSchema extends SchemaOrg {
  mainEntity: {
    "@type": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }[];
}

interface WebAppSchema extends SchemaOrg {
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    "@type": string;
    price: string;
    priceCurrency: string;
  };
  featureList: string[];
  aggregateRating?: {
    "@type": string;
    ratingValue: string;
    ratingCount: string;
    bestRating: string;
    worstRating: string;
  };
}

interface OrganizationSchema extends SchemaOrg {
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
}

interface BreadcrumbSchema extends SchemaOrg {
  itemListElement: {
    "@type": string;
    position: number;
    name: string;
    item: string;
  }[];
}

const faqSchema: FAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Preciso instalar algo para usar o gerador?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. O gerador funciona direto no navegador. Basta preencher os campos e gerar o link ou QR Code gratuitamente."
      }
    },
    {
      "@type": "Question",
      "name": "O link gerado funciona com WhatsApp Business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, o link funciona tanto com contas normais quanto com contas Business do WhatsApp."
      }
    },
    {
      "@type": "Question",
      "name": "O QR Code gerado tem validade?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. O QR Code funciona enquanto o link estiver ativo e o número de WhatsApp existir."
      }
    },
    {
      "@type": "Question",
      "name": "O link pode ser usado em redes sociais e sites?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Ele pode ser incluído em páginas de vendas, Instagram, Linktree, blogs, etc."
      }
    },
    {
      "@type": "Question",
      "name": "O que acontece se o número estiver incorreto?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O link não funcionará. Verifique sempre o número antes de compartilhar."
      }
    },
    {
      "@type": "Question",
      "name": "O site guarda meus dados?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. Nenhuma informação preenchida é armazenada. O processo é 100% local e seguro."
      }
    },
    {
      "@type": "Question",
      "name": "Posso personalizar a mensagem do link?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim! É possível escrever uma mensagem automática que será carregada ao abrir o WhatsApp."
      }
    }
  ]
};

const webAppSchema: WebAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Gerador de Link WhatsApp",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL"
  },
  "featureList": [
    "Geração de links personalizados para WhatsApp",
    "Criação de QR Code personalizado",
    "Templates de mensagens prontas",
    "Formatação de texto com emojis",
    "Interface responsiva"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1250",
    "bestRating": "5",
    "worstRating": "1"
  }
};

const organizationSchema: OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "GerarLinkZap",
  "url": "https://www.gerarlinkzap.com.br",
  "logo": "https://www.gerarlinkzap.com.br/logo.webp",
  "sameAs": [
    "https://www.gerarlinkzap.com.br"
  ]
};

interface SEOHeadProps {
  page?: 'link' | 'qr' | 'blog';
  title?: string;
  description?: string;
  schema?: SchemaOrg;
  canonical?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({ page, title: customTitle, description: customDescription, schema, canonical }) => {
  const location = useLocation();
  const baseUrl = 'https://www.gerarlinkzap.com.br';
  const currentUrl = `${baseUrl}${location.pathname}`;

  // Default values
  const defaultTitle = 'Gerador de Link WhatsApp - Crie Links e QR Codes para WhatsApp';
  const defaultDescription = 'Crie links personalizados e QR Codes para WhatsApp gratuitamente. Ferramenta online para gerar links com mensagens prontas para WhatsApp.';

  // Page specific values
  const pageTitle = page === 'link' ? 'Gerar Link WhatsApp - Crie Links com Mensagem Pronta' :
                   page === 'qr' ? 'Gerar QR Code WhatsApp - Crie QR Codes para WhatsApp' :
                   page === 'blog' ? 'Blog - Gerador de Link WhatsApp' :
                   defaultTitle;

  const pageDescription = page === 'link' ? 'Crie links personalizados para WhatsApp com mensagens prontas. Ferramenta gratuita para gerar links do WhatsApp.' :
                         page === 'qr' ? 'Crie QR Codes para WhatsApp gratuitamente. Ferramenta online para gerar QR Codes com mensagens prontas.' :
                         page === 'blog' ? 'Artigos e dicas sobre WhatsApp, marketing digital e comunicação com clientes.' :
                         defaultDescription;

  // Use custom values if provided, otherwise use page specific or default values
  const title = customTitle || pageTitle;
  const description = customDescription || pageDescription;

  // Gera o breadcrumb baseado na URL atual
  const getBreadcrumbSchema = (): BreadcrumbSchema => {
    const paths = location.pathname.split('/').filter(Boolean);
    const breadcrumbList: BreadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Início",
          "item": baseUrl
        }
      ]
    };

    paths.forEach((path, index) => {
      const name = path === 'gerar-link-whatsapp' ? 'Gerar Link'
        : path === 'gerar-qr-code' ? 'Gerar QR Code'
        : path === 'politica-de-privacidade' ? 'Política de Privacidade'
        : path === 'termos-de-uso' ? 'Termos de Uso'
        : path;

      breadcrumbList.itemListElement.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": name,
        "item": `${baseUrl}/${path}`
      });
    });

    return breadcrumbList;
  };

  // Combina todos os schemas necessários
  const getSchemas = (): SchemaOrg[] => {
    const schemas: SchemaOrg[] = [organizationSchema];
    
    if (location.pathname === '/' || location.pathname === '/gerar-link-whatsapp') {
      schemas.push(webAppSchema);
      schemas.push(faqSchema);
    }
    
    schemas.push(getBreadcrumbSchema());

    return schemas;
  };

  return (
    <Helmet>
      {/* Títulos e Meta Tags Básicas */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}/logo.webp`} />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}/logo.webp`} />
      
      {/* Schema.org */}
      {getSchemas().map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead; 