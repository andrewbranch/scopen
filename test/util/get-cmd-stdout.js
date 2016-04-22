import { test } from 'tape';
import isError from 'lodash/isError';
import getCmdStdout from '../../src/util/get-cmd-stdout';

export default {
  title: 'getCmdStdout',
  test: () => {
    test('it resolves with stdout', t => {
      t.plan(2);
      const p = getCmdStdout('echo this works');
      t.ok(p instanceof Promise, 'returns a Promise');
      p.then(stdout => t.equal(stdout, 'this works'));
    });

    test('it rejects with stderr', t => {
      t.plan(2);
      getCmdStdout('thisisnotacommand').then(() => {
        t.fail('thisisnotacommand actually resolved');
      }, err => {
        t.ok(isError(err), 'rejected with an error object');
        t.ok(err.message.includes('thisisnotacommand'), 'the error message was stderr');
      });
    });

    test('it trims output by default', t => {
      t.plan(1);
      getCmdStdout('echo this has newlines\n\n\n\n').then(stdout => {
        t.equal(stdout, 'this has newlines');
      });
    });
  },
};
