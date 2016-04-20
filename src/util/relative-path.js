import path from 'path';

export default (from, to) => path.relative(from, to).replace(/\\/g, '/');
