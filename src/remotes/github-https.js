export const name = 'GitHub HTTPS';
export const pattern = /^https:\/\/github\.com\/(\S+)\/(\S+?)\.git$/i;
export const urlTemplate = 'https://github.com/{{user}}/{{repo}}/tree/{{branch}}/{{file}}';
export const getUser = matches => matches[0];
export const getRepo = matches => matches[1];
