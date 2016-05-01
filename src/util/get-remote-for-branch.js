import curryRight from 'lodash/curryRight';
import getCmdStdout from './get-cmd-stdout';
const cmd = branch => `git config branch.${branch}.remote`;

export default curryRight((branch, cwd) => getCmdStdout(cmd(branch), { cwd }));
