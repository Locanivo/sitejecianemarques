/* Jeciane Marques — interações do site (sem dependências) */
(function () {
  "use strict";

  var SITE = window.SITE;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var escapeHtml = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  /* WhatsApp -------------------------------------------------------------
     Cada link com data-wa="chave" recebe a URL wa.me com a mensagem do
     contexto. Sem número configurado, o link leva à seção de contato. */
  function setupWhatsApp() {
    var configured = !!SITE.waLink("geral");
    $$("[data-wa]").forEach(function (el) {
      var url = SITE.waLink(el.getAttribute("data-wa"));
      if (url) {
        el.href = url;
        el.target = "_blank";
        el.rel = "noopener";
      } else if (!$("#contato")) {
        el.href = "index.html#contato";
      }
    });

    var pending = $("[data-wa-pending]");
    if (!configured) {
      if (pending) pending.hidden = false;
      var primary = $("[data-wa-primary]");
      if (primary) primary.setAttribute("aria-describedby", "wa-pending");
      if (pending) pending.id = "wa-pending";
      console.warn("[site] Número de WhatsApp não configurado em js/config.js (SITE.contact.whatsapp).");
    }
  }

  /* Rodapé: exibe apenas informações fornecidas -------------------------- */
  function setupFooter() {
    var c = SITE.contact;
    var year = $("[data-year]");
    if (year) year.textContent = new Date().getFullYear();

    var wa = $("[data-footer-wa]");
    if (wa && c.whatsapp) wa.hidden = false;

    var ig = $("[data-footer-instagram]");
    if (ig && c.instagram) {
      ig.hidden = false;
      $("a", ig).href = c.instagram;
      if (c.instagramHandle) $("a", ig).textContent = "Instagram · " + c.instagramHandle;
    }

    var mail = $("[data-footer-email]");
    if (mail && c.email) {
      mail.hidden = false;
      $("a", mail).href = "mailto:" + c.email;
      $("a", mail).textContent = c.email;
    }

    var cau = $("[data-cau]");
    if (cau && c.cau) { cau.hidden = false; cau.textContent = c.cau; }
  }

  /* Cabeçalho: transparente no hero, creme na rolagem --------------------- */
  function setupHeader() {
    var header = $("[data-header]");
    if (!header) return;
    var solidFromStart = header.hasAttribute("data-solid");
    var onScroll = function () {
      header.classList.toggle("is-scrolled", solidFromStart || window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var toggle = $("[data-menu-toggle]");
    if (!toggle) return;
    var label = $(".sr-only", toggle);
    var setOpen = function (open) {
      header.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      label.textContent = open ? "Fechar menu" : "Abrir menu";
    };
    toggle.addEventListener("click", function () {
      setOpen(!header.classList.contains("is-open"));
    });
    $$("[data-nav] a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia("(min-width: 1024px)").addEventListener("change", function (e) {
      if (e.matches) setOpen(false);
    });
  }

  /* Portfólio --------------------------------------------------------------- */
  function projectCard(p, i) {
    var shape = p.shape || "square";
    var widths = { tall: 900, wide: 1400, square: 1000 };
    var w = widths[shape] || 1000;
    return (
      '<a class="project project--' + shape + '" href="projeto.html?id=' + encodeURIComponent(p.id) + '">' +
        '<figure class="project__media reveal-img">' +
          '<img src="' + SITE.img(p.cover, w) + '" srcset="' + SITE.img(p.cover, Math.round(w / 2)) + " " + Math.round(w / 2) + "w, " + SITE.img(p.cover, w) + " " + w + 'w" ' +
          'sizes="(min-width: 1024px) 50vw, (min-width: 720px) 50vw, 100vw" ' +
          'alt="' + escapeHtml(p.title + " — " + p.category) + '" loading="lazy" decoding="async">' +
          (p.illustrative ? '<figcaption class="illustrative-tag">Imagem ilustrativa</figcaption>' : "") +
        "</figure>" +
        '<div class="project__meta">' +
          '<h3 class="project__title">' + escapeHtml(p.title) + "</h3>" +
          '<span class="project__cat">' + escapeHtml(p.category) + "</span>" +
        "</div>" +
      "</a>"
    );
  }

  function setupGallery() {
    var gallery = $("[data-gallery]");
    if (!gallery) return;
    var limit = parseInt(gallery.getAttribute("data-limit") || "0", 10);
    var list = limit ? SITE.projects.slice(0, limit) : SITE.projects;
    gallery.innerHTML = list.map(projectCard).join("");

    var note = $("[data-illustrative-note]");
    if (note) note.hidden = !SITE.projects.some(function (p) { return p.illustrative; });
  }

  /* Retrato da arquiteta --------------------------------------------------- */
  function setupAboutPhoto() {
    var fig = $("[data-about-photo]");
    if (!fig || !SITE.aboutPhoto) return;
    fig.innerHTML = '<img src="' + escapeHtml(SITE.aboutPhoto) + '" alt="Retrato da arquiteta Jeciane Marques" loading="lazy" decoding="async">';
  }

  /* Depoimentos: somente reais ------------------------------------------- */
  function setupTestimonials() {
    var box = $("[data-testimonials]");
    if (!box || !SITE.testimonials.length) return;
    box.innerHTML = SITE.testimonials.map(function (t) {
      return (
        '<figure class="quote reveal">' +
          '<blockquote class="quote__text">' + escapeHtml(t.text) + "</blockquote>" +
          '<figcaption class="quote__author">' + escapeHtml(t.name) +
            '<span class="quote__project">' + escapeHtml(t.project || "") + "</span>" +
          "</figcaption>" +
        "</figure>"
      );
    }).join("");
    box.hidden = false;
  }

  /* FAQ: acordeão --------------------------------------------------------- */
  function setupAccordion() {
    $$("[data-accordion] .accordion__trigger").forEach(function (btn, i) {
      var panel = btn.parentElement.nextElementSibling;
      var id = "faq-panel-" + i;
      panel.id = id;
      panel.setAttribute("role", "region");
      btn.setAttribute("aria-controls", id);
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        btn.closest(".accordion__item").classList.toggle("is-open", !open);
      });
    });
  }

  /* Revelação na rolagem -------------------------------------------------- */
  function setupReveal() {
    var targets = $$(".reveal, .reveal-img");
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    targets.forEach(function (el) {
      // Escalona elementos irmãos para uma entrada mais fluida
      var siblings = $$(".reveal", el.parentElement);
      var idx = siblings.indexOf(el);
      if (idx > 0) el.style.transitionDelay = Math.min(idx, 5) * 80 + "ms";
      io.observe(el);
    });
  }

  /* Botão flutuante: aparece após o hero e some na seção de contato ------- */
  function setupFloat() {
    var btn = $("[data-wa-float]");
    if (!btn) return;
    var hero = $(".hero");
    var contact = $("#contato");
    var pastHero = !hero, atContact = false;
    var update = function () { btn.classList.toggle("is-visible", pastHero && !atContact); };
    if (!("IntersectionObserver" in window)) { btn.classList.add("is-visible"); return; }
    if (hero) {
      new IntersectionObserver(function (e) { pastHero = !e[0].isIntersecting; update(); }, { threshold: 0.15 }).observe(hero);
    }
    if (contact) {
      new IntersectionObserver(function (e) { atContact = e[0].isIntersecting; update(); }, { threshold: 0.1 }).observe(contact);
    }
    update();
  }

  setupWhatsApp();
  setupFooter();
  setupHeader();
  setupGallery();
  setupAboutPhoto();
  setupTestimonials();
  setupAccordion();
  setupReveal();
  setupFloat();

  // Exposto para a página de projeto reutilizar o mesmo card
  window.SITE.projectCard = projectCard;
})();
