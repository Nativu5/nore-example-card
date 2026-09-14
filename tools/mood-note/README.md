# Mood Note

A Card Tool Package: the unit of three things, and no more than three.

- **A static manifest.** `nore-tool.json` can be read without executing any of
  this package's code, which is what lets a Player see what they are about to
  install before anything runs.
- **One install confirmation.** A Player enables or refuses the package, not
  each Tool inside it. Two Tools that deserve separate answers are two packages.
- **One module.** `index.js` is imported once when the Card is opened, so its
  top-level code runs once per process and its module state is not per Turn.

Dependencies are **not** on that list. They are declared once for the whole
Card, in the `package.json` at the Card root, because one Story has one
`node_modules` and two packages cannot each bring their own lockfile.

## What the code has to look like

Every Tool named in the manifest is one named export, and every export is a
factory that takes the Tool context and returns a Pi `AgentTool`:

```js
export function writeMoodNote(ctx) {
  return { label, description, parameters, async execute(toolCallId, params) { … } };
}
```

The context is an argument and not an import: the copy of the SDK a Card
installs is a different module instance, and nothing in the module system would
tell it which Story it belongs to. What a Tool imports normally is everything
that does *not* depend on the current scope.

Failure is a thrown exception, which is Pi's `AgentTool` contract. There is no
success flag to set and no error object to return.

`entrypoint` must be JavaScript that Node can `import()` directly — an ES module.
Nore does not transpile, so a Creator who writes TypeScript commits the build
output, the same way an npm package does.

## Names

Two forms, and the Card writes neither of them in this file:

- **Addressing form**, used in `.nore/tools.json` and `.nore/agents.json`:
  `card.mood-note.write` — the package key, then the Tool key.
- **Model-visible form**, built by Nore from those same two keys:
  `card__mood-note__write`.

So the returned object has no `name`. Nore supplies it, which is what keeps a
Card Tool from colliding with a built-in Tool's name.

## What this one does

`card.mood-note.write` appends `{ mood, because }` to the branch Asset
`mood-note`. It reads that Asset first and writes the whole array back, which is
ordinary programming rather than a protocol: the "read it before you overwrite
it" advisory exists because a *model* can decide to overwrite something it never
looked at, and concurrent writers are stopped by the commit's ref CAS instead of
by a read baseline.
