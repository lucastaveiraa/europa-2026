// Per-point-of-interest popup on roteiro.html — click the numbered badge
// next to an activity to see what the place actually is, without leaving
// the page.
function linkBlock(label, url) {
  const shown = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return { label, text: `<a class="link-underline" href="${url}" target="_blank" rel="noopener noreferrer">${shown} ›</a>` };
}

const AMS_ACCENT = "#33493d";
const ANR_ACCENT = "#7a5c1a";
const GNT_ACCENT = "#7c3a2a";
const BGE_ACCENT = "#6b4a35";
const BRU_ACCENT = "#3b4a63";
const PAR_ACCENT = "#7c3a2a";

const poiDetailsData = {
  rijksmuseum: {
    title: "Rijksmuseum",
    dates: "Amsterdã",
    accent: AMS_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Rijksmuseum+Amsterdam",
    blocks: [
      { label: "Sobre", text: "Museu nacional holandês, com o maior acervo de arte e história dos Países Baixos. O destaque é a Galeria de Honra, que reúne os grandes nomes do Século de Ouro holandês (séc. XVII) — período em que o país virou potência marítima e comercial, e a pintura floresceu junto com essa riqueza. Lá estão Johannes Vermeer (mestre da luz e das cenas domésticas silenciosas, como \"A Leiteira\") e Rembrandt van Rijn (retratista e mestre do claro-escuro, autor de \"A Ronda Noturna\", sua obra mais famosa). Reserve 2h30-3h. Ingresso com horário marcado recomendado — compra antecipada evita fila." },
      linkBlock("Site oficial", "https://www.rijksmuseum.nl/en"),
    ],
  },
  vondelpark: {
    title: "Vondelpark",
    dates: "Amsterdã",
    accent: AMS_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Vondelpark+Amsterdam",
    blocks: [
      { label: "Sobre", text: "Maior parque de Amsterdã, estilo inglês, cheio de ciclistas e locais. Bom para caminhada leve, corrida ou só sentar num café ao ar livre. Dentro do parque fica o De Bakkerswinkel, padaria-café tradicional holandesa conhecida por pães artesanais, tortas e brunch — boa parada no meio da caminhada." },
      linkBlock("Site do De Bakkerswinkel", "https://www.debakkerswinkel.nl/"),
    ],
  },
  "anne-frank-house": {
    title: "Casa de Anne Frank",
    dates: "Amsterdã",
    accent: AMS_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Anne+Frank+House+Amsterdam",
    blocks: [
      { label: "Sobre", text: "Prédio onde a família se escondeu durante a ocupação nazista. Visita de ~1h, emocionalmente intensa. Ingressos vendem esgotado com semanas de antecedência — comprar assim que abrir a janela oficial." },
      linkBlock("Site oficial", "https://www.annefrank.org/en/"),
    ],
  },
  jordaan: {
    title: "Jordaan",
    dates: "Amsterdã",
    accent: AMS_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Jordaan+Amsterdam",
    blocks: [
      { label: "Sobre", text: "Bairro de canais estreitos, casas do século XVII e lojinhas independentes. Sem ponto turístico único — o programa é perder-se a pé sem pressa." },
    ],
  },
  "dam-square": {
    title: "Praça Dam",
    dates: "Amsterdã",
    accent: AMS_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Dam+Square+Amsterdam",
    blocks: [
      { label: "Sobre", text: "Praça central de Amsterdã, com o Palácio Real e o Monumento Nacional. Primeira parada de uma sequência a pé que segue até o Begijnhof e o mercado de flores." },
    ],
  },
  begijnhof: {
    title: "Begijnhof",
    dates: "Amsterdã",
    accent: AMS_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Begijnhof+Amsterdam",
    blocks: [
      { label: "Sobre", text: "Pátio histórico escondido em pleno centro, entrada discreta e fácil de passar direto sem ver — um dos cantos mais silenciosos da cidade." },
    ],
  },
  bloemenmarkt: {
    title: "Mercado das Flores (Bloemenmarkt)",
    dates: "Amsterdã",
    accent: AMS_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Bloemenmarkt+Amsterdam",
    blocks: [
      { label: "Sobre", text: "Mercado flutuante de flores sobre o canal. Bom lugar para levar bulbos de tulipa como lembrança." },
    ],
  },
  "red-light-district": {
    title: "Red Light District",
    dates: "Amsterdã",
    accent: AMS_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Red+Light+District+Amsterdam",
    blocks: [
      { label: "Sobre", text: "Bairro histórico de canais com a zona de luz vermelha. Visita de curiosidade e caminhada noturna, sem necessidade de parar em lugar específico." },
    ],
  },
  "van-gogh-museum": {
    title: "Van Gogh Museum",
    dates: "Amsterdã",
    accent: AMS_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Van+Gogh+Museum+Amsterdam",
    blocks: [
      { label: "Sobre", text: "Maior coleção do mundo do artista, em ordem cronológica — dá pra ver a evolução do estilo dele. Reserve 2h. Ingresso com horário marcado obrigatório." },
      linkBlock("Site oficial", "https://www.vangoghmuseum.nl/en"),
    ],
  },
  "heineken-experience": {
    title: "Heineken Experience",
    dates: "Amsterdã",
    accent: AMS_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Heineken+Experience+Amsterdam",
    blocks: [
      { label: "Sobre", text: "Antiga fábrica da cervejaria, hoje experiência interativa com direito a duas cervejas incluídas. ~1h30 — bom programa de tarde mais leve depois do Van Gogh." },
      linkBlock("Site oficial", "https://www.heinekenexperience.com/"),
    ],
  },
  "grote-markt": {
    title: "Grote Markt",
    dates: "Antuérpia",
    accent: ANR_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Grote+Markt+Antwerp",
    blocks: [
      { label: "Sobre", text: "Praça principal de Antuérpia, cercada por casas de guildas do século XVI e a prefeitura (Stadhuis). Ponto de partida natural pra qualquer volta pelo centro." },
    ],
  },
  "cathedral-our-lady": {
    title: "Catedral de Nossa Senhora",
    dates: "Antuérpia",
    accent: ANR_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Cathedral+of+Our+Lady+Antwerp",
    blocks: [
      { label: "Sobre", text: "Maior catedral gótica do Benelux, com obras de Rubens no altar. Vale 20-30 min de visita rápida." },
      linkBlock("Site oficial", "https://www.dekathedraal.be/en"),
    ],
  },
  vlaeykensgang: {
    title: "Vlaeykensgang",
    dates: "Antuérpia",
    accent: ANR_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Vlaeykensgang+Antwerp",
    blocks: [
      { label: "Sobre", text: "Beco medieval escondido entre prédios, fácil de passar direto sem ver a entrada — um dos cantos mais fotogênicos da cidade." },
    ],
  },
  "het-steen": {
    title: "Het Steen",
    dates: "Antuérpia",
    accent: ANR_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Het+Steen+Antwerp",
    blocks: [
      { label: "Sobre", text: "Fortificação mais antiga de Antuérpia, às margens do rio Escalda. Entrada gratuita, boa vista do rio e do porto — encaixa bem antes de pegar o trem." },
    ],
  },
  "graslei-korenlei": {
    title: "Graslei & Korenlei",
    dates: "Ghent",
    accent: GNT_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Graslei+Korenlei+Ghent",
    blocks: [
      { label: "Sobre", text: "As duas margens do canal mais fotografadas da Bélgica, fachadas medievais iluminadas à noite. Melhor horário: pôr do sol até a noite fechada, quando a iluminação liga." },
    ],
  },
  "vrijdagmarkt-ghent": {
    title: "Vrijdagmarkt",
    dates: "Ghent",
    accent: GNT_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Vrijdagmarkt+Ghent",
    blocks: [
      { label: "Sobre", text: "Praça histórica de Ghent, hoje cercada de bares e cafés — opção de fim de noite se ainda houver energia depois do jantar." },
    ],
  },
  "markt-bruges": {
    title: "Markt",
    dates: "Bruges",
    accent: BGE_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Markt+Bruges",
    blocks: [
      { label: "Sobre", text: "Praça central de Bruges, ladeada por casas coloridas em degrau e o Belfort ao fundo. Ponto de referência pra tudo o resto do dia." },
    ],
  },
  belfort: {
    title: "Belfort",
    dates: "Bruges",
    accent: BGE_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Belfort+Bruges",
    blocks: [
      { label: "Sobre", text: "Torre sineira de 83m, 366 degraus até o topo — vista panorâmica de toda Bruges e arredores. Sem elevador; ida e volta leva cerca de 30-40 min." },
      linkBlock("Site oficial", "https://www.museabrugge.be/en/musea/belfort"),
    ],
  },
  burg: {
    title: "Burg + Basílica do Sangue Sagrado",
    dates: "Bruges",
    accent: BGE_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Burg+Bruges",
    blocks: [
      { label: "Sobre", text: "Praça vizinha ao Markt, mais intimista. A Basílica do Sangue Sagrado guarda uma relíquia que dá nome ao local — visita rápida e gratuita (ou doação simbólica)." },
      linkBlock("Site oficial", "https://www.holyblood.com/"),
    ],
  },
  rozenhoedkaai: {
    title: "Rozenhoedkaai",
    dates: "Bruges",
    accent: BGE_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Rozenhoedkaai+Bruges",
    blocks: [
      { label: "Sobre", text: "Ângulo mais clássico de cartão-postal de Bruges. Os barcos do passeio pelos canais saem dali mesmo, ~30 min de percurso — boa forma de ver a cidade de outro ângulo sem cansar as pernas." },
    ],
  },
  "grand-place": {
    title: "Grand Place",
    dates: "Bruxelas",
    accent: BRU_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Grand+Place+Brussels",
    blocks: [
      { label: "Sobre", text: "Praça central de Bruxelas, Patrimônio Mundial da UNESCO — prédios das guildas com fachadas douradas. O ponto que resume a cidade em uma foto." },
      linkBlock("Mais informações", "https://visit.brussels/en/place/Grand-Place"),
    ],
  },
  "galeries-royales": {
    title: "Galeries Royales Saint-Hubert",
    dates: "Bruxelas",
    accent: BRU_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Galeries+Royales+Saint-Hubert+Brussels",
    blocks: [
      { label: "Sobre", text: "Uma das primeiras galerias comerciais cobertas da Europa (1847), arquitetura elegante. Boas lojas de chocolate belga pra comprar de lembrança no caminho." },
      linkBlock("Site oficial", "https://www.galeries.be/en"),
    ],
  },
  "manneken-pis": {
    title: "Manneken Pis",
    dates: "Bruxelas",
    accent: BRU_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Manneken+Pis+Brussels",
    blocks: [
      { label: "Sobre", text: "A estátua mais famosa (e menor do que a fama sugere) de Bruxelas — parada rápida de foto, sem necessidade de ficar mais que 5 minutos." },
      linkBlock("Mais informações", "https://visit.brussels/en/place/Manneken-Pis"),
    ],
  },
  louvre: {
    title: "Louvre",
    dates: "Paris",
    accent: PAR_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Louvre+Paris",
    blocks: [
      { label: "Sobre", text: "Maior museu do mundo. Reservar dia inteiro ou manhã completa; ingresso com horário obrigatório." },
      linkBlock("Site oficial", "https://www.louvre.fr/en"),
    ],
  },
  "musee-dorsay": {
    title: "Musée d'Orsay",
    dates: "Paris",
    accent: PAR_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Musee+d%27Orsay+Paris",
    blocks: [
      { label: "Sobre", text: "Acervo mais compacto, focado em impressionistas — 2-3h bastam. Fazer em dia separado do Louvre evita fadiga de museu." },
      linkBlock("Site oficial", "https://www.musee-orsay.fr/en"),
    ],
  },
  "eiffel-tower": {
    title: "Torre Eiffel",
    dates: "Paris",
    accent: PAR_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Eiffel+Tower+Paris",
    blocks: [
      { label: "Sobre", text: "Torre símbolo de Paris. Subir é opcional e exige ingresso com antecedência." },
      linkBlock("Site oficial", "https://www.toureiffel.paris/en"),
    ],
  },
  trocadero: {
    title: "Trocadéro",
    dates: "Paris",
    accent: PAR_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Trocadero+Paris",
    blocks: [
      { label: "Sobre", text: "Mirante clássico pra fotografar a Torre Eiffel inteira, especialmente ao entardecer, quando as luzes acendem de hora em hora." },
    ],
  },
  montmartre: {
    title: "Montmartre",
    dates: "Paris",
    accent: PAR_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Montmartre+Paris",
    blocks: [
      { label: "Sobre", text: "Bairro de ladeiras, ateliês de artistas na Place du Tertre. Reserve a tarde toda — é pra caminhar sem pressa." },
    ],
  },
  "sacre-coeur": {
    title: "Sacré-Cœur",
    dates: "Paris",
    accent: PAR_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Sacre-Coeur+Paris",
    blocks: [
      { label: "Sobre", text: "Basílica no topo da colina de Montmartre, com vista aberta da cidade." },
      linkBlock("Site oficial", "https://www.sacre-coeur-montmartre.com/"),
    ],
  },
  "le-marais": {
    title: "Le Marais",
    dates: "Paris",
    accent: PAR_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Le+Marais+Paris",
    blocks: [
      { label: "Sobre", text: "Bairro histórico judeu, hoje também polo LGBTQ+ e de moda independente — boas opções de falafel, brechós e cafés." },
    ],
  },
  versailles: {
    title: "Versalhes",
    dates: "Paris",
    accent: PAR_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Palace+of+Versailles+Paris",
    blocks: [
      { label: "Sobre", text: "Meio dia de day trip (30 min de RER a partir de Paris). Priorizar os Jardins + Galeria dos Espelhos; o Petit Trianon fica mais distante e consome tempo extra." },
      linkBlock("Site oficial", "https://en.chateauversailles.fr/"),
    ],
  },
  "roland-garros": {
    title: "Roland Garros",
    dates: "Paris",
    accent: PAR_ACCENT,
    photoUrl: "https://www.google.com/search?tbm=isch&q=Roland+Garros+Paris",
    blocks: [
      { label: "Sobre", text: "Visita guiada ao complexo e museu do torneio — bom programa pra quem acompanha tênis, fora de temporada de Grand Slam (outubro está fora do calendário do torneio)." },
      linkBlock("Site oficial", "https://www.rolandgarros.com/en-us/museum"),
    ],
  },
};

(function () {
  const modal = document.getElementById("dayModal");
  const body = document.getElementById("dayModalBody");
  const closeBtn = document.getElementById("dayModalClose");
  if (!modal) return;

  function openModal(id) {
    const data = poiDetailsData[id];
    if (!data) return;

    modal.querySelector(".day-modal-inner").style.setProperty("--accent", data.accent);
    const photoLink = data.photoUrl
      ? ` <a class="poi-photo-link" href="${data.photoUrl}" target="_blank" rel="noopener noreferrer" aria-label="Ver fotos de ${data.title}"><svg class="ic" aria-hidden="true"><use href="#ic-camera"/></svg></a>`
      : "";
    body.innerHTML = `
      <h2 class="day-modal-title">${data.title}${photoLink}</h2>
      <p class="day-modal-dates">${data.dates}</p>
      ${data.blocks
        .map(
          (block) => `
        <div class="day-modal-block">
          <h3>${block.label}</h3>
          <p>${block.text}</p>
        </div>`
        )
        .join("")}
    `;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".poi-num[data-poi], .poi-info-btn[data-poi]").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.dataset.poi));
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
})();
