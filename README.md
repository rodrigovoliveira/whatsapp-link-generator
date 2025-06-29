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

### Performance (✅ Concluído)
- ✅ Lazy loading do emoji-picker
- ✅ Otimização de imagens
- ✅ Compressão do bundle
- ✅ Cache do QR Code
- ✅ Carregamento otimizado

### Analytics e Monitoramento (❌ Pendente)
- [ ] Integração com Google Analytics 4
- [ ] Monitoramento de erros com Sentry
- [ ] Métricas de uso
- [ ] Sistema de feedback

### Funcionalidades (🔄 Em Andamento)
- ✅ Templates organizados por categoria
- ✅ Download do QR Code em PNG
- ✅ Compartilhamento direto
- ✅ Interface intuitiva
- ✅ Feedback visual ao selecionar templates
- ✅ Navegação rápida para templates
- [ ] Histórico de links
- [ ] Estatísticas de uso
- [ ] Favoritos
- [ ] Personalização avançada de templates

### PWA (❌ Pendente)
- [ ] Service worker
- [ ] Modo offline
- [ ] Notificações
- [ ] Sincronização

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

## 🛠️ Tecnologias

- React 18
- TypeScript 4
- Material-UI 5
- React Router 6
- DOMPurify
- libphonenumber-js
- QRCode.react
- React Avatar Editor

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

```bash
# Gere a build de produção
npm run build

# Instale o serve localmente (se ainda não estiver instalado)
npm install serve --save-dev

# Sirva localmente (porta 3000)
npx serve -s build -l 3000 --no-clipboard
```

Após executar estes comandos, o servidor estará rodando em:
- Local: http://localhost:3000
- Network: http://[seu-ip]:3000

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📬 Contato

Para sugestões, dúvidas ou contribuições, por favor abra uma issue no repositório.
