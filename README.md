# scopen
Open a file in its source-control remote web interface

[![Build Status](https://travis-ci.org/andrewbranch/scopen.svg?branch=master)](https://travis-ci.org/andrewbranch/scopen)

## Installation
```shell
npm install -g scopen
```

## Usage
```
scopen [options] <file>

Options:

  -h, --help               output usage information
  -V, --version            output the version number
  -w, --with [cmd]         shell program used to open the URL [open]
  -a, --application [app]  application option passed through to `open`
  -b, --branch [branch]    git branch to view file [current branch]
  -r, --remote [remote]    git remote to view file [origin]
  -v, --verbosity [info]   log level [silent|error|info|debug|verbose]
  -u, --url-only           write the URL to stdout without opening
```

## Contributing
Please do, especially to add support for other git remotes. AirBnb’s ESLint rules are checked as part of the test suite, so make sure your editor is set up to respect the provided .eslintrc (or at least run `npm test` before pushing).

To run locally, clone the project and run `npm link` from within the project directory. Then `scopen` will be available from the command line, linked to your local installation. `npm link` must be run again between changes.
