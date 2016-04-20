import winston from 'winston';
const testLevel = process.env.NODE_ENV === 'test' ? 'error' : null;

export default (logLevel = 'info') => new winston.Logger({
  transports: [new winston.transports.Console({ level: testLevel || logLevel })],
  levels: {
    error: 0,
    warn: 1,
    success: 2,
    info: 3,
    debug: 4,
    verbose: 5,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    success: 'green',
    info: 'white',
    debug: 'white',
    verboxe: 'white',
  },
});
