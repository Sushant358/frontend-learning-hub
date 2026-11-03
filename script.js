/* =========================================================
   SHARED JAVASCRIPT — HTML + CSS + JAVASCRIPT HANDBOOKS
   This file adds small interactions to all three guide pages.
   ========================================================= */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Highlight the contents link for the section currently in view.
  const sections = document.querySelectorAll("main section[id]");
  const tocLinks = document.querySelectorAll(".links a[href^='#']");

  if ("IntersectionObserver" in window && sections.length && tocLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        tocLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-15% 0px -70% 0px" });
    sections.forEach((section) => observer.observe(section));
  }

  // The HTML handbook's sample form is a front-end demo only.
  const demoForm = document.querySelector("#demo-form");
  if (demoForm) {
    demoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.querySelector("#demo-name")?.value.trim() || "there";
      const result = document.querySelector("#form-result");
      if (result) result.textContent = `Thanks, ${name}! This demo does not send data to a server.`;
    });
  }

  // Add a small back-to-top control on long pages.
  const topButton = document.createElement("button");
  topButton.type = "button";
  topButton.textContent = "↑ Top";
  topButton.className = "back-to-top";
  topButton.setAttribute("aria-label", "Back to top");
  Object.assign(topButton.style, {
    position: "fixed", right: "18px", bottom: "18px",
    display: "none", zIndex: "20", boxShadow: "0 4px 14px #0f172a33"
  });
  document.body.append(topButton);
  window.addEventListener("scroll", () => {
    topButton.style.display = window.scrollY > 500 ? "block" : "none";
  }, { passive: true });
  topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});
