# Mrs. Rogers Homebase Arcade — Best Path

## Goal
A free, GitHub Pages-hosted second-grade arcade that still works offline on Chromebooks after files are downloaded or cached.

## Structure
- `index.html` — hub
- `portalpark.html` — current playable version
- `pokemonmath.html` — current playable version
- `wordquest.html` — current playable version
- `css/arcade-system.css` — shared readable classroom design system
- `js/arcade-engine.js` — shared shuffle, deduplication, save/load helpers
- `assets/vendor/` — put local Phaser here later, for example `phaser.min.js`
- `assets/art/` — put Kenney or CC0 image packs here
- `assets/audio/` — optional local sound effects
- `games/` — future Phaser rewrites can live here if each game becomes modular

## Recommended upgrade order
1. Keep the current HTML games live so students can use them now.
2. Build one polished Phaser prototype first, ideally Portal Park, because it benefits most from maps/world visuals.
3. Add local CC0/Kenney art packs into `assets/art/`.
4. Convert repeated SVG/emoji-style visuals into sprite sheets and Canvas scenes.
5. Keep all question text and answer buttons in large HTML overlays for readability.

## Free tools/assets
- GitHub Pages: free static hosting.
- Phaser 3: free open-source browser game framework.
- Kenney assets: classroom-friendly CC0-style game art packs.
- itch.io CC0 assets: useful backup, but each asset license must be checked.

## Offline Chromebook note
Use local copies only. Do not rely on Google Fonts CDN, remote scripts, remote images, or npm build steps.
