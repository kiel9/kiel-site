---
title: Go-live gate agent
kind: agent
problem: Go-live readiness
summary: Checks a client integration against its go-live gates three days before testing, so blockers are fixed before the meeting instead of during it.
featured: false
order: 2
---
<!-- Sanitized. No employer, partner or tool names. Plain paragraphs only. -->

## What it does
It keeps a go-live plan for each client integration: a standard set of gates from scope locked to live. Three days before user acceptance testing, it checks the project against those gates and reports what is not ready.

## Input
The project's tickets, its release plan and its meeting notes.

## Output
A readiness report that lists configuration blockers, deployment gaps and missing test data. It proposes changes to the plan; nothing is updated until I approve them.

## Before and after
Before, configuration and data problems surfaced during the testing call and were fixed on the spot.

Now they are found three days earlier and fixed before the call.
