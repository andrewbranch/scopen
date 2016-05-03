import path from 'path';
import proxyquire from 'proxyquire';
import { test } from 'tape';

const stubs = {
  getRemoteForBranch: () => Promise.resolve('origin'),
  getCurrentBranch: () => Promise.resolve('master'),
  getRemoteURL: () => Promise.resolve('https://github.com/andrewbranch/scopen.git'),
  getProjectRoot: () => Promise.resolve(path.resolve('..')),
};

export default {
  title: 'scopen',
  test: () => {
    test('url-only mode resolves to the URL', t => {
      t.plan(2);
      const scopen = proxyquire('../src/scopen', stubs).default;
      const ret = scopen({
        file: path.resolve(__dirname, 'index.js'),
        urlOnly: true,
      });

      t.ok(ret instanceof Promise, 'returns a Promise');
      ret.then(url => {
        t.equal(url, 'https://github.com/andrewbranch/scopen/tree/master/test/index.js', 'resolved URL is correct');
      }, t.fail);
    });
  },
};
