#!/usr/bin/env node
/* Add semantic icon names to every icon set in one go.
   Usage: node scripts/add-icons.mjs <phosphor-core-package-dir> name=solarId:phosphorId [name=solarId:phosphorId …]
   - Solar: the id must exist in components/icons/solar.json (the full Solar set is vendored).
   - Phosphor: read from @phosphor-icons/core (npm pack @phosphor-icons/core@2.1.1 and untar it; pass the package dir).
     phosphor-duotone       = the duotone SVG as is (fill="currentColor" on each path)
     phosphor-bold-duotone  = the duotone tint (opacity .25) under the bold outline
   Then run npm run build:icons and add the names to skill/s4-orion/references/icons.md. */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const [pkg, ...pairs] = process.argv.slice(2);
if (!pkg || !pairs.length) { console.error('usage: add-icons.mjs <phosphor-core-dir> name=solarId:phosphorId …'); process.exit(1); }
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const write = (p, o, indent) => writeFileSync(join(root, p), JSON.stringify(o, null, indent) + (indent ? '\n' : ''));
const names = read('components/icons/names.json');
const solar = read('components/icons/solar.json');
const duo = read('components/icons/phosphor-duotone.json');
const boldDuo = read('components/icons/phosphor-bold-duotone.json');
const inner = (svg) => svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/<path /g, '<path fill="currentColor" ');

for (const pair of pairs) {
  const [name, ids] = pair.split('=');
  const [sid, pid] = ids.split(':');
  if (!solar[sid]) throw new Error(`Solar has no "${sid}"`);
  const d = inner(readFileSync(join(pkg, 'assets/duotone', `${pid}-duotone.svg`), 'utf8')).replace(/opacity="0\.2"/g, 'opacity=".2"');
  const b = inner(readFileSync(join(pkg, 'assets/bold', `${pid}-bold.svg`), 'utf8'));
  const tint = (d.match(/<path [^>]*opacity="[^"]*"[^>]*\/>/) || [''])[0].replace(/opacity="[^"]*"/, 'opacity=".25"');
  duo[pid] = d.replace(/opacity="\.2"/g, 'opacity="0.2"');
  boldDuo[pid] = tint + b;
  names.sets.solar.names[name] = sid;
  names.sets['phosphor-duotone'].names[name] = pid;
  names.sets['phosphor-bold-duotone'].names[name] = pid;
  console.log(`+ ${name}: solar ${sid}, phosphor ${pid}`);
}
write('components/icons/names.json', names, 2);
write('components/icons/phosphor-duotone.json', duo);
write('components/icons/phosphor-bold-duotone.json', boldDuo);
