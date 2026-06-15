# Flock Watch

A heads-up detector for automated license-plate readers (ALPRs). It pulls live
camera locations from OpenStreetMap and alerts you with sound, vibration, and a
banner when one is near — or coming up ahead in your direction of travel.

It's a single static HTML file. No build step, no dependencies, no server, no
account. Your location never leaves your device except as an anonymous radius
query to the public OpenStreetMap Overpass API.

## What it does

- Fetches every `surveillance:type=ALPR` node within ~6 km from the Overpass API
  (the same OpenStreetMap data the [DeFlock](https://deflock.me) project maintains),
  re-pulling automatically as you move so the data stays current.
- Shows nearby cameras on a radar dial, oriented to your direction of travel.
  **Violet** = confirmed Flock Safety units; **amber** = other ALPR vendors.
- Names the nearest camera and whether it's ahead of you or off to one side.
- Alerts when a camera enters your chosen range (default 250 m). "Ahead" cameras
  get an urgent double-beep; a 20-second per-camera cooldown stops it nagging.
- Tunable alert distance, radar range, sound, vibration, and an "alert only when
  ahead" mode for highway use. Settings persist on your device.

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
