# Specification

## Summary
**Goal:** Embed the Live365 iframe player into the OnAirNow section of The Country Channel website.

**Planned changes:**
- Add the Live365 iframe (`https://live365.com/embeds/v1/player/a57949?s=md&m=dark&c=mp3`, width=450, height=316, frameborder=0) inside the `OnAirNow` component
- Wrap the iframe in a responsive, centered container that caps max-width and prevents overflow on mobile
- Preserve all existing OnAirNow content and country theme styling

**User-visible outcome:** Visitors to the Home page will see a live radio player embedded in the On Air Now section, centered and responsive on both mobile and desktop.
