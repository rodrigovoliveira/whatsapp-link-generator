# WhatsApp Link Generator

Gerador de links do WhatsApp com mensagem pronta e QR Code. Crie links personalizados para WhatsApp com número, mensagem pronta e QR Code de forma totalmente gratuita.

## ✨ Funcionalidades

- ✅ Geração de links do WhatsApp com mensagem pronta
- ✅ Geração de QR Code personalizado
- ✅ Adição de logo no QR Code
- ✅ Templates de mensagens prontas
- ✅ Formatação de texto (negrito, itálico, riscado, monospace)
- ✅ Suporte a emojis
- ✅ Interface responsiva e moderna
- ✅ Tema claro/escuro/alto contraste
- ✅ Design moderno e profissional
- ✅ Feedback visual interativo
- ✅ Navegação intuitiva para templates
- ✅ Experiência otimizada para mobile
- ✅ Instruções rápidas com carrossel responsivo
- ✅ Integração com Google AdSense
- ✅ Analytics avançado com GA4

## 🔒 Melhorias de Segurança e Validação

### Validação de Número de Telefone
- ✅ Validação robusta usando libphonenumber-js
- ✅ Verificação de formato internacional
- ✅ Validação de comprimento mínimo
- ✅ Feedback visual de erros
- ✅ Detecção automática do país

### Validação de Mensagem
- ✅ Limite máximo de caracteres
- ✅ Validação em tempo real
- ✅ Feedback visual de erros
- ✅ Sanitização de input

### Proteção Contra XSS
- ✅ Sanitização de inputs
- ✅ Escape de caracteres especiais
- ✅ Validação de URLs

### Upload de Imagens
- ✅ Validação de tipos permitidos
- ✅ Limite de tamanho
- ✅ Preview com crop
- ✅ Feedback visual

## 🚀 Status das Melhorias

### ⭐ Prioridades Atuais
- 🔥 Compartilhamento via redes sociais
  - Botões de compartilhamento para WhatsApp, Facebook, Twitter e LinkedIn
  - Mensagens personalizadas para cada rede
  - Preview do conteúdo compartilhado
  - Analytics de compartilhamento

- 🔥 Exportação de QR Code em SVG
  - Download em alta qualidade
  - Personalização de cores
  - Edição vetorial
  - Otimizado para impressão

### Performance (✅ Concluído)
- ✅ Lazy loading do emoji-picker
- ✅ Otimização de imagens
- ✅ Compressão do bundle
- ✅ Cache do QR Code
- ✅ Carregamento otimizado
- ✅ Componentes otimizados para React 18
- ✅ Bundle size reduzido
- ✅ Remoção de dependências desnecessárias

### SEO e Analytics (✅ Concluído)
- ✅ Meta tags otimizadas
- ✅ Schema.org implementado
- ✅ Sitemap.xml criado
- ✅ Robots.txt otimizado
- ✅ Integração com Google Analytics 4
- ✅ Rastreamento de eventos principais
- ✅ Integração com Google AdSense
- ✅ Meta tags de verificação
- ✅ Canonical URLs
- ✅ Rich Snippets
- ✅ Otimização de Core Web Vitals

### Funcionalidades (✅ Concluído)
- ✅ Templates organizados por categoria
- ✅ Download do QR Code em PNG
- ✅ Compartilhamento direto
- ✅ Interface intuitiva
- ✅ Feedback visual ao selecionar templates
- ✅ Navegação rápida para templates
- ✅ Instruções rápidas com carrossel
- ✅ Seções informativas
- ✅ FAQs interativas
- ✅ Formatação de texto intuitiva

### Acessibilidade (✅ Implementado)
- ✅ WCAG 2.1
  - ✅ Estrutura semântica
  - ✅ Labels e descrições
  - ✅ Feedback visual e textual
  - ✅ Navegação lógica
- ✅ Suporte a leitores de tela
  - ✅ ARIA labels
  - ✅ Textos alternativos
  - ✅ Mensagens acessíveis
- ✅ Navegação por teclado
  - ✅ Foco visível
  - ✅ Navegação sequencial
- ✅ Temas
  - ✅ Modo claro
  - ✅ Modo escuro
  - ✅ Alto contraste
  - ✅ Cores acessíveis

### Responsividade (✅ Implementado)
- ✅ Layout adaptativo
  - ✅ Design fluido
  - ✅ Breakpoints otimizados
  - ✅ Tipografia responsiva
- ✅ Mobile-first
  - ✅ Touch targets
  - ✅ Gestos
  - ✅ Performance
  - ✅ Prevenção de zoom indesejado
  - ✅ Scroll suave automático
- ✅ UX/UI
  - ✅ Redução de movimento
  - ✅ Preferências do usuário
  - ✅ Orientação de tela
  - ✅ Templates organizados
  - ✅ Formatação intuitiva
  - ✅ Feedback visual interativo
  - ✅ Foco automático inteligente
  - ✅ Navegação otimizada
  - ✅ Layout unificado e limpo

### Infraestrutura (✅ Implementado)
- ✅ Deploy automatizado na Vercel
- ✅ Domínio personalizado configurado
- ✅ HTTPS forçado
- ✅ Compressão de assets
- ✅ Cache de recursos estáticos
- ✅ Monitoramento de performance
- ✅ Backup automático
- ✅ Redirecionamentos otimizados
- ✅ Headers de segurança
- ✅ Configurações de CORS

## 🛠️ Tecnologias

- React 18
- TypeScript 4
- Material-UI 5
- React Router 6
- DOMPurify
- libphonenumber-js
- QRCode.react
- React Avatar Editor
- Google Analytics 4
- Google AdSense

## 📦 Instalação

```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre na pasta
cd whatsapp-link-generator

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

## 🚀 Deploy

### Ambientes

#### Produção
- URL: [https://www.gerarlinkzap.com.br](https://www.gerarlinkzap.com.br)
- Branch: `main`
- Plataforma: Vercel
- Domínio: GoDaddy

### Configuração da Vercel

1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente necessárias
3. A Vercel detectará automaticamente que é um projeto React e configurará o build
4. O deploy é automático a cada push na branch `main`

### Atualizando a Versão em Produção

#### Método 1: Deploy Automático (via main)
1. A branch `main` está configurada para deploy automático
2. Qualquer push para `main` iniciará um novo deploy

#### Método 2: Deploy Manual (via feature branch)
1. Desenvolva em uma feature branch
2. Faça o build local para testes: `npm run build`
3. Teste a build localmente: `npm run serve`
4. Crie um PR para a main
5. Após aprovação, faça o merge
6. O deploy será automático após o merge

## 📊 Monitoramento

### Google Analytics
- Eventos personalizados para cada interação
- Rastreamento de conversões
- Métricas de engajamento
- Relatórios em tempo real

### Google AdSense
- Anúncios responsivos
- Posicionamento estratégico
- Otimização automática
- Monitoramento de performance

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📬 Contato

Para sugestões, dúvidas ou contribuições, por favor abra uma issue no repositório.
