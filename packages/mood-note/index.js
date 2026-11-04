/**
 * `record_mood`: the export `.nore/tools.json` names for the Tool.  A factory
 * that takes the Tool context and returns a Pi `AgentTool` -- minus its name,
 * its description and whether it runs in parallel, which `tools.json` says, so
 * a Player can read what this Card has without running its code.
 *
 * The context arrives as an argument rather than through an `import` because the
 * copy of the SDK a Card installs is a different module instance -- nothing in
 * the module system would tell it which Story, Branch or Turn it belongs to.
 */
export function recordMood(ctx) {
  return {
    label: "Record Mood",
    parameters: {
      type: "object",
      properties: {
        mood: { type: "string", description: "One or two words for the mood the scene ended on." },
        because: { type: "string", description: "The detail in the prose that establishes it." },
      },
      required: ["mood", "because"],
      additionalProperties: false,
    },
    async execute(toolCallId, params) {
      // Read-then-write is ordinary programming here.  The Asset façade code
      // gets is addressed by Asset Key and has no "read it before you overwrite
      // it" advisory to satisfy: that guard exists because a model can decide to
      // overwrite something it never looked at, which is not a thing code does.
      // Concurrent writers are stopped by the commit's ref CAS, not by a baseline.
      const stored = await ctx.assets.read("mood-note").catch(() => undefined);
      const notes = stored ? JSON.parse(stored) : [];
      notes.push({ mood: params.mood, because: params.because });
      // Failure is expressed by throwing, which is Pi's `AgentTool` contract: a
      // rejected write raises here and Nore reports the Tool call as failed.
      await ctx.assets.write({
        key: "mood-note",
        content: JSON.stringify(notes, null, 2) + "\n",
        mediaType: "application/json",
      });
      return {
        content: [{ type: "text", text: `Mood recorded: ${params.mood}. ${notes.length} so far.` }],
      };
    },
  };
}
