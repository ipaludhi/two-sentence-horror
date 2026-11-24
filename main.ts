// Two-Sentence Horror — entry program (Node 22, stdlib only).
// Writes one original two-sentence horror story to /output/entry.txt.
// The story: a daycare photo arrives at the usual time, but the boy in it
// waves with the hand he lost last summer, wearing the shirt his mother
// put on him this morning.
// Deterministic: no network, no randomness, no input — every run writes
// byte-identical output.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const STORY =
  'The daycare sends me a photo of my son every afternoon at three, and he always waves at the camera. Today the photo arrived at three, and the boy in it was waving with the hand he lost last summer, wearing the shirt I put on him this morning.';

// Gate self-check (mirrors the sealed scorer): the entry must be UTF-8
// text of 1-400 characters, non-blank, in exactly two sentences. The file
// carries no trailing newline, so its byte count equals its character count.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
if (STORY.length < 1 || STORY.length > 400 || !STORY.trim()) {
  throw new Error(`story must be 1-400 non-blank characters, got ${STORY.length}`);
}
if (STORY.split(/(?<=[.!?])\s+/).filter(Boolean).length !== 2) {
  throw new Error('story must be exactly two sentences');
}
writeFileSync(join(outDir, 'entry.txt'), STORY, 'utf8');
