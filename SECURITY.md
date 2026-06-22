# Security Policy

Flock Watch is a static, client-side web app. It has no backend and no accounts,
and it stores everything (settings, cached camera data, any routing API key you
enter) only in your own browser. Your location is used on-device and is sent to
third-party services only as described in the README (an anonymous radius query
to OpenStreetMap's Overpass API, and — only if you use the route planner — your
start and destination to the routing/geocoding services).

## Reporting a vulnerability

If you find a security or privacy issue, please **do not open a public issue**.
Instead, report it privately:

- Use GitHub's **"Report a vulnerability"** button under the repository's
  **Security** tab (Security advisories), or
- Open a minimal private channel with the maintainer via your GitHub profile.

Please include steps to reproduce, the affected file or feature, and the impact
as you understand it. I'll acknowledge the report as soon as I can and aim to
address confirmed issues promptly.

## Scope

In scope: the application code in this repository (HTML/CSS/JS, the service
worker, the manifest, and the native bridge).

Out of scope: vulnerabilities in third-party services the app talks to
(OpenStreetMap/Overpass, OSRM, Nominatim, OpenRouteService) or in the data they
return — please report those to the respective projects.

## A note on the data

Camera locations come from OpenStreetMap and are crowdsourced and incomplete.
Inaccurate or missing camera data is a data-quality matter, not a security
vulnerability — the README explains how to correct it on OpenStreetMap.
