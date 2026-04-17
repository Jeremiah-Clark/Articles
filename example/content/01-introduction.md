# Introduction

Welcome to your first document built with Simple Doc. This example project shows how the template converts plain Markdown into a professionally styled PDF — no LaTeX knowledge required.

Everything you see in this PDF was generated from two short Markdown files and a single YAML configuration file. The sections below demonstrate the features available to you.

## What You Can Do

Simple Doc handles the formatting so you can focus on writing. Out of the box, you get:

- Automatic table of contents
- Numbered section headings
- Styled title page with logo support
- Page headers and footers
- Professional typography and spacing

## How This Example Is Organized

This document is split across two Markdown files to demonstrate multi-file builds:

| File                       | Contents                          |
|----------------------------|-----------------------------------|
| `content/01-introduction.md` | This introduction (you're reading it) |
| `content/02-features.md`     | Feature showcase with examples    |

The build script (`build.sh`) combines them in order and produces a single PDF. You can add as many files as you need — just list them in the `INPUT_FILES` array at the top of `build.sh`.
