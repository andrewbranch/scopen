#!/usr/bin/env node

import program from 'commander';
import pack from '../package.json';
import scopen from './scopen';

program
  .version(pack.version)
  .description(pack.description)
  .usage('[options] <file>')
  .option('-w, --with [cmd]', 'shell program used to open the URL [open]', 'open')
  .option('-a, --application [app]', 'application option passed through to `open`')
  .option('-b, --branch [branch]', 'git branch to view file [current branch]')
  .option('-r, --remote [remote]', 'git remote to view file [origin]', 'origin')
  .option('-u, --url-only', 'write the URL to stdout without opening')
  .option(
    '-v, --verbosity [info]',
    'log level [silent|error|info|debug|verbose]',
    /^(silent|error|info|debug|verbose)$/,
    'info'
  )
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}

scopen({
  ...program,
  file: program.args[0],
  cmd: program.with,
  isConsole: true,
});
