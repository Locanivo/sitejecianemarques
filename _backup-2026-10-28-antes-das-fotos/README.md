# Jeciane Marques | Arquitetura & Interiores

Landing page institucional em HTML, CSS e JavaScript puros (sem build).

## Visualizar localmente

```bash
npx -y http-server C:/jeciane-marques -p 3200 -c-1
```

Abra http://localhost:3200.

## Estrutura

- `index.html`: página principal (9 seções e rodapé)
- `projeto.html`: lista de projetos; com `?id=...` mostra o detalhe de um projeto
- `privacidade.html`: política de privacidade (texto-base, revisar antes de publicar)
- `css/style.css`: estilos mobile-first (breakpoints em 720px e 1024px)
- `js/config.js`: **tudo o que muda fica aqui**
- `js/main.js`: menu, WhatsApp, revelação na rolagem, FAQ, portfólio
- `js/projeto.js`: página de detalhe

## Pendências (preencher em `js/config.js`)

| Campo | Situação |
| --- | --- |
| `contact.whatsapp` | **vazio**. Sem ele, os botões levam à seção de contato e um aviso aparece abaixo do botão principal |
| `contact.instagram`, `contact.email` | vazios; aparecem no rodapé quando preenchidos |
| `contact.cau` | vazio; exibir somente após verificação |
| `aboutPhoto` | retrato da arquiteta (hoje há um espaço reservado) |
| `projects` | 5 projetos **provisórios** com imagens ilustrativas do Unsplash, marcados como tal |
| `testimonials` | vazio; a seção mostra apenas título e texto até haver depoimentos reais |

As fotos de serviços e do hero em `index.html` também são ilustrativas (Unsplash) e trazem a etiqueta "Imagem ilustrativa". Ao trocar por fotos reais, remova as etiquetas `<figcaption class="illustrative-tag">`.

## Animações

Respeitam `prefers-reduced-motion`. Se o Windows estiver com "Mostrar animações" desligado, o site aparece sem animações (comportamento esperado).
