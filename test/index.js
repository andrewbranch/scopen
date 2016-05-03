import getCmdStdoutTest from './util/get-cmd-stdout';
import scopenTest from './scopen';

console.log('UTIL');
console.log(` - ${getCmdStdoutTest.title}`);
getCmdStdoutTest.test();

console.log('MAIN');
console.log(` - ${scopenTest.title}`);
scopenTest.test();
