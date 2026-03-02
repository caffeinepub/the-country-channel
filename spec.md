# Specification

## Summary
**Goal:** Embed a Live365 iframe player inside the existing `OnAirNow` component in a responsive, centered container.

**Planned changes:**
- Add the Live365 iframe (`src="https://live365.com/embeds/v1/player/a57949?s=md&m=dark&c=mp3"`, width=450, height=316, frameborder=0) to `frontend/src/components/OnAirNow.tsx`
- Wrap the iframe in a responsive container with a capped max-width and horizontal centering to prevent overflow on mobile and desktop
- Preserve all existing OnAirNow styling (warm earthy tones, serif typography, ON AIR badge, show/DJ info)

**User-visible outcome:** Visitors can see and interact with the Live365 audio player directly within the "On Air Now" section of the site, on both mobile and desktop.
