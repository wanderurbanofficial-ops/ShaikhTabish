(function () {
  "use strict";
  function match(tool, query) {
    var haystack = [tool.title, tool.category, tool.description, tool.keywords].join(" ").toLocaleLowerCase();
    return haystack.indexOf(query.toLocaleLowerCase()) >= 0;
  }
  window.NexoraSearch = { match: match };
}());
