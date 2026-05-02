#!/usr/bin/env node

'use strict';

const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO_URL = 'https://github.com/tiagoastak/adr-kit.git';
const SUBMODULE_PATH = '.claude/adr-kit';

const args = process.argv.slice(2);
const command = args[0];
const tool = args.includes('--codex') ? 'codex' : args.includes('--claude') ? 'claude' : null;

if (!command || command === '--help' || command === '-h') {
  console.log(`
adrkit — ADR-driven workflow for Claude Code and Codex

Usage:
  npx @tiagoasta/adrkit init [--claude|--codex]   Set up adr-kit in this repo
  npx @tiagoasta/adrkit update                    Pull latest adr-kit submodule
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

function runSilent(cmd) {
  try {
    return execSync(cmd, { stdio: 'pipe' }).toString().trim();
  } catch {
    return null;
  }
}

function isGitRepo() {
  return runSilent('git rev-parse --git-dir') !== null;
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function scaffoldDocs() {
  mkdirp('docs/adrs');
  mkdirp('docs/execution-plans/archive');
  mkdirp('docs/backlog');

  if (!fs.existsSync('docs/adr-index.md')) {
    const template = path.join(SUBMODULE_PATH, 'docs/templates/adr-index-template.md');
    if (fs.existsSync(template)) {
      fs.copyFileSync(template, 'docs/adr-index.md');
    }
  }
}

function initClaude() {
  console.log(`
adr-kit installed at .claude/adr-kit

Next step — open Claude Code in this repo and type:

  @.claude/adr-kit/commands/adr-init.md

This bootstraps commands, rules, docs/, CLAUDE.md, and settings.json in one step.
`);
}

function initCodex() {
  scaffoldDocs();

  if (!fs.existsSync('AGENTS.md')) {
    const content = [
      '# Active Workflow',
      '',
      'Read `.claude/adr-kit/AGENTS.base.md` for the full workflow instructions.',
      '',
      '---',
      '',
      '# [Repo Name] Project',
      '',
      '## Quick Commands',
      '',
      '- Run: `[add your run command here]`',
      '- Test: `[add your test command here]`',
      '- Lint: `[add your lint command here]`',
      '',
      '## Active Work',
      '',
      '> No active ADRs.',
      '',
      '## Architecture Overview',
      '',
      '[Brief description of this repo\'s architecture and stack]',
      '',
      '## Code Conventions',
      '',
      '[Describe or link to stack-specific conventions]',
    ].join('\n');

    fs.writeFileSync('AGENTS.md', content);
    console.log('Created AGENTS.md');
  } else {
    console.log('AGENTS.md already exists — add this line at the top:');
    console.log('');
    console.log('  Read `.claude/adr-kit/AGENTS.base.md` for the full workflow instructions.');
    console.log('');
  }

  console.log(`
adr-kit initialized for Codex!

docs/ structure scaffolded
AGENTS.md: created (or see manual instructions above)

Next steps:
1. Fill in AGENTS.md — repo name, Quick Commands, Architecture Overview
2. Commit everything:
   git add .claude/ docs/ AGENTS.md
   git commit -m "chore: initialize adr-kit workflow"

To drive the workflow, speak to Codex naturally:
  "Create an ADR for [feature description]"
  "Create an execution plan for ADR-[ID]"
  "Resume the current feature"
`);
}

// --- Commands ---

if (command === 'init') {
  if (!isGitRepo()) {
    console.error('Error: not inside a git repository. Run `git init` first.');
    process.exit(1);
  }

  if (!tool) {
    console.log(`Which tool are you setting up for?

  npx @tiagoasta/adrkit init --claude    Claude Code
  npx @tiagoasta/adrkit init --codex    OpenAI Codex CLI
`);
    process.exit(0);
  }

  if (fs.existsSync(SUBMODULE_PATH)) {
    console.log('adr-kit is already installed at .claude/adr-kit');
    console.log('To update, run: npx @tiagoasta/adrkit update');
    process.exit(0);
  }

  console.log('Adding adr-kit submodule...');
  run(`git submodule add ${REPO_URL} ${SUBMODULE_PATH}`);
  run('git submodule update --init');

  if (tool === 'claude') {
    initClaude();
  } else if (tool === 'codex') {
    initCodex();
  }

} else if (command === 'update') {
  if (!fs.existsSync(SUBMODULE_PATH)) {
    console.error('adr-kit is not installed. Run: npx @tiagoasta/adrkit init --claude  or  --codex');
    process.exit(1);
  }

  console.log('Pulling latest adr-kit...');
  run(`cd ${SUBMODULE_PATH} && git pull origin main`);

  const hasClaude = fs.existsSync('.claude/commands');
  const hasCodex = fs.existsSync('AGENTS.md');

  console.log('\nadr-kit updated.\n');

  if (hasClaude) {
    console.log('Claude Code — open Claude Code and run:');
    console.log('\n  @.claude/adr-kit/commands/adr-update.md\n');
  }
  if (hasCodex) {
    console.log('Codex — AGENTS.base.md updated automatically via submodule.');
    console.log('No further action needed.\n');
  }

} else {
  console.error(`Unknown command: ${command}`);
  console.log('Run `npx @tiagoasta/adrkit --help` for usage.');
  process.exit(1);
}
