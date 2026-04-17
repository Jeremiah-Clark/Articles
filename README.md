# SimpleDoc v1.0.1

A Markdown-to-PDF template system that produces professionally styled documents without requiring any LaTeX knowledge. 
Write in plain Markdown, configure your settings in a single YAML file, run a build script, and get a polished PDF.

**Built on:** [Pandoc](https://pandoc.org) + XeLaTeX

---

## Quick Start

Get from zero to a working PDF in five steps.

### 1. Install prerequisites

You need two tools installed on your system:

**Pandoc** (version 3.0 or later):
- Download from [pandoc.org/installing](https://pandoc.org/installing.html)
- Or: `brew install pandoc` (macOS) / `sudo apt install pandoc` (Ubuntu)

**A TeX distribution** (provides XeLaTeX):
- macOS: `brew install --cask mactex`
- Ubuntu/Debian: `sudo apt install texlive-xetex texlive-latex-extra texlive-fonts-recommended`
- Windows: [MiKTeX](https://miktex.org/download)

**Fonts** — Simple Doc uses the Noto font family. Two tiers are supported:

*Required* — **Noto Sans** (standard). This is the fallback and covers all normal text. 
At least these must be installed:
- Ubuntu/Debian: `sudo apt install fonts-noto-core fonts-noto-mono`
- macOS: `brew install --cask font-noto-sans font-noto-sans-mono`
- Windows: Download from [fonts.google.com/noto](https://fonts.google.com/noto)

*Recommended* — **Noto Sans Nerd Font** (NF variant). 
Includes thousands of extra icons and symbols (Powerline glyphs, devicons, Material Design icons, etc.). 
If installed, Simple Doc uses these automatically; 
if not, it falls back to standard Noto with a console message.
- All platforms: Download from [nerdfonts.com](https://www.nerdfonts.com/font-downloads)—look for **"Noto Sans Mono Nerd Font"** and **"Noto Sans Nerd Font"**.
- Install the `.ttf` or `.otf` files using your system's font installer.

You can substitute any fonts you like by changing the names in `master.yaml`.

### 2. Set up your project

Copy the template files into a new project folder:

```
my-project/
├── template.tex
├── titlepage.tex
├── gfm-to-latex.lua
├── build.sh
├── master.yaml
├── content/
│   ├── 01-introduction.md
│   └── 02-main-body.md
└── images/
    └── logo.png
```

### 3. Configure your document

Open `master.yaml` and fill in your document metadata:

```yaml
title: "My Document Title"
author: "Your Name"
date: "2025-06-15"
```

All other settings have sensible defaults. See the [Configuration Reference](#configuration-reference) below for the full list.

### 4. Write your content

Create Markdown files in your `content/` directory (or wherever you prefer). 
Standard Markdown works — plus tables, task lists, code blocks, and callout boxes. 
See [Writing Content](#writing-content) for details.

### 5. Build your PDF

Edit the `INPUT_FILES` list at the top of `build.sh` to point to your Markdown files, then run:

```bash
chmod +x build.sh    # first time only
./build.sh
```

Your PDF appears as `output.pdf` in the project directory.

> **Try the example first.** The `example/` directory contains a
> complete working project you can build immediately to verify your
> setup. `cd example && ./build.sh`

---

## What's in the Box

| File                | Purpose                                               |
|---------------------|-------------------------------------------------------|
| `template.tex`      | Main LaTeX template — controls page layout, headers, footers, and styling |
| `titlepage.tex`     | Title page layout — edit this to change the title page design |
| `gfm-to-latex.lua`  | Pandoc Lua filter — converts callouts, images, and tables to styled LaTeX |
| `build.sh`          | Build script — runs Pandoc with the correct settings  |
| `master.yaml`       | Configuration file — all your document settings in one place |
| `example/`          | A working example project you can build immediately   |

---

## Configuration Reference

All settings live in `master.yaml`. 
Every field is optional except `title`.

### Document metadata

| Field       | Default     | Description                              |
|-------------|-------------|------------------------------------------|
| `title`     | `"Title"`   | Document title (appears on title page and PDF metadata) |
| `author`    | `"Author"`  | Author name                              |
| `date`      | `"Date"`    | Document date                            |
| `version`   | *(empty)*   | Version string (appears on title page if set) |
| `subject`   | *(empty)*   | One-line description (PDF metadata only) |
| `keywords`  | *(empty)*   | Keyword list (PDF metadata only)         |
| `lang`      | `en-US`     | Document language                        |

### Template controls

| Field           | Default   | Description                                                  |
| --------------- | --------- | ------------------------------------------------------------ |
| `logo`          | *(empty)* | Path to a logo image for the title page                      |
| `disclaimer`    | *(empty)* | Disclaimer text box on the title page. Delete the line to hide it. Replace `YOUR_ORG` with your organization name. |
| `toc`           | `true`    | Show table of contents                                       |
| `toc-depth`     | `2`       | Heading levels to include in the TOC (1–6)                   |
| `secnumdepth`   | `2`       | Heading levels to number (0 = none, 1 = H1, 2 = H1+H2, etc.) |
| `h2-page-break` | `false`   | Start each H2 subsection on a new page (H1 always starts a new page) |

### Page layout

| Field            | Default    | Description                             |
|------------------|------------|-----------------------------------------|
| `fontsize`       | `11pt`     | Base font size                          |
| `papersize`      | `letter`   | Paper size: `letter` or `a4`            |
| `margin`         | `1in`      | Left and right margins                  |
| `margin-top`     | `1.25in`   | Top margin                              |
| `margin-bottom`  | `1.25in`   | Bottom margin                           |
| `headheight`     | `14pt`     | Header box height                       |
| `headsep`        | `12pt`     | Gap between header rule and body text   |
| `footskip`       | `30pt`     | Distance from body bottom to footer     |
| `header-rule`    | `0.4pt`    | Header rule thickness (0pt to hide)     |
| `footer-rule`    | `0.4pt`    | Footer rule thickness (0pt to hide)     |

### Title page

| Field                     | Default   | Description                    |
|---------------------------|-----------|--------------------------------|
| `logo-width`              | `0.8`     | Logo width as a fraction of text width (0.0–1.0) |
| `titlepage-post-rule`     | `2em`     | Space after the top rule       |
| `titlepage-post-title`    | `0.75em`  | Space after the title          |
| `titlepage-post-author`   | `0.5em`   | Space after the author         |
| `titlepage-post-date`     | `3em`     | Space after the date           |

### Style settings

| Field                | Default              | Description                       |
|----------------------|----------------------|-----------------------------------|
| `font-body`          | `NotoSansNF-Reg`     | Body text font (tried first)      |
| `font-body-fallback` | `Noto Sans`          | Fallback if the body font isn't installed |
| `font-heading`       | `NotoSansNF-Reg`     | Heading font (tried first)        |
| `font-heading-fallback` | `Noto Sans`       | Fallback if the heading font isn't installed |
| `font-mono`          | `NotoMonoNF`         | Monospace font (tried first)      |
| `font-mono-fallback` | `Noto Sans Mono`     | Fallback if the mono font isn't installed |
| `linespread`     | `1.25`           | Line spacing multiplier           |
| `color-heading`  | `25,55,120`      | Heading color as R,G,B (0–255)    |
| `color-link`     | `40,80,180`      | Link color as R,G,B (0–255)      |

### Callout colors

These control the colors for callout/admonition boxes. 
Values are LaTeX color names (e.g., `red`, `blue`, `orange`).

| Field              | Default    |
|--------------------|------------|
| `color-important`  | `red`      |
| `color-note`       | `blue`     |
| `color-warning`    | `orange`   |
| `color-tip`        | `green`    |
| `color-caution`    | `yellow`   |
| `color-summary`    | `violet`   |
| `color-example`    | `black`    |

---

## Writing Content

Write your documents in standard Markdown. Simple Doc supports all common formatting plus several extended features.

### Multi-file documents

Split long documents across multiple Markdown files. 
List them in order in the `INPUT_FILES` array at the top of `build.sh`:

```bash
INPUT_FILES=(
  content/01-introduction.md
  content/02-methodology.md
  content/03-results.md
  content/04-conclusion.md
)
```

### Headings and page breaks

Use `#` for top-level sections and `##` for subsections:

```markdown
# Section Title        ← starts on a new page automatically
## Subsection Title    ← new page only if h2-page-break: true
### Sub-subsection
```

For a manual page break anywhere, insert: `\newpage`

### Callout boxes (admonitions)

Use GitHub-style blockquote syntax to create styled callout boxes:

```markdown
> [!NOTE]
> Supplementary information the reader might find useful.

> [!TIP]
> Best practices or helpful shortcuts.

> [!WARNING]
> Potential problems or common mistakes.

> [!IMPORTANT]
> Information the reader must not skip.

> [!CAUTION]
> Actions that could cause data loss or are hard to reverse.

> [!SUMMARY]
> A condensed recap of key points.

> [!EXAMPLE]
> A worked example or demonstration.
```

You can add a custom title after the type marker:

```markdown
> [!WARNING] Compatibility Note
> This feature requires Pandoc 3.0 or later.
```

### Tables

Standard pipe tables work. 
Column widths are calculated automatically to prevent overflow:

```markdown
| Name     | Role              | Status   |
|----------|-------------------|----------|
| Alice    | Project lead      | Active   |
| Bob      | Technical writer  | Active   |
```

### Images

Place images in an `images/` directory and reference them:

```markdown
![Description](images/screenshot.png){ width=60% }
```

Images are automatically centered. 
If you omit the `width` attribute, they default to 80% of the text width. 
Tall images are height-capped so they never overflow the page.

### Task lists

```markdown
- [x] Completed item
- [ ] Pending item
```

### Code blocks

Use fenced code blocks with an optional language identifier:

````markdown
```python
def greet(name):
    return f"Hello, {name}!"
```
````

---

## Customization Tips

### Using different fonts

Each font slot has a primary and a fallback field. 
The template tries the primary first; if it's not installed, the fallback is used automatically and a message is printed to the console so you know what happened.

```yaml
font-body: "NotoSansNF-Reg"       # Tried first
font-body-fallback: "Noto Sans"   # Used if the primary isn't found
```

Change these to any fonts installed on your system. 
Use the exact name as your system knows it — you can check installed fonts with:

```bash
fc-list | grep -i "font name"    # Linux / macOS
```

If you don't need the fallback, just set both fields to the same font, or delete the fallback line entirely (the template has hardcoded defaults of `Noto Sans` and `Noto Sans Mono` as a last resort).

### Adjusting colors

Heading and link colors use RGB values (0–255):

```yaml
color-heading: "0,0,0"       # Black headings
color-link: "0,102,204"      # Standard blue links
```

Callout colors use LaTeX color names. Common options: `red`, `blue`, `green`, `orange`, `yellow`, `violet`, `black`, `gray`, `cyan`, `magenta`, `teal`.

### Hiding elements

- **No TOC:** set `toc: false`
- **No section numbers:** set `secnumdepth: 0`
- **No header rule:** set `header-rule: "0pt"`
- **No footer rule:** set `footer-rule: "0pt"`
- **No logo:** delete or comment out the `logo:` line
- **No disclaimer:** delete or comment out the `disclaimer:` line

### Editing the title page

The title page layout lives in `titlepage.tex`. 
You can edit it directly if the YAML spacing controls aren't enough — it's a self-contained file with comments explaining each element. 
The available commands (`\doctitle`, `\docauthor`, `\docdate`, `\docversion`) are populated from your YAML settings.

---

## Troubleshooting

### "Font not found" or missing-character errors

The template automatically falls back from the primary font to the fallback font if the primary isn't installed. 
If the build still fails, the fallback font is also missing. 
Check what's installed:

```bash
fc-list | grep -i "noto"
```

If the standard Noto fonts aren't showing up, install them (see [Quick Start](#1-install-prerequisites)). 
If you see a console message like `Simple Doc: body font "NotoSansNF-Reg" not found — using fallback`, that's normal — it means the Nerd Font variant isn't installed, so the standard Noto font is being used instead. 
The PDF will still build correctly; you just won't have the extended symbol set.

### "xelatex not found"

You need a TeX distribution. 
Install TeX Live (Linux/macOS) or MiKTeX (Windows). 
See [Quick Start](#1-install-prerequisites) for commands.

### "pandoc: Unknown reader: gfm-alerts"

Your Pandoc version is too old. 
The `gfm-alerts` format requires Pandoc 3.0 or later. 
Check your version:

```bash
pandoc --version
```

Update from [pandoc.org/installing](https://pandoc.org/installing.html).

### Missing LaTeX packages

If the build fails with a `.sty not found` error, you're missing a LaTeX package. 
On Ubuntu/Debian:

```bash
sudo apt install texlive-latex-extra texlive-fonts-recommended
```

On macOS with MacTeX, most packages are included by default. 
On MiKTeX, it will prompt you to install missing packages automatically.

### Callouts rendering as plain blockquotes

Make sure `build.sh` uses `--from gfm-alerts` (not `--from gfm` or `--from markdown+...`). 
The Lua filter needs to receive callouts as unparsed blockquotes to style them correctly.

### Images overflowing the page

Add an explicit width:

```markdown
![Photo](images/photo.png){ width=50% }
```

If you're using very tall portrait images, the template automatically caps them at 82% of the page height.

### Build script permission denied

Make the script executable:

```bash
chmod +x build.sh
```

---

## Technical Notes

### How the build pipeline works

1. **Pandoc** reads your Markdown files using the `gfm-alerts` reader (GitHub-Flavored Markdown without native alert parsing).
2. The **Lua filter** (`gfm-to-latex.lua`) intercepts callouts, images, tables, and headings and converts them into styled LaTeX commands.
3. **`template.tex`** wraps everything in a complete LaTeX document, applying your YAML settings for fonts, colors, margins, and headers.
4. **XeLaTeX** compiles the LaTeX into a PDF with full Unicode and OpenType font support.

### Why `--from gfm-alerts` instead of `--from gfm`?

The `gfm` reader in Pandoc 3.0+ natively parses GitHub alerts into structured AST nodes. 
This is normally useful, but Simple Doc's Lua filter handles callout styling itself — it needs the raw blockquote structure. 
The `gfm-alerts` variant disables just the native alert parsing while keeping all other GFM features active.

### Supported Pandoc versions

Simple Doc is tested with Pandoc 3.0 and later. 
Earlier versions may work for basic documents but won't support callouts correctly.

---

## License

Copyright (c) 2025 Jeremiah Clark.
All rights reserved.
See [LICENSE](LICENSE) for terms.
