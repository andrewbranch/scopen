export const name = 'GitHub SSH';
export const pattern = /^git@github\.com:(\S+)\/(\S+?)\.git$/i;
export const url = ({ user, repo, branch, path }) => `https://github.com/${user}/${repo}/tree/${branch}/${path}`;
export const getUser = matches => matches[0];
export const getRepo = matches => matches[1];
