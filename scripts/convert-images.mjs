import sharp from "sharp";
import { readdirSync, statSync, unlinkSync, existsSync } from "fs";
import { join, extname } from "path";

const ROOTS = ["src/assets/images", "public/images"];
const MIN_SIZE = 300 * 1024; // 300KB threshold
const MAX_DIM = 1920;

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else out.push({ path: p, size: s.size });
  }
  return out;
}

const files = ROOTS.flatMap((r) => walk(r)).filter((f) => {
  const ext = extname(f.path).toLowerCase();
  return [".png", ".jpg", ".jpeg"].includes(ext) && f.size > MIN_SIZE;
});

console.log(`Converting ${files.length} images...`);
let saved = 0;
for (const f of files) {
  const outPath = f.path.replace(/\.(png|jpe?g)$/i, ".webp");
  try {
    const img = sharp(f.path).rotate();
    const meta = await img.metadata();
    const resize = meta.width && meta.width > MAX_DIM ? { width: MAX_DIM } : {};
    await img.resize(resize).webp({ quality: 82, effort: 5 }).toFile(outPath);
    const newSize = statSync(outPath).size;
    saved += f.size - newSize;
    console.log(`${f.path} ${(f.size / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB`);
    if (outPath !== f.path) unlinkSync(f.path);
  } catch (e) {
    console.error(`FAIL ${f.path}: ${e.message}`);
  }
}
console.log(`Total saved: ${(saved / 1024 / 1024).toFixed(1)}MB`);
