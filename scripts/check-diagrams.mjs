// Parse every ```mermaid block in the docs with the real Mermaid parser.
//
// Docusaurus renders these client-side only, so a syntax error never fails the
// build - it ships and shows the reader an error box on the page. This is the
// only pre-deploy check there is.
import fs from 'node:fs';
import path from 'node:path';
import {JSDOM} from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  pretendToBeVisual: true,
});
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.navigator = dom.window.navigator;
globalThis.SVGElement = dom.window.SVGElement;
globalThis.Element = dom.window.Element;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.DOMPurify = undefined;
globalThis.requestAnimationFrame = cb => setTimeout(cb, 0);

const {default: mermaid} = await import('mermaid');
mermaid.initialize({startOnLoad: false, securityLevel: 'loose'});

const dirs = [
  'docs',
  path.join('i18n', 'vi', 'docusaurus-plugin-content-docs', 'current'),
];

let total = 0;
let failed = 0;

for (const dir of dirs) {
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
    const full = path.join(dir, file);
    const text = fs.readFileSync(full, 'utf8');
    const blocks = [...text.matchAll(/```mermaid\n([\s\S]*?)```/g)];
    for (const [, body] of blocks) {
      total += 1;
      try {
        await mermaid.parse(body);
      } catch (err) {
        failed += 1;
        console.log(`FAIL ${full}`);
        console.log(`  ${String(err.message).split('\n').slice(0, 4).join('\n  ')}`);
      }
    }
  }
}

console.log(`\nparsed ${total} diagrams, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
