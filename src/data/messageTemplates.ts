export interface MessageTemplate {
  id: number;
  title: string;
  message: string;
  category: string;
}

export const messageTemplates: MessageTemplate[] = [
  {
    id: 1,
    title: "Boas-vindas",
    message: "👋 Olá! Obrigado por entrar em contato. Como posso ajudar você hoje?",
    category: "Saudação"
  },
  {
    id: 2,
    title: "Follow-up",
    message: "Oi! Estou acompanhando nosso último contato. Ficou alguma dúvida sobre o que conversamos?",
    category: "Acompanhamento"
  },
  {
    id: 3,
    title: "Recuperação de Leads",
    message: "🔄 Vi que você demonstrou interesse em nossos serviços. Gostaria de retomar nossa conversa?",
    category: "Vendas"
  },
  {
    id: 4,
    title: "Promoção",
    message: `🔥 *OFERTA ESPECIAL*\nAproveite nossa promoção!\nDescontos especiais por tempo limitado.\n\nResponda essa mensagem para saber mais!`,
    category: "Vendas"
  },
  {
    id: 5,
    title: "Agendamento",
    message: `📅 Gostaria de agendar um horário?\nTemos os seguintes horários disponíveis:\n- Manhã: 9h às 12h\n- Tarde: 14h às 18h\n\nQual horário seria melhor para você?`,
    category: "Agendamento"
  },
  {
    id: 6,
    title: "Pós-venda",
    message: `✨ Como foi sua experiência com nosso produto/serviço?\nSua opinião é muito importante para nós!\n\nPoderia compartilhar um breve feedback?`,
    category: "Atendimento"
  },
  {
    id: 7,
    title: "Lembrete de Reunião",
    message: `⏰ *Lembrete da nossa reunião*\n\nOlá! Não se esqueça da nossa reunião [DATA] às [HORA].\nLink da reunião: [LINK]\n\nAté lá!`,
    category: "Agendamento"
  },
  {
    id: 8,
    title: "Orçamento",
    message: `💼 *Orçamento Solicitado*\n\nPara preparar seu orçamento, preciso de algumas informações:\n1. Descrição do serviço/produto\n2. Quantidade\n3. Prazo desejado\n4. Especificações adicionais`,
    category: "Vendas"
  },
  {
    id: 9,
    title: "Suporte Técnico",
    message: `🔧 *Suporte Técnico*\n\nPara agilizar seu atendimento, por favor informe:\n1. Descrição do problema\n2. Quando começou\n3. Já tentou alguma solução?\n4. Prints da tela (se possível)`,
    category: "Suporte"
  },
  {
    id: 10,
    title: "Confirmação de Pedido",
    message: `🛍️ *Pedido Confirmado!*\n\nSeu pedido #[NÚMERO] foi confirmado!\n\nDetalhes do pedido:\n- Status: Em processamento\n- Prazo de entrega: [PRAZO]\n\nQualquer dúvida, estamos à disposição!`,
    category: "Vendas"
  },
  {
    id: 11,
    title: "Feedback",
    message: `⭐ *Sua opinião é importante!*\n\nComo você avaliaria nosso atendimento?\n\n5 ⭐ - Excelente\n4 ⭐ - Muito Bom\n3 ⭐ - Bom\n2 ⭐ - Regular\n1 ⭐ - Ruim\n\nSua avaliação nos ajuda a melhorar!`,
    category: "Atendimento"
  },
  {
    id: 12,
    title: "Boas Festas",
    message: `🎄 *Feliz Natal e Próspero Ano Novo!*\n\nQueremos agradecer por fazer parte da nossa história este ano.\nQue o próximo ano seja repleto de conquistas e realizações!\n\nBoas Festas! 🎉`,
    category: "Saudação"
  }
]; 