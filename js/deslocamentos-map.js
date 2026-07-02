// Tiny, non-interactive maps for each leg on deslocamentos.html — real
// geography (read straight from the data attributes in the HTML) instead
// of a hand-drawn sketch, so it's actually clear where each leg goes.
document.querySelectorAll(".transit-map").forEach((el) => {
  const fromLat = parseFloat(el.dataset.fromLat);
  const fromLng = parseFloat(el.dataset.fromLng);
  const toLat = parseFloat(el.dataset.toLat);
  const toLng = parseFloat(el.dataset.toLng);
  const isFlight = el.dataset.type === "flight";
  const color = isFlight ? "#c32117" : "#147972";

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
});
