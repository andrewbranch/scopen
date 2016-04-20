import getCurrentBranch from './util/get-current-branch';
import getRemoteURL from './util/get-remote-url';

export default program => {
  const { remote, branch = getCurrentBranch() } = program;
  Promise.all([getRemoteURL(remote), branch]).then(([rem, br]) => {
    console.log(rem, br);
  }).catch(err => {
    console.error(err.stack);
  });
};
