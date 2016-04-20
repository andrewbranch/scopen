import getCurrentBranch from './util/get-current-branch';
import getRemoteURL from './util/get-remote-url';
import setupLogger from './util/logger';

export default program => {
  const { verbosity, remote, branch = getCurrentBranch() } = program;
  const logger = setupLogger(verbosity);
  logger.debug('Initialized program');
  logger.verbose('Options passed to scopen.js:', program);

  Promise.all([getRemoteURL(remote), branch]).then(([rem, br]) => {
    logger.debug('Got remote:', rem);
    logger.debug('Got branch:', br);
  }).catch(err => {
    logger.error('Could not get either remote URL or branch. (Try --verbosity=debug or --verbosity=verbose for more info.)'); // eslint-disable-line max-len
    logger.debug(err.message);
    logger.verbose(err.stack);
  });
};
