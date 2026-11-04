# Nore Example Card

A small, author-facing Nore Character Card: Mara, a village well, and an empty
lantern waiting for the first impossible light.

## Openings

The Card is a normal non-bare Git repository, and every opening is an ordinary
branch, none of them privileged:

- `main` — the default opening
- `rainy-door`
- `city-at-dawn`

Nore imports every branch under `opening/<name>`, so these become
`opening/main`, `opening/rainy-door` and `opening/city-at-dawn` on its side.

`main` carries the Card definition and the default opening's `body.txt`. Each
alternate opening is `main` plus one commit that replaces `body.txt` and the
opening state, so all three share one Card definition: **change the Card on
`main`, then rebase the openings onto it.** Nore fences a Story's start at its
opening, so whatever prose history an opening branch carries becomes that
Story's single starting Body, never a Body the Story wrote.

## What the Card declares

A Card declares three things, in three files under `.nore/`:

- **`director.json`** — the Director, the one session every Player input goes
  to: its prompt, and which Tools it sees.
- **`tools.json`** — the Tools a model decides to call:
  - `generate_draft`, built into Nore, with this Card's Narrator template;
  - `update_memory`, an **agent** Tool: a short session of its own, from
    `prompts/update-memory.md`, that keeps memory notes on the latest Body;
  - `record_mood`, a **code** Tool from `packages/mood-note`, given to
    `update_memory` only -- given to the Director as well, every mood would be
    recorded twice.
- **`hooks.json`** — the handlers Nore runs on every Draft, in order, before it
  becomes story Body:
  - `strip-think`, **code** from `packages/checks`, takes a model's `<think>`
    block out of the prose;
  - `plot-reviewer`, an **agent** handler, accepts the Draft, fixes a wrong
    detail, or rejects it with a reason the Director writes the next draft from.

The Director never sees a Draft. A Draft that passes its handlers is written
into the story in the same `generate_draft` call; a rejected one is not.
Nobody reminds the Director to update memory, so its prompt says when.

```text
.nore/          format, card metadata, asset manifest, and the three declarations
prompts/        the Director's, the Narrator's, the Reviewer's and the memory keeper's templates
packages/       this Card's code (see packages/README.md)
assets/         Card and Branch assets
body.txt        the Story Body accumulated up to this commit
package.json    the Card as an npm project: module type, and dependencies if any
```

## Running it

A Player turns code on per Story, in the Story's settings: every code entry
starts off. `strip-think` is `required`, so a new Story opens only once it is on.
Code runs in the Nore process with Nore's privileges; turning a package on is a
trust decision about that package.

A Story is a branch Nore creates in its own copy of this repository, named
after the id Nore assigns it:

```text
refs/heads/story/<story-id>
```
