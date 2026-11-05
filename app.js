(function () {
  "use strict";
  var categories = [
    { id: "pdf", name: "PDF & Documents", icon: "▤", description: "Handle everyday PDF and document tasks." },
    { id: "image", name: "Image & Photo", icon: "▧", description: "Convert, resize and inspect images." },
    { id: "text", name: "Text & Writing", icon: "¶", description: "Shape, count and organize text." },
    { id: "calculator", name: "Calculators", icon: "∑", description: "Useful calculators and unit conversions." },
    { id: "developer", name: "Developer", icon: "{ }", description: "Format, validate and encode data locally." },
    { id: "student", name: "Student", icon: "▣", description: "Study, plan and calculate academic progress." },
    { id: "creator", name: "Creator", icon: "✦", description: "Organize content for your publishing workflow." },
    { id: "productivity", name: "Productivity", icon: "◷", description: "Keep tasks and plans organized on your device." }
  ];
  var tools = [
    ["image-to-pdf","Image to PDF","pdf","Combine images into a downloadable PDF.","image convert document"],
    ["pdf-to-images","PDF to Images","pdf","Render PDF pages as PNG images in your browser.","convert pages"],
    ["merge-pdf","Merge PDF","pdf","Combine multiple PDF files into one document.","combine join"],
    ["split-pdf","Split PDF","pdf","Extract a selected page range into a new PDF.","pages extract"],
    ["rotate-pdf","Rotate PDF","pdf","Rotate all or selected pages in a PDF.","orientation"],
    ["compress-pdf","Compress PDF","pdf","Re-save a PDF with structural optimization where possible.","reduce size optimize"],
    ["pdf-page-counter","PDF Page Counter","pdf","Read the number of pages in a PDF file.","count pages"],
    ["extract-pdf-pages","Extract PDF Pages","pdf","Copy selected pages into a separate PDF.","pages"],
    ["image-compressor","Image Compressor","image","Export a smaller image and compare actual file sizes.","quality optimize"],
    ["image-resizer","Image Resizer","image","Resize an image to exact pixel dimensions.","dimensions"],
    ["image-cropper","Image Cropper","image","Crop an image using pixel coordinates.","crop"],
    ["image-to-png","Image to PNG","image","Convert an image to PNG without losing transparency.","convert"],
    ["png-to-jpg","PNG to JPG","image","Convert PNG to JPEG with a selectable quality and background.","convert"],
    ["image-rotator","Image Rotator","image","Rotate an image and download the result.","turn"],
    ["image-color-picker","Image Color Picker","image","Inspect a pixel's color using image coordinates.","hex rgb pixel"],
    ["image-metadata-viewer","Image Metadata Viewer","image","View file properties and browser-readable image dimensions.","exif properties"],
    ["word-counter","Word Counter","text","Count words, sentences, paragraphs and reading time.","writing"],
    ["character-counter","Character Counter","text","Count characters, including Unicode characters.","length"],
    ["case-converter","Case Converter","text","Convert text between common letter cases.","uppercase lowercase title"],
    ["remove-duplicate-lines","Remove Duplicate Lines","text","Remove repeated lines while preserving their first occurrence.","unique"],
    ["text-reverser","Text Reverser","text","Reverse text by Unicode grapheme, word or line.","flip"],
    ["find-replace","Find & Replace","text","Replace matching text with an optional case-sensitive search.","search"],
    ["text-to-slug","Text to Slug","text","Create a URL-friendly slug from text.","url seo"],
    ["lorem-ipsum-generator","Lorem Ipsum Generator","text","Generate placeholder text by paragraph or word count.","placeholder"],
    ["scientific-calculator","Scientific Calculator","calculator","Evaluate arithmetic and common scientific functions safely.","math"],
    ["percentage-calculator","Percentage Calculator","calculator","Calculate a percentage of a value.","percent"],
    ["age-calculator","Age Calculator","calculator","Calculate age from a birth date.","birthday"],
    ["date-calculator","Date Calculator","calculator","Find the days between dates or shift a date by days.","calendar"],
    ["bmi-calculator","BMI Calculator","calculator","Calculate BMI with a health-context disclaimer.","body mass index"],
    ["unit-converter","Unit Converter","calculator","Convert compatible length, mass and time units.","measurement"],
    ["length-converter","Length Converter","calculator","Convert common metric and imperial length units.","distance"],
    ["temperature-converter","Temperature Converter","calculator","Convert Celsius, Fahrenheit and Kelvin.","weather"],
    ["json-formatter","JSON Formatter","developer","Format JSON with readable indentation.","pretty print"],
    ["json-validator","JSON Validator","developer","Validate JSON and show parse errors.","syntax"],
    ["base64-encoder","Base64 Encoder","developer","Encode UTF-8 text as Base64.","binary"],
    ["base64-decoder","Base64 Decoder","developer","Decode Base64 as UTF-8 text.","binary"],
    ["url-encoder","URL Encoder","developer","Encode text for safe use in a URL component.","percent encoding"],
    ["url-decoder","URL Decoder","developer","Decode percent-encoded URL text.","percent encoding"],
    ["html-entity-encoder","HTML Entity Encoder","developer","Escape text as HTML entities without executing it.","escape"],
    ["uuid-generator","UUID Generator","developer","Generate cryptographically strong UUID v4 identifiers.","random id"],
    ["study-timer","Study Timer","student","Use a customizable study session timer.","focus"],
    ["pomodoro-timer","Pomodoro Timer","student","Work and rest in configurable Pomodoro intervals.","focus break"],
    ["grade-calculator","Grade Calculator","student","Calculate the mean of entered assessment scores.","marks average"],
    ["gpa-calculator","GPA Calculator","student","Calculate a weighted GPA on a configurable scale.","grade points"],
    ["exam-countdown","Exam Countdown","student","See the time remaining until an exam date.","days"],
    ["random-quiz","Random Quiz","student","Take a short offline general-knowledge quiz.","practice"],
    ["hashtag-organizer","Hashtag Organizer","creator","Normalize and deduplicate hashtags you provide.","social"],
    ["caption-formatter","Caption Formatter","creator","Format your caption text with optional hashtags.","social"],
    ["youtube-description-formatter","YouTube Description Formatter","creator","Arrange description sections using an editable template.","video"],
    ["title-ideas-organizer","Title Ideas Organizer","creator","Clean and organize your own title ideas; no AI generation.","brainstorm"],
    ["video-script-planner","Video Script Planner","creator","Build a simple outline from your own video notes.","script"],
    ["social-bio-counter","Social Bio Counter","creator","Count characters against a selected profile bio limit.","profile"],
    ["thumbnail-dimension-guide","Thumbnail Dimension Guide","creator","See common thumbnail dimensions and aspect ratios.","video image"],
    ["todo-list","To-Do List","productivity","Add, complete, edit and remove tasks saved on this device.","tasks"],
    ["daily-planner","Daily Planner","productivity","Plan dated tasks and times locally in your browser.","schedule"],
    ["habit-tracker","Habit Tracker","productivity","Track daily habit completion on this device.","routine"],
    ["notes-manager","Notes Manager","productivity","Create, search, edit and delete locally saved notes.","memo"],
    ["countdown-timer","Countdown Timer","productivity","Start a custom countdown timer.","clock"],
    ["stopwatch","Stopwatch","productivity","Run, pause and reset a stopwatch.","time"],
    ["qr-code-generator","QR Code Generator","productivity","Generate a QR code from text or a URL on your device.","barcode"]
  ].map(function (row) {
    var category = categories.find(function (item) { return item.id === row[2]; });
    return { id: row[0], title: row[1], category: row[2], categoryName: category.name, icon: category.icon, description: row[3], keywords: row[4] };
  });
  var state = { query: "", categoryFilter: "all", activeTimer: null, timerInterval: null };
  var $ = function (selector, root) { return (root || document).querySelector(selector); };
  var escapeHtml = function (value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  };
  function notify(message, type) {
    var region = $("#toast-region");
    if (!region) return;
    var toast = document.createElement("div");
    toast.className = "toast " + (type || "");
    toast.textContent = message;
    region.appendChild(toast);
    window.setTimeout(function () { toast.remove(); }, 4200);
  }
  window.Nexora = { notify: notify, tools: tools, categories: categories };

  function iconFor(categoryId) { return (categories.find(function (c) { return c.id === categoryId; }) || {}).icon || "✦"; }
  function toolCard(tool) {
    var favorite = window.NexoraFavorites.has(tool.id);
    return '<article class="tool-card"><div class="tool-card-top"><span class="tool-icon" aria-hidden="true">' + escapeHtml(tool.icon) + '</span><div><h3><a href="#/tool/' + encodeURIComponent(tool.id) + '">' + escapeHtml(tool.title) + '</a></h3><span class="category-label">' + escapeHtml(tool.categoryName) + '</span></div></div><p>' + escapeHtml(tool.description) + '</p><div class="card-bottom"><a class="text-link" href="#/tool/' + encodeURIComponent(tool.id) + '">Open tool →</a><button class="favorite-button ' + (favorite ? "is-favorite" : "") + '" type="button" aria-label="' + (favorite ? "Remove " + escapeHtml(tool.title) + " from" : "Add " + escapeHtml(tool.title) + " to") + ' favorites" aria-pressed="' + favorite + '" data-action="favorite" data-id="' + tool.id + '">' + (favorite ? "★" : "☆") + '</button></div></article>';
  }
  function renderCards(items, emptyTitle, emptyText) {
    if (!items.length) return '<div class="empty-state"><strong>' + escapeHtml(emptyTitle || "Nothing here yet") + '</strong>' + escapeHtml(emptyText || "Try another category or explore all tools.") + '</div>';
    return '<div class="tool-grid">' + items.map(toolCard).join("") + '</div>';
  }
  function categoryNav() {
    $("#category-nav").innerHTML = categories.map(function (category) {
      return '<a class="side-link" href="#/category/' + category.id + '" data-route="category-' + category.id + '"><span>' + escapeHtml(category.icon) + '</span>' + escapeHtml(category.name) + '</a>';
    }).join("");
  }
  function renderHome() {
    var popularIds = ["image-compressor", "json-formatter", "word-counter", "qr-code-generator", "merge-pdf", "percentage-calculator", "image-resizer", "pomodoro-timer"];
    var popular = popularIds.map(function (id) { return tools.find(function (t) { return t.id === id; }); });
    var categoryCards = categories.map(function (c) {
      var count = tools.filter(function (t) { return t.category === c.id; }).length;
      return '<a class="category-card" href="#/category/' + c.id + '"><span class="tool-icon" aria-hidden="true">' + escapeHtml(c.icon) + '</span><h3>' + escapeHtml(c.name) + '</h3><p>' + count + ' practical tools</p></a>';
    }).join("");
    var recent = window.NexoraHistory.all().map(function (id) { return tools.find(function (t) { return t.id === id; }); }).filter(Boolean).slice(0, 3);
    return '<div class="page-wrap page-enter"><section class="hero"><div class="hero-copy"><div class="eyebrow">YOUR EVERYDAY DIGITAL TOOLKIT</div><h1>Everything You Need.<br><span>One Powerful Platform.</span></h1><p>Discover powerful free tools to simplify your everyday digital tasks. Private, practical, and ready when you are.</p>' +
      '<div class="search-box"><span class="search-icon" aria-hidden="true">⌕</span><input id="global-search" type="search" autocomplete="off" placeholder="Search 60 tools by name, task or category…" aria-label="Search tools"><button class="clear-search" type="button" aria-label="Clear search" data-action="clear-search">×</button><div class="search-results" id="search-results" role="listbox"></div></div>' +
      '<div class="button-row"><a class="button primary" href="#/tools">Explore all tools <span aria-hidden="true">→</span></a><a class="button ghost" href="#categories">Browse categories</a></div></div></section>' +
      '<section class="section"><div class="section-heading"><div><h2>Popular tools</h2><p>Get started with a few visitor favorites.</p></div><a class="text-link" href="#/tools">View all →</a></div>' + renderCards(popular) + '</section>' +
      '<section class="section" id="categories"><div class="section-heading"><div><h2>Explore by category</h2><p>Find the right tool for what you need to do.</p></div></div><div class="category-grid">' + categoryCards + '</div></section>' +
      '<section class="section"><div class="section-heading"><div><h2>Recently used</h2><p>Your recent activity stays on this device.</p></div><a class="text-link" href="#/recent">View history →</a></div>' + renderCards(recent, "No tools used yet", "Run a tool and it will appear here.") + '</section>' +
      '<section class="section"><div class="section-heading"><div><h2>Designed for your peace of mind</h2><p>Simple utilities without the usual friction.</p></div></div><div class="feature-grid"><div class="feature-card"><span>◇</span><strong>Free to use</strong><p>No subscription or payment gate.</p></div><div class="feature-card"><span>◈</span><strong>Privacy-first</strong><p>Files and data are processed locally in your browser.</p></div><div class="feature-card"><span>◎</span><strong>No account</strong><p>Start using tools without registration.</p></div><div class="feature-card"><span>▣</span><strong>Works across devices</strong><p>Responsive layouts for mobile, tablet and desktop.</p></div></div></section>' +
      '<section class="section"><div class="section-heading"><div><h2>Frequently asked questions</h2></div></div><details class="faq-item"><summary>Are NEXORA tools really free?</summary><p>Yes. The tools included here do not require payment, registration or API keys.</p></details><details class="faq-item"><summary>Are my files uploaded?</summary><p>No. File operations run in your browser using local JavaScript libraries. Your files are not sent to NEXORA servers.</p></details><details class="faq-item"><summary>Where is my saved information stored?</summary><p>Favorites and preferences use this browser&#39;s local storage. Notes, tasks and plans use IndexedDB on this device. Clearing browser data removes them.</p></details></section></div>';
  }
  function renderTools(items, title, description) {
    return '<div class="page-wrap page-enter"><div class="page-header"><div class="eyebrow">NEXORA TOOLKIT</div><h1>' + escapeHtml(title) + '</h1><p>' + escapeHtml(description) + '</p></div><div class="filter-row">' +
      '<button class="filter-chip ' + (state.categoryFilter === "all" ? "active" : "") + '" data-action="filter" data-category="all">All tools</button>' +
      categories.map(function (c) { return '<button class="filter-chip ' + (state.categoryFilter === c.id ? "active" : "") + '" data-action="filter" data-category="' + c.id + '">' + escapeHtml(c.name) + '</button>'; }).join("") +
      '</div><div id="tool-list">' + renderCards(items) + '</div></div>';
  }
  function findTool(id) { return tools.find(function (tool) { return tool.id === id; }); }
  function creatorDrafts() {
    var drafts = window.NexoraStore.read("creatorDrafts", {});
    return drafts && typeof drafts === "object" && !Array.isArray(drafts) ? drafts : {};
  }
  function renderSavedDraft(id) {
    var draft = creatorDrafts()[id];
    if (!draft || typeof draft.output !== "string") return '<div class="privacy-card saved-draft"><strong>No saved draft for this tool yet.</strong><p>Run the tool, then save its output locally on this device.</p></div>';
    var summary = draft.output.length > 240 ? draft.output.slice(0, 240) + "…" : draft.output;
    return '<div class="privacy-card saved-draft"><strong>Saved locally</strong><p class="field-hint">' + escapeHtml(new Date(draft.savedAt).toLocaleString()) + '</p><p>' + escapeHtml(summary) + '</p><button class="button small ghost" type="button" data-action="load-draft" data-id="' + escapeHtml(id) + '">Load saved output</button></div>';
  }
  function restoreCreatorDraft(id) {
    var draft = creatorDrafts()[id];
    var form = $("#tool-form");
    if (!draft || !draft.input || !form) return;
    Object.keys(draft.input).forEach(function (name) {
      var control = form.elements.namedItem(name);
      if (control && typeof draft.input[name] === "string" && control.type !== "file") control.value = draft.input[name];
    });
  }

  function field(name, label, type, options) {
    options = options || {};
    var id = "field-" + name;
    var html = '<div class="field ' + (options.wide ? "field-wide" : "") + '"><label for="' + id + '">' + escapeHtml(label) + '</label>';
    if (type === "textarea") {
      html += '<textarea id="' + id + '" name="' + name + '" placeholder="' + escapeHtml(options.placeholder || "") + '"' + (options.required ? " required" : "") + (options.rows ? ' rows="' + options.rows + '"' : "") + '>' + escapeHtml(options.value || "") + '</textarea>';
    } else if (type === "select") {
      html += '<select id="' + id + '" name="' + name + '">' + options.options.map(function (option) { return '<option value="' + escapeHtml(option[0]) + '">' + escapeHtml(option[1]) + '</option>'; }).join("") + '</select>';
    } else if (type === "file") {
      html += '<input id="' + id + '" name="' + name + '" type="file" accept="' + escapeHtml(options.accept || "*/*") + '"' + (options.multiple ? " multiple" : "") + (options.required ? " required" : "") + '>';
      if (options.hint) html += '<span class="field-hint">' + escapeHtml(options.hint) + '</span>';
    } else {
      html += '<input id="' + id + '" name="' + name + '" type="' + type + '" value="' + escapeHtml(options.value == null ? "" : options.value) + '" placeholder="' + escapeHtml(options.placeholder || "") + '"' + (options.min != null ? ' min="' + options.min + '"' : "") + (options.max != null ? ' max="' + options.max + '"' : "") + (options.step ? ' step="' + options.step + '"' : "") + (options.required ? " required" : "") + (options.accept ? ' accept="' + escapeHtml(options.accept) + '"' : "") + '>';
    }
    if (options.hint && type !== "file") html += '<span class="field-hint">' + escapeHtml(options.hint) + '</span>';
    return html + "</div>";
  }
  function localDateString(date) {
    var current = date || new Date();
    return current.getFullYear() + "-" + String(current.getMonth() + 1).padStart(2, "0") + "-" + String(current.getDate()).padStart(2, "0");
  }
  function fileField(multiple, label, accept) { return field("files", label || "Choose file" + (multiple ? "s" : ""), "file", { multiple: multiple, accept: accept || "*/*", required: true, hint: "Click or drag a file here. Processing stays in this browser." }); }
  function fieldsFor(id) {
    var text = field("text", "Text", "textarea", { wide: true, placeholder: "Type or paste text here…" });
    var number = function (name, label, placeholder) { return field(name, label, "number", { required: true, placeholder: placeholder || "0", step: "any" }); };
    var date = function (name, label) { return field(name, label, "date", { required: true, value: localDateString() }); };
    var select = function (name, label, options) { return field(name, label, "select", { options: options }); };
    if (id === "image-to-pdf") return fileField(true, "Choose images", "image/*");
    if (id === "pdf-to-images" || id === "pdf-page-counter" || id === "compress-pdf") return fileField(false, "Choose a PDF", ".pdf,application/pdf");
    if (id === "merge-pdf") return fileField(true, "Choose PDFs (in merge order)", ".pdf,application/pdf");
    if (id === "split-pdf" || id === "extract-pdf-pages") return fileField(false, "Choose a PDF", ".pdf,application/pdf") + field("pages", "Page numbers or ranges", "text", { required: true, placeholder: "Example: 1-3, 5" });
    if (id === "rotate-pdf") return fileField(false, "Choose a PDF", ".pdf,application/pdf") + select("degrees", "Rotation", [["90","90° clockwise"],["180","180°"],["270","270° clockwise"]]) + field("pages", "Pages (optional)", "text", { placeholder: "Leave blank to rotate all pages" });
    if (id.indexOf("image-") === 0 || id === "png-to-jpg") {
      var image = fileField(false, "Choose an image", "image/*");
      if (id === "image-resizer") return image + '<div class="field-grid">' + number("width", "Width (px)") + number("height", "Height (px)") + '</div>' + '<label class="check-field"><input name="keepRatio" type="checkbox" checked> Keep aspect ratio</label>';
      if (id === "image-cropper") return image + '<div class="field-grid">' + number("x", "Left (px)") + number("y", "Top (px)") + number("width", "Crop width (px)") + number("height", "Crop height (px)") + "</div>";
      if (id === "image-compressor" || id === "png-to-jpg") return image + field("quality", "Quality (JPEG)", "range", { value: "82", min: 10, max: 100, hint: "Only applies when exporting JPEG." });
      if (id === "image-rotator") return image + select("degrees", "Rotation", [["90","90° clockwise"],["180","180°"],["270","270° clockwise"]]);
      if (id === "image-color-picker") return image + '<div class="field-grid">' + number("x", "Pixel X coordinate") + number("y", "Pixel Y coordinate") + "</div>";
      return image;
    }
    if (id === "word-counter" || id === "character-counter" || id === "case-converter" || id === "remove-duplicate-lines" || id === "text-reverser" || id === "text-to-slug") {
      if (id === "case-converter") return text + select("case", "Convert to", [["upper","UPPERCASE"],["lower","lowercase"],["title","Title Case"],["sentence","Sentence case"],["alternating","aLtErNaTiNg"]]);
      if (id === "text-reverser") return text + select("reverseMode", "Reverse by", [["characters","Characters"],["words","Words"],["lines","Lines"]]);
      return text;
    }
    if (id === "find-replace") return text + '<div class="field-grid">' + field("find", "Find", "text", { required: true }) + field("replacement", "Replace with", "text") + "</div>" + '<label class="check-field"><input name="caseSensitive" type="checkbox"> Case-sensitive</label>';
    if (id === "lorem-ipsum-generator") return number("count", "Number of paragraphs (1–20)") + select("unit", "Length", [["paragraphs","Paragraphs"],["words","Words"]]);
    if (id === "scientific-calculator") return field("expression", "Expression", "text", { required: true, placeholder: "Example: sin(30) + sqrt(16)" }) + '<span class="field-hint">Trig functions use radians. Supports + − × ÷, parentheses, ^, %, pi, e, sin, cos, tan, sqrt, log, ln, abs and round.</span>';
    if (id === "percentage-calculator") return '<div class="field-grid">' + number("value", "Value") + number("percent", "Percentage (%)") + "</div>";
    if (id === "age-calculator") return date("birthDate", "Date of birth");
    if (id === "date-calculator") return '<div class="field-grid">' + date("dateA", "First date") + date("dateB", "Second date") + "</div>" + field("days", "Days to add (optional)", "number", { placeholder: "e.g. 30" });
    if (id === "bmi-calculator") return '<div class="field-grid">' + number("weight", "Weight (kg)") + number("height", "Height (cm)") + "</div>";
    if (id === "unit-converter" || id === "length-converter") {
      var units = id === "length-converter" ? [["m","Meters"],["km","Kilometers"],["cm","Centimeters"],["mm","Millimeters"],["mi","Miles"],["ft","Feet"],["in","Inches"],["yd","Yards"]] : [["m","Meters"],["km","Kilometers"],["cm","Centimeters"],["mi","Miles"],["ft","Feet"],["kg","Kilograms"],["g","Grams"],["lb","Pounds"],["s","Seconds"],["min","Minutes"],["h","Hours"]];
      return number("value", "Value") + '<div class="field-grid">' + select("from", "From", units) + select("to", "To", units) + "</div>";
    }
    if (id === "temperature-converter") return number("value", "Temperature") + '<div class="field-grid">' + select("from", "From", [["C","Celsius"],["F","Fahrenheit"],["K","Kelvin"]]) + select("to", "To", [["C","Celsius"],["F","Fahrenheit"],["K","Kelvin"]]) + "</div>";
    if (id.indexOf("json-") === 0 || id.indexOf("base64-") === 0 || id.indexOf("url-") === 0 || id === "html-entity-encoder") return text;
    if (id === "uuid-generator") return field("count", "Number of UUIDs (1–100)", "number", { value: 1, min: 1, max: 100, required: true });
    if (id === "study-timer") {
      var studySettings = window.NexoraStore.read("studySettings", { minutes: 25, seconds: 0 });
      return field("minutes", "Study duration (minutes)", "number", { value: studySettings.minutes || 25, min: 1, max: 180, required: true }) + field("seconds", "Additional seconds", "number", { value: studySettings.seconds || 0, min: 0, max: 59 });
    }
    if (id === "pomodoro-timer") {
      var pomodoroSettings = window.NexoraStore.read("pomodoroSettings", { minutes: 25, breakMinutes: 5 });
      return '<div class="field-grid">' + field("workMinutes", "Work (minutes)", "number", { value: pomodoroSettings.minutes || 25, min: 1, max: 180, required: true }) + field("breakMinutes", "Break (minutes)", "number", { value: pomodoroSettings.breakMinutes || 5, min: 1, max: 60, required: true }) + "</div>";
    }
    if (id === "grade-calculator") return field("scores", "Scores separated by commas", "textarea", { required: true, placeholder: "Example: 85, 92, 78" }) + field("maxScore", "Maximum score per assessment", "number", { value: 100, min: 1, required: true });
    if (id === "gpa-calculator") return field("grades", "Grade points and optional credits (grade:credits)", "textarea", { required: true, placeholder: "Example: 4:3, 3.5:4, 3:2" }) + field("scale", "GPA scale maximum", "number", { value: 4, min: 1, required: true });
    if (id === "exam-countdown") return date("examDate", "Exam date");
    if (id === "random-quiz") return field("questionCount", "Questions (1–10)", "number", { value: 5, min: 1, max: 10 });
    if (id === "hashtag-organizer") return field("text", "Your hashtags or keywords", "textarea", { wide: true, placeholder: "#design #design #web" });
    if (id === "caption-formatter") return field("text", "Caption", "textarea", { wide: true }) + field("hashtags", "Hashtags (optional)", "text", { placeholder: "#nexora #tools" }) + select("separator", "Hashtag separator", [["newline","New line"],["space","Space"],["dots","Blank line"]]);
    if (id === "youtube-description-formatter") return '<div class="field-grid">' + field("title", "Video title", "text") + field("links", "Links (one per line)", "textarea") + "</div>" + field("description", "Description", "textarea", { wide: true }) + field("callToAction", "Call to action", "text", { placeholder: "Subscribe for more" });
    if (id === "title-ideas-organizer") return field("text", "Your title ideas (one per line)", "textarea", { wide: true }) + select("sort", "Organize by", [["original","Original order"],["alpha","Alphabetical"],["short","Shortest first"]]);
    if (id === "video-script-planner") return '<div class="field-grid">' + field("topic", "Video topic", "text") + field("duration", "Target duration", "text", { placeholder: "e.g. 5 minutes" }) + "</div>" + field("notes", "Your notes / key points", "textarea", { wide: true });
    if (id === "social-bio-counter") return field("text", "Bio text", "textarea", { wide: true }) + select("platform", "Platform", [["instagram","Instagram (150 characters)"],["tiktok","TikTok (80 characters)"],["x","X (160 characters)"],["youtube","YouTube (1000 characters)"],["custom","Custom limit"]]) + field("customLimit", "Custom character limit", "number", { min: 1, value: 150 });
    if (id === "thumbnail-dimension-guide") return select("platform", "Platform", [["youtube","YouTube"],["instagram","Instagram"],["tiktok","TikTok"],["facebook","Facebook"]]);
    if (id === "todo-list") return field("item", "New task", "text", { required: true, placeholder: "What needs to be done?" });
    if (id === "daily-planner") return '<div class="field-grid">' + date("date", "Date") + field("time", "Time", "time") + "</div>" + field("item", "Plan item", "text", { required: true });
    if (id === "habit-tracker") return field("item", "Habit", "text", { required: true, placeholder: "e.g. Read for 20 minutes" });
    if (id === "notes-manager") return field("title", "Note title", "text", { placeholder: "Untitled note" }) + field("content", "Note", "textarea", { wide: true }) + field("query", "Search saved notes", "search", { placeholder: "Search title or note text" });
    if (id === "countdown-timer") return '<div class="field-grid">' + field("minutes", "Minutes", "number", { min: 0, value: 1 }) + field("seconds", "Seconds", "number", { min: 0, max: 59, value: 0 }) + "</div>";
    if (id === "stopwatch") return '<p class="muted">Use Start, Pause and Reset below to control the stopwatch.</p>';
    if (id === "qr-code-generator") return field("text", "Text or URL", "textarea", { wide: true, required: true, placeholder: "https://example.com" });
    return text;
  }

    function isTextResult(id) {
      return ["word-counter","character-counter","case-converter","remove-duplicate-lines","text-reverser","find-replace","text-to-slug","lorem-ipsum-generator","scientific-calculator","percentage-calculator","age-calculator","date-calculator","bmi-calculator","unit-converter","length-converter","temperature-converter","json-formatter","json-validator","base64-encoder","base64-decoder","url-encoder","url-decoder","html-entity-encoder","uuid-generator","grade-calculator","gpa-calculator","exam-countdown","hashtag-organizer","caption-formatter","youtube-description-formatter","title-ideas-organizer","video-script-planner","social-bio-counter","thumbnail-dimension-guide"].indexOf(id) >= 0;
    }
    function canDownload(id) {
      return isTextResult(id) || ["image-to-pdf","pdf-to-images","merge-pdf","split-pdf","rotate-pdf","compress-pdf","extract-pdf-pages","image-compressor","image-resizer","image-cropper","image-to-png","png-to-jpg","image-rotator","qr-code-generator"].indexOf(id) >= 0;
    }
    function renderToolPage(tool) {
      var related = tools.filter(function (candidate) { return candidate.category === tool.category && candidate.id !== tool.id; }).slice(0, 4);
      var actions = '<button class="button primary" type="submit">' + (tool.category === "pdf" || tool.category === "image" ? "Process" : tool.id === "stopwatch" ? "Initialize stopwatch" : "Run tool") + '</button><button class="button ghost" type="button" data-action="reset-tool">Reset</button>';
      if (isTextResult(tool.id)) actions += '<button class="button ghost" type="button" data-action="copy-result" disabled>Copy result</button>';
      if (canDownload(tool.id)) actions += '<button class="button ghost" type="button" data-action="download-result" disabled>Download result</button>';
      if (tool.category === "creator") actions += '<button class="button ghost" type="button" data-action="save-draft" disabled>Save draft locally</button>';
      var title = escapeHtml(tool.title);
      return '<div class="page-wrap page-enter"><div class="tool-layout"><section class="panel"><div class="tool-heading"><span class="tool-icon" aria-hidden="true">' + escapeHtml(tool.icon) + '</span><div><div class="eyebrow">' + escapeHtml(tool.categoryName) + '</div><h1>' + title + '</h1><p>' + escapeHtml(tool.description) + '</p></div></div>' +
        '<form class="tool-form" id="tool-form" data-tool="' + tool.id + '"><div class="field-grid">' + fieldsFor(tool.id) + '</div><div class="tool-actions">' + actions + '</div></form>' +
        '<div id="tool-result" class="result-box" aria-live="polite"></div><div id="tool-result-actions" class="result-actions"></div>' +
        (tool.category === "creator" ? renderSavedDraft(tool.id) : "") +
        (tool.id === "notes-manager" ? '<div id="managed-items" class="section"></div>' : ["todo-list","daily-planner","habit-tracker"].indexOf(tool.id) >= 0 ? '<div id="managed-items" class="section"></div>' : "") +
        (tool.id === "stopwatch" || tool.id === "countdown-timer" || tool.id === "study-timer" || tool.id === "pomodoro-timer" ? '<div class="tool-actions timer-controls"><button class="button primary" type="button" data-action="timer-start">Start</button><button class="button ghost" type="button" data-action="timer-pause">Pause</button><button class="button ghost" type="button" data-action="timer-reset">Reset</button></div>' : "") +
        '</section><aside class="tool-aside"><div class="privacy-card"><h3>Private processing</h3><p>Your input is processed locally in this browser. NEXORA does not upload your files or save tool input unless you explicitly add it to a local list.</p></div><div class="privacy-card"><h3>Related tools</h3><div class="related-list">' + related.map(function (item) { return '<a href="#/tool/' + encodeURIComponent(item.id) + '">' + escapeHtml(item.title) + ' →</a>'; }).join("") + '</div></div></aside></div></div>';
    }
    function renderCategory(id) {
      var category = categories.find(function (item) { return item.id === id; });
      if (!category) return renderNotFound();
      return '<div class="page-wrap page-enter"><div class="page-header"><div class="eyebrow">' + escapeHtml(category.name) + '</div><h1>' + escapeHtml(category.name) + ' tools</h1><p>' + escapeHtml(category.description) + '</p></div>' + renderCards(tools.filter(function (tool) { return tool.category === id; })) + '</div>';
    }
    function renderManagedPage(type) {
      if (type === "favorites") {
        var favorites = window.NexoraFavorites.all().map(findTool).filter(Boolean);
        return '<div class="page-wrap page-enter"><div class="page-header"><div class="eyebrow">YOUR WORKSPACE</div><h1>Favorites</h1><p>Tools you have saved in this browser.</p></div>' + renderCards(favorites, "No favorites yet", "Use the star on any tool card to save it here.") + '</div>';
      }
      var recent = window.NexoraHistory.all().map(findTool).filter(Boolean);
      return '<div class="page-wrap page-enter"><div class="section-heading page-header"><div><div class="eyebrow">YOUR WORKSPACE</div><h1>Recently used</h1><p>Tools appear here after you run them.</p></div>' + (recent.length ? '<button class="button ghost" type="button" data-action="clear-history">Clear history</button>' : "") + '</div>' + renderCards(recent, "No recent activity", "Run a tool and it will appear here.") + '</div>';
    }
    function renderLegal(type) {
      var blocks = {
        about: '<div class="eyebrow">ABOUT NEXORA</div><h1>Useful tools. No unnecessary friction.</h1><p>NEXORA is a free collection of browser-based utilities for students, developers, creators and everyday work. No account is required, and supported tasks run on your device.</p><h2>Our approach</h2><ul><li>Keep files in your browser and avoid server uploads.</li><li>Clearly distinguish practical templates from generated content.</li><li>Make the core tools available without payment or registration.</li></ul><p>Browser features and local storage behavior can vary. See the privacy page for storage details.</p><a class="button primary" href="#/tools">Explore the tools</a>',
        contact: '<div class="eyebrow">CONTACT</div><h1>Get in touch</h1><p>This offline project does not have a configured support inbox or backend contact form. No message is sent or stored centrally from this page.</p><p>For a deployed site, publish a real support address here before release. Do not enter sensitive information into an unconfigured form.</p>',
        privacy: '<div class="eyebrow">YOUR DATA</div><h1>Privacy policy</h1><p>NEXORA processes supported text, images and documents within your browser. This project includes no analytics, advertising, tracking scripts or remote APIs.</p><h2>Local storage</h2><p>Theme, favorites, recent tool history, timer settings and saved creator drafts are stored in browser LocalStorage. Notes, to-do items, habits and planner entries use IndexedDB. They remain on this device and may be removed by clearing site/browser data. Private browsing settings, storage quotas or browser support may limit persistence.</p><h2>Files and browser APIs</h2><p>Selected files are read locally and are not transmitted. The QR, PDF and image features use locally bundled scripts. Clipboard access may require a secure context or user permission. No files are sent to a server.</p><h2>Your controls</h2><p>Remove individual records in their tools, clear recent history, or export/import your local records below. The export includes IndexedDB records and local preferences/drafts. Import replaces the corresponding local record collections after confirmation.</p><div class="button-row"><button class="button primary" data-action="export-data" type="button">Export my local data</button><label class="button ghost" for="import-data">Import data</label><input id="import-data" type="file" accept="application/json,.json" hidden></div>',
        terms: '<div class="eyebrow">TERMS</div><h1>Terms of use</h1><p>NEXORA is provided as a free utility. Outputs should be reviewed before relying on them. You are responsible for retaining original files and verifying important calculations, conversions and generated documents.</p><p>Tools run subject to your browser capabilities and local resource limits. NEXORA does not promise that every input format or damaged file can be processed. BMI results are informational only and are not medical advice or a diagnosis.</p><p>Do not use the tools to infringe rights, violate laws or harm others.</p>'
      };
      var title = { about: "About", contact: "Contact", privacy: "Privacy policy", terms: "Terms of use" }[type] || "Page";
      return '<div class="page-wrap page-enter"><article class="panel page-copy">' + blocks[type] + '</article></div>';
    }
    function renderNotFound() {
      return '<div class="page-wrap page-enter"><div class="empty-state"><strong>Page not found</strong><a class="text-link" href="#/home">Return home →</a></div></div>';
    }
    function updateNavigation(route) {
      document.querySelectorAll("[data-route]").forEach(function (item) {
        var target = item.getAttribute("data-route");
        item.classList.toggle("active", target === route.type || route.type === "category" && target === "category-" + route.id || route.type === "tool" && target === "tools");
      });
    }
    function render() {
      var route = window.NexoraRouter.current();
      var view = $("#page-view");
      if (!view) return;
      view.querySelectorAll(".image-preview[data-url]").forEach(function (image) { URL.revokeObjectURL(image.getAttribute("data-url")); });
      view.querySelectorAll("img[data-revoke-url]").forEach(function (image) { URL.revokeObjectURL(image.getAttribute("data-revoke-url")); });
      if (route.type === "home") view.innerHTML = renderHome();
      else if (route.type === "tools") {
        var filtered = tools.filter(function (tool) {
          return (state.categoryFilter === "all" || tool.category === state.categoryFilter) && (!state.query || window.NexoraSearch.match(tool, state.query));
        });
        view.innerHTML = renderTools(filtered, "All tools", "Browse all 60 practical tools, or filter by category.");
        var searchContainer = document.createElement("div");
        searchContainer.className = "search-box";
        searchContainer.innerHTML = '<span class="search-icon" aria-hidden="true">⌕</span><input id="global-search" type="search" autocomplete="off" placeholder="Search tools…" aria-label="Search tools" value="' + escapeHtml(state.query) + '"><button class="clear-search" type="button" aria-label="Clear search" data-action="clear-search">×</button><div class="search-results" id="search-results" role="listbox"></div>';
        view.querySelector(".page-header").appendChild(searchContainer);
      } else if (route.type === "category") view.innerHTML = renderCategory(route.id);
      else if (route.type === "favorites" || route.type === "recent") view.innerHTML = renderManagedPage(route.type);
      else if (route.type === "tool") {
        var tool = findTool(route.id);
        view.innerHTML = tool ? renderToolPage(tool) : renderNotFound();
        if (tool && tool.category === "creator") restoreCreatorDraft(tool.id);
        if (tool && tool.id === "stopwatch") updateTimerDisplay();
        if (tool && ["todo-list","daily-planner","habit-tracker","notes-manager"].indexOf(tool.id) >= 0) loadManagedItems(tool.id);
      } else if (["about","contact","privacy","terms"].indexOf(route.type) >= 0) view.innerHTML = renderLegal(route.type);
      else view.innerHTML = renderNotFound();
      updateNavigation(route);
      var pageTitle = route.type === "tool" && findTool(route.id) ? findTool(route.id).title : route.type === "category" && categories.find(function (item) { return item.id === route.id; }) ? categories.find(function (item) { return item.id === route.id; }).name : ({ tools: "All Tools", favorites: "Favorites", recent: "Recently Used", about: "About", contact: "Contact", privacy: "Privacy", terms: "Terms" }[route.type] || "Home");
      document.title = pageTitle + " — NEXORA";
      $("#copyright-year").textContent = String(new Date().getFullYear());
      var sidebar = $("#sidebar");
      if (sidebar) sidebar.classList.remove("is-open");
      var menu = $(".mobile-menu-button");
      if (menu) menu.setAttribute("aria-expanded", "false");
    }

    function searchResults(input) {
      var results = $("#search-results");
      if (!results) return;
      state.query = input.trim();
      var matches = state.query ? tools.filter(function (tool) { return window.NexoraSearch.match(tool, state.query); }).slice(0, 8) : [];
      results.innerHTML = matches.map(function (tool, index) {
        return '<button class="search-result" role="option" aria-selected="false" data-action="open-tool" data-id="' + tool.id + '" data-index="' + index + '"><span class="tool-icon">' + escapeHtml(tool.icon) + '</span><span>' + escapeHtml(tool.title) + '<small>' + escapeHtml(tool.categoryName) + ' · ' + escapeHtml(tool.description) + '</small></span></button>';
      }).join("") || (state.query ? '<div class="search-result muted">No matching tools. Try another keyword.</div>' : "");
      if (window.NexoraRouter.current().type === "tools") {
        var list = $("#tool-list");
        var routeItems = tools.filter(function (tool) {
          return (state.categoryFilter === "all" || tool.category === state.categoryFilter) && (!state.query || window.NexoraSearch.match(tool, state.query));
        });
        if (list) list.innerHTML = renderCards(routeItems, "No matching tools", "Try another search or category.");
      }
    }

    function loadManagedItems(id) {
      var store = id === "todo-list" ? "todos" : id === "daily-planner" ? "planner" : id === "habit-tracker" ? "habits" : "notes";
      window.NexoraStore.list(store).then(function (rows) {
        var container = $("#managed-items");
        if (!container) return;
        var query = id === "notes-manager" ? (($('[name="query"]') || {}).value || "").trim().toLocaleLowerCase() : "";
        if (query) rows = rows.filter(function (row) { return (row.title + " " + row.content).toLocaleLowerCase().indexOf(query) >= 0; });
        rows.sort(function (a, b) { return String(b.createdAt || b.date || "").localeCompare(String(a.createdAt || a.date || "")); });
        if (!rows.length) {
          container.innerHTML = '<div class="empty-state"><strong>' + (query ? "No matching notes" : "Nothing saved yet") + '</strong>Entries you add will appear here and remain on this device.</div>';
          return;
        }
        container.innerHTML = '<h3>' + (id === "notes-manager" ? "Saved notes" : id === "daily-planner" ? "Planned items" : id === "habit-tracker" ? "Your habits" : "Your tasks") + '</h3>' + rows.map(function (row) {
          var title = escapeHtml(row.title || row.text || row.item || "Untitled");
          var detail = escapeHtml(row.content || row.date && (row.date + (row.time ? " · " + row.time : "")) || row.createdAt && new Date(row.createdAt).toLocaleDateString() || "");
          var completed = row.completed ? " completed" : "";
          var doneToday = Array.isArray(row.completedDates) ? row.completedDates.indexOf(localDateString()) >= 0 : row.lastDone === localDateString();
          var buttons = id === "habit-tracker" ? '<button class="button small ghost" data-action="habit-check" data-id="' + escapeHtml(row.id) + '">' + (doneToday ? "Done today" : "Mark today") + '</button>' : id === "notes-manager" ? '<button class="button small ghost" data-action="edit-note" data-id="' + escapeHtml(row.id) + '">Edit</button>' : id === "todo-list" ? '<button class="button small ghost" data-action="toggle-todo" data-id="' + escapeHtml(row.id) + '">' + (row.completed ? "Undo" : "Complete") + '</button><button class="button small ghost" data-action="edit-todo" data-id="' + escapeHtml(row.id) + '">Edit</button>' : "";
          buttons += '<button class="button small danger" data-action="delete-record" data-store="' + store + '" data-id="' + escapeHtml(row.id) + '" aria-label="Delete ' + title + '">Delete</button>';
          return '<div class="list-row' + completed + '"><div><strong class="list-row-title">' + title + '</strong>' + (detail ? '<div class="field-hint">' + detail + '</div>' : "") + '</div><div class="list-row-actions">' + buttons + '</div></div>';
        }).join("");
      }).catch(function (error) { notify(error.message || "Could not load locally saved items.", "error"); });
    }

    window.addEventListener("hashchange", render);
    document.addEventListener("input", function (event) {
      if (event.target && event.target.id === "global-search") searchResults(event.target.value);
      if (event.target && event.target.name === "query" && window.NexoraRouter.current().type === "tool") loadManagedItems("notes-manager");
      if (event.target && event.target.type === "file") showPreview(event.target);
    });
    document.addEventListener("keydown", function (event) {
      if (event.target && event.target.id === "global-search") {
        var buttons = Array.from(document.querySelectorAll("#search-results [data-action='open-tool']"));
        var active = buttons.indexOf(document.activeElement);
        if (event.key === "ArrowDown" && buttons.length) { event.preventDefault(); buttons[Math.min(active + 1, buttons.length - 1)].focus(); }
        if (event.key === "Escape") { event.target.value = ""; searchResults(""); }
      }
      if (event.target && event.target.classList.contains("search-result") && event.key === "ArrowDown") {
        event.preventDefault();
        var next = event.target.nextElementSibling;
        if (next && next.matches("button")) next.focus();
      }
    });

    function value(form, name) {
      var control = form.elements.namedItem(name);
      if (!control) return "";
      if (control.type === "checkbox") return control.checked;
      return control.value;
    }
    function files(form) {
      var control = form.elements.namedItem("files");
      return control && control.files ? Array.from(control.files) : [];
    }
    function requiredFiles(form, accepted) {
      var selected = files(form);
      if (!selected.length) throw new Error("Choose a file to continue.");
      selected.forEach(function (file) {
        if (accepted === "pdf" && file.type !== "application/pdf" && !/\.pdf$/i.test(file.name)) throw new Error("Choose a PDF file. The selected file does not appear to be a PDF.");
        if (accepted === "image" && !file.type.startsWith("image/") && !/\.(png|jpe?g|gif|webp|bmp)$/i.test(file.name)) throw new Error("Choose a supported image file.");
        if (file.size > 50 * 1024 * 1024) throw new Error("Each file must be 50 MB or smaller.");
      });
      if (selected.reduce(function (total, file) { return total + file.size; }, 0) > 100 * 1024 * 1024) throw new Error("The combined file size must be 100 MB or smaller.");
      return selected;
    }
    function readBuffer(file) {
      return file.arrayBuffer().catch(function () { throw new Error("The selected file could not be read."); });
    }
    function downloadBlob(blob, name) {
      var url = URL.createObjectURL(blob);
      var anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = name;
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(function () { URL.revokeObjectURL(url); }, 30000);
    }
    var lastResult = { text: "", files: [] };
    function setResult(text, type, downloads, html) {
      var result = $("#tool-result");
      if (!result) return;
      result.querySelectorAll("img[data-revoke-url]").forEach(function (image) { URL.revokeObjectURL(image.getAttribute("data-revoke-url")); });
      result.className = "result-box" + (type ? " " + type : "");
      result.textContent = "";
      if (html) result.innerHTML = html;
      else result.textContent = text == null ? "" : String(text);
      lastResult.text = text == null ? "" : String(text);
      lastResult.files = downloads || [];
      var actions = $("#tool-result-actions");
      if (actions) {
        actions.innerHTML = lastResult.files.map(function (item, index) {
          return '<button class="button small ghost" type="button" data-action="download-file" data-index="' + index + '">' + escapeHtml(item.label || ("Download " + (index + 1))) + '</button>';
        }).join("");
      }
      var toolId = ($("#tool-form") || {}).dataset && $("#tool-form").dataset.tool;
      var copyButton = $("#tool-form [data-action='copy-result']");
      if (copyButton) copyButton.disabled = !lastResult.text || type === "error" || lastResult.text === "Working…";
      var downloadButton = $("#tool-form [data-action='download-result']");
      if (downloadButton) {
        var isTextDownload = toolId && isTextResult(toolId) && Boolean(lastResult.text);
        downloadButton.disabled = type === "error" || lastResult.text === "Working…" || lastResult.files.length > 1 || !(lastResult.files.length || isTextDownload);
        if (lastResult.files.length > 1) downloadButton.title = "Use the individual download buttons below the result.";
      }
    }
    function requireText(text, label) {
      if (!String(text || "").trim()) throw new Error((label || "Input") + " cannot be empty.");
      return text;
    }
    function numeric(form, name, label, min, max) {
      var raw = value(form, name);
      if (raw === "") throw new Error(label + " is required.");
      var number = Number(raw);
      if (!Number.isFinite(number) || min != null && number < min || max != null && number > max) throw new Error(label + " must be a number" + (min != null ? " from " + min : "") + (max != null ? " to " + max : "") + ".");
      return number;
    }
    function graphemes(text) {
      if (window.Intl && Intl.Segmenter) return Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text), function (item) { return item.segment; });
      return Array.from(text);
    }
    function parsePages(input, count, allowBlank) {
      if (!input.trim() && allowBlank) return Array.from({ length: count }, function (_, index) { return index; });
      if (!input.trim()) throw new Error("Enter at least one page number or range.");
      var pages = new Set();
      input.split(",").forEach(function (part) {
        var match = part.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);
        if (!match) throw new Error("Use page numbers and ranges such as 1, 3-5.");
        var start = Number(match[1]);
        var end = match[2] ? Number(match[2]) : start;
        if (start < 1 || end < start || end > count) throw new Error("Page numbers must be between 1 and " + count + ".");
        for (var page = start; page <= end; page++) pages.add(page - 1);
      });
      return Array.from(pages).sort(function (a, b) { return a - b; });
    }
    function pdfDocument() {
      if (!window.PDFLib || !window.PDFLib.PDFDocument) throw new Error("The locally bundled PDF library could not be loaded.");
      return window.PDFLib.PDFDocument;
    }
    async function loadPdf(file) {
      var bytes = new Uint8Array(await readBuffer(file));
      try { return await pdfDocument().load(bytes, { ignoreEncryption: false }); }
      catch (error) { throw new Error("Could not read this PDF. It may be damaged, encrypted, or unsupported."); }
    }
    function canvasFor(file) {
      function decodeWithImage() {
        return new Promise(function (resolve, reject) {
          var image = new Image();
          var url = URL.createObjectURL(file);
          image.onload = function () {
            image.close = function () { URL.revokeObjectURL(url); };
            resolve(image);
          };
          image.onerror = function () {
            URL.revokeObjectURL(url);
            reject(new Error("Could not decode this image. Try a PNG, JPEG, GIF, WebP or SVG file."));
          };
          image.src = url;
        });
      }
      if (typeof createImageBitmap !== "function") return decodeWithImage();
      return createImageBitmap(file).catch(decodeWithImage);
    }
    function canvasBlob(canvas, type, quality) {
      return new Promise(function (resolve, reject) {
        canvas.toBlob(function (blob) {
          if (blob) resolve(blob);
          else reject(new Error("Your browser could not export this image format."));
        }, type, quality);
      });
    }
    function outputFile(blob, name, label) { return { blob: blob, name: name, label: label || "Download " + name }; }

    async function runPdf(id, form) {
      var filesSelected, doc, output, pages, selected, newDoc, bytes, blob;
      if (id === "image-to-pdf") {
        filesSelected = requiredFiles(form, "image");
        newDoc = await pdfDocument().create();
        for (var imageFile of filesSelected) {
          var bitmap = await canvasFor(imageFile);
          var canvas = document.createElement("canvas");
          canvas.width = bitmap.width; canvas.height = bitmap.height;
          canvas.getContext("2d").drawImage(bitmap, 0, 0);
          bitmap.close();
          var pngBlob = await canvasBlob(canvas, "image/png");
          var pngBytes = new Uint8Array(await readBuffer(pngBlob));
          var embedded = await newDoc.embedPng(pngBytes);
          var page = newDoc.addPage([embedded.width, embedded.height]);
          page.drawImage(embedded, { x: 0, y: 0, width: embedded.width, height: embedded.height });
        }
        bytes = await newDoc.save();
        blob = new Blob([bytes], { type: "application/pdf" });
        return { text: filesSelected.length + " image(s) added to a " + bytes.length.toLocaleString() + " byte PDF.", downloads: [outputFile(blob, "images.pdf")] };
      }
      filesSelected = requiredFiles(form, "pdf");
      if (id === "merge-pdf") {
        if (filesSelected.length < 2) throw new Error("Choose at least two PDF files to merge.");
        newDoc = await pdfDocument().create();
        for (var file of filesSelected) {
          doc = await loadPdf(file);
          pages = await newDoc.copyPages(doc, doc.getPageIndices());
          pages.forEach(function (pageItem) { newDoc.addPage(pageItem); });
        }
        bytes = await newDoc.save();
        return { text: "Merged " + filesSelected.length + " PDFs into " + newDoc.getPageCount() + " pages.", downloads: [outputFile(new Blob([bytes], { type: "application/pdf" }), "merged.pdf")] };
      }
      doc = await loadPdf(filesSelected[0]);
      var pageCount = doc.getPageCount();
      if (id === "pdf-page-counter") return { text: filesSelected[0].name + " contains " + pageCount + " page" + (pageCount === 1 ? "" : "s") + "." };
      if (id === "pdf-to-images") {
        if (!window.pdfjsLib) throw new Error("The locally bundled PDF renderer is unavailable.");
        var buffer = await readBuffer(filesSelected[0]);
        var pdfjs = window.pdfjsLib;
        pdfjs.GlobalWorkerOptions.workerSrc = "vendor/pdf.worker.min.js";
        var pdf = await pdfjs.getDocument({ data: new Uint8Array(buffer), disableWorker: true }).promise;
        if (pdf.numPages > 100) throw new Error("PDF to Images is limited to 100 pages per operation to protect browser memory.");
        var rendered = [];
        for (var pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          var pdfPage = await pdf.getPage(pageNumber);
          var viewport = pdfPage.getViewport({ scale: 1.5 });
          var canvasPage = document.createElement("canvas");
          canvasPage.width = Math.ceil(viewport.width); canvasPage.height = Math.ceil(viewport.height);
          await pdfPage.render({ canvasContext: canvasPage.getContext("2d"), viewport: viewport }).promise;
          var pageBlob = await canvasBlob(canvasPage, "image/png");
          rendered.push(outputFile(pageBlob, "page-" + pageNumber + ".png", "Download page " + pageNumber));
        }
        return { text: "Rendered " + rendered.length + " page(s) as PNG images.", downloads: rendered };
      }
      if (id === "rotate-pdf") {
        selected = parsePages(value(form, "pages"), pageCount, true);
        var degrees = Number(value(form, "degrees"));
        doc.getPages().forEach(function (pdfPage, index) {
          if (selected.indexOf(index) >= 0) pdfPage.setRotation(window.PDFLib.degrees(pdfPage.getRotation().angle + degrees));
        });
        output = await doc.save();
        return { text: "Rotated " + selected.length + " page(s).", downloads: [outputFile(new Blob([output], { type: "application/pdf" }), "rotated.pdf")] };
      }
      if (id === "compress-pdf") {
        var originalSize = filesSelected[0].size;
        output = await doc.save({ useObjectStreams: true });
        var savedSize = output.length;
        if (savedSize >= originalSize) return { text: "This PDF could not be made smaller by structural optimization. No smaller result is claimed (" + originalSize.toLocaleString() + " bytes original; " + savedSize.toLocaleString() + " bytes re-saved).", type: "error" };
        return { text: "Optimized PDF: " + originalSize.toLocaleString() + " → " + savedSize.toLocaleString() + " bytes (" + Math.round((1 - savedSize / originalSize) * 100) + "% smaller).", downloads: [outputFile(new Blob([output], { type: "application/pdf" }), "optimized.pdf")] };
      }
      selected = parsePages(value(form, "pages"), pageCount, false);
      newDoc = await pdfDocument().create();
      pages = await newDoc.copyPages(doc, selected);
      pages.forEach(function (pageItem) { newDoc.addPage(pageItem); });
      output = await newDoc.save();
      var outputName = id === "split-pdf" ? "split-pages.pdf" : "extracted-pages.pdf";
      return { text: "Created a " + pages.length + "-page PDF from the selected pages.", downloads: [outputFile(new Blob([output], { type: "application/pdf" }), outputName)] };
    }

    async function runImage(id, form) {
      var selected = requiredFiles(form, "image")[0];
      if (id === "image-metadata-viewer") {
        var metadataBitmap = await canvasFor(selected);
        var metadata = selected.name + "\nType: " + (selected.type || "unknown") + "\nFile size: " + selected.size.toLocaleString() + " bytes\nImage dimensions: " + metadataBitmap.width + " × " + metadataBitmap.height + " px";
        metadataBitmap.close();
        return { text: metadata + "\n\nOnly browser-readable file properties are shown; embedded EXIF metadata is not decoded." };
      }
      var bitmap = await canvasFor(selected);
      var width = bitmap.width, height = bitmap.height;
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (id === "image-color-picker") {
        var x = Math.floor(numeric(form, "x", "Pixel X", 0, width - 1));
        var y = Math.floor(numeric(form, "y", "Pixel Y", 0, height - 1));
        canvas.width = width; canvas.height = height; ctx.drawImage(bitmap, 0, 0);
        var pixel = ctx.getImageData(x, y, 1, 1).data;
        bitmap.close();
        var hex = "#" + Array.from(pixel).slice(0, 3).map(function (v) { return v.toString(16).padStart(2, "0"); }).join("").toUpperCase();
        return { text: "Pixel (" + x + ", " + y + ")\nHEX: " + hex + "\nRGB: " + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + "\nAlpha: " + (pixel[3] / 255).toFixed(3) };
      }
      var degrees = id === "image-rotator" ? Number(value(form, "degrees")) : 0;
      var rotated = degrees === 90 || degrees === 270;
      var outputWidth = width, outputHeight = height;
      if (id === "image-resizer") {
        outputWidth = Math.floor(numeric(form, "width", "Width", 1, 12000));
        outputHeight = Math.floor(numeric(form, "height", "Height", 1, 12000));
        if (value(form, "keepRatio")) outputHeight = Math.max(1, Math.round(outputWidth * height / width));
      } else if (id === "image-cropper") {
        var cropX = Math.floor(numeric(form, "x", "Left", 0, width - 1));
        var cropY = Math.floor(numeric(form, "y", "Top", 0, height - 1));
        outputWidth = Math.floor(numeric(form, "width", "Crop width", 1, width - cropX));
        outputHeight = Math.floor(numeric(form, "height", "Crop height", 1, height - cropY));
        canvas.width = outputWidth; canvas.height = outputHeight;
        ctx.drawImage(bitmap, cropX, cropY, outputWidth, outputHeight, 0, 0, outputWidth, outputHeight);
      } else if (rotated) {
        outputWidth = degrees === 90 || degrees === 270 ? height : width;
        outputHeight = degrees === 90 || degrees === 270 ? width : height;
      }
      if (id !== "image-cropper") {
        canvas.width = outputWidth; canvas.height = outputHeight;
        if (id === "image-rotator") {
          ctx.translate(outputWidth / 2, outputHeight / 2);
          ctx.rotate(degrees * Math.PI / 180);
          ctx.drawImage(bitmap, -width / 2, -height / 2);
        } else {
          if (id === "png-to-jpg") { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, outputWidth, outputHeight); }
          ctx.drawImage(bitmap, 0, 0, outputWidth, outputHeight);
        }
      }
      bitmap.close();
      var type = id === "png-to-jpg" ? "image/jpeg" : id === "image-to-png" ? "image/png" : selected.type === "image/jpeg" ? "image/jpeg" : "image/png";
      var quality = Math.max(.1, Math.min(1, Number(value(form, "quality") || 82) / 100));
      var imageBlob = await canvasBlob(canvas, type, type === "image/jpeg" ? quality : undefined);
      var original = selected.size;
      var resultText = "Output: " + outputWidth + " × " + outputHeight + " px · " + imageBlob.size.toLocaleString() + " bytes\nOriginal: " + width + " × " + height + " px · " + original.toLocaleString() + " bytes";
      if (id === "image-compressor" && imageBlob.size >= original) resultText += "\nThe exported file is not smaller. Try a lower JPEG quality or a different format.";
      if (id === "png-to-jpg" && selected.type === "image/png") resultText += "\nTransparency was composited onto a white background for JPEG.";
      var extension = type === "image/jpeg" ? "jpg" : "png";
      var imageUrl = URL.createObjectURL(imageBlob);
      return { text: resultText, html: escapeHtml(resultText) + '<br><img class="image-preview" data-revoke-url="' + imageUrl + '" src="' + imageUrl + '" alt="Processed image preview">', downloads: [outputFile(imageBlob, "nexora-image." + extension)] };
    }

    function runText(id, form) {
      var text = value(form, "text");
      if (id === "lorem-ipsum-generator") {
        var count = Math.floor(numeric(form, "count", "Count", 1, 20));
        var unit = value(form, "unit");
        var source = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo at nibh tincidunt facilisis. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.";
        var words = source.split(/\s+/);
        if (unit === "words") return { text: Array.from({ length: count }, function (_, index) { return words[index % words.length]; }).join(" ") + "." };
        return { text: Array.from({ length: count }, function (_, index) { return source + (index ? " " + words.slice(0, 6).join(" ") + "." : ""); }).join("\n\n") };
      }
      if (id === "word-counter") {
        var trimmed = text.trim();
        var wordsFound = trimmed ? (trimmed.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) || []) : [];
        var sentences = (trimmed.match(/[.!?]+(?:\s|$)/g) || []).length + (trimmed && !/[.!?]$/.test(trimmed) ? 1 : 0);
        var paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter(Boolean).length : 0;
        return { text: "Words: " + wordsFound.length + "\nCharacters (with spaces): " + graphemes(text).length + "\nCharacters (without spaces): " + graphemes(text.replace(/\s/g, "")).length + "\nSentences: " + sentences + "\nParagraphs: " + paragraphs + "\nEstimated reading time: " + Math.ceil(wordsFound.length / 200) + " min" };
      }
      if (id === "character-counter") return { text: "Characters (Unicode graphemes): " + graphemes(text).length + "\nCharacters (code points): " + Array.from(text).length + "\nCharacters (UTF-16 units): " + text.length + "\nWithout spaces: " + graphemes(text.replace(/\s/g, "")).length };
      requireText(text);
      if (id === "case-converter") {
        var mode = value(form, "case");
        var result = mode === "upper" ? text.toLocaleUpperCase() : mode === "lower" ? text.toLocaleLowerCase() : mode === "title" ? text.toLocaleLowerCase().replace(/(^|[\s([{])([\p{L}\p{N}])/gu, function (_, before, letter) { return before + letter.toLocaleUpperCase(); }) : mode === "sentence" ? text.toLocaleLowerCase().replace(/(^\s*|[.!?]\s+)([\p{L}])/gu, function (_, before, letter) { return before + letter.toLocaleUpperCase(); }) : graphemes(text).map(function (char, index) { return index % 2 ? char.toLocaleLowerCase() : char.toLocaleUpperCase(); }).join("");
        return { text: result };
      }
      if (id === "remove-duplicate-lines") {
        var seen = new Set();
        var unique = text.split(/\r?\n/).filter(function (line) {
          var key = line.trim();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        return { text: unique.join("\n") };
      }
      if (id === "text-reverser") {
        var modeReverse = value(form, "reverseMode");
        if (modeReverse === "words") return { text: text.trim().split(/\s+/).reverse().join(" ") };
        if (modeReverse === "lines") return { text: text.split(/\r?\n/).reverse().join("\n") };
        return { text: graphemes(text).reverse().join("") };
      }
      if (id === "find-replace") {
        var find = requireText(value(form, "find"), "Find text");
        var replacement = value(form, "replacement");
        var caseSensitive = value(form, "caseSensitive");
        var searchPattern = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        var replaced = text.replace(new RegExp(searchPattern, caseSensitive ? "g" : "gi"), function () { return replacement; });
        return { text: replaced };
      }
      if (id === "text-to-slug") {
        var slug = text.trim().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().replace(/&/g, " and ").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
        return { text: slug || "No slug could be created from this text." };
      }
      throw new Error("This text operation is unavailable.");
    }

    function runDeveloper(id, form) {
      if (id === "uuid-generator") {
        var count = Math.floor(numeric(form, "count", "Count", 1, 100));
        var ids = [];
        for (var i = 0; i < count; i++) {
          if (crypto.randomUUID) ids.push(crypto.randomUUID());
          else {
            if (!crypto.getRandomValues) throw new Error("A secure random generator is not available in this browser.");
            var bytes = crypto.getRandomValues(new Uint8Array(16));
            bytes[6] = (bytes[6] & 15) | 64;
            bytes[8] = (bytes[8] & 63) | 128;
            var hex = Array.from(bytes, function (byte) { return byte.toString(16).padStart(2, "0"); }).join("");
            ids.push(hex.slice(0,8) + "-" + hex.slice(8,12) + "-" + hex.slice(12,16) + "-" + hex.slice(16,20) + "-" + hex.slice(20));
          }
        }
        return { text: ids.join("\n") };
      }
      var input = value(form, "text");
      requireText(input);
      if (id === "json-formatter" || id === "json-validator") {
        try {
          var parsed = JSON.parse(input);
          return { text: id === "json-formatter" ? JSON.stringify(parsed, null, 2) : "Valid JSON.\nRoot value type: " + (parsed === null ? "null" : Array.isArray(parsed) ? "array" : typeof parsed) };
        } catch (error) {
          throw new Error("Invalid JSON: " + error.message);
        }
      }
      if (id === "base64-encoder") {
        var encodedBytes = new TextEncoder().encode(input);
        var binary = Array.from(encodedBytes, function (byte) { return String.fromCharCode(byte); }).join("");
        return { text: btoa(binary) };
      }
      if (id === "base64-decoder") {
        try {
          var decoded = atob(input.replace(/\s/g, ""));
          var bytes = Uint8Array.from(decoded, function (char) { return char.charCodeAt(0); });
          return { text: new TextDecoder("utf-8", { fatal: true }).decode(bytes) };
        } catch (error) {
          throw new Error("Invalid Base64 or the decoded bytes are not valid UTF-8.");
        }
      }
      if (id === "url-encoder") return { text: encodeURIComponent(input) };
      if (id === "url-decoder") {
        try { return { text: decodeURIComponent(input.replace(/\+/g, " ")) }; }
        catch (error) { throw new Error("Invalid percent-encoded URL text."); }
      }
      if (id === "html-entity-encoder") return { text: input.replace(/[&<>"']/g, function (char) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]; }) };
      throw new Error("This developer operation is unavailable.");
    }

    function evaluateExpression(source) {
      var tokens = [];
      var expression = source.trim().replace(/\bpi\b/gi, "pi").replace(/\b([a-z]+)\s*\(/gi, "$1(");
      var pattern = /\s*(\d+(?:\.\d*)?(?:e[+-]?\d+)?|\.\d+(?:e[+-]?\d+)?|[a-z]+|[()+\-*/%^,])/igy;
      var position = 0, match;
      while (position < expression.length) {
        pattern.lastIndex = position;
        match = pattern.exec(expression);
        if (!match) throw new Error("Unexpected character near: " + expression.slice(position, position + 12));
        tokens.push(match[1]);
        position = pattern.lastIndex;
      }
      var index = 0;
      function peek() { return tokens[index]; }
      function consume(expected) {
        var token = tokens[index];
        if (expected && token !== expected) throw new Error("Expected '" + expected + "'.");
        index++;
        return token;
      }
      function primary() {
        var token = peek();
        if (token === "(") { consume("("); var inside = add(); consume(")"); return inside; }
        if (!token) throw new Error("Expression is incomplete.");
        if (/^(?:\d|\.)/.test(token)) { consume(); return Number(token); }
        if (/^[a-z]+$/i.test(token)) {
          consume();
          if (token.toLowerCase() === "pi") return Math.PI;
          if (token.toLowerCase() === "e") return Math.E;
          var functions = { sin: Math.sin, cos: Math.cos, tan: Math.tan, sqrt: Math.sqrt, log: Math.log10 || function (n) { return Math.log(n) / Math.LN10; }, ln: Math.log, abs: Math.abs, round: Math.round };
          var fn = functions[token.toLowerCase()];
          if (!fn) throw new Error("Unknown function or constant: " + token);
          consume("("); var argument = add(); consume(")");
            if ((token === "sqrt" || token === "log" || token === "ln") && argument < 0) throw new Error(token + " requires a non-negative value.");
          return fn(argument);
        }
        throw new Error("Unexpected token: " + token);
      }
      function power() {
        var left = primary();
        if (peek() === "^") { consume(); return Math.pow(left, unary()); }
        return left;
      }
      function unary() {
        if (peek() === "+" || peek() === "-") {
          var sign = consume();
          var argument = unary();
          return sign === "-" ? -argument : argument;
        }
        return power();
      }
      function multiply() {
        var result = unary();
        while (peek() === "*" || peek() === "/" || peek() === "%") {
          var op = consume(), right = unary();
          if ((op === "/" || op === "%") && right === 0) throw new Error("Division by zero is not allowed.");
          result = op === "*" ? result * right : op === "/" ? result / right : result % right;
        }
        return result;
      }
      function add() {
        var result = multiply();
        while (peek() === "+" || peek() === "-") { var op = consume(), right = multiply(); result = op === "+" ? result + right : result - right; }
        return result;
      }
      if (!tokens.length) throw new Error("Enter an arithmetic expression.");
      var result = add();
      if (index !== tokens.length) throw new Error("Unexpected token: " + peek());
      if (!Number.isFinite(result)) throw new Error("The result is outside the supported numeric range.");
      return result;
    }

    function runCalculator(id, form) {
      if (id === "scientific-calculator") return { text: String(evaluateExpression(requireText(value(form, "expression"), "Expression"))) };
      if (id === "percentage-calculator") {
        var amount = numeric(form, "value", "Value");
        var percent = numeric(form, "percent", "Percentage");
        return { text: percent + "% of " + amount + " = " + (amount * percent / 100) };
      }
      if (id === "age-calculator") {
        var birth = new Date(value(form, "birthDate") + "T00:00:00Z");
        var today = new Date(); today = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
        if (Number.isNaN(birth.getTime()) || birth > today) throw new Error("Enter a valid birth date that is not in the future.");
        var years = today.getUTCFullYear() - birth.getUTCFullYear();
        var months = today.getUTCMonth() - birth.getUTCMonth();
        var days = today.getUTCDate() - birth.getUTCDate();
        if (days < 0) { months--; days += new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 0)).getUTCDate(); }
        if (months < 0) { years--; months += 12; }
        return { text: "Age: " + years + " years, " + months + " months, " + days + " days." };
      }
      if (id === "date-calculator") {
        var dateA = new Date(value(form, "dateA") + "T00:00:00Z");
        var dateB = new Date(value(form, "dateB") + "T00:00:00Z");
        if (Number.isNaN(dateA.getTime()) || Number.isNaN(dateB.getTime())) throw new Error("Enter valid dates.");
        var dateDiff = Math.round(Math.abs(dateB - dateA) / 86400000);
        var shift = value(form, "days");
        var shifted = "";
        if (shift !== "") {
          if (!Number.isInteger(Number(shift))) throw new Error("Days to add must be a whole number.");
          var shiftedDate = new Date(dateA.getTime() + Number(shift) * 86400000);
          if (Number.isNaN(shiftedDate.getTime())) throw new Error("Enter a valid number of days.");
          shifted = "\nFirst date plus " + shift + " days: " + shiftedDate.toISOString().slice(0, 10);
        }
        return { text: "Difference: " + dateDiff + " days." + shifted };
      }
      if (id === "bmi-calculator") {
        var kg = numeric(form, "weight", "Weight", .1, 1000);
        var cm = numeric(form, "height", "Height", 30, 300);
        var bmi = kg / Math.pow(cm / 100, 2);
        var category = bmi < 18.5 ? "below the commonly referenced adult range" : bmi < 25 ? "within the commonly referenced adult range" : bmi < 30 ? "above the commonly referenced adult range" : "in the higher adult BMI ranges";
        return { text: "BMI: " + bmi.toFixed(1) + " (" + category + ").\n\nBMI is a rough screening measure, not a diagnosis. It does not account for individual factors such as age, pregnancy, body composition or health history. Consult a qualified health professional for advice." };
      }
      if (id === "temperature-converter") {
        var temp = numeric(form, "value", "Temperature");
        var fromTemp = value(form, "from"), toTemp = value(form, "to");
        if (fromTemp === "K" && temp < 0) throw new Error("Temperature cannot be below absolute zero.");
        var celsius = fromTemp === "C" ? temp : fromTemp === "F" ? (temp - 32) * 5 / 9 : temp - 273.15;
        var converted = toTemp === "C" ? celsius : toTemp === "F" ? celsius * 9 / 5 + 32 : celsius + 273.15;
        if (toTemp === "K" && converted < 0) throw new Error("Temperature cannot be below absolute zero.");
        return { text: temp + " " + fromTemp + " = " + converted.toFixed(4).replace(/\.?0+$/, "") + " " + toTemp };
      }
      if (id === "unit-converter" || id === "length-converter") {
        var from = value(form, "from"), to = value(form, "to");
        var valueIn = numeric(form, "value", "Value");
        var factors = { m: 1, km: 1000, cm: .01, mi: 1609.344, ft: .3048, mm: .001, in: .0254, yd: .9144, kg: 1, g: .001, lb: .45359237, s: 1, min: 60, h: 3600 };
        var types = { m: "length", km: "length", cm: "length", mi: "length", ft: "length", mm: "length", in: "length", yd: "length", kg: "mass", g: "mass", lb: "mass", s: "time", min: "time", h: "time" };
        if (!factors[from] || !factors[to] || types[from] !== types[to]) throw new Error("Choose units from the same measurement group.");
        return { text: valueIn + " " + from + " = " + (valueIn * factors[from] / factors[to]).toPrecision(8).replace(/\.?0+$/, "") + " " + to };
      }
      throw new Error("This calculator is unavailable.");
    }

    var quizBank = [
      { q: "Which planet is known as the Red Planet?", choices: ["Venus", "Mars", "Jupiter", "Mercury"], a: 1 },
      { q: "What is the chemical symbol for water?", choices: ["CO₂", "O₂", "H₂O", "NaCl"], a: 2 },
      { q: "How many sides does a hexagon have?", choices: ["Five", "Six", "Seven", "Eight"], a: 1 },
      { q: "Which is the largest ocean on Earth?", choices: ["Atlantic", "Indian", "Arctic", "Pacific"], a: 3 },
      { q: "What is the capital of Japan?", choices: ["Seoul", "Tokyo", "Kyoto", "Osaka"], a: 1 },
      { q: "Which gas do plants absorb from the atmosphere?", choices: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], a: 2 },
      { q: "How many bits are in a byte?", choices: ["4", "8", "16", "32"], a: 1 },
      { q: "Which instrument measures temperature?", choices: ["Barometer", "Thermometer", "Altimeter", "Hygrometer"], a: 1 },
      { q: "What is the square root of 144?", choices: ["10", "11", "12", "14"], a: 2 },
      { q: "Which continent contains the Sahara Desert?", choices: ["Asia", "Africa", "South America", "Australia"], a: 1 }
    ];
    function runStudent(id, form) {
      if (id === "study-timer" || id === "pomodoro-timer") {
        var minutes = numeric(form, id === "study-timer" ? "minutes" : "workMinutes", "Minutes", 1, 180);
        var seconds = id === "study-timer" ? Number(value(form, "seconds") || 0) : 0;
        if (id === "study-timer") {
          seconds = numeric(form, "seconds", "Additional seconds", 0, 59);
          window.NexoraStore.write("studySettings", { minutes: minutes, seconds: seconds });
        } else {
          var breakMinutes = numeric(form, "breakMinutes", "Break duration", 1, 60);
          window.NexoraStore.write("pomodoroSettings", { minutes: minutes, breakMinutes: breakMinutes });
        }
        state.activeTimer = { ownerId: id, kind: id === "pomodoro-timer" ? "pomodoro" : "countdown", remaining: minutes * 60 + seconds, total: minutes * 60 + seconds, running: false, breakSeconds: id === "pomodoro-timer" ? breakMinutes * 60 : 0, onBreak: false };
        updateTimerDisplay();
        return { text: "Timer ready. Press Start to begin." };
      }
      if (id === "grade-calculator" || id === "gpa-calculator") {
        var raw = value(form, id === "grade-calculator" ? "scores" : "grades");
        var max = id === "grade-calculator" ? numeric(form, "maxScore", "Maximum score", .0001) : numeric(form, "scale", "GPA scale", .0001);
        if (id === "grade-calculator") {
          var scores = raw.split(/[,\s]+/).filter(Boolean).map(Number);
          if (!scores.length || scores.some(function (n) { return !Number.isFinite(n) || n < 0 || n > max; })) throw new Error("Enter valid scores from 0 to " + max + ", separated by commas.");
          var average = scores.reduce(function (a, b) { return a + b; }, 0) / scores.length;
          return { text: "Average score: " + average.toFixed(2) + " / " + max + " (" + (average / max * 100).toFixed(1) + "%)" };
        }
        var courses = raw.split(/[,\s]+/).filter(Boolean).map(function (entry) {
          var parts = entry.split(":");
          var grade = Number(parts[0]);
          var credits = parts.length === 2 ? Number(parts[1]) : 1;
          if (parts.length > 2 || !Number.isFinite(grade) || grade < 0 || grade > max || !Number.isFinite(credits) || credits <= 0) throw new Error("Enter grade points from 0 to " + max + ", with optional positive credits as grade:credits.");
          return { grade: grade, credits: credits };
        });
        if (!courses.length) throw new Error("Enter at least one grade, optionally followed by credits as grade:credits.");
        var totalCredits = courses.reduce(function (sum, course) { return sum + course.credits; }, 0);
        var weighted = courses.reduce(function (sum, course) { return sum + course.grade * course.credits; }, 0) / totalCredits;
        return { text: "Weighted GPA: " + weighted.toFixed(2) + " / " + max + "\nCourses: " + courses.length + " · Credits: " + totalCredits };
      }
      if (id === "exam-countdown") {
        var exam = new Date(value(form, "examDate") + "T00:00:00Z");
        var today = new Date(localDateString() + "T00:00:00Z").getTime();
        if (Number.isNaN(exam.getTime())) throw new Error("Enter a valid exam date.");
        var days = Math.round((exam.getTime() - today) / 86400000);
        return { text: days < 0 ? "This exam date was " + Math.abs(days) + " days ago." : days === 0 ? "Your exam date is today." : days + " day" + (days === 1 ? "" : "s") + " until your exam." };
      }
      if (id === "random-quiz") {
        var count = Math.floor(numeric(form, "questionCount", "Question count", 1, 10));
        var shuffled = quizBank.slice().sort(function () { return Math.random() - .5; }).slice(0, count);
        state.currentQuiz = shuffled;
        var markup = shuffled.map(function (item, index) {
          return '<fieldset class="quiz-question" style="border:0;border-bottom:1px solid var(--border);padding:12px 0"><legend><strong>' + (index + 1) + ". " + escapeHtml(item.q) + '</strong></legend>' + item.choices.map(function (choice, choiceIndex) {
            return '<label class="check-field"><input type="radio" name="quiz-' + index + '" value="' + choiceIndex + '"> ' + escapeHtml(choice) + '</label>';
          }).join("") + '<span class="quiz-feedback field-hint" id="quiz-feedback-' + index + '"></span></fieldset>';
        }).join("");
        return { html: markup + '<button class="button primary" type="button" data-action="quiz-submit">Check answers</button>', text: "" };
      }
      throw new Error("This student tool is unavailable.");
    }

    function runCreator(id, form) {
      var text = value(form, "text");
      if (id === "hashtag-organizer") {
        requireText(text);
        var hashtags = Array.from(new Set(text.split(/[\s,]+/).filter(Boolean).map(function (tag) {
          var normalized = tag.replace(/^#+/, "").replace(/[^\p{L}\p{N}_]/gu, "");
          return normalized ? "#" + normalized : "";
        }).filter(Boolean)));
        return { text: hashtags.join(" ") };
      }
      if (id === "caption-formatter") {
        requireText(text, "Caption");
        var tags = value(form, "hashtags").trim();
        var separator = value(form, "separator") === "dots" ? "\n\n" : value(form, "separator") === "space" ? " " : "\n";
        return { text: text.trim() + (tags ? separator + tags.split(/\s+/).map(function (tag) { return tag.startsWith("#") ? tag : "#" + tag; }).join(" ") : "") };
      }
      if (id === "youtube-description-formatter") {
        var title = value(form, "title").trim();
        var description = value(form, "description").trim();
        var links = value(form, "links").trim();
        var cta = value(form, "callToAction").trim();
        if (!title && !description && !links && !cta) throw new Error("Add at least one description section.");
        return { text: [title ? title.toLocaleUpperCase() : "", description, cta ? "\n" + cta : "", links ? "\nLinks:\n" + links : ""].filter(Boolean).join("\n\n") };
      }
      if (id === "title-ideas-organizer") {
        requireText(text, "Title ideas");
        var lines = text.split(/\r?\n/).map(function (line) { return line.trim(); }).filter(Boolean);
        var sort = value(form, "sort");
        if (sort === "alpha") lines.sort(function (a, b) { return a.localeCompare(b); });
        if (sort === "short") lines.sort(function (a, b) { return a.length - b.length; });
        return { text: lines.map(function (line, index) { return (index + 1) + ". " + line; }).join("\n") };
      }
      if (id === "video-script-planner") {
        var topic = value(form, "topic").trim();
        var duration = value(form, "duration").trim();
        var notes = value(form, "notes").trim();
        if (!topic && !notes) throw new Error("Add a video topic or some notes.");
        return { text: ["VIDEO SCRIPT OUTLINE", topic ? "Topic: " + topic : "", duration ? "Target duration: " + duration : "", "", "1. HOOK\n[Write an opening that earns attention]", "", "2. INTRODUCTION\n[Introduce the topic and set expectations]", "", "3. MAIN POINTS\n" + (notes || "[Add your key points here]"), "", "4. CLOSE\n[Summarize and add your call to action]"].filter(function (line) { return line !== ""; }).join("\n") };
      }
      if (id === "social-bio-counter") {
        var count = graphemes(text).length;
        var platform = value(form, "platform");
        var limits = { instagram: 150, tiktok: 80, x: 160, youtube: 1000, custom: numeric(form, "customLimit", "Custom limit", 1, 100000) };
        var limit = limits[platform];
        return { text: "Characters: " + count + " / " + limit + "\n" + (count > limit ? (count - limit) + " characters over the selected limit." : (limit - count) + " characters remaining.") };
      }
      if (id === "thumbnail-dimension-guide") {
        var dimensions = { youtube: "YouTube video thumbnail: 1280 × 720 px · 16:9 aspect ratio · JPG, GIF or PNG · keep file size within the platform's current upload limit.", instagram: "Instagram feed portrait: 1080 × 1350 px · 4:5 ratio. Square: 1080 × 1080 px · 1:1 ratio.", tiktok: "TikTok cover image: design around 1080 × 1920 px · 9:16 ratio, keeping important text away from interface overlays.", facebook: "Facebook link/share image: 1200 × 630 px · approximately 1.91:1 ratio." };
        return { text: dimensions[value(form, "platform")] + "\nPlatform guidance can change; confirm current requirements before publishing." };
      }
      throw new Error("This creator utility is unavailable.");
    }

    function makeId() {
      if (crypto.randomUUID) return crypto.randomUUID();
      return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
    }
    function runProductivity(id, form) {
      var store, record;
      if (id === "todo-list") {
        var task = requireText(value(form, "item"), "Task").trim();
        record = { id: makeId(), title: task, completed: false, createdAt: new Date().toISOString() };
        return window.NexoraStore.put("todos", record).then(function () { loadManagedItems(id); return { text: "Task saved on this device." }; });
      }
      if (id === "daily-planner") {
        var planItem = requireText(value(form, "item"), "Plan item").trim();
        record = { id: makeId(), title: planItem, date: value(form, "date"), time: value(form, "time"), createdAt: new Date().toISOString() };
        return window.NexoraStore.put("planner", record).then(function () { loadManagedItems(id); return { text: "Plan item saved on this device." }; });
      }
      if (id === "habit-tracker") {
        var habit = requireText(value(form, "item"), "Habit").trim();
        return window.NexoraStore.list("habits").then(function (rows) {
          var existing = rows.find(function (row) { return row.title.toLocaleLowerCase() === habit.toLocaleLowerCase(); });
          if (existing) throw new Error("That habit is already being tracked.");
          return window.NexoraStore.put("habits", { id: makeId(), title: habit, createdAt: new Date().toISOString(), lastDone: "", completedDates: [] });
        }).then(function () { loadManagedItems(id); return { text: "Habit added to your tracker." }; });
      }
      if (id === "notes-manager") {
        var title = value(form, "title").trim();
        var content = value(form, "content").trim();
        if (!title && !content) throw new Error("Enter a note title or note text.");
        record = { id: makeId(), title: title || "Untitled note", content: content, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        return window.NexoraStore.put("notes", record).then(function () { loadManagedItems(id); return { text: "Note saved on this device." }; });
      }
      if (id === "stopwatch") {
        state.activeTimer = state.activeTimer && state.activeTimer.kind === "stopwatch" && state.activeTimer.ownerId === "stopwatch" ? state.activeTimer : { ownerId: "stopwatch", kind: "stopwatch", elapsed: 0, running: false };
        return { text: "Stopwatch ready. Press Start to begin." };
      }
      if (id === "countdown-timer") {
        var minutes = numeric(form, "minutes", "Minutes", 0, 100000);
        var seconds = numeric(form, "seconds", "Seconds", 0, 59);
        if (minutes + seconds === 0) throw new Error("Set a duration greater than zero.");
        state.activeTimer = { ownerId: id, kind: "countdown", remaining: minutes * 60 + seconds, total: minutes * 60 + seconds, running: false, onBreak: false };
        updateTimerDisplay();
        return { text: "Countdown ready. Press Start to begin." };
      }
      if (id === "qr-code-generator") {
        var qrText = requireText(value(form, "text"), "Text or URL");
        if (qrText.length > 2000) throw new Error("QR input must be 2,000 characters or fewer.");
        if (typeof window.qrcode !== "function") throw new Error("The locally bundled QR generator could not be loaded.");
        var qr = window.qrcode(0, "M");
        qr.addData(qrText);
        qr.make();
        var dataUrl = qr.createDataURL(8, 2);
        return { html: '<div><p>QR code generated locally. Scan it to confirm the content before sharing.</p><img class="qr-preview" src="' + dataUrl + '" alt="Generated QR code"></div>', text: "QR code generated.", downloads: [outputFile(dataUrl, "nexora-qr.png", "Download QR code")] };
      }
      throw new Error("This productivity tool is unavailable.");
    }

    function runTool(id, form) {
      if (["image-to-pdf","pdf-to-images","merge-pdf","split-pdf","rotate-pdf","compress-pdf","pdf-page-counter","extract-pdf-pages"].indexOf(id) >= 0) return runPdf(id, form);
      if (id.indexOf("image-") === 0 || id === "png-to-jpg") return runImage(id, form);
      if (["word-counter","character-counter","case-converter","remove-duplicate-lines","text-reverser","find-replace","text-to-slug","lorem-ipsum-generator"].indexOf(id) >= 0) return runText(id, form);
      if (["scientific-calculator","percentage-calculator","age-calculator","date-calculator","bmi-calculator","unit-converter","length-converter","temperature-converter"].indexOf(id) >= 0) return runCalculator(id, form);
      if (["json-formatter","json-validator","base64-encoder","base64-decoder","url-encoder","url-decoder","html-entity-encoder","uuid-generator"].indexOf(id) >= 0) return runDeveloper(id, form);
      if (["study-timer","pomodoro-timer","grade-calculator","gpa-calculator","exam-countdown","random-quiz"].indexOf(id) >= 0) return runStudent(id, form);
      if (["hashtag-organizer","caption-formatter","youtube-description-formatter","title-ideas-organizer","video-script-planner","social-bio-counter","thumbnail-dimension-guide"].indexOf(id) >= 0) return runCreator(id, form);
      return runProductivity(id, form);
    }

    function formatTime(totalSeconds) {
      var seconds = Math.max(0, Math.floor(totalSeconds));
      var hours = Math.floor(seconds / 3600);
      var minutes = Math.floor((seconds % 3600) / 60);
      var rest = seconds % 60;
      return (hours ? String(hours).padStart(2, "0") + ":" : "") + String(minutes).padStart(2, "0") + ":" + String(rest).padStart(2, "0");
    }
    function updateTimerDisplay() {
      var timer = state.activeTimer;
      if (!timer) return;
      var display = timer.kind === "stopwatch" ? formatTime(timer.elapsed) : formatTime(timer.remaining);
      var phase = timer.kind === "pomodoro" ? (timer.onBreak ? "Break" : "Focus") + " · " : "";
      var result = $("#tool-result");
      if (result) {
        result.className = "result-box";
        result.textContent = phase + display + (timer.running ? " · Running" : " · Paused");
      }
    }
    function timerStart() {
      var timer = state.activeTimer;
      var route = window.NexoraRouter.current();
      if (timer && timer.ownerId && timer.ownerId !== route.id) {
        notify("Set up this timer before starting it.", "error");
        return;
      }
      if (!timer) {
        if (route.type === "tool" && route.id === "stopwatch") {
          state.activeTimer = timer = { ownerId: "stopwatch", kind: "stopwatch", elapsed: 0, running: false };
        } else {
          notify("Set up the timer with Run tool before starting.", "error");
          return;
        }
      }
      if (timer.running) return;
      timer.running = true;
      if (state.timerInterval) clearInterval(state.timerInterval);
      state.timerInterval = window.setInterval(function () {
        if (timer.kind === "stopwatch") timer.elapsed++;
        else timer.remaining--;
        if (timer.kind !== "stopwatch" && timer.remaining <= 0) {
          if (timer.kind === "pomodoro") {
            timer.onBreak = !timer.onBreak;
            timer.remaining = timer.onBreak ? timer.breakSeconds : timer.total;
            notify(timer.onBreak ? "Focus session complete. Break time." : "Break complete. Start the next focus session.", "success");
        } else {
            timer.remaining = 0;
            timer.running = false;
            clearInterval(state.timerInterval);
            state.timerInterval = null;
            notify("Timer complete.", "success");
          }
        }
        updateTimerDisplay();
      }, 1000);
      updateTimerDisplay();
    }
    function timerPause() {
      if (!state.activeTimer) return;
      state.activeTimer.running = false;
      if (state.timerInterval) clearInterval(state.timerInterval);
      state.timerInterval = null;
      updateTimerDisplay();
    }
    function timerReset() {
      timerPause();
      if (!state.activeTimer) return;
      if (state.activeTimer.kind === "stopwatch") state.activeTimer.elapsed = 0;
      else {
        state.activeTimer.remaining = state.activeTimer.total;
        state.activeTimer.onBreak = false;
      }
      updateTimerDisplay();
    }
    function showPreview(input) {
      var file = input.files && input.files[0];
      var parent = input.closest(".field");
      if (!parent) return;
      parent.querySelectorAll(".image-preview[data-url], .file-preview-note").forEach(function (old) {
        if (old.dataset.url) URL.revokeObjectURL(old.dataset.url);
        old.remove();
      });
      if (!file) return;
      var note = document.createElement("div");
      note.className = "file-preview-note field-hint";
      note.textContent = file.name + " · " + file.size.toLocaleString() + " bytes";
      parent.appendChild(note);
      if (file.type.startsWith("image/") && input.name === "files") {
        var preview = document.createElement("img");
        preview.className = "image-preview";
        preview.alt = "Selected image preview";
        preview.dataset.url = URL.createObjectURL(file);
        preview.src = preview.dataset.url;
        parent.appendChild(preview);
      }
    }
    function resetToolForm() {
      var form = $("#tool-form");
      if (form) form.reset();
      timerPause();
      state.activeTimer = null;
      setResult("", "", []);
      document.querySelectorAll(".image-preview, .file-preview-note").forEach(function (item) {
        if (item.dataset.url) URL.revokeObjectURL(item.dataset.url);
        item.remove();
      });
    }
    async function copyText(text) {
      if (!text) { notify("There is no result to copy.", "error"); return; }
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(text);
        else {
          var area = document.createElement("textarea");
          area.value = text; area.style.position = "fixed"; area.style.opacity = "0";
          document.body.appendChild(area); area.select();
          var copied = document.execCommand("copy");
          area.remove();
          if (!copied) throw new Error("Clipboard access is unavailable.");
        }
        notify("Copied to clipboard.", "success");
      } catch (error) {
        notify("Could not copy. Your browser may require clipboard permission or a secure context; you can select the result and copy it manually.", "error");
      }
    }
    function downloadItem(item) {
      if (!item) return;
      if (typeof item.blob === "string" && item.blob.indexOf("data:") === 0) {
        var anchor = document.createElement("a");
        anchor.href = item.blob; anchor.download = item.name; anchor.click();
        return;
      }
      downloadBlob(item.blob, item.name);
    }
    function exportData() {
      window.NexoraStore.exportData().then(function (data) {
        downloadBlob(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }), "nexora-local-data.json");
        notify("Local data exported.", "success");
      }).catch(function (error) { notify(error.message || "Could not export local data.", "error"); });
    }
    function importData(file) {
      if (!file) return;
      if (file.size > 10 * 1024 * 1024) { notify("Import file must be 10 MB or smaller.", "error"); return; }
      if (!window.confirm("Importing replaces your current saved tasks, plans, habits and notes. Continue?")) return;
      file.text().then(function (text) {
        var payload;
        try { payload = JSON.parse(text); } catch (error) { throw new Error("The selected file is not valid JSON."); }
        return window.NexoraStore.importData(payload);
      }).then(function () {
        window.NexoraTheme.apply(window.NexoraStore.read("theme", "dark"));
        notify("Local data imported.", "success");
        render();
      }).catch(function (error) { notify(error.message || "Could not import local data.", "error"); });
    }
    function saveCreatorDraft() {
      var form = $("#tool-form");
      var id = form && form.getAttribute("data-tool");
      var tool = findTool(id);
      if (!tool || tool.category !== "creator" || !lastResult.text) throw new Error("Run this creator tool before saving a draft.");
      var input = {};
      Array.from(form.elements).forEach(function (control) {
        if (control.name && control.type !== "file" && control.type !== "submit" && control.type !== "button") input[control.name] = control.value;
      });
      var drafts = creatorDrafts();
      drafts[id] = { input: input, output: lastResult.text, savedAt: new Date().toISOString() };
      window.NexoraStore.write("creatorDrafts", drafts);
      var draftRoot = $(".saved-draft");
      if (draftRoot) draftRoot.outerHTML = renderSavedDraft(id);
      notify("Draft saved in this browser.", "success");
    }

    document.addEventListener("submit", function (event) {
      var form = event.target;
      if (!form || form.id !== "tool-form") return;
      event.preventDefault();
      var id = form.getAttribute("data-tool");
      var submit = form.querySelector('button[type="submit"]');
      if (submit) { submit.disabled = true; submit.textContent = "Working…"; }
      var saveButton = form.querySelector('[data-action="save-draft"]');
      if (saveButton) saveButton.disabled = true;
      setResult("Working…", "", []);
      Promise.resolve().then(function () { return runTool(id, form); }).then(function (result) {
        if (result && result.html) setResult(result.text || "", result.type || "", result.downloads || [], result.html);
        else setResult(result && result.text || "", result && result.type || "", result && result.downloads || []);
        if (result && result.type === "error") notify(result.text, "error");
        else {
          window.NexoraHistory.add(id);
          if (saveButton && result && result.text) saveButton.disabled = false;
          notify("Done.", "success");
        }
      }).catch(function (error) {
        setResult(error.message || "The operation could not be completed.", "error");
        notify(error.message || "The operation could not be completed.", "error");
      }).finally(function () {
        var currentSubmit = $("#tool-form button[type='submit']");
        if (currentSubmit) {
          currentSubmit.disabled = false;
          currentSubmit.textContent = currentSubmit.closest("form").dataset.tool === "stopwatch" ? "Initialize stopwatch" : ["pdf","image"].indexOf((findTool(id) || {}).category) >= 0 ? "Process" : "Run tool";
        }
      });
    });

    document.addEventListener("click", function (event) {
      var button = event.target.closest("[data-action]");
      if (!button) return;
      var action = button.getAttribute("data-action");
      if (action === "favorite") {
        window.NexoraFavorites.toggle(button.getAttribute("data-id"));
        render();
      } else if (action === "open-tool") {
        window.NexoraRouter.go("tool/" + encodeURIComponent(button.getAttribute("data-id")));
      } else if (action === "filter") {
        state.categoryFilter = button.getAttribute("data-category");
        render();
      } else if (action === "clear-search") {
        var input = $("#global-search");
        if (input) { input.value = ""; state.query = ""; searchResults(""); input.focus(); }
      } else if (action === "toggle-menu") {
        var sidebar = $("#sidebar");
        var opened = sidebar.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(opened));
      } else if (action === "theme") {
        window.NexoraTheme.toggle();
      } else if (action === "clear-history") {
        if (window.confirm("Clear your recently used tools list?")) {
          window.NexoraHistory.clear();
          render();
        }
      } else if (action === "reset-tool") {
        resetToolForm();
      } else if (action === "copy-result") {
        copyText(lastResult.text);
      } else if (action === "save-draft") {
        try { saveCreatorDraft(); } catch (error) { notify(error.message || "Could not save this draft.", "error"); }
      } else if (action === "load-draft") {
        var savedDraft = creatorDrafts()[button.getAttribute("data-id")];
        if (!savedDraft || typeof savedDraft.output !== "string") notify("This saved draft is no longer available.", "error");
        else {
          setResult(savedDraft.output, "", []);
          var saveButton = $("#tool-form [data-action='save-draft']");
          if (saveButton) saveButton.disabled = false;
          notify("Saved output loaded.", "success");
        }
      } else if (action === "download-result") {
        if (lastResult.files.length === 1) downloadItem(lastResult.files[0]);
        else if (lastResult.files.length > 1) notify("Use the individual page download buttons below the result.", "error");
        else if (lastResult.text) downloadBlob(new Blob([lastResult.text], { type: "text/plain;charset=utf-8" }), "nexora-result.txt");
        else notify("There is no result to download.", "error");
      } else if (action === "download-file") {
        downloadItem(lastResult.files[Number(button.getAttribute("data-index"))]);
      } else if (action === "timer-start") {
        timerStart();
      } else if (action === "timer-pause") {
        timerPause();
      } else if (action === "timer-reset") {
        timerReset();
      } else if (action === "export-data") {
        exportData();
      } else if (action === "delete-record") {
        var store = button.getAttribute("data-store");
        var recordId = button.getAttribute("data-id");
        if (window.confirm("Delete this saved item from this device?")) {
          window.NexoraStore.remove(store, recordId).then(function () {
            loadManagedItems(window.NexoraRouter.current().id);
            notify("Saved item deleted.", "success");
          }).catch(function (error) { notify(error.message || "Could not delete the item.", "error"); });
        }
      } else if (action === "toggle-todo") {
        var todoId = button.getAttribute("data-id");
        window.NexoraStore.get("todos", todoId).then(function (todo) {
          if (!todo) throw new Error("That task no longer exists.");
          todo.completed = !todo.completed;
          todo.updatedAt = new Date().toISOString();
          return window.NexoraStore.put("todos", todo);
        }).then(function () { loadManagedItems("todo-list"); }).catch(function (error) { notify(error.message || "Could not update the task.", "error"); });
      } else if (action === "edit-todo") {
        var editTodoId = button.getAttribute("data-id");
        window.NexoraStore.get("todos", editTodoId).then(function (todo) {
          if (!todo) throw new Error("That task no longer exists.");
          var updatedTitle = window.prompt("Edit task:", todo.title);
          if (updatedTitle === null) return;
          if (!updatedTitle.trim()) throw new Error("A task cannot be empty.");
          todo.title = updatedTitle.trim();
          todo.updatedAt = new Date().toISOString();
          return window.NexoraStore.put("todos", todo);
        }).then(function () { loadManagedItems("todo-list"); }).catch(function (error) { notify(error.message || "Could not update the task.", "error"); });
      } else if (action === "edit-note") {
        var noteId = button.getAttribute("data-id");
        window.NexoraStore.get("notes", noteId).then(function (note) {
          if (!note) throw new Error("That note no longer exists.");
          var newTitle = window.prompt("Edit note title:", note.title);
          if (newTitle === null) return;
          var newContent = window.prompt("Edit note text:", note.content);
          if (newContent === null) return;
          note.title = newTitle.trim() || "Untitled note";
          note.content = newContent;
          note.updatedAt = new Date().toISOString();
          return window.NexoraStore.put("notes", note);
        }).then(function () { loadManagedItems("notes-manager"); }).catch(function (error) { notify(error.message || "Could not update the note.", "error"); });
      } else if (action === "habit-check") {
        var habitId = button.getAttribute("data-id");
        window.NexoraStore.get("habits", habitId).then(function (habit) {
          if (!habit) throw new Error("That habit no longer exists.");
          var today = localDateString();
          var completedDates = Array.isArray(habit.completedDates) ? habit.completedDates : habit.lastDone ? [habit.lastDone] : [];
          var completionIndex = completedDates.indexOf(today);
          if (completionIndex >= 0) completedDates.splice(completionIndex, 1);
          else completedDates.push(today);
          habit.completedDates = completedDates;
          habit.lastDone = completedDates.slice().sort().pop() || "";
          return window.NexoraStore.put("habits", habit);
        }).then(function () { loadManagedItems("habit-tracker"); }).catch(function (error) { notify(error.message || "Could not update the habit.", "error"); });
      } else if (action === "quiz-submit") {
        var quiz = state.currentQuiz || [];
        var score = 0;
        quiz.forEach(function (item, index) {
          var selected = $('input[name="quiz-' + index + '"]:checked');
          var feedback = $("#quiz-feedback-" + index);
          if (!selected) feedback.textContent = "Choose an answer.";
          else if (Number(selected.value) === item.a) { score++; feedback.textContent = "Correct."; }
          else feedback.textContent = "Not quite. Correct answer: " + item.choices[item.a] + ".";
        });
        notify("Quiz score: " + score + " / " + quiz.length, score ? "success" : "");
      }
    });
    document.addEventListener("change", function (event) {
      if (event.target && event.target.id === "import-data") importData(event.target.files[0]);
      if (event.target && event.target.type === "file") showPreview(event.target);
    });
    document.addEventListener("dragover", function (event) {
      if (event.target.closest('.field input[type="file"]')) event.preventDefault();
    });
    document.addEventListener("drop", function (event) {
      var input = event.target.closest('.field input[type="file"]');
      if (!input) return;
      event.preventDefault();
      if (event.dataTransfer && event.dataTransfer.files.length) {
        input.files = event.dataTransfer.files;
        showPreview(input);
      }
    });

    categoryNav();
    render();
}());
