# Flock Watch

A heads-up detector for automated license-plate readers (ALPRs). It pulls live
camera locations from OpenStreetMap and alerts you with sound, vibration, and a
banner when one is near — or coming up ahead in your direction of travel.

It's a static web app — no build step, no dependencies, no server, no account.
Your location never leaves your device except as an anonymous radius query to the
public OpenStreetMap Overpass API.

**Repository contents** — upload all of these to the repo for the app and offline
install to work: `index.html`, `manifest.json`, `sw.js`, and the four icons
(`icon-180.png`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`).

## What it does

- Fetches every `surveillance:type=ALPR` node within ~6 km from the Overpass API
  (the same OpenStreetMap data the [DeFlock](https://deflock.me) project maintains),
  re-pulling automatically as you move so the data stays current.
- Shows nearby cameras on a radar dial, oriented to your (heading-smoothed)
  direction of travel — or on a real street map (tap **Map** to switch).
  **Violet** = confirmed Flock Safety units; **amber** = other ALPR vendors.
- Names the nearest camera, whether it's ahead or off to one side, and — when
  you're moving — the estimated time until you reach it ("~12 s").
- Alerts when a camera enters your chosen range (default 250 m) with sound,
  **spoken voice** ("Flock camera ahead, 300 feet"), vibration, a banner, and
  an optional system notification. "Ahead" cameras get an urgent double-beep; a
  20-second per-camera cooldown stops it nagging.
- **Works offline.** Installs as a PWA (its own icon, full-screen, instant launch)
  and caches the last cameras it pulled, so alerts keep firing in dead-signal areas
  against the most recent data. (The street map needs a connection for tiles.)
- Tunable alert distance, radar range, units (**miles & feet** or metric), sound,
  voice, vibration, and an "alert only when ahead" mode for highway use. A
  **Reset to defaults** button is in settings. Everything persists on your device.
- **Honest about coverage.** A banner flags when you're seeing saved/stale data,
  when you've moved beyond the last refreshed area, or when nothing is mapped
  nearby — because a clear radar can mean "no cameras" *or* "not mapped yet."
- **Tap any camera** to see its details and open it on OpenStreetMap, where you
  can verify or correct it. Wrong or missing cameras can be reported via the
  DeFlock link in the footer — fixes flow back to the shared dataset.

## Install it as an app

Open the live https URL on your phone, then:

- **iPhone (Safari):** Share button → **Add to Home Screen**.
- **Android (Chrome):** menu (⋮) → **Install app** / **Add to Home screen**.

It then launches like a native app with its own icon and no browser bars, and runs
offline against cached cameras. Note: like any web app, it only tracks and alerts
while open and awake — phones suspend background pages, so it can't monitor with the
screen off.

## Run it (must be served over HTTPS)

Browsers only allow GPS and notifications on a **secure origin**, so opening the
file with `file://` will block location. Use one of:

**GitHub Pages (recommended — gives you a permanent https link):**
1. Put `index.html` in a repository (see below).
2. In the repo, open **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Select your branch (`main`) and folder (`/ (root)`), then **Save**.
5. Wait ~1 minute; your app is live at `https://<your-username>.github.io/<repo-name>/`.
6. Open that URL on your phone and use **Add to Home Screen**.

**Local test:** run `python3 -m http.server` in the project folder, then open
`http://localhost:8000/` (localhost counts as a secure origin).

## Limitations — read these

- It only knows what volunteers have logged in OpenStreetMap. **A clear radar does
  not mean there are no cameras** — rural and newly-deployed areas are under-mapped.
  Treat it as awareness, not a guarantee.
- "Approaching" detection needs movement to read your heading from GPS. Standing
  still, it falls back to compass bearings (north-up).
- Overpass is a shared free service. The app throttles to one pull per ~25 seconds
  and falls back to a mirror, but heavy use can hit rate limits.
- **Use it mounted or as a passenger.** Don't interact with it while driving.

## Attribution & license

Map data © OpenStreetMap contributors, made available under the
[Open Database License (ODbL)](https://www.openstreetmap.org/copyright). Camera
locations are surfaced largely through the community [DeFlock](https://deflock.me)
project. Data is crowdsourced and approximate.

The application code in this repository is released under the MIT License
(see `LICENSE`).
