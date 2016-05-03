# scopen (WIP)
Open a file in its source-control remote web interface

[![Build Status](https://travis-ci.org/andrewbranch/scopen.svg?branch=master)](https://travis-ci.org/andrewbranch/scopen)

## TODO
 - Write Atom plugin
 - Support more git remotes

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
Please do! Once I add tests and CI, it will run ESLint automatically. In the meantime, please make sure contributions pass the included .eslintrc rules (AirBnb’s configuration).

To run locally, clone the project and run `npm link` from within the project directory. Then `scopen` will be available from the command line, linked to your local installation. `npm link` must be run again between changes.
