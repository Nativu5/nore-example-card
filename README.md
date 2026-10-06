# Nore Example Card

This repository is a small, author-facing Nore Character Card example.

It uses a normal non-bare Git repository. Every opening is an ordinary Git
branch, and none of them is privileged:

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

The layout keeps framework metadata separate from creator-authored content:

```text
.nore/        Nore metadata and registries
agents/       Agent definitions and prompts
tools/        Card Tool packages
assets/       Card and Branch assets
body.txt      The Story Body accumulated up to this commit
draft/        Runtime draft files
package.json  The Card as an npm project: module type, and dependencies if any
```

## Card Tools

`tools/mood-note/` is a Card Tool Package; see its own README for the shape the
code has to take. `.nore/agents.json` gives its one Tool to the memory
projector, which records the mood each new Body ends on; a Player enables the
package per Story, and may take the Tool away from that agent again. Two things
about it belong here rather than there, because they are properties of the Card
and not of the package:

- **Dependencies are declared once for the whole Card**, in the root
  `package.json`, with its lockfile committed beside it. One Story has one
  `node_modules`, so two packages cannot each bring their own. This Card has no
  dependencies, so it has no lockfile and Nore never runs an install for it; the
  root `package.json` is here for `"type": "module"`, which is what makes the
  package's `index.js` an ES module.
- **A Card Tool runs in the Harness process with the Harness's privileges.**
  Enabling one is a trust decision about this whole Card, not a capability list
  per Tool.

A Nore runtime can start a new Story from any chosen branch head. The Story is
a branch Nore creates in its own copy of this repository, named after the id
Nore assigns it:

```text
refs/heads/story/<story-id>
```

The JSON files in `.nore/` intentionally stay small. They only use fields that
are stable enough for this early example.
