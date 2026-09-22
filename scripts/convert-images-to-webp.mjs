#!/usr/bin/env node
// Decap CMS 등에서 jpg/png 등 웹P가 아닌 이미지를 올렸을 때 자동으로 webp로
// 변환하고, 글 파일(md/mdx) 안의 참조 경로도 함께 고쳐준다.
// GitHub Actions에서 push마다 실행되며, 바꿀 게 없으면 그냥 조용히 종료한다.
/* eslint-disable no-console */

import { readdir, readFile, writeFile, rename } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const imagesRoot = join(root, "src/assets/images/posts");
const contentRoots = [
  join(root, "src/content/posts/published"),
  join(root, "src/content/pages"),
];

const RASTER_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".tif",
  ".tiff",
  ".avif",
  ".bmp",
]);

async function walk(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

const imageFiles = await walk(imagesRoot);
const toConvert = imageFiles.filter(file =>
  RASTER_EXTENSIONS.has(extname(file).toLowerCase())
);

if (toConvert.length === 0) {
  console.log("변환할 이미지 없음 — 모두 webp.");
  process.exit(0);
}

const renameMap = new Map(); // "posts/airport-to-stay/slug/hero.jpg" -> "posts/airport-to-stay/slug/hero.webp"

for (const file of toConvert) {
  const webpPath = file.replace(extname(file), ".webp");
  await sharp(file).webp({ quality: 82 }).toFile(webpPath);

  const newRel = relative(join(root, "src/assets/images"), webpPath);
  renameMap.set(relative(join(root, "src/assets/images"), file), newRel);

  const { unlink } = await import("node:fs/promises");
  await unlink(file);
  console.log(`변환: ${relative(root, file)} → ${relative(root, webpPath)}`);
}

// 글 파일 안의 참조 경로 치환 (import 별칭 형태 "@/assets/images/..."와
// frontmatter의 상대경로 형태 "../../../../assets/images/..." 둘 다
// 끝부분 "images/posts/..." 문자열은 동일하므로 그 부분만 치환한다.
let updatedFiles = 0;
for (const contentRoot of contentRoots) {
  const postFiles = (await walk(contentRoot)).filter(file =>
    [".md", ".mdx"].includes(extname(file).toLowerCase())
  );

  for (const file of postFiles) {
    let source = await readFile(file, "utf8");
    let changed = false;

    for (const [oldRel, newRel] of renameMap) {
      if (source.includes(oldRel)) {
        source = source.split(oldRel).join(newRel);
        changed = true;
      }
    }

    if (changed) {
      await writeFile(file, source, "utf8");
      updatedFiles += 1;
      console.log(`참조 수정: ${relative(root, file)}`);
    }
  }
}

console.log(
  `완료: 이미지 ${toConvert.length}개 변환, 글 파일 ${updatedFiles}개 참조 수정.`
);
