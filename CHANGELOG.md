# Changelog

All notable changes to Simple Doc are documented in this file.

## [1.0.1]—2025-04-14

### Added

- Ability to scale watermark text
- Updated example to showcase more features

### Fixed

- Layering of the optional watermark (in front of everything else)
- Text highlighting conflicts resolved, new stand-alone system

## [1.0.0]—2025-04-13

### Added
- Complete template system: `template.tex`, `titlepage.tex`, `gfm-to-latex.lua`
- YAML-driven configuration via `master.yaml`
- GFM admonition support: NOTE, TIP, WARNING, IMPORTANT, CAUTION, SUMMARY, EXAMPLE
- Custom callout titles
- Automatic image centering with width and height constraints
- Proportional table column widths
- Page breaks before H1 headings (automatic)
- Optional page breaks before H2 headings (`h2-page-break` setting)
- Colon-paragraph keepwith logic (prevents orphaned introductory lines)
- Configurable title page with logo, disclaimer, and spacing controls
- Page headers and footers with rule thickness controls
- Build a script with pre-flight checks and error handling
- Working example project with sample output
- Full configuration reference in README
- Troubleshooting guide
