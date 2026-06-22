# Contributing to Flock Watch

Thanks for your interest. Flock Watch is a privacy-awareness tool: it helps
people see where automated license-plate readers are, using open data. Please
keep contributions aligned with that purpose.

## Ground rules

- **Awareness, not evasion.** Frame features and copy around understanding and
  transparency of surveillance, not around helping anyone evade law enforcement.
  This keeps the project honest and keeps it shippable on app stores.
- **Honesty about coverage.** Never present the data as complete or guaranteed.
  Crowdsourced ALPR data is patchy; the UI should keep saying so.
- **Privacy first.** Keep it client-side. No accounts, no analytics, no servers,
  no sending the user's location anywhere except the documented queries. If a
  feature needs to send data off-device, it must say so plainly in the UI.

## How to contribute

1. Open an issue describing the bug or proposed change before large work.
2. Fork, branch, and keep changes focused.
3. The app is a single `index.html` with inline CSS/JS — no build step for the
   web version. Match the existing vanilla-JS style, wrap device/storage calls in
   `try/catch`, feature-detect browser APIs, and escape any data rendered into the
   DOM (everything from OpenStreetMap is untrusted input).
4. Test on a phone over HTTPS (GitHub Pages or `localhost`) — geolocation and
   notifications don't work from `file://`.
5. Open a pull request explaining what changed and why.

## Data corrections

Wrong or missing cameras aren't code bugs — they're OpenStreetMap data. Fix them
on OpenStreetMap (the app links each camera to its node) or via the DeFlock
project, and the change flows to everyone.

## License

By contributing, you agree your contributions are licensed under the repository's
MIT License.
