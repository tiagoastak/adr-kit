#!/usr/bin/env node

'use strict';

const { execSync } = require('child_process');
const fs = require('fs');

const REPO_URL = 'https://github.com/tiagoastak/adr-kit.git';
const SUBMODULE_PATH = '.claude/adr-kit';

const command = process.argv[2];

if (!command || command === '--help' || command === '-h') {
  console.log(`
adrkit — ADR-driven workflow for Claude Code

Usage:
  npx adrkit init     Add adr-kit as a submodule and print setup instructions
  npx adrkit update   Pull latest adr-kit and print refresh instructions
`);
  process.exit(command ? 0 : 1);
}

function run(cmd) {
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    process.exit(e.status || 1);
  }
}

function isGitRepo() {
  try {
    execSync('git rev-parse --git-dir', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

if (command === 'init') {
  if (!isGitRepo()) {
    console.error('Error: not inside a git repository. Run `git init` first.');
    process.exit(1);
  }

  if (fs.existsSync(SUBMODULE_PATH)) {
    console.log('adr-kit is already installed at .claude/adr-kit');
    console.log('To update, run: npx adrkit update');
    process.exit(0);
  }

  console.log('Adding adr-kit submodule...');
  run(`git submodule add ${REPO_URL} ${SUBMODULE_PATH}`);
  run('git submodule update --init');

  console.log(`
adr-kit installed at .claude/adr-kit

Next step — open Claude Code in this repo and type:

  @.claude/adr-kit/commands/adr-init.md

This bootstraps commands, rules, docs/, CLAUDE.md, and settings.json in one step.
`);

} else if (command === 'update') {
  if (!fs.existsSync(SUBMODULE_PATH)) {
    console.error('adr-kit is not installed. Run: npx adrkit init');
    process.exit(1);
  }

  console.log('Pulling latest adr-kit...');
  run(`cd ${SUBMODULE_PATH} && git pull origin main`);

  console.log(`
adr-kit updated.

Next step — open Claude Code in this repo and type:

  @.claude/adr-kit/commands/adr-update.md

This refreshes your command shims and rules from the updated submodule.
`);

} else {
  console.error(`Unknown command: ${command}`);
  console.log('Run `npx adrkit --help` for usage.');
  process.exit(1);
}
