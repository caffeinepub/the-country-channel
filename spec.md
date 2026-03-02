# Specification

## Summary
**Goal:** Update the `getCurrentShow` backend function to use CST (UTC-6) timezone when matching shows to the current day and time.

**Planned changes:**
- Modify `getCurrentShow` in `backend/main.mo` to apply a UTC-6 offset to the IC system time before determining the current day of the week and current time
- Use the CST-adjusted day and time values when matching against each show's `scheduleDay` and `scheduleTime` fields

**User-visible outcome:** Shows go on air at the correct CST local times instead of UTC times, so a show scheduled for Monday at 9:00 AM CST becomes active at 9:00 AM Central, not 9:00 AM UTC.
