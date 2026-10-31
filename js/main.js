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
})();
