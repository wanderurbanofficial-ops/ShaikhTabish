(function () {
  "use strict";
  function current() {
    var route = location.hash.replace(/^#\/?/, "");
    if (!route) return { type: "home" };
    var parts = route.split("/");
    if (parts[0] === "tool" && parts[1]) return { type: "tool", id: decodeURIComponent(parts[1]) };
    if (parts[0] === "category" && parts[1]) return { type: "category", id: decodeURIComponent(parts.slice(1).join("/")) };
    return { type: parts[0] };
  }
  function go(route) { location.hash = "/" + route; }
  window.NexoraRouter = { current: current, go: go };
}());
