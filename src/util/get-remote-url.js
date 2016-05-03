import curryRight from 'lodash/curryRight';
import getCmdStdout from './get-cmd-stdout';
const cmd = remote => `git config remote.${remote}.url`;

export default curryRight((remote, cwd) => getCmdStdout(cmd(remote), { cwd }));
