// Tiny, non-interactive maps for each leg on deslocamentos.html — real
// geography (read straight from the data attributes in the HTML) instead
// of a hand-drawn sketch, so it's actually clear where each leg goes.
// The expand button reopens the same leg, bigger and interactive, in the
// shared modal (same mechanism as roteiro.html's map popups).

function drawLeg(map, fromLat, fromLng, toLat, toLng, isFlight) {
  const color = isFlight ? "#c32117" : "#147972";

  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    maxZoom: 19,
  }).addTo(map);

  L.polyline(
    [
      [fromLat, fromLng],
      [toLat, toLng],
    ],
    { color, weight: 2, opacity: 0.9, dashArray: isFlight ? "2 5" : null }
  ).addTo(map);

  [
    [fromLat, fromLng],
    [toLat, toLng],
  ].forEach(([lat, lng]) => {
    L.circleMarker([lat, lng], { radius: 4, color: "#fff", weight: 2, fillColor: color, fillOpacity: 1 }).addTo(map);
  });

  const bounds = L.latLngBounds([
    [fromLat, fromLng],
    [toLat, toLng],
  ]);
  map.fitBounds(bounds, { padding: [14, 14] });
}

document.querySelectorAll(".transit-map").forEach((el) => {
  const map = L.map(el, {
    zoomControl: false,
    attributionControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    touchZoom: false,
    tap: false,
  });

  drawLeg(
    map,
    parseFloat(el.dataset.fromLat),
    parseFloat(el.dataset.fromLng),
    parseFloat(el.dataset.toLat),
    parseFloat(el.dataset.toLng),
    el.dataset.type === "flight"
  );
});

// ---------- Expand modal ----------
(function () {
  const modal = document.getElementById("mapModal");
  const modalMapEl = document.getElementById("mapModalMap");
  const modalTitle = document.getElementById("mapModalTitle");
  const closeBtn = document.getElementById("mapModalClose");
  if (!modal) return;

  let modalMap = null;

  function destroyModalMap() {
    if (modalMap) {
      modalMap.remove();
      modalMap = null;
    }
  }

  function openModal(btn) {
    modalTitle.textContent = btn.dataset.label || "";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    destroyModalMap();
    modalMap = L.map(modalMapEl, { zoomControl: true, attributionControl: false });
    drawLeg(
      modalMap,
      parseFloat(btn.dataset.fromLat),
      parseFloat(btn.dataset.fromLng),
      parseFloat(btn.dataset.toLat),
      parseFloat(btn.dataset.toLng),
      btn.dataset.type === "flight"
    );
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    destroyModalMap();
  }

  document.querySelectorAll(".map-expand-btn").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn));
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
})();
