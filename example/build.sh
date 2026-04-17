#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Simple Doc — Example Build Script
# This is a working example. Run it from inside the example/ directory:
#   cd example && ./build.sh
#
# It references the template files in ../template/. When you start
# your own project, copy build.sh and master.yaml to your project
# folder and update the paths.
# ─────────────────────────────────────────────────────────────

set -euo pipefail

TEMPLATE_DIR="../template"
OUTPUT="example-output.pdf"

INPUT_FILES=(
  content/01-introduction.md
  content/02-features.md
)

# ── Pre-flight checks ───────────────────────────────────────

errors=0

if ! command -v pandoc &>/dev/null; then
  echo "ERROR: pandoc is not installed."
  echo "       Install it from https://pandoc.org/installing.html"
  errors=1
else
  echo "  Found pandoc $(pandoc --version | head -1 | sed 's/[^0-9.]//g' | cut -d. -f1,2)"
fi

if ! command -v xelatex &>/dev/null; then
  echo "ERROR: xelatex is not installed."
  echo "       Install TeX Live: sudo apt install texlive-xetex (Ubuntu)"
  echo "       or: brew install --cask mactex (macOS)"
  errors=1
else
  echo "  Found xelatex"
fi

for f in "$TEMPLATE_DIR/template.tex" "$TEMPLATE_DIR/titlepage.tex" "$TEMPLATE_DIR/gfm-to-latex.lua" master.yaml; do
  if [[ ! -f "$f" ]]; then
    echo "ERROR: Required file not found: $f"
    errors=1
  fi
done

for f in "${INPUT_FILES[@]}"; do
  if [[ ! -f "$f" ]]; then
    echo "ERROR: Input file not found: $f"
    errors=1
  fi
done

if [[ $errors -ne 0 ]]; then
  echo ""
  echo "Build aborted — fix the errors above and try again."
  exit 1
fi

echo ""
echo "Building PDF..."

# ── Build ────────────────────────────────────────────────────
# TEXINPUTS tells XeLaTeX where to find titlepage.tex and other
# files referenced by \input{} in template.tex.
export TEXINPUTS="$TEMPLATE_DIR:${TEXINPUTS:-}"

pandoc --from gfm-alerts \
       --metadata-file master.yaml \
       --template "$TEMPLATE_DIR/template.tex" \
       --pdf-engine=xelatex \
       --lua-filter "$TEMPLATE_DIR/gfm-to-latex.lua" \
       "${INPUT_FILES[@]}" \
       -o "$OUTPUT"

echo "Done → $OUTPUT"
