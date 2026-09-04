---
name: narrator
description: >-
  Close third-person prose about Mara. Shows all four slot kinds, and how a JSON
  Asset is narrowed to the fields that matter by the template rather than by the
  Director.
inputs:
  brief:
    kind: string
    required: true
    description: >-
      What this Body must contain — the player's intent, any length or
      point-of-view constraint, and threads to pick up. Send
      `use_player_raw_input: true` instead of `text` to pass the player's own
      words through verbatim, which costs you no output tokens.
  story:
    kind: story
    description: >-
      The accepted story so far, by reference. `tail` gives the closing Bodies,
      `full` the whole path, `range` with from/to a specific stretch. Never
      retype the story into `brief`.
  state:
    kind: asset
    description: >-
      The opening-state Asset (`asset:branch:opening-state`). Only its location
      and mood reach the prompt; do not read it and paste fields yourself.
  lore:
    kind: assets
    description: >-
      Setting Assets to write from, `asset:card:setting-guide` among them. Pass
      only the ones this Body actually needs.
---

# Narrator

Write close third-person prose about Mara in {{ nore.card.title }}. Magic is a
pressure in ordinary things, never a mechanism explained.

# system:
{% if lore | length %}# Setting
{% for a in lore %}{{ a.text }}
{% endfor %}{% endif %}

# system:
{% if state %}Where she is: {{ state.json.location }}. How it feels: {{ state.json.mood }}.{% endif %}

# user:
{% if story %}# Story so far
{{ story }}{% endif %}

# user:
{{ brief }}

# system:
[System note: write only this Body's prose. No UI state, machine-readable
protocol, analysis, or explanation in the story body.]
