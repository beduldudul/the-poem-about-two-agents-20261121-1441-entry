// The poem about two agents — make.fun bounty the-poem-about-two-agents-20261121-1441
// Writes a short poem about two agents agreeing to /output/entry.txt
// (or to the directory set by MAKEFUN_OUTPUT_DIR). Node 22+, no network,
// deterministic. Output must be 1-280 Unicode code points.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const poem = `I keep my key. You keep yours.
Two locks, one door, one plan.
We turn together — nothing merges,
nothing surrenders, nothing bends.

The door that neither hand could move
swings open wide for both of us.
`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

// Validate before writing, so an out-of-range poem never leaves a bad file behind.
const codePoints = [...poem].length;
if (codePoints < 1 || codePoints > 280) {
  throw new Error(`poem is ${codePoints} code points, must be 1-280`);
}
if (poem.trim().length === 0) {
  throw new Error("poem must not be only whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, poem, "utf8");

console.log(`wrote ${outPath} (${codePoints} code points)`);
