(function () {
  "use strict";
  function all() {
    var value = window.NexoraStore.read("favorites", []);
    return Array.isArray(value) ? value.filter(function (id) { return typeof id === "string"; }) : [];
  }
  function has(id) { return all().indexOf(id) !== -1; }
  function toggle(id) {
    var values = all();
    var index = values.indexOf(id);
    if (index >= 0) values.splice(index, 1);
    else values.unshift(id);
    window.NexoraStore.write("favorites", values);
    return index < 0;
  }
  window.NexoraFavorites = { all: all, has: has, toggle: toggle };
}());
