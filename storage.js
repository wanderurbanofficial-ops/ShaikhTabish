(function () {
  "use strict";
  var DB_NAME = "nexora-local";
  var DB_VERSION = 1;
  var dbPromise;

  function report(message) {
    if (window.Nexora && typeof window.Nexora.notify === "function") window.Nexora.notify(message, "error");
  }

  function read(key, fallback) {
    try {
      var value = localStorage.getItem("nexora:" + key);
      if (value === null) return fallback;
      return JSON.parse(value);
    } catch (error) {
      report("Saved browser settings could not be read. You can continue, but those settings may be unavailable.");
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem("nexora:" + key, JSON.stringify(value));
    } catch (error) {
      report("Your browser could not save this setting. Check available local storage space.");
      throw error;
    }
  }

  function openDb() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise(function (resolve, reject) {
      if (!window.indexedDB) {
        reject(new Error("IndexedDB is unavailable in this browser."));
        return;
      }
      var request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = function () {
        var db = request.result;
        ["todos", "planner", "habits", "notes"].forEach(function (name) {
          if (!db.objectStoreNames.contains(name)) db.createObjectStore(name, { keyPath: "id" });
        });
      };
      request.onsuccess = function () { resolve(request.result); };
      request.onerror = function () { reject(request.error || new Error("Could not open local storage.")); };
      request.onblocked = function () { reject(new Error("Local storage is blocked by another open NEXORA tab. Close the other tab and retry.")); };
    });
    return dbPromise;
  }

  function transaction(storeName, mode, action) {
    return openDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx;
        try {
          tx = db.transaction(storeName, mode);
          var request = action(tx.objectStore(storeName));
          tx.oncomplete = function () { resolve(request && request.result); };
          tx.onerror = function () { reject(tx.error || new Error("Could not save local data.")); };
          tx.onabort = function () { reject(tx.error || new Error("Local data operation was cancelled.")); };
        } catch (error) {
          reject(error);
        }
      });
    }).catch(function (error) {
      report(error.message || "Local data could not be accessed.");
      throw error;
    });
  }

  window.NexoraStore = {
    read: read,
    write: write,
    list: function (store) { return transaction(store, "readonly", function (s) { return s.getAll(); }); },
    get: function (store, id) { return transaction(store, "readonly", function (s) { return s.get(id); }); },
    put: function (store, value) { return transaction(store, "readwrite", function (s) { return s.put(value); }); },
    remove: function (store, id) { return transaction(store, "readwrite", function (s) { return s.delete(id); }); },
    clear: function (store) { return transaction(store, "readwrite", function (s) { return s.clear(); }); },
    exportData: function () {
      return Promise.all(["todos", "planner", "habits", "notes"].map(function (name) {
        return window.NexoraStore.list(name);
      })).then(function (sets) {
        return {
          format: "nexora-local-data",
          version: 1,
          exportedAt: new Date().toISOString(),
          settings: {
            theme: read("theme", "dark"),
            favorites: read("favorites", []),
            recent: read("recent", []),
            creatorDrafts: read("creatorDrafts", {}),
            studySettings: read("studySettings", { minutes: 25, seconds: 0 }),
            pomodoroSettings: read("pomodoroSettings", { minutes: 25, breakMinutes: 5 })
          },
          records: { todos: sets[0], planner: sets[1], habits: sets[2], notes: sets[3] }
        };
      });
    },
    importData: function (payload) {
      if (!payload || payload.format !== "nexora-local-data" || payload.version !== 1 || !payload.records) {
        return Promise.reject(new Error("This is not a supported NEXORA data export."));
      }
      var names = ["todos", "planner", "habits", "notes"];
      names.forEach(function (name) {
        if (!Array.isArray(payload.records[name]) || payload.records[name].some(function (row) {
          return !row || typeof row.id !== "string" || row.id.length > 200;
        })) throw new Error("The import contains invalid " + name + " data.");
      });
      if (payload.settings && payload.settings.creatorDrafts !== undefined) {
        var drafts = payload.settings.creatorDrafts;
        if (!drafts || typeof drafts !== "object" || Array.isArray(drafts)) throw new Error("The import contains invalid creator drafts.");
        Object.keys(drafts).forEach(function (id) {
          var draft = drafts[id];
          if (!/^(hashtag-organizer|caption-formatter|youtube-description-formatter|title-ideas-organizer|video-script-planner|social-bio-counter|thumbnail-dimension-guide)$/.test(id) || !draft || typeof draft.output !== "string" || draft.output.length > 200000 || typeof draft.input !== "object" || !draft.input || Object.keys(draft.input).some(function (key) { return typeof draft.input[key] !== "string"; })) {
            throw new Error("The import contains invalid creator draft data.");
          }
        });
      }
      if (payload.settings && payload.settings.studySettings && (!Number.isFinite(payload.settings.studySettings.minutes) || !Number.isFinite(payload.settings.studySettings.seconds) || payload.settings.studySettings.minutes < 1 || payload.settings.studySettings.minutes > 180 || payload.settings.studySettings.seconds < 0 || payload.settings.studySettings.seconds > 59)) throw new Error("The import contains invalid study timer settings.");
      if (payload.settings && payload.settings.pomodoroSettings && (!Number.isFinite(payload.settings.pomodoroSettings.minutes) || !Number.isFinite(payload.settings.pomodoroSettings.breakMinutes) || payload.settings.pomodoroSettings.minutes < 1 || payload.settings.pomodoroSettings.minutes > 180 || payload.settings.pomodoroSettings.breakMinutes < 1 || payload.settings.pomodoroSettings.breakMinutes > 60)) throw new Error("The import contains invalid Pomodoro settings.");
      var jobs = names.map(function (name) {
        return window.NexoraStore.clear(name).then(function () {
          return Promise.all(payload.records[name].map(function (row) { return window.NexoraStore.put(name, row); }));
        });
      });
      if (payload.settings && Array.isArray(payload.settings.favorites)) write("favorites", payload.settings.favorites.filter(function (id) { return typeof id === "string"; }));
      if (payload.settings && Array.isArray(payload.settings.recent)) write("recent", payload.settings.recent.filter(function (id) { return typeof id === "string"; }));
      if (payload.settings && ["dark", "light"].indexOf(payload.settings.theme) >= 0) write("theme", payload.settings.theme);
      if (payload.settings && payload.settings.creatorDrafts) write("creatorDrafts", payload.settings.creatorDrafts);
      if (payload.settings && payload.settings.studySettings) write("studySettings", payload.settings.studySettings);
      if (payload.settings && payload.settings.pomodoroSettings) write("pomodoroSettings", payload.settings.pomodoroSettings);
      return Promise.all(jobs);
    }
  };
}());
