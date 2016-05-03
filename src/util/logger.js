import winston from 'winston';
const testLevel = process.env.NODE_ENV === 'test' ? 'error' : null;

winston.addColors({
  success: 'green',
});

export const levels = {
  silent: 0,
  error: 1,
  warn: 2,
  success: 3,
  info: 4,
  debug: 5,
  verbose: 6,
};

export default logLevel => {
  const logger = new winston.Logger({
    transports: [new winston.transports.Console({ level: testLevel || logLevel })],
  });

  logger.cli();
  logger.setLevels(levels);

  return logger;
};
