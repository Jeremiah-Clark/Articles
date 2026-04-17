# Feature Showcase

This section demonstrates the Markdown features that Simple Doc converts into styled PDF elements. Use these examples as a reference when writing your own documents.

## Text Formatting

Standard Markdown formatting works as expected:

- **Bold text** for emphasis
- *Italic text* for titles or terms
- ~~Strikethrough~~ for corrections
- `inline code` for commands or file names

## Callout Boxes

Simple Doc supports GitHub-style admonitions. Use them to draw attention to important information.

> [!NOTE]
> 
> This is a note callout. Use it for supplementary information that
> adds context without interrupting the main flow.

> [!TIP]
> 
> Tips highlight best practices or shortcuts the reader might find useful.

> [!WARNING]
> 
> Warnings alert the reader to potential problems or common mistakes.

> [!IMPORTANT]
> 
> Important callouts flag information the reader must not skip.

> [!CAUTION]
> 
> Caution callouts signal actions that could cause data loss or are
> difficult to reverse.

You can also give callouts a custom title:

> [!NOTE] About Custom Titles
> 
> Add your title text on the same line as the callout type marker.
> The title replaces the default label for that callout.

## Tables

Pipe tables are converted with proportional column widths so they don't overflow the page:

| Setting         | Default    | Description                        |
|-----------------|------------|------------------------------------|
| `toc`           | `true`     | Show or hide the table of contents |
| `toc-depth`     | `2`        | How many heading levels to include |
| `secnumdepth`   | `2`        | How deep section numbering goes    |
| `h2-page-break` | `false`    | Start each H2 on a new page       |
| `papersize`     | `letter`   | Paper size: `letter` or `a4`       |

## Code Blocks

Fenced code blocks render in a monospace font. Specify the language for syntax highlighting:

```yaml
title: "My Document"
author: "Jane Smith"
date: "2025-06-15"
toc: true
```

```bash
# Build your PDF
./build.sh
```

## Task Lists

- [x] Install Pandoc
- [x] Install TeX Live
- [x] Configure master.yaml
- [ ] Write your content
- [ ] Run build.sh

## Images

Place images in an `images/` directory and reference them in Markdown:

```markdown
![Alt text](images/your-image.png){ width=60% }
```

The template automatically centers images and constrains them so tall images never overflow the page. If you omit the `width` attribute, images default to 80% of the text width.

## Links

Standard Markdown links work normally and are styled with the color defined by `color-link` in `master.yaml`:

[Pandoc User's Guide](https://pandoc.org/MANUAL.html)

## Page Breaks

Every level-1 heading (`#`) automatically starts on a new page. If you need a manual page break elsewhere, insert a raw LaTeX command:

```markdown
\newpage
```

For documents where every level-2 heading (`##`) should start on a new page, set `h2-page-break: true` in `master.yaml`.
