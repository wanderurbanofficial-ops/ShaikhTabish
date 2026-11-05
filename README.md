# NEXORA

**Create. Convert. Simplify.** NEXORA is a free, browser-based collection of 60 practical tools. It has no sign-in, backend, paid API, analytics or runtime CDN dependency.

## Open the app

1. Keep the `vendor/` folder beside `index.html`; the locally bundled PDF and QR libraries are loaded from it.
2. Open `index.html` directly in a modern browser. No Node.js server or build step is required.
3. If a browser restricts storage or a specific file API for `file://` pages, open the same folder using a local static server or a trusted HTTPS host. This project does not start a server itself.

The app uses classic scripts and hash-based navigation, so its pages work without server-side routing. The `<link rel="canonical">` and Open Graph URL in `index.html` are deployment placeholders; replace `https://example.com/` before publishing. No public hosting or indexing is implied.
For deployment, replace the canonical/OG URL and publish an appropriate `robots.txt` and sitemap only after the real public URL and indexing policy are decided.

## Browser support and limitations

Recent versions of Chrome, Edge, Firefox and Safari are recommended. PDF/image operations need browser `File`, Canvas, Blob and download support. Clipboard writing can require permission or a secure context. IndexedDB and LocalStorage behavior for `file://` URLs varies by browser and private-browsing settings; use localhost or HTTPS if local persistence is blocked.

All selected files are processed in the browser and are not uploaded. PDF/image inputs are capped at 50 MB each and 100 MB combined; PDF-to-images is limited to 100 pages. The PDF compressor performs structural re-saving and only offers a download when the resulting PDF is actually smaller; it does not promise image recompression. Image metadata shows browser-readable properties and dimensions, not embedded EXIF fields. Platform dimensions and limits can change.

The scientific calculator uses radians for trigonometric functions. BMI is informational only, not a diagnosis. Creator utilities format and organize user-entered material; they do not generate AI content. Contact is informational until a real support address is configured.

## Local libraries

The project includes local browser builds in `vendor/`:

- `pdf-lib.min.js` for PDF creation, merging, page extraction and rotation.
- `pdf.min.js` and `pdf.worker.min.js` (PDF.js) for rendering PDFs to images.
- `qrcode.js` for local QR-code generation.

No package installation is needed to run the app. Preserve each vendor file's included license notice when redistributing it, and verify the corresponding license requirements for your deployment. No library is fetched from a CDN at runtime.

## Local data

- LocalStorage: theme preference, favorite IDs, recent tool IDs, timer preferences and saved creator drafts.
- IndexedDB: to-do items, planner entries, habit records and notes.
- Use **Export my local data** and **Import data** on the Privacy page to back up or restore app data. This includes IndexedDB records and local preferences/drafts. Import replaces the related saved collections after confirmation.
- Browser data clearing removes local app data. NEXORA does not transmit this data.

## Project map

- `index.html`: app shell, metadata, local script loading.
- `css/`: design system, themes, responsive rules and animations.
- `js/`: tool registry, client-side navigation, rendering, storage and operations.
- `vendor/`: locally bundled open-source browser libraries.
- `docs/features.md`: feature inventory and implementation notes.
- `docs/testing.md`: manual checklist and current test status.

## Add a tool

1. Add its metadata to the `tools` registry in `js/app.js` and assign an existing category.
2. Add its input fields in `fieldsFor(id)`.
3. Implement its operation in the matching category handler (`runPdf`, `runImage`, `runText`, `runCalculator`, `runDeveloper`, `runStudent`, `runCreator` or `runProductivity`) and route it from `runTool`.
4. Add the tool to `isTextResult` and/or `canDownload` only when those actions apply.
5. Add the tool to the checklist in `docs/testing.md`, then test its valid and invalid inputs, keyboard use, mobile layout and persistence behavior if applicable.

## Testing

Run `node --check .\\js\\app.js` (and the other files under `js/`) for syntax checks. Open `index.html` and follow `docs/testing.md` for browser checks. The testing report distinguishes primary-operation smoke tests from broader edge-case and compatibility coverage.
