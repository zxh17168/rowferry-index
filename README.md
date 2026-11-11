# Index

[Live demo](https://zxh17168.github.io/rowferry-index/) · [Source](https://github.com/zxh17168/rowferry-index)

An original Video.js 10 skin by RowFerry. A ruled timeline and opaque paper dock keep the player readable; timestamped notes help viewers return to a moment without an account.

Built for the Video.js Skins Design Challenge, closing November 16, 2026, 11:59pm Pacific. This is a prepared entry, not an accepted submission, client project or prize award.

## Run

Requires Node.js 22.12+ or 24+.

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm run dev
npm run build
```

The production build uses relative URLs for static hosting. `checks.html` is a local-only harness with real 375px and 320px iframe viewports; it is not part of the build.

## What works

- Video.js v10.3.0 playback, pause, seek, time, captions, mute, volume and fullscreen.
- Keyboard navigation, visible focus, Space/M/F and arrow-key shortcuts.
- Add, return to, remove and export timestamped notes. Notes stay in this browser's local storage, capped at 50. When storage is unavailable, the UI explains that notes are temporary.
- Responsive controls, reduced-motion preferences and forced-colour styles.
- Original 18-second H.264/AAC film, generated locally with FFmpeg. No hosting account, API key or Mux playback ID is needed.

The notes deliberately belong to the demonstration film. A production integration should use a stable content ID to namespace storage per video.

## Checks completed

Production build passes. Native Chrome checks verified video time advancing, pause, fullscreen entry/exit, keyboard seeking/mute and tab order; note creation, timestamp return, reload persistence, removal and an actual JSON export. Narrow 375px/320px layouts were inspected; playback and keyboard volume adjustment worked at 320px. These were browser viewport checks, not physical-device or screen-reader certification.

## Design thinking

Index takes its cues from an annotated page rather than a cinema remote. The picture keeps its space; a solid, ruled control dock stays legible against every frame. Saved moments become a small, portable notebook, giving repeated viewing a useful purpose without turning the player into an editing suite.

## License and assets

Original skin, source, vector marks and generated film: Apache-2.0, copyright 2026 RowFerry. See LICENSE. Video.js is an independent open-source project; this demo is not an endorsement. Fonts are DM Sans and DM Serif Display via Google Fonts under their respective SIL Open Font Licenses; system fonts are fallbacks. The site has no analytics or remote note storage.

Codex was used to implement the entry and run local/native-browser checks. No Mux account, promotional credit, trial, paid hosting or prize income has been claimed.
