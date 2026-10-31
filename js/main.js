(function () {
  var toggle = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (toggle)
      toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });
    // Sync initial button state with theme set by the inline head script.
    toggle.setAttribute(
      "aria-pressed",
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "true"
        : "false",
    );
  }

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Accent color picker
  var accentToggle = document.getElementById("accent-toggle");
  var accentPopover = document.getElementById("accent-popover");

  function setAccent(accent) {
    document.documentElement.setAttribute("data-accent", accent);
    localStorage.setItem("accent", accent);
    if (!accentPopover) return;
    var swatches = accentPopover.querySelectorAll(".accent-swatch");
    for (var i = 0; i < swatches.length; i++) {
      var isSelected = swatches[i].getAttribute("data-accent") === accent;
      swatches[i].setAttribute("aria-pressed", isSelected ? "true" : "false");
    }
  }

  function closePopover() {
    accentPopover.hidden = true;
    accentToggle.setAttribute("aria-expanded", "false");
  }

  if (accentToggle && accentPopover) {
    accentToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      var isOpen = !accentPopover.hidden;
      accentPopover.hidden = isOpen;
      accentToggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });

    accentPopover.addEventListener("click", function (event) {
      var swatch = event.target.closest(".accent-swatch");
      if (!swatch) return;
      setAccent(swatch.getAttribute("data-accent"));
      closePopover();
    });

    document.addEventListener("click", function (event) {
      if (
        !accentPopover.hidden &&
        !accentPopover.contains(event.target) &&
        event.target !== accentToggle
      ) {
        closePopover();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !accentPopover.hidden) {
        closePopover();
        accentToggle.focus();
      }
    });

    // Reflect the accent already applied by the inline head script.
    setAccent(document.documentElement.getAttribute("data-accent") || "orange");
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll-triggered reveal animations
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 },
      );
      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  // Scrollspy: highlight the nav link for the section in view
  var navLinks = document.querySelectorAll("[data-nav-link]");
  var sections = document.querySelectorAll("main section[id]");
  if (navLinks.length && sections.length && "IntersectionObserver" in window) {
    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = document.querySelector(
            '[data-nav-link][href="#' + entry.target.id + '"]',
          );
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) {
              l.classList.remove("is-active");
            });
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach(function (section) {
      spyObserver.observe(section);
    });
  }

  // Header shadow once the page has scrolled
  var header = document.getElementById("site-header");
  var backToTop = document.getElementById("back-to-top");

  function onScroll() {
    var scrolled = window.scrollY > 10;
    if (header) header.classList.toggle("is-scrolled", scrolled);
    if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 400);
  }

  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }
})();
