import getCmdStdout from './get-cmd-stdout';
import template from './template';
const cmd = 'git config remote.{{remote}}.url';

export default (remote, cwd) => getCmdStdout(template(cmd, { remote }), { cwd });
