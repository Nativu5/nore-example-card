/**
 * `strip-think`: a `tool_result` handler on `generate_draft`.  Some models put
 * their reasoning in the prose as a `<think>` block; it is taken out before the
 * Draft reaches the Reviewer and the story.  Returning nothing passes the Draft
 * on unchanged.
 *
 * A handler export is a factory, like a Tool's: it takes the Tool context and
 * returns the function Nore calls with each result it matches.
 */
export function stripThink() {
  return (event) => {
    const text = event.content.map((part) => (part.type === "text" ? part.text : "")).join("");
    const stripped = text.replace(/<think>[\s\S]*?<\/think>\s*/g, "");
    if (stripped !== text) return { content: [{ type: "text", text: stripped }] };
  };
}
