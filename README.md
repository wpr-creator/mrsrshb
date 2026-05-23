# Mrs. Rogers' Homebase 🚪

A collection of browser-based learning games for second grade, built for classroom use on Chromebooks. All games run as single HTML files — no installation, no login, no internet required after the page loads.

**Live site:** `https://wpr-creator.github.io/mrsrshb`

---

## Files

| File | Game | Subject |
|---|---|---|
| `index.html` | Hub — links to all three games | — |
| `portalpark.html` | Portal Park | Math & ELA mix |
| `pokemonmath.html` | Pokémon Math Quest | Grade 2 Math |
| `wordquest.html` | Word Quest | Grade 2 ELA |

---

## Portal Park 🚪

Six themed worlds, each with its own challenge mix. Students earn coins for correct answers, collect a badge when they solve 6 or more out of 8, and build up a rank across all six portals.

**Worlds**

| World | Theme |
|---|---|
| 🍭 Candy Animals | Money, fractions, skip counting, graphs |
| 🚀 Space Station | Time, skip counting, place value, measurement |
| 🐾 Metro Zoo City | Graphs, ELA, sentences, map skills |
| 🛸 Stitch Island | Measurement, time, map skills, fractions |
| 🎮 Block World | Place value, money, measurement, skip counting |
| 🎤 Pop Star City | Time, graphs, sentences, ELA |

**How it works**
- 3 hearts per run — lose all three and the portal closes
- Each run draws 8 questions shuffled from that world's topic pool
- Correct answers earn coins; a 30% chance triggers a bonus treasure chest
- Earn 6+ correct → badge unlocked, 20 bonus coins
- Badges persist across sessions; rank increases every 2 badges earned
- No mid-run exit — students finish the run, earn the badge, or the portal closes

**Question types across all worlds:** money, time, fractions, skip counting, place value, map skills, graphs/data, ELA parts of speech, sentence correction, measurement

---

## Pokémon Math Quest ⚡

Nine math zones, each tied to an evolution. Students start with an egg and evolve a full team by clearing zones. Wrong answers drain HP — run out and the Pokémon faints. After clearing a zone, a wild Pokémon encounter triggers cumulative review questions from all previously cleared zones.

**Zones & Evolutions**

| Zone | Topic | Game Type | Evolves |
|---|---|---|---|
| 1 | Addition Facts to 12 | Multiple choice | 🥚 → Bulbasaur |
| 2 | Subtraction Facts to 12 | Multiple choice | → Ivysaur |
| 3 | Add & Subtract Tens | Multiple choice | → Venusaur |
| 4 | Add & Subtract Hundreds | Multiple choice | 🔥 → Charmeleon |
| 5 | Place Value to 999 | Visual H/T/O columns | → Charizard |
| 6 | Skip Counting 2s, 5s, 10s | Sequence fill-in | 💧 → Wartortle |
| 7 | Addition with Regrouping | Vertical problem | → Blastoise |
| 8 | Subtraction with Borrowing | Vertical problem | 🦊 → Vaporeon |
| 9 | 2D Shapes | SVG shape + choices | → Jolteon |

**How it works**
- 3 HP per zone — each wrong answer drains one
- 8 questions per zone drawn randomly from a pool of 26–28
- Need 5/8 correct to earn the badge and trigger evolution
- HP hits zero → Pokémon faints, zone reshuffles with new question order
- **Wild encounters** fire after every badge earned — 5 timed questions (45 seconds each) pulling from all cleared zones; hit 3+ to catch the wild Pokémon
- 23 wild Pokémon available across four rarity tiers: Common, Uncommon, Rare, Legendary
- **PC Box** accessible from the map — shows every Pokémon owned with stat bars built from actual quiz scores
- Progress saved to `localStorage` key `pokemathquest_v3`

**Carry/borrow hints** appear only after a wrong answer on regrouping or borrowing questions — not upfront.

---

## Word Quest 📚

Twelve ELA kingdoms, each with its own game mechanic. A hero travels the map, unlocking zones in order. Wrong answers cost a life — lose all three and the zone resets with reshuffled questions.

**Zones**

| Zone | Topic | Game Type |
|---|---|---|
| 🏰 1 | Nouns | Tap every noun in the sentence |
| 🌋 2 | Proper Nouns | Sort into Proper vs. Common bins |
| 🏡 3 | Common Nouns | Multiple choice |
| 💎 4 | Possessive Nouns | Fix-it: pick the correct possessive |
| 🎨 5 | Adjectives | Multiple choice |
| ⚔️ 6 | Verbs | Tap every verb in the sentence |
| 🌊 7 | Adverbs | Multiple choice |
| 🗺️ 8 | Prepositions | Word bank fill-in |
| ⚡ 9 | Contractions | Match pairs (4 at a time) |
| 🔧 10 | Sentence Corrections | Fix-it: pick the correct sentence |
| 🌸 11 | Synonyms | Multiple choice |
| 🌑 12 | Antonyms | Multiple choice |

**How it works**
- 8 questions per zone from a shuffled pool
- 3 lives — wrong answers on tap/sort/match cost a life
- Tap zones (nouns, verbs) include a "💡 Show Me" button — costs one life, reveals the target words, and advances the question so the game never locks up
- Contraction match shows 4 pairs at a time (drawn from 6) to keep working memory manageable
- Need 5/8 correct to earn the star and unlock the next zone
- Stars and zone progress saved to `localStorage` key `wordquest_stars_v2`
- **Streak moves:** 3 correct in a row → Tackle, 5 → Quick Attack, 8/8 perfect → Hyper Beam

---

## Technical Notes

- All four files are fully self-contained HTML — no build step, no dependencies, no external assets beyond Google Fonts
- Progress is saved per-game in `localStorage`; clearing browser data resets progress
- Designed and tested for Chromebook viewport at `font-size: 22px` base
- Fonts: Nunito (body/answers), Baloo 2 or Press Start 2P (headers/labels), Fredoka One (buttons) depending on the game

---

## Deploying to GitHub Pages

1. Push all four files to the root of this repository
2. Go to **Settings → Pages → Source → Deploy from branch → main / root**
3. The hub will be live at `https://wpr-creator.github.io/mrsrshb`

Each game links to the others by filename, so all four files must be in the same root directory.
