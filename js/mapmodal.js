// Expand/collapse modal for the Roteiro per-city maps. Reuses the POI
// data already defined in citymaps.js (loaded first, so its top-level
// consts are visible here), but builds a *fresh* Leaflet instance each
// time the modal opens — Leaflet can't reliably measure a container that
// was hidden (display:none) at init time, and re-using one instance
// across different maps gets messy fast.
(function () {
  const modal = document.getElementById("mapModal");
  const modalMapEl = document.getElementById("mapModalMap");
  const modalTitle = document.getElementById("mapModalTitle");
  const closeBtn = document.getElementById("mapModalClose");
  if (!modal) return;

  let modalMap = null;

  // keyboard focus follows the modal in and returns to the trigger on
  // close — otherwise focus stays behind the aria-hidden overlay
  let lastFocus = null;

  function destroyModalMap() {
    if (modalMap) {
      modalMap.remove();
      modalMap = null;
    }
  }

  function buildCityMap(code) {
    const data = cityMapData[code];
    if (!data) return null;
    const { accent, points, hotel } = data;

    const m = L.map(modalMapEl, { scrollWheelZoom: true, zoomControl: true }).setView(
      [points[0].lat, points[0].lng],
      14
    );
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap &copy; CARTO",
      maxZoom: 20,
    }).addTo(m);

    points.forEach((point, i) => {
      const icon = L.divIcon({
        className: "poi-marker",
        html: `<div class="poi-marker-inner" style="background:${accent}">${i + 1}</div>`,
        iconSize: [26, 26],
      });
      L.marker([point.lat, point.lng], { icon }).addTo(m).bindTooltip(point.name, {
        permanent: false,
        direction: "top",
      });
    });

    const boundsPoints = points.map((p) => [p.lat, p.lng]);

    if (hotel) {
      const hotelIcon = L.divIcon({
        className: "poi-marker",
        html: `<div class="poi-marker-inner poi-marker-inner--hotel">${hotelIconSvg}</div>`,
        iconSize: [30, 30],
      });
      L.marker([hotel.lat, hotel.lng], { icon: hotelIcon })
        .addTo(m)
        .bindTooltip(`${hotel.name} (hospedagem)`, { permanent: false, direction: "top" });
      boundsPoints.push([hotel.lat, hotel.lng]);
    }

    const bounds = L.latLngBounds(boundsPoints);
    m.fitBounds(bounds, { padding: [30, 30] });
    return m;
  }

  const mapTitles = {
    ams: "Amsterdã",
    anr: "Antuérpia",
    gnt: "Ghent",
    bge: "Bruges",
    bru: "Bruxelas",
    par: "Paris",
  };

  function openModal(mapKey) {
    modalTitle.textContent = mapTitles[mapKey] || "";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // display:flex above already gives the container real dimensions —
    // Leaflet forces a synchronous layout read the moment it measures the
    // container, so no need to wait for a paint/animation frame here.
    destroyModalMap();
    modalMap = buildCityMap(mapKey);
    lastFocus = document.activeElement;
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    destroyModalMap();
    if (lastFocus) {
      lastFocus.focus();
      lastFocus = null;
    }
  }

  document.querySelectorAll(".map-expand-btn").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.dataset.map));
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
})();
