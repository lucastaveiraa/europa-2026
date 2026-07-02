// Suggestion form in the footer. This is a static site with no backend,
// so there's no way to silently send an email from here — the honest,
// zero-setup option is a mailto: link, which opens the visitor's own
// email app with the message pre-filled and lets them hit send.
(function () {
  const form = document.getElementById("suggestForm");
  if (!form) return;

  const status = document.getElementById("suggestStatus");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("suggestName").value.trim();
    const message = document.getElementById("suggestMessage").value.trim();
    if (!message) return;

    const subject = encodeURIComponent("Sugestão para o roteiro — Europa 2026");
    const body = encodeURIComponent(`${message}\n\n— ${name || "Enviado pelo site"}`);
    window.location.href = `mailto:lucastaveira.x@gmail.com?subject=${subject}&body=${body}`;

    status.hidden = false;
    status.textContent = "Abrindo seu app de e-mail com a sugestão pronta — é só enviar.";
  });
})();
