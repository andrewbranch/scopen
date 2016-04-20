#!/usr/bin/env node

import program from 'commander';
import pack from '../package.json';

program
  .version(pack.version)
  .description(pack.description)
  .usage('[options] <file>')
  .option('-w, --with [cmd]', 'shell program used to open the URL [open]', 'open')
  .option('-a, --application [app]', 'application option passed through to `open`')
  .option('-b, --branch [branch]', 'git branch to view file [current branch]')
  .option('-r, --remote [remote]', 'git remote to view file [origin]', 'origin')
  .parse(process.argv);

console.log(program);
