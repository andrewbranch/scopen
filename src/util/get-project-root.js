import partial from 'lodash/partial';
import getCmdStdout from './get-cmd-stdout';
const cmd = 'git rev-parse --show-toplevel';

export default (cwd) => partial(getCmdStdout, cmd, { cwd })();
