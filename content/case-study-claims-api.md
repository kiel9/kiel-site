# Case study: Insurance claims API integration
<!-- Sanitized. No partner names, no internal system names, no numbers you can't defend. ≤150 words total across the three blocks. -->

## Problem
A healthtech platform was integrating claims data with an insurance partner's API. The partner's specification contradicted itself: the flow diagram called an action type the field table never defined and the validation rules explicitly forbade. Built as drawn, every update call would have failed validation.

## What I did
Read the document against itself before any code was written. Rewrote the engineer-facing questions into a structured, endpoint-by-endpoint review and returned nineteen findings, sorted into blockers, inconsistencies and open questions. Kept one shared integration spec that both sides signed off on.

## Outcome
The contradictions were resolved on the page instead of in UAT. Both engineering teams built against a single signed-off spec, and the integration went live.
