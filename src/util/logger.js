import winston from 'winston';
const testLevel = process.env.NODE_ENV === 'test' ? 'error' : null;

winston.addColors({
  success: 'green',
});

export const levels = {
  error: 0,
  warn: 1,
  success: 2,
  info: 3,
  debug: 4,
  verbose: 5,
};

export default (logLevel = 'info') => {
  const logger = new winston.Logger({
    transports: [new winston.transports.Console({ level: testLevel || logLevel })],
  });

  logger.cli();
  logger.setLevels(levels);

  return logger;
};
