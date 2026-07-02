// ---------- Route data ----------
const cities = [
  { code: "LIS", name: "Lisboa",     lat: 38.7223, lng: -9.1393 },
  { code: "AMS", name: "Amsterdã",   lat: 52.3676, lng: 4.9041 },
  { code: "ANR", name: "Antuérpia",  lat: 51.2194, lng: 4.4025 },
  { code: "GNT", name: "Ghent",      lat: 51.0543, lng: 3.7174 },
  { code: "BGE", name: "Bruges",     lat: 51.2093, lng: 3.2247 },
  { code: "BRU", name: "Bruxelas",   lat: 50.8503, lng: 4.3517 },
  { code: "PAR", name: "Paris",      lat: 48.8566, lng: 2.3522 },
];

// order used to judge which legs of the route are "already travelled"
// as the reader scrolls past each city section
const routeOrder = ["AMS", "ANR", "GNT", "BGE", "BRU", "PAR"];

// train legs (solid, progressive) vs flight legs (dashed, static bookends)
const trainLegs = [
  ["AMS", "ANR"], ["ANR", "GNT"], ["GNT", "BGE"], ["BGE", "GNT"],
  ["GNT", "BRU"], ["BRU", "PAR"],
];
const flightLegs = [["LIS", "AMS"], ["PAR", "LIS"]];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

// train legs: keep a reference + the route index at which they become "travelled"
const trainPolylines = trainLegs.map(([a, b]) => {
  const from = findCity(a);
  const to = findCity(b);
  const layer = L.polyline(
    [
      [from.lat, from.lng],
      [to.lat, to.lng],
    ],
    { color: "#e3a712", weight: 1.5, opacity: 0.3 }
  ).addTo(map);
  const maxIdx = Math.max(routeOrder.indexOf(a), routeOrder.indexOf(b));
  return { layer, maxIdx };
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

// markers, keyed by code, so scroll/click handlers can reach them
const markersByCode = {};
cities.forEach((c) => {
  const icon = L.divIcon({
    className: "city-marker",
    html: c.code,
    iconSize: [30, 30],
  });
  const marker = L.marker([c.lat, c.lng], { icon }).addTo(map).bindTooltip(c.name, {
    permanent: false,
    direction: "top",
  });
  const targetSection = document.getElementById(c.code.toLowerCase());
  if (targetSection) {
    marker.on("click", () => {
      targetSection.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    });
  }
  markersByCode[c.code] = marker;
});

// fit bounds to all cities with padding
const bounds = L.latLngBounds(cities.map((c) => [c.lat, c.lng]));
map.fitBounds(bounds, { padding: [30, 30] });

// ---------- Scroll-driven map state ----------
function setActiveCity(code) {
  const idx = routeOrder.indexOf(code);

  // highlight the current marker, dim the rest
  Object.entries(markersByCode).forEach(([c, marker]) => {
    const el = marker.getElement();
    if (el) el.classList.toggle("is-active", c === code);
  });

  // fly the map to the active city
  const city = findCity(code);
  if (city) {
    if (prefersReducedMotion) {
      map.setView([city.lat, city.lng], 9);
    } else {
      map.flyTo([city.lat, city.lng], 9, { duration: 1.1 });
    }
  }

  // progressively light up train legs already travelled
  trainPolylines.forEach(({ layer, maxIdx }) => {
    if (idx >= 0 && maxIdx <= idx) {
      layer.setStyle({ opacity: 0.9, weight: 3 });
    } else {
      layer.setStyle({ opacity: 0.3, weight: 1.5 });
    }
  });

  // update the "agora lendo" panel next to the map
  const section = document.getElementById(code.toLowerCase());
  if (section) {
    const name = section.querySelector("h2")?.textContent ?? "";
    const dates = section.querySelector(".city-dates")?.textContent ?? "";
    document.getElementById("mapCurrentCity").textContent = name;
    document.getElementById("mapCurrentDates").textContent = dates;
  }
}

// ---------- Active nav highlighting + map sync on scroll ----------
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
        setActiveCity(id.toUpperCase());
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
);

sections.forEach((s) => observer.observe(s));
