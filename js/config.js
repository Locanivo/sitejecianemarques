/* ==========================================================================
   CONFIGURAÇÃO CENTRAL DO SITE
   Edite apenas este arquivo para atualizar contato, mensagens do WhatsApp,
   portfólio e depoimentos. Nenhuma outra alteração de código é necessária.
   ========================================================================== */

window.SITE = {
  contact: {
    // Somente números, com DDI + DDD. Ex.: "5538999999999".
    // Enquanto estiver vazio, os botões de WhatsApp levam à seção de contato.
    whatsapp: "5538997449017",
    // Ex.: "https://instagram.com/usuario" — campos vazios não aparecem no rodapé.
    instagram: "",
    instagramHandle: "",
    email: "",
    // Ex.: "CAU A000000-0" — exibir somente após verificação.
    cau: "CAU nº 00A2710765",
    city: "Montes Claros — MG",
    address: "Rua Rio Verde, 631 — Planalto, Montes Claros — MG, CEP 39404-671",
    maps: "https://www.google.com/maps/search/?api=1&query=Rua%20Rio%20Verde%20631%20Planalto%20Montes%20Claros%20MG",
    hours: "Segunda a sexta: 8h às 18h · Sábado: 8h às 14h · Domingo: fechado",
  },

  // Retrato profissional da arquiteta (seção Sobre). Ex.: "img/jeciane.jpg".
  aboutPhoto: "img/jeciane-marques-retrato-1600.webp",

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

  /* Fotografias enviadas pelo cliente. Títulos descritivos, não nomes oficiais das obras. */
  /* Cada imagem existe em dois tamanhos: nome-800.webp e nome-1600.webp.
     Informe sempre o caminho -1600; o site escolhe o tamanho adequado.
     Originais sem compressão ficam em img/originais. */
  projects: [
    { id: "residencia-fachada", title: "Fachada residencial", category: "Arquitetura Residencial", illustrative: false, cover: "img/residencia-fachada-1600.webp", shape: "tall", description: "", gallery: ["img/residencia-fachada-1600.webp"] },
    { id: "estar-jantar-integrados", title: "Estar e jantar integrados", category: "Design de Interiores", illustrative: false, cover: "img/estar-jantar-integrados-1600.webp", shape: "wide", description: "", gallery: ["img/estar-jantar-integrados-1600.webp"] },
    { id: "jardim-residencial", title: "Jardim residencial", category: "Arquitetura Residencial", illustrative: false, cover: "img/jardim-residencial-1600.webp", shape: "tall", description: "", gallery: ["img/jardim-residencial-1600.webp"] },
    { id: "suite-casal", title: "Suíte de casal", category: "Design de Interiores", illustrative: false, cover: "img/suite-casal-1600.webp", shape: "square", description: "", gallery: ["img/suite-casal-1600.webp"] },
    { id: "espaco-gourmet-mesa", title: "Espaço gourmet", category: "Design de Interiores", illustrative: false, cover: "img/espaco-gourmet-mesa-1600.webp", shape: "wide", description: "", gallery: ["img/espaco-gourmet-mesa-1600.webp"] },
    { id: "closet-marcenaria", title: "Closet e marcenaria", category: "Design de Interiores", illustrative: false, cover: "img/closet-marcenaria-1600.webp", shape: "tall", description: "", gallery: ["img/closet-marcenaria-1600.webp"] },
    { id: "consultorio", title: "Consultório", category: "Arquitetura Comercial", illustrative: false, cover: "img/consultorio-1600.webp", shape: "wide", description: "", gallery: ["img/consultorio-1600.webp"] },
    { id: "area-gourmet-churrasqueira", title: "Área gourmet", category: "Design de Interiores", illustrative: false, cover: "img/area-gourmet-churrasqueira-1600.webp", shape: "square", description: "", gallery: ["img/area-gourmet-churrasqueira-1600.webp"] },
    { id: "banheiro-social", title: "Banheiro", category: "Design de Interiores", illustrative: false, cover: "img/banheiro-social-1600.webp", shape: "wide", description: "", gallery: ["img/banheiro-social-1600.webp"] }
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
  // Imagens locais "-1600.webp" têm versão "-800.webp" para telas menores.
  if (/-1600\.webp$/.test(url)) return width <= 900 ? url.replace(/-1600\.webp$/, "-800.webp") : url;
  if (url.indexOf("images.unsplash.com") === -1) return url;
  return url + "?auto=format&fit=crop&q=72&w=" + width;
};
