const dotenv = require('dotenv')
const winston = require('winston')

dotenv.config()

function myTimestamp() {
  return new Date().toString();
};


const logger = winston.createLogger({
  level: 'info', 
  format: winston.format.json(),
  exitOnError: false,
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File(
      { 
        filename: './system/logs/error.log',
        level: 'error',
        maxsize: 5242880, //5MB
        maxFiles: 5,
        handleExceptions: true,
        colorize: false,
        timestamp: myTimestamp
      }
    ),
    new winston.transports.File(
      {
        filename: './system/logs/logs.log',
        handleExceptions: true,
        json: false,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false,
        timestamp: myTimestamp
      }
    ),
  ],
})
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger