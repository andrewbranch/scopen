import path from 'path';
import proxyquire from 'proxyquire';
import { test } from 'tape';

const stubs = {
  getRemoteForBranch: () => Promise.resolve('origin'),
  getCurrentBranch: () => Promise.resolve('master'),
  getRemoteURL: () => Promise.resolve('https://github.com/andrewbranch/scopen.git'),
  getProjectRoot: () => Promise.resolve(path.resolve('..')),
};

test('scopen - url-only mode resolves to the URL', t => {
  t.plan(2);
  const scopen = proxyquire('../src/scopen', stubs).default;
  const ret = scopen({
    file: path.resolve(__dirname, 'util/get-cmd-stdout.js'),
    urlOnly: true,
  });

  t.ok(ret instanceof Promise, 'returns a Promise');
  ret.then(url => {
    t.equal(url, 'https://github.com/andrewbranch/scopen/tree/master/test/util/get-cmd-stdout.js', 'resolved URL is correct');
  }, t.fail);
});
