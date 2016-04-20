import getCmdStdout from './get-cmd-stdout';
import template from './template';
const cmd = 'git config remote.{{remote}}.url';

export default remote => getCmdStdout(template(cmd, { remote }));
