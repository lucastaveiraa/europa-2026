// Day-detail popup on roteiro.html — click the little document icon on a
// day-card to open a bigger view with more info than fits on the card.
//
// DUMMY DATA: every block below is placeholder text. Replace the "text"
// fields with the real content (addresses, hours, ticket links, tips,
// budget, whatever) — the structure (title/dates/blocks) stays the same,
// just add or remove blocks per day as needed.
const dayDetailsData = {
  "ams-1": {
    title: "11/10 — Tarde livre",
    dates: "Amsterdã · chegada",
    accent: "#147972",
    blocks: [
      { label: "Horários", text: "Texto de exemplo — detalhar horário de chegada no hotel, check-in e janela livre até o jantar." },
      { label: "Como chegar", text: "Texto de exemplo — trajeto do aeroporto até o hotel (trem/táxi/Uber, tempo estimado)." },
      { label: "Dica", text: "Texto de exemplo — dica prática para a primeira noite (câmbio, chip, etc.)." },
    ],
  },
  "ams-2": {
    title: "12/10 — Rijksmuseum + Vondelpark",
    dates: "Amsterdã",
    accent: "#147972",
    blocks: [
      { label: "Ingressos", text: "Texto de exemplo — link e horário reservado do Rijksmuseum." },
      { label: "Endereços", text: "Texto de exemplo — endereço do museu e ponto de entrada no Vondelpark." },
      { label: "Onde comer", text: "Texto de exemplo — sugestões de restaurante em De Pijp para o jantar." },
    ],
  },
  "ams-3": {
    title: "13/10 — Anne Frank + Jordaan + Centro",
    dates: "Amsterdã",
    accent: "#147972",
    blocks: [
      { label: "Ingressos", text: "Texto de exemplo — horário reservado da Casa de Anne Frank (comprar com antecedência)." },
      { label: "Roteiro a pé", text: "Texto de exemplo — sequência de ruas do Jordaan até a Praça Dam." },
      { label: "Onde comer", text: "Texto de exemplo — opções de jantar no centro histórico." },
    ],
  },
  "ams-4": {
    title: "14/10 — Van Gogh + Heineken",
    dates: "Amsterdã",
    accent: "#147972",
    blocks: [
      { label: "Ingressos", text: "Texto de exemplo — horário reservado do Van Gogh Museum e da Heineken Experience." },
      { label: "Endereços", text: "Texto de exemplo — endereços dos dois pontos e tempo de deslocamento entre eles." },
    ],
  },
  "ams-5": {
    title: "15/10 — Rumo à Bélgica",
    dates: "Amsterdã → Antuérpia",
    accent: "#147972",
    blocks: [
      { label: "Checkout", text: "Texto de exemplo — horário limite de checkout e onde deixar a bagagem." },
      { label: "Trem", text: "Texto de exemplo — plataforma, horário exato e número do trem para Antuérpia." },
    ],
  },
  "anr-1": {
    title: "Antuérpia — centro histórico",
    dates: "15/10 · 12h — 17h",
    accent: "#8e680b",
    blocks: [
      { label: "Guarda-volumes", text: "Texto de exemplo — localização e preço do guarda-volumes na Antwerpen-Centraal." },
      { label: "Roteiro a pé", text: "Texto de exemplo — sequência sugerida entre Grote Markt, Catedral, Vlaeykensgang e Het Steen." },
      { label: "Trem", text: "Texto de exemplo — plataforma e horário do trem das 17h para Ghent." },
    ],
  },
  "gnt-1": {
    title: "Ghent — Graslei & Korenlei",
    dates: "15/10, noite · chegada",
    accent: "#c32117",
    blocks: [
      { label: "Check-in", text: "Texto de exemplo — endereço do hotel e instruções de check-in." },
      { label: "Onde comer", text: "Texto de exemplo — sugestão de restaurante perto do Graslei." },
    ],
  },
  "bge-1": {
    title: "Bruges — Markt, canais e chocolate",
    dates: "16/10 · dia inteiro",
    accent: "#7b4b33",
    blocks: [
      { label: "Ingressos", text: "Texto de exemplo — preço/horário de entrada no Belfort." },
      { label: "Passeio de barco", text: "Texto de exemplo — onde comprar e horários do passeio pelos canais." },
      { label: "Chocolaterias", text: "Texto de exemplo — 2-3 endereços recomendados." },
    ],
  },
  "bru-1": {
    title: "Bruxelas — Grand Place e centro histórico",
    dates: "17/10 · manhã — tarde",
    accent: "#3d5a80",
    blocks: [
      { label: "Guarda-volumes", text: "Texto de exemplo — localização do locker na Bruxelas-Midi." },
      { label: "Trem", text: "Texto de exemplo — horário e plataforma do trem para Paris ao fim da tarde." },
    ],
  },
  "par-1": {
    title: "Paris — destaques confirmados",
    dates: "18 — 23/10 · em aberto",
    accent: "#c32117",
    blocks: [
      { label: "Status", text: "Texto de exemplo — roteiro dia a dia ainda em planejamento; esta lista traz só os destaques já confirmados." },
      { label: "Ingressos", text: "Texto de exemplo — links de compra do Louvre, Orsay e Versalhes quando definidos." },
    ],
  },
};

(function () {
  const modal = document.getElementById("dayModal");
  const body = document.getElementById("dayModalBody");
  const closeBtn = document.getElementById("dayModalClose");
  if (!modal) return;

  function openModal(dayId) {
    const data = dayDetailsData[dayId];
    if (!data) return;

    modal.querySelector(".day-modal-inner").style.setProperty("--accent", data.accent);
    body.innerHTML = `
      <h2 class="day-modal-title">${data.title}</h2>
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

  document.querySelectorAll(".day-detail-btn").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.dataset.day));
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
})();
