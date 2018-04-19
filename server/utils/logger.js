'use strict';

const winston = require('winston');

const level = process.env.LOG_LEVEL || 'info';

const logTransports = [
  new winston.transports.Console({
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    level,
  }),
];
if (process.env.LOG_PATH && process.env.LOG_PATH !== '') {
  logTransports.concat([
    new winston.transports.File({
      name: 'info-file',
      level: 'info',
      filename: process.env.LOG_PATH || './logs/filelog-info.log',
      handleExceptions: true,
      humanReadableUnhandledException: true,
    }),
    new winston.transports.File({
      name: 'error-file',
      level: 'error',
      filename: process.env.LOG_PATH || './logs/filelog-error.log',
      handleExceptions: true,
      humanReadableUnhandledException: true,
    }),
  ]);
}

const logger = new winston.Logger({
  transports: logTransports,
  exitOnError: process.env.NODE_ENV === 'development',
  level,
  json: true,
  // maxsize: 5242880, //Max size of each file will be 5MB
  // maxFiles: 10, // Max of 10 files 5 mb each will be created
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

module.exports = logger;
