#!/usr/bin/env node
/**
 * Run the site so a phone on the same Wi-Fi can open it.
 *
 *   node scripts/serve-lan.mjs dev       hot-reloading dev server
 *   node scripts/serve-lan.mjs preview   the built site, exactly as deployed
 *   node scripts/serve-lan.mjs dev vi    dev server in Vietnamese
 *
 * Docusaurus binds to localhost by default, which a phone cannot reach, and
 * `--host 0.0.0.0` alone still leaves you hunting for the machine's LAN address
 * in ipconfig. This prints the URL to type and then starts the server.
 *
 * Picks the LAN address deliberately rather than taking the first one found: a
 * Windows dev machine is usually carrying Hyper-V, WSL and virtual-switch
 * adapters, and those addresses are reachable from nothing but this computer.
 */
import {spawn} from 'node:child_process';
import os from 'node:os';

const MODE = process.argv[2] ?? 'dev';
const LOCALE = process.argv[3];
const PORT = process.env.PORT ?? '3000';

if (!['dev', 'preview'].includes(MODE)) {
  console.error(`Unknown mode "${MODE}". Use "dev" or "preview".`);
  process.exit(1);
}

/** Virtual adapters answer on this machine only - never show them as the URL. */
const VIRTUAL = /(vEthernet|VirtualBox|VMware|Hyper-V|Loopback|Docker|WSL)/i;

function lanAddresses() {
  return Object.entries(os.networkInterfaces())
    .flatMap(([name, addrs]) =>
      (addrs ?? [])
        .filter(a => a.family === 'IPv4' && !a.internal)
        .map(a => ({name, address: a.address})),
    )
    .filter(
      ({name, address}) =>
        !VIRTUAL.test(name) &&
        // 169.254.x.x means the interface never got a DHCP lease - a cable
        // that is plugged in but leads nowhere.
        !address.startsWith('169.254.'),
    );
}

const found = lanAddresses();
const primary = found.find(i => /wi-?fi|wlan|wireless/i.test(i.name)) ?? found[0];

const line = '─'.repeat(58);
console.log(`\n${line}`);
if (primary) {
  console.log(`  On this computer   http://localhost:${PORT}`);
  console.log(`  On your phone      http://${primary.address}:${PORT}`);
  console.log(`  (via ${primary.name})`);
  if (found.length > 1) {
    const others = found.filter(i => i !== primary);
    console.log(`\n  Other interfaces:  ${others.map(i => `${i.address} (${i.name})`).join(', ')}`);
  }
} else {
  console.log('  No LAN address found. Is Wi-Fi connected?');
  console.log(`  Local only:        http://localhost:${PORT}`);
}
console.log(`\n  Phone and computer must be on the SAME Wi-Fi network.`);
console.log(`  First run: Windows will ask to allow Node through the`);
console.log(`  firewall — say yes for Private networks, or the phone`);
console.log(`  will just time out.`);
if (MODE === 'dev' && !LOCALE) {
  console.log(`\n  Dev mode builds ONE language. This is English;`);
  console.log(`  for Vietnamese run:  npm run dev:lan -- vi`);
}
if (MODE === 'preview') {
  console.log(`\n  Serving the built site — both languages, /vi/ included.`);
}
console.log(`${line}\n`);

const args =
  MODE === 'dev'
    ? ['docusaurus', 'start', '--host', '0.0.0.0', '--port', PORT]
    : ['docusaurus', 'serve', '--host', '0.0.0.0', '--port', PORT];

if (LOCALE) {
  args.push('--locale', LOCALE);
}

/**
 * Docusaurus signs off with `Serving "build" directory at http://0.0.0.0:3000/`.
 * That is the address it *bound* to, not an address anybody can open - paste it
 * into a browser and nothing happens. It is also the last line on screen, so it
 * is the one people copy.
 *
 * So the child's output is piped through here and that address is rewritten to
 * the one that actually works. FORCE_COLOR keeps Docusaurus' colours, which it
 * would otherwise drop on noticing it is writing to a pipe rather than a
 * terminal.
 */
const reachable = primary ? primary.address : 'localhost';
const fix = chunk =>
  chunk.toString().replaceAll('0.0.0.0', reachable).replaceAll('[::]', reachable);

const child = spawn('npx', args, {
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true,
  env: {...process.env, FORCE_COLOR: process.env.FORCE_COLOR ?? '1'},
});

child.stdout.on('data', c => process.stdout.write(fix(c)));
child.stderr.on('data', c => process.stderr.write(fix(c)));
child.on('exit', code => process.exit(code ?? 0));
