# Specification

## Summary
**Goal:** Add a "Recently Played" section to the Home page that embeds the Live365 recently played iframe.

**Planned changes:**
- Create a `RecentlyPlayed` component at `frontend/src/components/RecentlyPlayed.tsx` that embeds the Live365 iframe (`https://live365.com/embeds/v1/played/a57949?s=md&m=dark`, width 450, height 511, frameborder 0) in a responsive, centered container
- Style the section with the existing country theme (earthy tones, serif headings, rustic/woodgrain accents)
- Add the `RecentlyPlayed` component to `frontend/src/pages/Home.tsx`, placed after the "Ways to Listen" section

**User-visible outcome:** Visitors to the Home page will see a "Recently Played" section below "Ways to Listen" showing the latest tracks played on The Country Channel via the Live365 embed.
