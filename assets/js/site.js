// Highlight the nav link of the section in view.
const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => {
        if (a.getAttribute("href") === "#" + entry.target.id) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach((s) => observer.observe(s));
}

// Copy BibTeX.
const copyButton = document.querySelector(".copy-button");
if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const text = document.querySelector(".bibtex").textContent;
    try {
      await navigator.clipboard.writeText(text);
      copyButton.setAttribute("data-copied", "");
      setTimeout(() => copyButton.removeAttribute("data-copied"), 1600);
    } catch (e) { /* clipboard unavailable */ }
  });
}

// Open figures in a larger view.
const dialog = document.querySelector(".figure-dialog");
if (dialog && dialog.showModal) {
  const img = dialog.querySelector(".dialog-image");
  const cap = dialog.querySelector(".dialog-caption");
  document.querySelectorAll(".figure-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const source = link.querySelector("img");
      img.src = source.src;
      img.alt = source.alt;
      const figcaption = link.closest("figure").querySelector("figcaption");
      cap.innerHTML = figcaption ? figcaption.innerHTML : "";
      dialog.showModal();
      document.body.classList.add("dialog-open");
    });
  });
  dialog.querySelector(".close-dialog").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
}
