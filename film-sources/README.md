# Film sources (2026-11-03)

The source files behind the El Refugio films, saved before the film session closed. The site does not use them. Do not merge this branch into main.

| Folder | What it is |
|---|---|
| `stills/out` | Every still fal made at full size (2K), both versions of each shot, plus the finals named `*_final` |
| `stills/fix` | The barn and shed fixes: v0, v1 and r1 fixed at full size |
| `stills/solar` | v0 and v1 with dark solar panels on every roof, made in code (`tools/panels.py`) |
| `stills/redo` | The pantry, temazcal and cut cellar rebuilds, and the plan drawings made in code |
| `anchors` | The 15 anchor frames. Each new phone clip starts on one and ends on another. They are the final look of each shot |
| `phone-clips` | The 12 new phone clips at full size (5 s each). The live phone film is built from them |
| `old-wide` | The 21 wide clips of the old 12 home film |
| `old-phone` | The 21 phone clips of the old 12 home film. n1 to n5, a0, hold2, g0s and u1 are also in the live phone film |
| `tools` | The scripts: `fal.py` (stills), `leg3.py` (one clip from two frames), `build3.py` (the live phone film), `build2.py` (the old films), and the check scripts |
| `recipes` | The prompts and settings: spec files for the stills, `legs.json` for the 12 new clips, `old-legs/` for the old clips |

Live phone film order: L01, L02, n1, n2, n3, n4, n5, a0, hold2, L10, L11, g0s, L13, L14, L15, L16, L17, L19, L20, L21, u1. `tools/build3.py` builds it, with short dissolves and the code fixes.

Old film order: open, r2 (played 1.8x), n0, n1, n2, n3, n4, n5, a0, hold2, b0fix, leg2, leg3, g0s, g1s, mm0, mm1, er0 (phone: et0), er1, er2, u1. `tools/build2.py` joins them.

Left out on purpose: family and personal photos, including the face reference photos (never in a repo); Dan's picture (it is in brain); review sheets; draft clips.

`vercel.json` on this branch only stops Vercel from building it. Main has no such file.

The scripts expect the old session's folders (`v4/film/`, `tall/`, `flight/`). Change the paths before you run them.

More: the handoff note in brain, Build/Healing Homes Mexico/The Sanctuary Project/El Refugio, Site and Film, Pick Up Here (2026-11-03).md
