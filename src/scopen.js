import getCurrentBranch from './util/get-current-branch';
import getRemoteURL from './util/get-remote-url';
import setupLogger, { levels } from './util/logger';
import * as githubSsh from './remotes/github-ssh';
import * as githubHttps from './remotes/github-https';

const remotes = [
  githubSsh,
  githubHttps,
];

export default options => {
  const { verbosity, remote, file, branch = getCurrentBranch() } = options;
  const logger = setupLogger(verbosity);
  logger.debug('Initialized program');
  logger.verbose('Options passed to scopen.js:', options);

  Promise.all([getRemoteURL(remote), branch]).then(([rem, br]) => {
    logger.debug('Got remote:', rem);
    logger.debug('Got branch:', br);

    logger.verbose('Testing remote patterns...');
    const matchingRemote = remotes.find(r => {
      if (r.remotePattern.test(remote)) {
        logger.debug('Remote matches:', remote.name);
        return true;
      }

      logger.verbose('Remote does not match:', remote);
      return false;
    });

    const backrefs = (remote.match(matchingRemote.pattern) || []).slice(1);
    logger.verbose('Backreferences from pattern match:', backrefs);
    if (backrefs.length !== 2) {
      logger.error('Could not determine both user and repository from remote.');
    }

    const user = matchingRemote.getUser(backrefs);
    logger.verbose('Got user from remote:', user);
    const repo = matchingRemote.getRepo(backrefs);
    logger.verbose('Got repo from remote:', repo);
  }).catch(err => {
    let message = 'An unknown error occurred.';
    if (levels[logger.level] < levels.debug) {
      message += '\nTry --verbosity=debug or --verbosity=verbose for more info.';
    }

    logger.debug(err.message);
    logger.verbose(err.stack);
    logger.error(message);
  });
};
