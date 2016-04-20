import { exec } from 'child_process';

export default (cmd, trim = true) => new Promise((resolve, reject) => {
  exec(cmd, (err, stdout, stderr) => {
    if (err) return reject(err);
    if (stderr) return reject(new Error(stderr));
    return resolve(trim ? stdout.trim() : stdout);
  });
});
