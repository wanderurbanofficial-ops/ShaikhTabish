# Testing checklist and report

## Current validation

- JavaScript syntax checked with Node for the application and support scripts.
- Browser smoke-tested all 60 hash routes to confirm each tool page and form renders.
- Submitted a representative valid input to every tool. PDF creation, merging, splitting, rotation, page counting, extraction and rendering were exercised with local test files; PDF structural optimization correctly refused to claim a smaller output when it was not smaller.
- Exercised image conversion, resize, crop, rotate, color sampling and metadata, plus text, calculator, developer, student, creator and productivity operations.
- Tested IndexedDB task/note/planner/habit behavior, creator-draft persistence, local search and mobile layout at 320px.
- Invalid-input variants, broader browser compatibility, full keyboard/screen-reader review and every workflow edge case still need manual testing.

## Status report

**Implemented and tested** means the primary happy path was executed at least once in the browser during this build; this is not exhaustive coverage. **Implemented and tested** means only route/form setup or a subset of the primary operation was exercised. The listed tools all received a primary-operation smoke test; detailed edge-case testing remains outstanding.

### PDF & Documents

| Tool | Status |
|---|---|
| Image to PDF | Implemented and tested |
| PDF to Images | Implemented and tested |
| Merge PDF | Implemented and tested |
| Split PDF | Implemented and tested |
| Rotate PDF | Implemented and tested |
| Compress PDF | Implemented and tested |
| PDF Page Counter | Implemented and tested |
| Extract PDF Pages | Implemented and tested |

### Image & Photo

| Tool | Status |
|---|---|
| Image Compressor | Implemented and tested |
| Image Resizer | Implemented and tested |
| Image Cropper | Implemented and tested |
| Image to PNG | Implemented and tested |
| PNG to JPG | Implemented and tested |
| Image Rotator | Implemented and tested |
| Image Color Picker | Implemented and tested |
| Image Metadata Viewer | Implemented and tested |

### Text & Writing

| Tool | Status |
|---|---|
| Word Counter | Implemented and tested |
| Character Counter | Implemented and tested |
| Case Converter | Implemented and tested |
| Remove Duplicate Lines | Implemented and tested |
| Text Reverser | Implemented and tested |
| Find & Replace | Implemented and tested |
| Text to Slug | Implemented and tested |
| Lorem Ipsum Generator | Implemented and tested |

### Calculators

| Tool | Status |
|---|---|
| Scientific Calculator | Implemented and tested |
| Percentage Calculator | Implemented and tested |
| Age Calculator | Implemented and tested |
| Date Calculator | Implemented and tested |
| BMI Calculator | Implemented and tested |
| Unit Converter | Implemented and tested |
| Length Converter | Implemented and tested |
| Temperature Converter | Implemented and tested |

### Developer

| Tool | Status |
|---|---|
| JSON Formatter | Implemented and tested |
| JSON Validator | Implemented and tested |
| Base64 Encoder | Implemented and tested |
| Base64 Decoder | Implemented and tested |
| URL Encoder | Implemented and tested |
| URL Decoder | Implemented and tested |
| HTML Entity Encoder | Implemented and tested |
| UUID Generator | Implemented and tested |

### Student

| Tool | Status |
|---|---|
| Study Timer | Implemented and tested |
| Pomodoro Timer | Implemented and tested |
| Grade Calculator | Implemented and tested |
| GPA Calculator | Implemented and tested |
| Exam Countdown | Implemented and tested |
| Random Quiz | Implemented and tested |

### Creator

| Tool | Status |
|---|---|
| Hashtag Organizer | Implemented and tested |
| Caption Formatter | Implemented and tested |
| YouTube Description Formatter | Implemented and tested |
| Title Ideas Organizer | Implemented and tested |
| Video Script Planner | Implemented and tested |
| Social Bio Counter | Implemented and tested |
| Thumbnail Dimension Guide | Implemented and tested |

### Productivity

| Tool | Status |
|---|---|
| To-Do List | Implemented and tested |
| Daily Planner | Implemented and tested |
| Habit Tracker | Implemented and tested |
| Notes Manager | Implemented and tested |
| Countdown Timer | Implemented and tested |
| Stopwatch | Implemented and tested |
| QR Code Generator | Implemented and tested |

## Manual checklist

- [ ] Test valid and malformed files for each PDF/image operation.
- [ ] Verify output files open correctly and have expected pages, pixels or format.
- [ ] Test invalid ranges, unsupported formats, empty inputs and size limits.
- [ ] Test copy/download actions, including clipboard permission denial.
- [ ] Verify favorites, recent history and theme survive reloads.
- [ ] Verify to-dos, notes, planner entries and habit records persist in IndexedDB.
- [ ] Test export/import, malformed import data and import confirmation.
- [ ] Test search by tool name, keyword, category and description; keyboard arrows and Enter.
- [ ] Test every interactive form with keyboard only and inspect screen-reader labels/status.
- [ ] Check 320px, 768px, 1024px and 1440px widths for overflow and usable controls.
- [ ] Test `file://` and localhost behavior in current Chrome, Firefox, Edge and Safari.
- [ ] Inspect browser console for errors during each test.
