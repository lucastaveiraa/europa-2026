(function initCountdown() {
  const el = document.getElementById("countdown");
  const tripStart = new Date(2026, 9, 10, 0, 0, 0);
  const tripEnd = new Date(2026, 9, 24, 23, 59, 59);
  const now = new Date();
  let html;
  if (now < tripStart) {
    const days = Math.ceil((tripStart - now) / 86400000);
    html = `Faltam <strong>${days}</strong> dia${days === 1 ? "" : "s"} para embarcar`;
  } else if (now <= tripEnd) {
    html = `A viagem está em andamento — aproveitem!`;
  } else {
    html = `Viagem concluída — até a próxima aventura.`;
  }
  el.innerHTML = html;
})();
