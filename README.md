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

### SEO e Analytics (🔄 Em Andamento)
- ✅ Meta tags otimizadas
- ✅ Schema.org implementado
- ✅ Sitemap.xml criado
- ✅ Robots.txt otimizado
- ✅ Integração com Google Analytics 4
- ✅ Rastreamento de eventos principais
- [ ] Monitoramento de erros com Sentry
- [ ] Relatórios personalizados no GA4
- [ ] Otimização de Core Web Vitals
- [ ] Implementação de Rich Snippets adicionais

### Funcionalidades (🔄 Em Andamento)
- ✅ Templates organizados por categoria
- ✅ Download do QR Code em PNG
- ✅ Compartilhamento direto
- ✅ Interface intuitiva
- ✅ Feedback visual ao selecionar templates
- ✅ Navegação rápida para templates
- [ ] Histórico de links (localStorage)
- [ ] Estatísticas de uso
- [ ] Favoritos
- [ ] Personalização avançada de templates

### PWA (❌ Pendente)
- [ ] Service worker
- [ ] Modo offline
- [ ] Notificações
- [ ] Sincronização
- [ ] Manifesto completo
- [ ] Cache estratégico
- [ ] Instalação na tela inicial

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
3. A Vercel mantém um histórico de deploys, permitindo rollback se necessário

#### Método 2: Processo Completo (Recomendado)
1. Crie uma branch de feature:
```bash
git checkout -b feature/sua-feature
```

2. Faça suas alterações e teste localmente:
```bash
npm install
npm start # teste em desenvolvimento
npm run build # teste a build
```

3. Commit e push das alterações:
```bash
git add .
git commit -m "descrição das alterações"
git push origin feature/sua-feature
```

4. Crie um Pull Request no GitHub:
   - Base: `main` <- Compare: `feature/sua-feature`
   - A Vercel criará automaticamente um deploy preview
   - Verifique o preview antes de fazer o merge

5. Após aprovação e merge:
   - A Vercel detectará o merge na `main`
   - Iniciará automaticamente um novo deploy em produção
   - Você pode acompanhar o progresso no dashboard da Vercel

#### Verificando o Deploy
1. Monitore o status do deploy no dashboard da Vercel
2. Verifique a aplicação em produção após o deploy
3. Em caso de problemas, você pode:
   - Verificar os logs na Vercel
   - Fazer rollback para a versão anterior
   - Verificar se há erros no console do navegador

### Configuração do Domínio (GoDaddy)

1. No GoDaddy, configure os nameservers para apontar para a Vercel:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

2. Na Vercel:
- Adicione o domínio nas configurações do projeto
- Aguarde a propagação DNS (pode levar até 48 horas)
- Verifique se o SSL/HTTPS está ativo

### Desenvolvimento Local

#### Requisitos
- Node.js versão LTS (recomendado v18.x)
  - Versões muito recentes do Node.js (como v22+) podem apresentar incompatibilidades com o `react-scripts`
  - Se necessário, use um gerenciador de versões como `nvm` para instalar a versão correta

#### Instalação do nvm (opcional, mas recomendado)
```bash
# macOS (usando Homebrew)
brew install nvm

# Criar diretório .nvm
mkdir ~/.nvm

# Adicione ao seu ~/.zshrc ou ~/.bash_profile:
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"

# Instale e use o Node.js v18
nvm install 18
nvm use 18
```

#### Gerando a Build de Produção

```bash
# Instale as dependências
npm install

# Gere a build de produção
npm run build
```

#### Servindo a Aplicação

Existem duas maneiras de servir a aplicação em produção:

1. Usando o script npm configurado:
```bash
npm run serve
```

2. Usando o serve diretamente:
```bash
# Instale o serve globalmente (opcional)
npm install -g serve

# OU use npx (não requer instalação)
npx serve -s build -l 3000 --no-clipboard
```

Após executar um dos comandos acima, o servidor estará rodando em:
- Local: http://localhost:3000
- Network: http://[seu-ip]:3000

#### Troubleshooting

1. Se encontrar erros com o `react-scripts` durante o build:
   - Verifique sua versão do Node.js (`node -v`)
   - Se estiver usando uma versão muito recente, mude para a v18 LTS
   - Limpe a instalação e reinstale as dependências:
     ```bash
     rm -rf node_modules package-lock.json
     npm install
     ```

2. Se o servidor não mostrar a aplicação corretamente:
   - Certifique-se de que você gerou a build primeiro (`npm run build`)
   - Verifique se está servindo o diretório `build` e não a raiz do projeto
   - Confirme que não há outro serviço rodando na porta 3000

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📬 Contato

Para sugestões, dúvidas ou contribuições, por favor abra uma issue no repositório.
