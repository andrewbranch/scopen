import getCmdStdout from './util/get-cmd-stdout';
import getCurrentBranch from './util/get-current-branch';
import getRemoteURL from './util/get-remote-url';
import getProjectRoot from './util/get-project-root';
import relativePath from './util/relative-path';
import template from './util/template';
import setupLogger, { levels } from './util/logger';
import { dirname } from 'path';
import * as githubSsh from './remotes/github-ssh';
import * as githubHttps from './remotes/github-https';

const remotes = [
  githubSsh,
  githubHttps,
];

export default options => {
  const { verbosity, cmd, application, file } = options;
  const _cwd = dirname(file);
  const _branch = options.branch || getCurrentBranch(_cwd);
  const _remote = options.remote || 'origin';
  const logger = setupLogger(verbosity);
  logger.debug('Initialized program');
  logger.verbose('Options passed to scopen.js:', options);

  Promise.all([getProjectRoot(_cwd), getRemoteURL(_remote, _cwd), _branch]).then(([root, remote, branch]) => {
    logger.debug('Got project root:', root);
    logger.debug('Got remote:', remote);
    logger.debug('Got branch:', branch);

    logger.verbose('Testing remote patterns...');
    const matchingRemote = remotes.find(r => {
      if (r.pattern.test(remote)) {
        logger.debug('Remote matches:', r.name);
        return true;
      }

      logger.verbose('Remote does not match:', r);
      return false;
    });

    if (!matchingRemote) {
      logger.error('Couldn’t match your git remote with known remotes.');
      process.exit(1);
    }

    const backrefs = (remote.match(matchingRemote.pattern) || []).slice(1);
    logger.verbose('Backreferences from pattern match:', backrefs);
    if (backrefs.length !== 2) {
      logger.error('Could not determine both user and repository from remote.');
      process.exit(1);
    }

    const user = matchingRemote.getUser(backrefs);
    logger.verbose('Got user from remote:', user);
    const repo = matchingRemote.getRepo(backrefs);
    logger.verbose('Got repo from remote:', repo);
    const path = relativePath(root, file);
    logger.verbose('Got path from project root to file:', path);

    const url = template(matchingRemote.urlTemplate, {
      user,
      repo,
      branch,
      path,
    });

    logger.success('Opening URL:', url);
    const args = cmd === 'open' && application ? `-a "${application}"` : '';
    const openCommand = `${cmd} ${args} ${url}`;
    logger.debug('Running:', openCommand);

    return getCmdStdout(openCommand);
  }).catch(err => {
    logger.exitOnError = false;
    logger.error('An unknown error occurred.');
    if (levels[logger.level] < levels.debug) {
      logger.error('Try --verbosity=debug or --verbosity=verbose for more info.');
    }

    logger.debug(err.message);
    logger.verbose(err.stack);
  });
};
