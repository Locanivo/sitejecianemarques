/* Página de projeto: com ?id=..., mostra o detalhe; sem id, a lista completa. */
(function () {
  "use strict";

  var SITE = window.SITE;
  var id = new URLSearchParams(window.location.search).get("id");
  if (!id) return;

  var index = SITE.projects.findIndex(function (p) { return p.id === id; });
  var project = SITE.projects[index];
  if (!project) return;

  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var next = SITE.projects[(index + 1) % SITE.projects.length];
  var tag = project.illustrative ? '<figcaption class="illustrative-tag">Imagem ilustrativa</figcaption>' : "";

  var images = project.gallery.map(function (src, i) {
    return (
      '<figure class="detail__img reveal-img">' +
        '<img src="' + SITE.img(src, 1600) + '" srcset="' + SITE.img(src, 800) + " 800w, " + SITE.img(src, 1600) + ' 1600w" ' +
        'sizes="(min-width: 1024px) 80vw, 100vw" alt="' + esc(project.title) + " — imagem " + (i + 1) + '" ' +
        (i === 0 ? 'fetchpriority="high"' : 'loading="lazy"') + ' decoding="async">' + tag +
      "</figure>"
    );
  }).join("");

  var detail = document.querySelector("[data-project-detail]");
  detail.innerHTML =
    '<div class="container">' +
      '<a class="back-link" href="projeto.html">Todos os projetos</a>' +
      '<header class="detail__head">' +
        '<p class="eyebrow reveal">' + esc(project.category) + "</p>" +
        '<h1 class="title reveal">' + esc(project.title) + "</h1>" +
        (project.description ? '<p class="section-head__sub reveal">' + esc(project.description) + "</p>" : "") +
        (project.illustrative ? '<p class="portfolio__note">Projeto provisório com imagens ilustrativas. As informações reais serão publicadas após a substituição.</p>' : "") +
      "</header>" +
      '<div class="detail__gallery">' + images + "</div>" +
      (next && next.id !== project.id
        ? '<a class="detail__next" href="projeto.html?id=' + encodeURIComponent(next.id) + '"><span>Próximo projeto</span>' + esc(next.title) + "</a>"
        : "") +
    "</div>";

  detail.hidden = false;
  document.querySelector("[data-project-list]").remove();
  document.title = project.title + " | Jeciane Marques — Arquitetura & Interiores";
})();
