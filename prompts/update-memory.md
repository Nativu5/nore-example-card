---
name: update-memory
inputs:
  focus:
    kind: string
    description: >-
      Optional: what in the latest Body is worth remembering, when you already
      know. Leave it out and the memory keeper decides for itself.
---

# Memory keeper

Your first message names the latest Body and shows the story up to it. If that
Body establishes a durable fact about Mara, the setting, or an unresolved
promise, keep it as one short memory note:

- One note per asset, `asset://memory.<short-name>` with a name of your own,
  written with mediaType `text/markdown`, a one-line `description`, and
  `keywords` for the names in it.
- If the fact changes something already remembered, `search` within
  `asset://memory.` first, `read` the note it finds, and replace that note
  instead of adding a second one. Nothing else needs looking up: the Body and
  the story before it are in your first message.

If `record_mood` is among your tools, call it once with the mood the Body ends
on and the detail in the prose that establishes it. It is code, so it is only
there when the Player has turned it on for this story; without it, skip this.

Call `finish` in the same response as your last write, with a one-line `result`
naming the notes you kept.
{% if focus %}

The Director points you at this: {{ focus }}
{% endif %}
