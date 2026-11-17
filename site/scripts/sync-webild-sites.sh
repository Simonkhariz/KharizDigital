#!/bin/bash
# Copies the template-based demo sites from this app into ../webild-sites, the
# stand-alone copy kept for reuse in client projects.
# Run from the site folder after changing anything under demos/templates,
# demos/components, demos/hooks, demos/lib or demos/styles:   npm run sync:webild
set -e
SITE="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="$SITE/../webild-sites"

for folder in templates components hooks lib; do
  rm -rf "$TARGET/$folder"
  cp -R "$SITE/demos/$folder" "$TARGET/$folder"
done
cp "$SITE/demos/styles/templates.css" "$TARGET/styles/templates.css"

# The stand-alone app has no agency site around it: no back link, and its
# files sit at the top level instead of under demos/.
rm -f "$TARGET/components/DemoBar.tsx"
find "$TARGET/templates" "$TARGET/components" "$TARGET/hooks" "$TARGET/lib" -type f \( -name '*.ts' -o -name '*.tsx' \) -print0 \
  | xargs -0 perl -pi -e 's#\@/demos/#\@/#g'
perl -0pi -e 's#/\* Styles for the template-based demo sites.*?\*/\n\@import "tailwindcss" source\(".."\);#/* Tailwind CSS setup and design tokens shared by every template. */\n\@import "tailwindcss";#s' "$TARGET/styles/templates.css"

# Template READMEs: addresses and folder names as they are in the stand-alone app.
find "$TARGET/templates" -name README.md -print0 | xargs -0 perl -pi -e '
  s#From the `site` folder:#From this project\x27s folder:#;
  s#http://localhost:3000/demos/#http://localhost:3000/#g;
  s#served at `/demos/([a-z-]+)`#served at `/$1`#;
  s#Part of the Khariz Digital site\. Its project page is `/work/<slug>`, which links here\.#Part of this templates app; deploy the app as a whole, or copy the template into another project (see the main README).#;
  s#`demos/templates/#`templates/#g; s#`demos/components/sections/`#`components/sections/`#g;'

# Media
rm -rf "$TARGET/public/images"
cp -R "$SITE/public/images" "$TARGET/public/images"

echo "webild-sites is up to date."
