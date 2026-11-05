# NEXORA feature inventory

NEXORA is a static, local-first web app. It requires no build system or server-side code to open `index.html`.

## Included tools

### PDF & Documents

1. Image to PDF — create a PDF from one or more browser-decoded images.
2. PDF to Images — render PDF pages as downloadable PNG files (maximum 100 pages).
3. Merge PDF — combine at least two PDFs in the selected order.
4. Split PDF — export a selected set/range of pages as a new PDF.
5. Rotate PDF — rotate selected pages or all pages.
6. Compress PDF — structurally re-save; offers a download only when the output is smaller.
7. PDF Page Counter — read PDF page count.
8. Extract PDF Pages — copy a selected set/range of pages into a new PDF.

PDF inputs are limited to 50 MB per file and 100 MB combined. Encrypted, malformed or unsupported PDFs return an error. Re-saving does not promise image recompression.

### Image & Photo

9. Image Compressor — export PNG or JPEG as appropriate and show actual input/output sizes.
10. Image Resizer — set pixel dimensions; optional aspect-ratio lock.
11. Image Cropper — crop by pixel origin and size.
12. Image to PNG — canvas export that preserves alpha.
13. PNG to JPG — JPEG export with white compositing for transparency.
14. Image Rotator — rotate by 90°, 180° or 270°.
15. Image Color Picker — sample a selected pixel coordinate as HEX/RGB/alpha.
16. Image Metadata Viewer — show filename, MIME type, byte size and decoded dimensions. Embedded EXIF is not decoded.

Image files remain local. Browser image decoder/canvas support determines which input formats can be processed.

### Text & Writing

17. Word Counter — words, characters, sentences, paragraphs and estimated reading time.
18. Character Counter — grapheme, code-point and UTF-16 counts.
19. Case Converter — upper, lower, title, sentence and alternating case.
20. Remove Duplicate Lines — preserve first occurrence.
21. Text Reverser — reverse by grapheme, word or line.
22. Find & Replace — literal search, optionally case-sensitive.
23. Text to Slug — normalize and create a URL-friendly slug.
24. Lorem Ipsum Generator — create placeholder words or paragraphs.

### Calculators

25. Scientific Calculator — safe arithmetic parser and common single-argument functions; trigonometry uses radians.
26. Percentage Calculator — calculate a percentage of a value.
27. Age Calculator — calculate elapsed years, months and days from a birth date.
28. Date Calculator — calculate date difference and optionally shift a date.
29. BMI Calculator — metric BMI with an explicit non-diagnostic disclaimer.
30. Unit Converter — compatible length, mass and time units.
31. Length Converter — metric and imperial length units.
32. Temperature Converter — Celsius, Fahrenheit and Kelvin.

### Developer

33. JSON Formatter — parse and pretty-print JSON.
34. JSON Validator — validate JSON and report parser diagnostics.
35. Base64 Encoder — UTF-8 text to Base64.
36. Base64 Decoder — Base64 to UTF-8 text with strict decoding errors.
37. URL Encoder — encode a URL component.
38. URL Decoder — decode percent encoding.
39. HTML Entity Encoder — escape HTML-significant characters; does not execute input.
40. UUID Generator — generate UUID v4 identifiers using the browser secure random API.

### Student

41. Study Timer — configurable countdown.
42. Pomodoro Timer — alternating focus and break countdowns.
43. Grade Calculator — mean assessment score and percentage for a configurable maximum.
44. GPA Calculator — credit-weighted GPA; enter `grade:credits` pairs or grades alone (default one credit each).
45. Exam Countdown — days until or since a selected date.
46. Random Quiz — offline multiple-choice questions with answer feedback.

### Creator

47. Hashtag Organizer — normalize and deduplicate user-provided hashtags.
48. Caption Formatter — add hashtags with selected separation.
49. YouTube Description Formatter — arrange title, description, CTA and links.
50. Title Ideas Organizer — organize user-written ideas; does not generate titles.
51. Video Script Planner — editable outline based on the user's own topic and notes.
52. Social Bio Counter — Unicode character count and selected platform limit.
53. Thumbnail Dimension Guide — common platform dimension guidance; verify current platform rules before publishing.

Creator utilities can save their current form values and output locally, reload the saved values, and copy or download the output.

### Productivity

54. To-Do List — add, edit, complete and delete local tasks.
55. Daily Planner — save dated items and times locally.
56. Habit Tracker — save habits and toggle today's completion locally.
57. Notes Manager — add, search, edit and delete notes locally.
58. Countdown Timer — configurable browser timer.
59. Stopwatch — start, pause and reset a browser stopwatch.
60. QR Code Generator — local QR generation and PNG download.

## Shared application features

- Home, All Tools, eight category views, Favorites, Recently Used, About, Contact, Privacy and Terms views.
- Instant name/keyword/category/description search with keyboard focus navigation.
- Local favorites, most-recently-used tool history and theme preference.
- LocalStorage preferences and IndexedDB task/note/planner/habit records.
- JSON export/import for local records, with import confirmation and structure validation.
- Responsive navigation, reduced-motion support, visible keyboard focus and status notifications.
- No remote analytics, tracking scripts, API calls or file uploads.
