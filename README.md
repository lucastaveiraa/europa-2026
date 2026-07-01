# Europa 2026 — Roteiro de Viagem

Site estático com o roteiro da viagem (Amsterdã, Antuérpia, Gante, Bruges, Bruxelas e Paris — outubro de 2026), com mapa da rota e detalhamento dia a dia.

## Como colocar no ar (GitHub Pages)

1. **Crie um repositório novo no GitHub** (pode ser público), por exemplo `europa-2026`.

2. **No seu computador**, dentro desta pasta (`europa-trip-site`), rode:
   ```bash
   git init
   git add .
   git commit -m "Roteiro Europa 2026"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/europa-2026.git
   git push -u origin main
   ```

3. **Ative o GitHub Pages:**
   - No repositório, vá em **Settings → Pages**.
   - Em "Source", selecione a branch `main` e a pasta `/ (root)`.
   - Salve.

4. Em alguns minutos o site estará disponível em:
   ```
   https://SEU-USUARIO.github.io/europa-2026/
   ```

## Estrutura

```
europa-trip-site/
├── index.html      → conteúdo do roteiro
├── css/style.css    → estilo visual
├── js/script.js      → mapa interativo (Leaflet) + navegação
└── README.md
```

## Atualizando o roteiro

Todo o conteúdo (dias, atividades, textos) está direto no `index.html`, dentro de cada `<section class="city">`. Para editar:
- Cada dia é um bloco `<article class="day-card">` — copie o padrão de um dia existente para adicionar um novo.
- O bloco de **Paris** ainda está marcado como "em aberto" — quando o roteiro dia a dia for fechado, é só trocar o conteúdo desse `<article>` pelo padrão dos outros dias (um `day-card` por dia).
- As cores de cada cidade são controladas pela variável `--accent` no início de cada `<section>` (ex: `style="--accent: var(--teal)"`) — as opções disponíveis estão definidas no topo do `css/style.css`.

Depois de editar, é só commitar e dar push de novo — o GitHub Pages atualiza sozinho.
