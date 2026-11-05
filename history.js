(function () {
  "use strict";
  function all() {
    var value = window.NexoraStore.read("recent", []);
    return Array.isArray(value) ? value.filter(function (id) { return typeof id === "string"; }) : [];
  }
  function add(id) {
    var values = all().filter(function (item) { return item !== id; });
    values.unshift(id);
    window.NexoraStore.write("recent", values.slice(0, 20));
  }
  function clear() { window.NexoraStore.write("recent", []); }
  window.NexoraHistory = { all: all, add: add, clear: clear };
}());
