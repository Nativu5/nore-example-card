# Packages

This Card's code. Each directory under `packages/` is one package: a
`nore-package.json` that says what it is and where its entry module is, and the
module itself. Which of its exports are Tools and which are handlers is not in
here -- `.nore/tools.json` and `.nore/hooks.json` name them, so a Player can see
everything this Card would run without running any of it.

- `checks/` exports `stripThink`, the `strip-think` handler on
  `generate_draft`'s result.
- `mood-note/` exports `recordMood`, the `record_mood` Tool the memory keeper
  calls.

## What the code has to look like

Every export the Card names is a **factory**: it takes the Tool context and
returns the thing Nore calls. The context is an argument and not an import -- the
copy of the SDK a Card installs is a different module instance, and nothing in
the module system would tell it which Story it belongs to.

- **A Tool** returns a Pi `AgentTool` without a `name`, a `description` or an
  execution mode: `tools.json` says those. Its result is text; a failure is a
  thrown exception, which is Pi's own contract.
- **A handler** returns a function Nore calls with the event it hangs on. On a
  `tool_result` it gets the result's `content` -- on `generate_draft`, the Draft
  -- and returns nothing to pass it on, new `content` to rewrite it, or
  `isError: true` with the reason as `content` to reject it. On a `tool_call` it
  returns nothing, or `{ block: true, reason }`. A throw, or taking longer than
  the deadline, is the handler failing.

`entrypoint` must be JavaScript that Node can `import()` directly -- an ES module.
Nore does not transpile, so a Creator who writes TypeScript commits the build
output, the same way an npm package does.

## Turning code on

Every code entry starts off in a new Story; the Player turns it on in the
Story's settings. The first entry of a package turned on is when that package's
module is imported, once, and its top-level code runs -- so trust is a decision
about the whole package, not about each export.

`strip-think` is marked `required`: a Story will not open until the Player turns
it on, because a Draft with the model's reasoning still in it must not reach the
story. `record_mood` is not: without it the memory keeper just skips the mood.

Dependencies are declared once for the whole Card, in the `package.json` at the
Card root, because one Story has one `node_modules`. This Card has none, so it
has no lockfile and Nore never runs an install for it; the root `package.json`
is here for `"type": "module"`.
