import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = join(__dirname, '..', 'public', 'images');

// Max widths by folder/pattern
function getMaxWidth(filePath) {
  const name = filePath.toLowerCase();
  if (name.includes('competencias')) return 800;
  if (name.includes('testimonial') || name.includes('avatar')) return 400;
  if (name.includes('motiv')) return 600;
  return 1200; // experience, default
}

async function* walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walkDir(full);
    else yield full;
  }
}

async function main() {
  const results = [];

  for await (const filePath of walkDir(INPUT_DIR)) {
    const ext = extname(filePath).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') continue;

    const outPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const maxWidth = getMaxWidth(filePath);

    try {
      const beforeStat = await stat(filePath);
      await sharp(filePath)
        .resize({ width: maxWidth, withoutEnlargement: true })
        .webp({ quality: 83 })
        .toFile(outPath);
      const afterStat = await stat(outPath);

      const before = Math.round(beforeStat.size / 1024);
      const after = Math.round(afterStat.size / 1024);
      const saving = Math.round((1 - afterStat.size / beforeStat.size) * 100);
      results.push({ file: basename(filePath), before, after, saving });
      console.log(`✓ ${basename(filePath)} → ${basename(outPath)}  ${before}KB → ${after}KB  (-${saving}%)`);
    } catch (err) {
      console.error(`✗ ${basename(filePath)}: ${err.message}`);
    }
  }

  console.log('\n--- Summary ---');
  const totalBefore = results.reduce((s, r) => s + r.before, 0);
  const totalAfter = results.reduce((s, r) => s + r.after, 0);
  console.log(`Total: ${totalBefore}KB → ${totalAfter}KB  (-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`);
}

main();
