#!/usr/bin/env node

import fs from 'node:fs';
import { styleText, AVAILABLE_STYLES } from '../src/index.js';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

// --- Color Palette ---

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

// --- Help & Usage ---

function printHelp() {
  console.log(`
${c.bold}${c.cyan}social-text-styler${c.reset} v${pkg.version}
${c.dim}Zero-dependency Unicode text formatter for LinkedIn & X.${c.reset}
${c.dim}Powered by PostReady — ${c.blue}https://postready.org${c.reset}

${c.bold}USAGE:${c.reset}
  $ social-text-styler "<text>" [options]
  $ echo "Important Update" | social-text-styler [options]

${c.bold}OPTIONS:${c.reset}
  ${c.green}-s, --style <name>${c.reset}      Formatting style (default: bold)
  ${c.green}-l, --list${c.reset}              List all available styles
  ${c.green}--no-preserve-urls${c.reset}      Also convert characters in URLs
  ${c.green}-h, --help${c.reset}              Show this help message
  ${c.green}-v, --version${c.reset}           Show version

${c.bold}AVAILABLE STYLES:${c.reset}
  ${AVAILABLE_STYLES.map(s => `${c.yellow}${s}${c.reset}`).join(', ')}

${c.bold}EXAMPLES:${c.reset}
  $ social-text-styler "Launch Day!" --style bold
  $ social-text-styler "Read more at https://postready.org" -s italic
  $ echo "Code Announcement" | social-text-styler -s monospace
`);
}

function printList() {
  console.log(`\n${c.bold}${c.cyan}Available Unicode Styles & Previews:${c.reset}\n`);
  const sample = 'PostReady Launch 2026';
  AVAILABLE_STYLES.forEach(style => {
    console.log(`  ${c.bold}${style.padEnd(16)}${c.reset} -> ${styleText(sample, style)}`);
  });
  console.log(`\n${c.dim}Try web version at: ${c.cyan}https://postready.org/en/tools/linkedin-text-formatter${c.reset}\n`);
}

// --- Argument Parser ---

async function readInput() {
  const args = process.argv.slice(2);
  let text = '';
  const options = {
    style: 'bold',
    preserveUrls: true
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '-h' || arg === '--help') {
      printHelp();
      process.exit(0);
    }
    if (arg === '-v' || arg === '--version') {
      console.log(`v${pkg.version}`);
      process.exit(0);
    }
    if (arg === '-l' || arg === '--list') {
      printList();
      process.exit(0);
    }
    if (arg === '-s' || arg === '--style') {
      options.style = args[++i];
      continue;
    }
    if (arg === '--no-preserve-urls') {
      options.preserveUrls = false;
      continue;
    }

    if (!arg.startsWith('-') && !text) {
      text = arg;
    }
  }

  if (text) {
    return { text, options };
  }

  if (!process.stdin.isTTY) {
    const chunks = [];
    for await (const chunk of process.stdin) {
      chunks.push(chunk);
    }
    return { text: Buffer.concat(chunks).toString('utf8').trim(), options };
  }

  printHelp();
  process.exit(1);
}

// --- Execution ---

async function main() {
  try {
    const { text, options } = await readInput();
    if (!text) {
      console.error(`${c.yellow}Error: No input text provided.${c.reset}`);
      process.exit(1);
    }

    const styled = styleText(text, options.style, options);
    console.log(styled);
  } catch (err) {
    console.error(`Error:`, err.message);
    process.exit(1);
  }
}

main();
