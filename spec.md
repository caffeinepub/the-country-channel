# Specification

## Summary
**Goal:** Build a public-facing radio station website for "The Country Channel" with a matching admin dashboard to manage shows and DJs, all styled with a rustic country music aesthetic.

**Planned changes:**
- Public homepage with station branding/logo, hero section with a non-functional live-stream play button, featured shows section, and DJ roster section
- Public Shows page listing all shows with name, description, schedule, and DJ name
- Public DJs page listing all DJs with name, bio, photo/avatar, and associated shows
- Backend CRUD API for Shows (id, title, description, scheduleDay, scheduleTime, djId, createdAt) persisted in stable storage
- Backend CRUD API for DJs (id, name, bio, photoUrl, createdAt) persisted in stable storage
- Admin dashboard at `/admin` with sidebar navigation, overview counts (total shows, total DJs), and a simple local route guard
- Admin Shows management: create/edit/delete shows via form modal with DJ dropdown
- Admin DJs management: create/edit/delete DJs via form modal
- Cohesive rustic country theme: warm earthy tones (browns, tans, burnt oranges), bold serif/slab headings, rustic texture accents, darker variant for admin

**User-visible outcome:** Visitors can browse the station's shows and DJs on a styled public site; an admin can log into the dashboard to create, edit, and delete shows and DJs.
