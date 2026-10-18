#!/usr/bin/env node
// Cloud guard: the convoy guard's size warnings for Antler Convoy cloud chats (claude.ai/code).
// The full guard (~/.claude/hooks/convoy-guard.mjs) only runs on the owner's PC; a cloud chat only loads
// hooks committed in its repo. On Oct 17, 2026 a finished cloud chat ran past 500k tokens unwarned.
// Does nothing outside the cloud (CLAUDE_CODE_REMOTE != "true"), so PC chats never get two guards.
// UserPromptSubmit hook. No dependencies. Any failure stays silent and never blocks.
import fs from "node:fs";

// Mirrors ~/.claude/hooks/convoy-guard.json (forceAt, blockAt, overridePrefix), set by the credit audit, Oct 17, 2026.
const WARN_AT = 150000;
const BLOCK_AT = 250000;
const OVERRIDE = "keep:";

const k = (n) => `${Math.round(n / 1000)}k`;

function lastContext(file) {
  // Read only the tail: transcripts get large and the latest usage is near the end.
  const size = fs.statSync(file).size;
  const len = Math.min(size, 4 << 20);
  const buf = Buffer.alloc(len);
  const fd = fs.openSync(file, "r");
  try {
    fs.readSync(fd, buf, 0, len, size - len);
  } finally {
    fs.closeSync(fd);
  }
  const lines = buf.toString("utf8").split("\n");
  for (let i = lines.length - 1; i >= 0; i--) {
    let o;
    try {
      o = JSON.parse(lines[i]);
    } catch {
      continue;
    }
    const u = o?.message?.usage;
    if (o.type === "assistant" && !o.isSidechain && u)
      return (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0);
  }
  return 0;
}

function decide(input) {
  const prompt = String(input.prompt || "");
  const ctx = input.transcript_path ? lastContext(input.transcript_path) : 0;
  const override = prompt.trimStart().toLowerCase().startsWith(OVERRIDE);

  if (ctx >= BLOCK_AT && !override)
    return {
      decision: "block",
      reason:
        `This cloud chat is at ${k(ctx)} tokens, so every reply re-reads all of it and burns cloud credit. ` +
        `Open a new chat for the next task (and archive this one once its PR is merged). ` +
        `To keep going here anyway, start your message with "${OVERRIDE}".`,
    };

  const lines = [
    "Cloud guard (the owner's standing rule for Antler Convoy cloud chats): stay inside this session's brief. " +
      "If the owner asks for work outside it, say so in one line and suggest a fresh chat for it instead of doing it here. " +
      "When the brief's PR is open, stop; once it's merged, the chat should be archived.",
  ];
  if (ctx >= WARN_AT)
    lines.push(
      `This cloud chat is at ${k(ctx)} tokens (warning at ${k(WARN_AT)}, messages held at ${k(BLOCK_AT)}). ` +
        `Start your reply with this line, in italics, word for word: ` +
        `"This cloud chat is big (${k(ctx)} tokens), so each reply costs more credit. Finish this step, then start a fresh chat."`,
    );
  return { hookSpecificOutput: { hookEventName: "UserPromptSubmit", additionalContext: lines.join("\n") } };
}

try {
  if (process.env.CLAUDE_CODE_REMOTE === "true") {
    const input = JSON.parse(fs.readFileSync(0, "utf8") || "{}");
    process.stdout.write(JSON.stringify(decide(input)));
  }
} catch {}
process.exit(0);
