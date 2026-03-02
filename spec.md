# Specification

## Summary
**Goal:** Embed the Live365 iframe player inside the OnAirNow component so listeners can play the stream directly from the page.

**Planned changes:**
- Add the Live365 iframe (`https://live365.com/embeds/v1/player/a57949?s=md&m=dark&c=mp3`) to `frontend/src/components/OnAirNow.tsx`
- Wrap the iframe in a responsive, centered container with a max-width cap (450px) to prevent overflow on mobile

**User-visible outcome:** Visitors see a live audio player embedded prominently in the "On Air Now" section and can start listening without leaving the page.
