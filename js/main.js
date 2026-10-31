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

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

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
    if (backToTop)
      backToTop.classList.toggle("is-visible", window.scrollY > 400);
  }

  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  // Interactive terminal easter egg
  var terminalToggle = document.getElementById("terminal-toggle");
  var terminalDialog = document.getElementById("terminal-dialog");
  var terminalClose = document.getElementById("terminal-close");
  var terminalOutput = document.getElementById("terminal-output");
  var terminalInput = document.getElementById("terminal-input");

  if (terminalToggle && terminalDialog && terminalInput && terminalOutput) {
    var history = [];
    var historyIndex = -1;
    var validAccents = [
      "orange",
      "blue",
      "green",
      "red",
      "purple",
      "teal",
      "pink",
      "gray",
    ];

    function print(text, className) {
      var line = document.createElement("p");
      line.className = "t-line" + (className ? " " + className : "");
      line.textContent = text;
      terminalOutput.appendChild(line);
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function printWelcome() {
      print("Welcome. This is not a real shell, just a fun way to get around.");
      print("Type 'help' to see what it can do.");
    }

    function scrollToSection(id) {
      var section = document.getElementById(id);
      if (!section) return false;
      section.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      return true;
    }

    var commands = {
      help: function () {
        print("Available commands:");
        [
          "help                 show this list",
          "about                a short bio",
          "ls                   list site sections",
          "cd <section>         scroll to a section (about, projects, contact, ...)",
          "github               open my GitHub profile",
          "linkedin             open my LinkedIn profile",
          "contact              open an email draft",
          "theme <light|dark>   switch the color theme",
          "accent <color>       set the accent color (orange, blue, green, red, purple, teal, pink, gray)",
          "whoami               ...",
          "date                 print the current date and time",
          "clear                clear the screen",
          "exit                 close the terminal",
        ].forEach(function (line) {
          print("  " + line);
        });
      },
      about: function () {
        print(
          "Software engineer who enjoys building clean, practical solutions.",
        );
      },
      ls: function () {
        print("hero  about  highlights  projects  contact");
      },
      cd: function (args) {
        var target = (args[0] || "").replace(/^#/, "").toLowerCase();
        var aliases = { home: "hero", skills: "highlights", work: "projects" };
        target = aliases[target] || target;
        if (!target) {
          print("cd: missing operand", "t-error");
          return;
        }
        if (!scrollToSection(target)) {
          print("cd: no such section: " + args[0] + " (try: ls)", "t-error");
        }
      },
      github: function () {
        print("Opening github.com/andrewjstuart ...", "t-accent");
        window.open("https://github.com/andrewjstuart", "_blank", "noopener");
      },
      linkedin: function () {
        print("Opening LinkedIn ...", "t-accent");
        window.open(
          "https://linkedin.com/in/andrew-j-stuart",
          "_blank",
          "noopener",
        );
      },
      contact: function () {
        print("Opening a new email to AJ@andrewjstuart.com ...", "t-accent");
        window.location.href = "mailto:AJ@andrewjstuart.com";
      },
      theme: function (args) {
        var value = (args[0] || "").toLowerCase();
        if (value !== "light" && value !== "dark") {
          print("usage: theme <light|dark>", "t-error");
          return;
        }
        applyTheme(value);
        print("Theme set to " + value + ".", "t-accent");
      },
      accent: function (args) {
        var value = (args[0] || "").toLowerCase();
        if (validAccents.indexOf(value) === -1) {
          print("usage: accent <" + validAccents.join("|") + ">", "t-error");
          return;
        }
        setAccent(value);
        print("Accent set to " + value + ".", "t-accent");
      },
      whoami: function () {
        print("A visitor with good taste in developer tools.");
      },
      date: function () {
        print(new Date().toString());
      },
      sudo: function () {
        print("Nice try. Permission denied for guest.", "t-error");
      },
      clear: function () {
        terminalOutput.innerHTML = "";
      },
      exit: function () {
        terminalDialog.close();
      },
    };
    commands.close = commands.exit;

    function runCommand(raw) {
      var trimmed = raw.trim();
      if (!trimmed) return;
      print("guest@andrewjstuart.com:~$ " + trimmed, "t-cmd");
      var parts = trimmed.split(/\s+/);
      var name = parts[0].toLowerCase();
      var args = parts.slice(1);
      if (Object.prototype.hasOwnProperty.call(commands, name)) {
        commands[name](args);
      } else {
        print(
          "command not found: " + name + " (type 'help' for a list)",
          "t-error",
        );
      }
    }

    function openTerminal() {
      terminalDialog.showModal();
      document.body.style.overflow = "hidden";
      if (!terminalOutput.childElementCount) printWelcome();
      terminalInput.value = "";
      terminalInput.focus();
    }

    terminalToggle.addEventListener("click", openTerminal);
    terminalClose.addEventListener("click", function () {
      terminalDialog.close();
    });

    // Click on the backdrop (the dialog's own padding box) closes it; clicks on
    // its children never bubble here since they fill the box.
    terminalDialog.addEventListener("click", function (event) {
      if (event.target === terminalDialog) terminalDialog.close();
    });

    // Fires on close button, Esc (native "cancel"), backdrop click, or the exit command.
    terminalDialog.addEventListener("close", function () {
      document.body.style.overflow = "";
      terminalToggle.focus();
    });

    terminalInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        var value = terminalInput.value;
        runCommand(value);
        if (value.trim()) {
          history.push(value);
          historyIndex = history.length;
        }
        terminalInput.value = "";
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (historyIndex > 0) {
          historyIndex -= 1;
          terminalInput.value = history[historyIndex];
        }
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        if (historyIndex < history.length - 1) {
          historyIndex += 1;
          terminalInput.value = history[historyIndex];
        } else {
          historyIndex = history.length;
          terminalInput.value = "";
        }
      }
    });
  }
})();
