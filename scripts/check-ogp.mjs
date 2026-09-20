import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(process.argv[2] || 'dist');
const seen = new Set();
for (const lang of ['ja', 'en']) for (const page of ['home', 'works', 'about', 'contact']) {
  const html = readFileSync(resolve(root, lang, page, 'index.html'), 'utf8');
  const tags = [...html.matchAll(/<meta\s+(?:name|property)="([^"]+)"\s+content="([^"]*)"\s*\/?\s*>/g)];
  const meta = Object.fromEntries(tags.map(match => [match[1], match[2]]));
  assert.equal(tags.length, Object.keys(meta).length, 'Duplicate metadata');
  assert.equal(meta['og:site_name'], 'yuitopia');
  assert.equal(meta['twitter:site'], '@yuito_it_');
  assert.equal(meta['twitter:card'], 'summary_large_image');
  assert.equal(meta['theme-color'], '#3b725d');
  assert.equal(meta['og:locale'], lang === 'ja' ? 'ja_JP' : 'en_US');
  assert.equal(meta['twitter:image'], meta['og:image']);
  assert.equal(meta['og:description'], meta.description);
  const url = new URL(meta['og:url']);
  assert(url.pathname.endsWith(`/${lang}/${page}/`));
  assert(html.includes(`<link rel="canonical" href="${url.href}"`));
  assert(html.includes(`<html lang="${lang}">`));
  const image = new URL(meta['og:image']);
  assert.equal(image.origin, url.origin);
  const base = url.pathname.slice(0, -`${lang}/${page}/`.length);
  assert(image.pathname.startsWith(base));
  const png = readFileSync(resolve(root, image.pathname.slice(base.length)));
  assert.equal(png.subarray(1, 4).toString(), 'PNG');
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  assert(!seen.has(image.href), 'Each page/language needs its own image');
  seen.add(image.href);
  for (const [, path] of html.matchAll(/(?:src|href)="([^"]+\.(?:js|css))"/g)) {
    assert(path.startsWith(base), 'Asset path must work on direct access');
    assert(existsSync(resolve(root, path.slice(base.length))));
  }
}
console.log('Passed: 8 static pages, distinct 1200×630 PNGs, site attribution, theme color, canonical URLs, and bundle paths.');
