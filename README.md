# scopen (WIP)
Open a file in its source-control remote web interface

## TODO
 - Write tests
 - Add `--url-only` option (resolves to URL when used as a node_module)
 - Write Atom plugin

## Contributing
Please do! Once I add tests and CI, it will run ESLint automatically. In the meantime, please make sure contributions pass the included .eslintrc rules (AirBnb’s configuration).

To run locally, clone the project and run `npm link` from within the project directory. Then `scopen` will be available from the command line, linked to your local installation. `npm link` must be run again between changes.
