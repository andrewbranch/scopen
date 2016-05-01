import curryRight from 'lodash/curryRight';
import getCmdStdout from './get-cmd-stdout';
import template from './template';
const cmd = 'git config remote.{{remote}}.url';

export default curryRight((remote, cwd) => getCmdStdout(template(cmd, { remote }), { cwd }));
