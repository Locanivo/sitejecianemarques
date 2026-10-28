/* ==========================================================================
   CONFIGURAÇÃO CENTRAL DO SITE
   Edite apenas este arquivo para atualizar contato, mensagens do WhatsApp,
   portfólio e depoimentos. Nenhuma outra alteração de código é necessária.
   ========================================================================== */

window.SITE = {
  contact: {
    // Somente números, com DDI + DDD. Ex.: "5538999999999".
    // Enquanto estiver vazio, os botões de WhatsApp levam à seção de contato.
    whatsapp: "",
    // Ex.: "https://instagram.com/usuario" — campos vazios não aparecem no rodapé.
    instagram: "",
    instagramHandle: "",
    email: "",
    // Ex.: "CAU A000000-0" — exibir somente após verificação.
    cau: "",
    city: "Montes Claros — MG",
  },

  // Retrato profissional da arquiteta (seção Sobre). Ex.: "img/jeciane.jpg".
  aboutPhoto: "",

  // Mensagens pré-preenchidas por contexto (data-wa="chave" no HTML).
  messages: {
    geral: "Olá, Jeciane! Conheci seu trabalho pelo site e gostaria de conversar sobre um projeto.",
    residencial: "Olá, Jeciane! Gostaria de informações sobre um projeto residencial.",
    interiores: "Olá, Jeciane! Tenho interesse em um projeto de interiores.",
    comercial: "Olá, Jeciane! Gostaria de informações sobre um projeto comercial.",
    reforma: "Olá, Jeciane! Estou planejando uma reforma e gostaria de conversar sobre as possibilidades.",
    portfolio: "Olá, Jeciane! Vi os projetos no site e gostaria de conversar sobre um projeto.",
    duvidas: "Olá, Jeciane! Tenho algumas dúvidas sobre como funciona o trabalho do escritório.",
  },

  /* PORTFÓLIO
     As entradas abaixo são PROVISÓRIAS e usam imagens ilustrativas de banco
     de imagens (Unsplash). Substitua por projetos reais: título, categoria,
     descrição e fotos. Mantenha `illustrative: true` até a troca. */
  projects: [
    {
      id: "ilustrativo-01",
      title: "Projeto ilustrativo 01",
      category: "Arquitetura Residencial",
      illustrative: true,
      cover: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      shape: "tall",
      description: "",
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
      ],
    },
    {
      id: "ilustrativo-02",
      title: "Projeto ilustrativo 02",
      category: "Design de Interiores",
      illustrative: true,
      cover: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
      shape: "wide",
      description: "",
      gallery: [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
      ],
    },
    {
      id: "ilustrativo-03",
      title: "Projeto ilustrativo 03",
      category: "Arquitetura Residencial",
      illustrative: true,
      cover: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
      shape: "square",
      description: "",
      gallery: [
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136",
      ],
    },
    {
      id: "ilustrativo-04",
      title: "Projeto ilustrativo 04",
      category: "Arquitetura Comercial",
      illustrative: true,
      cover: "https://images.unsplash.com/photo-1497366216548-37526070297c",
      shape: "square",
      description: "",
      gallery: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c",
      ],
    },
    {
      id: "ilustrativo-05",
      title: "Projeto ilustrativo 05",
      category: "Reformas e Renovação",
      illustrative: true,
      cover: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
      shape: "wide",
      description: "",
      gallery: [
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
        "https://images.unsplash.com/photo-1615873968403-89e068629265",
      ],
    },
  ],

  /* DEPOIMENTOS
     Inclua apenas depoimentos reais, autorizados pelos clientes.
     Formato: { name: "Nome", project: "Projeto residencial", text: "..." }
     Enquanto a lista estiver vazia, a seção mostra uma mensagem neutra. */
  testimonials: [],
};

/* Utilitários compartilhados entre as páginas */
window.SITE.waLink = function (key) {
  var number = (window.SITE.contact.whatsapp || "").replace(/\D/g, "");
  if (!number) return null;
  var msg = window.SITE.messages[key] || window.SITE.messages.geral;
  return "https://wa.me/" + number + "?text=" + encodeURIComponent(msg);
};

window.SITE.img = function (url, width) {
  // Parâmetros de otimização do Unsplash; URLs locais passam sem alteração.
  if (url.indexOf("images.unsplash.com") === -1) return url;
  return url + "?auto=format&fit=crop&q=72&w=" + width;
};
