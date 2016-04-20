import getCmdStdout from './get-cmd-stdout';
const cmd = 'git rev-parse --show-toplevel';

export default cwd => getCmdStdout(cmd, { cwd });
