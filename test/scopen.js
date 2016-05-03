import path from 'path';
import curryRight from 'lodash/curryRight';
import { test } from 'tape';
import scopen from '../src/scopen';

const stubs = {
  getRemoteForBranch: curryRight(() => Promise.resolve('origin'), 2),
  getCurrentBranch: () => Promise.resolve('master'),
  getRemoteURL: curryRight(() => Promise.resolve('https://github.com/andrewbranch/scopen.git'), 2),
  getProjectRoot: () => Promise.resolve(path.resolve(__dirname, '..')),
};

Object.keys(stubs).forEach(s => scopen.__Rewire__(s, stubs[s]));

test('scopen - url-only mode resolves to the URL', t => {
  t.plan(2);
  const ret = scopen({
    file: path.resolve(__dirname, 'util/get-cmd-stdout.js'),
    urlOnly: true,
  });

  t.ok(ret instanceof Promise, 'returns a Promise');
  ret.then(url => {
    t.equal(url, 'https://github.com/andrewbranch/scopen/tree/master/test/util/get-cmd-stdout.js', 'resolved URL is correct');
  }, t.fail);
});
