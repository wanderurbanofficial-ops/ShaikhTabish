(function () {
  "use strict";
  function applyTheme(theme) {
    var valid = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", valid);
    return valid;
  }
  function toggle() {
    var current = document.documentElement.getAttribute("data-theme") || "dark";
    var next = current === "dark" ? "light" : "dark";
    try {
      window.NexoraStore.write("theme", next);
      applyTheme(next);
    } catch (error) {
      if (window.Nexora && window.Nexora.notify) window.Nexora.notify("Could not save your theme preference.", "error");
    }
  }
  window.NexoraTheme = { apply: applyTheme, toggle: toggle };
  applyTheme(window.NexoraStore.read("theme", "dark"));
}());
