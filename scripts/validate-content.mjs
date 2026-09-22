#!/usr/bin/env node
/* eslint-disable no-console */

import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const postsRoot = join(root, "src/content/posts/published");
const imagesRoot = join(root, "src/assets/images/posts");
const errors = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

const imageFiles = await walk(imagesRoot);
for (const file of imageFiles) {
  const extension = extname(file).toLowerCase();
  if ([".md", ".gitkeep"].includes(extension) || file.endsWith("README.md")) {
    continue;
  }
  if (extension !== ".webp") {
    errors.push(
      `${relative(root, file)}: 포스팅 래스터 이미지는 .webp만 허용됩니다.`
    );
  }
}

const postFiles = (await walk(postsRoot)).filter(file =>
  [".md", ".mdx"].includes(extname(file).toLowerCase())
);

const rasterExtension = /\.(?:avif|gif|jpe?g|png|tiff?)(?:[?#][^\s"')]+)?/i;
for (const file of postFiles) {
  const source = await readFile(file, "utf8");
  const badReferences = source.match(rasterExtension) ?? [];
  for (const reference of badReferences) {
    errors.push(
      `${relative(root, file)}: ${reference} 대신 WebP 이미지를 사용하세요.`
    );
  }

  const ogImage = source.match(/^ogImage:\s*(.+)$/m)?.[1]?.trim();
  if (ogImage && !ogImage.toLowerCase().endsWith(".webp")) {
    errors.push(
      `${relative(root, file)}: ogImage도 .webp 파일이어야 합니다.`
    );
  }
}

if (errors.length > 0) {
  console.error("콘텐츠 이미지 검증 실패:\n");
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `콘텐츠 검증 통과: 글 ${postFiles.length}개, 포스팅 이미지 ${imageFiles.filter(file => extname(file).toLowerCase() === ".webp").length}개`
);
