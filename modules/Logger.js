/*
Logger class for easy and aesthetically pleasing console logging 
*/
const winston = require('winston');
const moment = require("moment");
const config = {
  levels: {
    error: 0,
    warn: 1,
    debug: 2,
    LOG: 3,
    event: 4,
    cmd: 5,
  
  },
  colors: {
    error: 'bold red',
    debug: 'blue',
    warn: 'bold yellow',
    LOG: 'bold black whiteBG',
    cmd: 'bold white',
    event: 'bold underline green',

  }
};

winston.addColors(config.colors);

const custom = winston.format.printf((info) => {
  return `[${info.timestamp}] ${info.level}: ${info.message}`;
});

const logger = module.exports = winston.createLogger({
  levels: config.levels,
  format: winston.format.combine(
    winston.format(info => {
      info.level = info.level.toUpperCase();
      return info;
    })(),
     winston.format.timestamp({
      format: 'MM-DD HH:mm:ss'
    }),
    winston.format.colorize(),
    custom
   
    ),
  transports: [
    new winston.transports.Console()
  ],
  level: 'cmd'
});

