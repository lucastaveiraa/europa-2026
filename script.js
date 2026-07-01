// ---------- Route data ----------
const cities = [
  { code: "LIS", name: "Lisboa",     lat: 38.7223, lng: -9.1393 },
  { code: "AMS", name: "Amsterdã",   lat: 52.3676, lng: 4.9041 },
  { code: "ANR", name: "Antuérpia",  lat: 51.2194, lng: 4.4025 },
  { code: "GNT", name: "Gante",      lat: 51.0543, lng: 3.7174 },
  { code: "BGE", name: "Bruges",     lat: 51.2093, lng: 3.2247 },
  { code: "BRU", name: "Bruxelas",   lat: 50.8503, lng: 4.3517 },
  { code: "PAR", name: "Paris",      lat: 48.8566, lng: 2.3522 },
];

const accentByCode = {
  LIS: "#e3a712", AMS: "#178a82", ANR: "#e3a712",
  GNT: "#e8483f", BGE: "#7b4b33", BRU: "#3d5a80", PAR: "#e8483f",
};

// train legs (solid) vs flight legs (dashed)
const trainLegs = [
  ["AMS", "ANR"], ["ANR", "GNT"], ["GNT", "BGE"], ["BGE", "GNT"],
  ["GNT", "BRU"], ["BRU", "PAR"],
];
const flightLegs = [["LIS", "AMS"], ["PAR", "LIS"]];

function findCity(code) {
  return cities.find((c) => c.code === code);
}

// ---------- Map init ----------
const map = L.map("map", {
  scrollWheelZoom: false,
  zoomControl: true,
}).setView([50.5, 3.8], 6);

L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  attribution: "&copy; OpenStreetMap &copy; CARTO",
  maxZoom: 19,
}).addTo(map);

trainLegs.forEach(([a, b]) => {
  const from = findCity(a);
  const to = findCity(b);
  L.polyline(
    [
      [from.lat, from.lng],
      [to.lat, to.lng],
    ],
    { color: "#e3a712", weight: 2.5, opacity: 0.85 }
  ).addTo(map);
});

flightLegs.forEach(([a, b]) => {
  const from = findCity(a);
  const to = findCity(b);
  L.polyline(
    [
      [from.lat, from.lng],
      [to.lat, to.lng],
    ],
    { color: "#e8483f", weight: 2, opacity: 0.85, dashArray: "2 8" }
  ).addTo(map);
});

cities.forEach((c) => {
  const icon = L.divIcon({
    className: "city-marker",
    html: c.code,
    iconSize: [30, 30],
  });
  L.marker([c.lat, c.lng], { icon }).addTo(map).bindTooltip(c.name, {
    permanent: false,
    direction: "top",
  });
});

// fit bounds to all cities with padding
const bounds = L.latLngBounds(cities.map((c) => [c.lat, c.lng]));
map.fitBounds(bounds, { padding: [30, 30] });

// ---------- Active nav highlighting on scroll ----------
const sections = document.querySelectorAll(".city");
const navLinks = document.querySelectorAll(".citynav a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("data-city") === id);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
);

sections.forEach((s) => observer.observe(s));
