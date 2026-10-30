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
})();
