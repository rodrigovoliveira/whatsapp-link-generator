# Configuração de Domínios - Gerador de Link WhatsApp

## Objetivo
- Domínio principal: gerarlinkzap.com.br
- Domínio secundário: geraqrzap.com.br (deve redirecionar para o principal)
- Todos os acessos devem funcionar: HTTP, HTTPS, com www e sem www

## 1. Configuração do Domínio Principal (gerarlinkzap.com.br)

### 1.1 No Registrador do Domínio
1. Acessar o painel do registrador
2. Localizar seção de Nameservers/DNS
3. Configurar os nameservers da Vercel:
   - ns1.vercel-dns.com
   - ns2.vercel-dns.com

### 1.2 Na Vercel
1. Verificar se o domínio está adicionado ao projeto
2. Habilitar gerenciamento de DNS da Vercel
3. Aguardar propagação dos nameservers (pode levar até 48h)
4. Verificar se os registros DNS foram criados automaticamente:
   - Registro A: @ -> 76.76.21.21
   - CNAME: www -> cname.vercel-dns.com
   - CAA: @ -> 0 issue "letsencrypt.org"

### 1.3 Verificação do Domínio Principal
- [ ] https://gerarlinkzap.com.br funciona
- [ ] https://www.gerarlinkzap.com.br funciona
- [ ] http://gerarlinkzap.com.br redireciona para HTTPS
- [ ] http://www.gerarlinkzap.com.br redireciona para HTTPS

## 2. Configuração do Redirecionamento (geraqrzap.com.br)

### 2.1 No GoDaddy
1. Manter os nameservers padrão do GoDaddy
2. Configurar registros DNS:
   ```
   A     @     76.76.21.21      TTL: 1 hora
   CNAME  www   cname.vercel-dns.com  TTL: 1 hora
   CAA    @     0 issue "letsencrypt.org"  TTL: 1 hora
   ```

### 2.2 Na Vercel
1. Desabilitar gerenciamento de DNS da Vercel para este domínio
2. Verificar se o vercel.json contém as regras de redirecionamento:
   ```json
   {
     "redirects": [
       {
         "source": "/:path*",
         "has": [
           {
             "type": "host",
             "value": "geraqrzap.com.br"
           }
         ],
         "destination": "https://www.gerarlinkzap.com.br/:path*",
         "permanent": true
       },
       {
         "source": "/:path*",
         "has": [
           {
             "type": "host",
             "value": "www.geraqrzap.com.br"
           }
         ],
         "destination": "https://www.gerarlinkzap.com.br/:path*",
         "permanent": true
       }
     ]
   }
   ```

### 2.3 Verificação do Redirecionamento
- [ ] http://geraqrzap.com.br redireciona para https://www.gerarlinkzap.com.br
- [ ] https://geraqrzap.com.br redireciona para https://www.gerarlinkzap.com.br
- [ ] http://www.geraqrzap.com.br redireciona para https://www.gerarlinkzap.com.br
- [ ] https://www.geraqrzap.com.br redireciona para https://www.gerarlinkzap.com.br

## 3. Testes Finais
- [ ] Todos os redirecionamentos mantêm o path original (ex: /gerar-link-whatsapp)
- [ ] SSL funciona em todos os domínios
- [ ] Não há loops de redirecionamento
- [ ] Tempo de resposta está aceitável

## Observações
- Aguardar propagação DNS após cada mudança (15-60 minutos)
- Limpar cache do navegador durante os testes
- Usar ferramentas como curl para verificar redirecionamentos 