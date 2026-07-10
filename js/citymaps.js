// Small per-city maps on roteiro.html — one per city section, pins numbered
// to match the "poi-num" badges next to the matching day-card list items.
const hotelIconSvg =
  '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/></svg>';
const stationIconSvg =
  '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="13" rx="2"/><path d="M5 10h14"/><path d="M9 13h.01M15 13h.01"/><path d="M8 16l-2 4M16 16l2 4"/></svg>';

const cityMapData = {
  ams: {
    accent: "#147972",
    hotel: { name: "Hotel JL No76", lat: 52.3605, lng: 4.8842 },
    points: [
      { name: "Rijksmuseum", lat: 52.36, lng: 4.8852 },
      { name: "Vondelpark", lat: 52.3579, lng: 4.8686 },
      { name: "Casa de Anne Frank", lat: 52.3752, lng: 4.884 },
      { name: "Jordaan", lat: 52.3844, lng: 4.8839 },
      { name: "Praça Dam", lat: 52.3731, lng: 4.8926 },
      { name: "Begijnhof", lat: 52.3699, lng: 4.8907 },
      { name: "Bloemenmarkt", lat: 52.3673, lng: 4.8917 },
      { name: "Red Light District", lat: 52.3731, lng: 4.8994 },
      { name: "Van Gogh Museum", lat: 52.3584, lng: 4.8811 },
      { name: "Heineken Experience", lat: 52.3578, lng: 4.8918 },
    ],
  },
  anr: {
    accent: "#8e680b",
    points: [
      { name: "Grote Markt", lat: 51.2208, lng: 4.3997 },
      { name: "Catedral de Nossa Senhora", lat: 51.2203, lng: 4.4014 },
      { name: "Vlaeykensgang", lat: 51.2202, lng: 4.3995 },
      { name: "Het Steen", lat: 51.2228, lng: 4.3974 },
    ],
  },
  gnt: {
    accent: "#c32117",
    hotel: { name: "Pillows Grand Boutique Hotel Reylof", lat: 51.0548, lng: 3.7151 },
    points: [
      { name: "Graslei & Korenlei", lat: 51.0548, lng: 3.7208 },
      { name: "Vrijdagmarkt", lat: 51.0567, lng: 3.7253 },
    ],
  },
  bge: {
    accent: "#7b4b33",
    station: { name: "Estação de Bruges", lat: 51.197, lng: 3.2172 },
    points: [
      { name: "Markt", lat: 51.2085, lng: 3.2247 },
      { name: "Belfort", lat: 51.2081, lng: 3.2247 },
      { name: "Burg + Basílica do Sangue Sagrado", lat: 51.2094, lng: 3.227 },
      { name: "Rozenhoedkaai", lat: 51.2071, lng: 3.2274 },
    ],
  },
  bru: {
    accent: "#3d5a80",
    station: { name: "Bruxelas-Midi / Zuid", lat: 50.8357, lng: 4.336 },
    points: [
      { name: "Grand Place", lat: 50.8467, lng: 4.3525 },
      { name: "Galeries Royales Saint-Hubert", lat: 50.8482, lng: 4.355 },
      { name: "Manneken Pis", lat: 50.845, lng: 4.3499 },
    ],
  },
  par: {
    accent: "#c32117",
    hotel: { name: "Airbnb — 84 Av. de Breteuil", lat: 48.846, lng: 2.311 },
    points: [
      { name: "Torre Eiffel", lat: 48.8584, lng: 2.2945 },
      { name: "Museu Rodin", lat: 48.8547, lng: 2.3159 },
      { name: "Les Invalides", lat: 48.856, lng: 2.3133 },
      { name: "Louvre", lat: 48.8606, lng: 2.3376 },
      { name: "Jardin des Tuileries", lat: 48.8636, lng: 2.327 },
      { name: "Rue des Lombards", lat: 48.8592, lng: 2.3495 },
      { name: "Musée d'Orsay", lat: 48.86, lng: 2.3266 },
      { name: "Montmartre", lat: 48.8867, lng: 2.3407 },
      { name: "Sacré-Cœur", lat: 48.8867, lng: 2.3431 },
      { name: "Versalhes", lat: 48.8049, lng: 2.1204 },
      { name: "Notre-Dame", lat: 48.8529, lng: 2.3501 },
      { name: "Le Marais", lat: 48.8555, lng: 2.3652 },
      { name: "Caveau de la Huchette", lat: 48.8528, lng: 2.3463 },
      { name: "Jardin du Luxembourg", lat: 48.8467, lng: 2.3364 },
      { name: "Café de Flore", lat: 48.8541, lng: 2.3326 },
    ],
  },
};

const cityMapInstances = [];

Object.entries(cityMapData).forEach(([code, { accent, points, hotel, station }]) => {
  const el = document.getElementById(`citymap-${code}`);
  if (!el || !points.length) return;

  const map = L.map(el, { scrollWheelZoom: false, zoomControl: true }).setView(
    [points[0].lat, points[0].lng],
    14
  );

  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO",
    maxZoom: 20,
  }).addTo(map);

  points.forEach((point, i) => {
    const icon = L.divIcon({
      className: "poi-marker",
      html: `<div class="poi-marker-inner" style="background:${accent}">${i + 1}</div>`,
      iconSize: [24, 24],
    });
    L.marker([point.lat, point.lng], { icon }).addTo(map).bindTooltip(point.name, {
      permanent: false,
      direction: "top",
    });
  });

  const boundsPoints = points.map((p) => [p.lat, p.lng]);

  if (hotel) {
    const hotelIcon = L.divIcon({
      className: "poi-marker",
      html: `<div class="poi-marker-inner poi-marker-inner--hotel">${hotelIconSvg}</div>`,
      iconSize: [28, 28],
    });
    L.marker([hotel.lat, hotel.lng], { icon: hotelIcon })
      .addTo(map)
      .bindTooltip(`${hotel.name} (hospedagem)`, { permanent: false, direction: "top" });
    boundsPoints.push([hotel.lat, hotel.lng]);
  }

  if (station) {
    const stationIcon = L.divIcon({
      className: "poi-marker",
      html: `<div class="poi-marker-inner poi-marker-inner--station">${stationIconSvg}</div>`,
      iconSize: [28, 28],
    });
    L.marker([station.lat, station.lng], { icon: stationIcon })
      .addTo(map)
      .bindTooltip(`${station.name} (estação)`, { permanent: false, direction: "top" });
    boundsPoints.push([station.lat, station.lng]);
  }

  const bounds = L.latLngBounds(boundsPoints);
  map.fitBounds(bounds, { padding: [28, 28], maxZoom: 16 });
  cityMapInstances.push(map);

  // re-measure once webfonts/layout have actually settled — see the same
  // fix in map.js for why this matters
  function refreshSize() {
    map.invalidateSize();
    map.fitBounds(bounds, { padding: [28, 28], maxZoom: 16 });
  }
  setTimeout(refreshSize, 400);
  setTimeout(refreshSize, 1200);
});

window.addEventListener("resize", () => {
  cityMapInstances.forEach((m) => m.invalidateSize());
});
