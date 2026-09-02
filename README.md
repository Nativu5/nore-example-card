# Nore Example Card

This repository is a small, author-facing Nore Character Card example.

It uses a normal non-bare Git repository. Every opening is an ordinary Git
branch, and none of them is privileged:

- `main` — the default opening
- `opening/rainy-door`
- `opening/city-at-dawn`

All three branch from the root commit, which carries the Card definition and no
prose. **An opening's `body.txt` is the Story's starting text, so openings must
diverge before any Body is committed** — otherwise a Story started from one
opening reads another opening's prose as its own first Body. If several openings
are meant to share a prologue, each one's `body.txt` contains it.

The layout keeps framework metadata separate from creator-authored content:

```text
.nore/        Nore metadata and registries
agents/       Agent definitions and prompts
tools/        Self-contained Card Tool packages
assets/       Card and Branch assets
body.txt      The Story Body accumulated up to this commit
draft/        Runtime draft files
```

A Nore runtime can start a new Story from any chosen branch head, then create
its own runtime Story Branch such as:

```text
refs/nore/story/<story-id>/<branch-id>
```

The JSON files in `.nore/` intentionally stay small. They only use fields that
are stable enough for this early example.
