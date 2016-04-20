import partial from 'lodash/partial';
import getCmdStdout from './get-cmd-stdout';
const cmd = 'git rev-parse --abbrev-ref HEAD';

export default (cwd) => partial(getCmdStdout, cmd, { cwd })();
