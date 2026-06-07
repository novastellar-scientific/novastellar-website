const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("main section[id]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Mobile navigation.
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Smooth scroll for anchor links, respecting reduced motion preferences.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    const parentAccordion = target.closest(".legal-accordion");
    if (parentAccordion && !parentAccordion.open) parentAccordion.open = true;

    window.setTimeout(() => {
      history.pushState(null, "", targetId);
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      window.setTimeout(() => {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      }, reduceMotion ? 0 : 450);
    }, 0);
  });
});

// Reveal sections as they enter the viewport.
if (!reduceMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

// Highlight the active navigation item while scrolling.
if ("IntersectionObserver" in window) {
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const activeLink = document.querySelector(`.nav-menu a[href="#${entry.target.id}"]`);
        navLinks.forEach((link) => link.classList.remove("active"));
        if (activeLink) activeLink.classList.add("active");
      });
    },
    { rootMargin: "-45% 0px -48% 0px" }
  );

  sections.forEach((section) => activeObserver.observe(section));
}

// App icon fallback when Google Play image URLs are unavailable.
document.querySelectorAll(".app-icon img").forEach((image) => {
  image.addEventListener("error", () => {
    const wrapper = image.closest(".app-icon");
    if (wrapper) wrapper.classList.add("image-error");
  });
});

// Contact form: opens the user's mail client with a prefilled message to the company.
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const companyEmail = "luisabantocruzado7@gmail.com";
    const subject = `Consulta web de ${name} - NovaStellar Scientific`;
    const body = [
      "Nueva consulta enviada desde la web corporativa de NovaStellar Scientific E.I.R.L.",
      "",
      `Nombre: ${name}`,
      `Correo del usuario: ${email}`,
      "",
      "Mensaje:",
      message,
      "",
      `Fecha de envío: ${new Date().toLocaleString("es-PE", { timeZone: "America/Lima" })}`,
      `Página: ${window.location.href}`,
    ].join("\n");

    const mailtoUrl = `mailto:${companyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    formStatus.textContent =
      "Se abrió tu aplicación de correo con el mensaje listo para enviar a NovaStellar Scientific E.I.R.L.";
  });
}

// Legal center controls.
const legalAccordions = document.querySelectorAll(".legal-accordion");
const lastUpdated = document.querySelector("#last-updated");

if (lastUpdated) {
  lastUpdated.textContent = new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Lima",
  }).format(new Date());
}

document.querySelectorAll("[data-legal-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const shouldOpen = button.dataset.legalAction === "expand";
    legalAccordions.forEach((accordion) => {
      accordion.open = shouldOpen;
    });
  });
});
